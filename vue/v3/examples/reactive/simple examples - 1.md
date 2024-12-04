```js
// 基础工具函数
const isObject = (val) => val !== null && typeof val === "object";
const isFunction = (val) => typeof val === "function";
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const NOOP = () => { };

// 依赖追踪
let activeEffect;
let shouldTrack = true;
const targetMap = new WeakMap();

class ReactiveEffect {
    constructor(fn, scheduler = null) {
        this.fn = fn;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = new Set();
        this.computed = false;
        this.allowRecurse = false;
    }

    run() {
        if (!this.active) {
            return this.fn();
        }

        try {
            activeEffect = this;
            return this.fn();
        } finally {
            activeEffect = undefined;
        }
    }

    stop() {
        if (this.active) {
            this.active = false;
            this.deps.forEach(dep => dep.delete(this));
            this.deps.clear();
            this.onStop?.();
        }
    }
}

// 依赖收集和触发
function track(target, key) {
    if (!activeEffect || !shouldTrack) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }

    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    dep.add(activeEffect);
    activeEffect.deps.add(dep);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const dep = depsMap.get(key);
    if (dep) {
        const effects = new Set();
        dep.forEach(effect => {
            if (effect !== activeEffect || effect.allowRecurse) {
                effects.add(effect);
            }
        });
        effects.forEach(effect => {
            if (effect.scheduler) {
                effect.scheduler();
            } else {
                effect.run();
            }
        });
    }
}

// 响应式核心
const mutableHandlers = {
    get(target, key, receiver) {
        track(target, key);
        const result = Reflect.get(target, key, receiver);
        return isObject(result) ? reactive(result) : result;
    },

    set(target, key, value, receiver) {
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);
        if (hasChanged(value, oldValue)) {
            trigger(target, key);
        }
        return result;
    }
};

const readonlyHandlers = {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        return isObject(result) ? readonly(result) : result;
    },

    set() {
        console.warn('Cannot set readonly property');
        return true;
    }
};

// 响应式对象创建
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

// 集合类型的处理器
const collectionHandlers = {
    get(target, key, receiver) {
        // 处理内建属性
        if (key === 'size') {
            track(target, 'size');
            return Reflect.get(target, key, target);
        }

        // 处理方法
        const targetMethod = Reflect.get(target, key, target);
        if (isFunction(targetMethod)) {
            return function (...args) {
                const result = targetMethod.apply(target, args);

                // 对特定方法进行跟踪
                if (['add', 'delete', 'clear', 'set'].includes(key)) {
                    trigger(target, key);
                }

                return result;
            };
        }

        return targetMethod;
    }
};

// 修改 reactive 函数以支持集合类型
function reactive(target) {
    if (!isObject(target)) return target;

    const existingProxy = reactiveMap.get(target);
    if (existingProxy) return existingProxy;

    // 选择合适的处理器
    const handlers = target instanceof Set || target instanceof Map
        ? collectionHandlers
        : mutableHandlers;

    const proxy = new Proxy(target, handlers);
    reactiveMap.set(target, proxy);
    return proxy;
}

// 修改 traverse 函数以更好地处理集合
function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value)) {
        return value;
    }

    seen.add(value);

    if (value instanceof Set) {
        value.forEach(v => traverse(v, seen));
    } else if (value instanceof Map) {
        value.forEach((v, k) => {
            traverse(k, seen);
            traverse(v, seen);
        });
    } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    } else {
        Object.keys(value).forEach(key => {
            traverse(value[key], seen);
        });
    }

    return value;
}

function readonly(target) {
    if (!isObject(target)) return target;

    const existingProxy = readonlyMap.get(target);
    if (existingProxy) return existingProxy;

    const proxy = new Proxy(target, readonlyHandlers);
    readonlyMap.set(target, proxy);
    return proxy;
}

// Computed API
function computed(getterOrOptions) {
    const getter = isFunction(getterOrOptions)
        ? getterOrOptions
        : getterOrOptions.get;
    const setter = isFunction(getterOrOptions)
        ? () => console.warn('Computed value is readonly')
        : getterOrOptions.set;

    let dirty = true;
    let value;

    const runner = new ReactiveEffect(getter, () => {
        if (!dirty) {
            dirty = true;
            trigger(computed, 'value');
        }
    });
    runner.computed = true;

    const computed = {
        get value() {
            if (dirty) {
                value = runner.run();
                dirty = false;
            }
            track(computed, 'value');
            return value;
        },
        set value(newValue) {
            setter(newValue);
        }
    };

    return computed;
}

// Watch APIs
function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value)) {
        return value;
    }

    seen.add(value);

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    } else if (value instanceof Map || value instanceof Set) {
        value.forEach(v => traverse(v, seen));
    } else {
        Object.keys(value).forEach(key => traverse(value[key], seen));
    }

    return value;
}

function doWatch(source, cb, options = {}) {
    const {
        immediate = false,
        deep = false,
        flush = 'pre'
    } = options;

    let getter;
    if (isFunction(source)) {
        getter = source;
    } else {
        getter = () => deep ? traverse(source) : source;
    }

    let oldValue;
    let cleanup;

    function onCleanup(fn) {
        cleanup = fn;
    }

    const job = () => {
        if (cb) {
            const newValue = effect.run();
            if (cleanup) {
                cleanup();
            }
            cb(newValue, oldValue, onCleanup);
            oldValue = newValue;
        } else {
            effect.run();
        }
    };

    const effect = new ReactiveEffect(getter, job);

    if (immediate && cb) {
        job();
    } else {
        oldValue = effect.run();
    }

    return () => {
        effect.stop();
        if (cleanup) {
            cleanup();
        }
    };
}

function watch(source, cb, options) {
    return doWatch(source, cb, options);
}

function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}

function watchSyncEffect(effect, options) {
    return doWatch(effect, null, { ...options, flush: 'sync' });
}

function onWatcherCleanup(fn) {
    if (activeEffect) {
        activeEffect.onStop = fn;
    }
}
```

```js
// 1. 响应式对象
console.log('=== Reactive Objects ===');
const state = reactive({
    count: 0,
    nested: {
        value: 1
    },
    items: ['a', 'b', 'c']
});

const readOnlyState = readonly(state);

// 2. 计算属性
console.log('\n=== Computed Properties ===');
const double = computed(() => state.count * 2);
const fullName = computed({
    get: () => `${state.firstName} ${state.lastName}`,
    set: (newValue) => {
        const [firstName, lastName] = newValue.split(' ');
        state.firstName = firstName;
        state.lastName = lastName;
    }
});

// 3. 基础 watch
console.log('\n=== Basic Watch ===');
watch(
    () => state.count,
    (newValue, oldValue) => {
        console.log(`Count changed from ${oldValue} to ${newValue}`);
    }
);

// 4. 深度 watch
console.log('\n=== Deep Watch ===');
watch(
    state,
    (newValue, oldValue) => {
        console.log('State deeply changed:', newValue);
    },
    { deep: true }
);

// 5. watchEffect
console.log('\n=== Watch Effect ===');
const stopWatchEffect = watchEffect(() => {
    console.log(`Current count is: ${state.count}`);
    console.log(`Nested value is: ${state.nested.value}`);

    // 清理函数
    onWatcherCleanup(() => {
        console.log('Cleaning up watch effect...');
    });
});

// 6. watchSyncEffect
console.log('\n=== Watch Sync Effect ===');
const stopSyncEffect = watchSyncEffect(() => {
    console.log(`Sync effect - count: ${state.count}`);
});

// 7. 立即执行的 watch
console.log('\n=== Immediate Watch ===');
watch(
    () => state.count,
    (newValue, oldValue) => {
        console.log(`Immediate watch - count: ${newValue}`);
    },
    { immediate: true }
);

// 8. 测试响应式更新
console.log('\n=== Testing Updates ===');
// 更新基础值
state.count++;

// 更新嵌套值
state.nested.value++;

// 更新数组
state.items.push('d');

// 尝试更新只读对象（会警告）
try {
    readOnlyState.count++;
} catch (e) {
    console.log('Cannot modify readonly state');
}

// 清理效果
setTimeout(() => {
    console.log('\n=== Cleaning Up ===');
    stopWatchEffect();
    stopSyncEffect();
    console.log('Stopped effects');
}, 1000);

// 9. 复杂数据结构
console.log('\n=== Complex Data Structures ===');
const complex = reactive({
    set: new Set([1, 2, 3]),
    map: new Map([['key', 'value']]),
    deep: {
        nested: {
            array: [1, 2, { value: 3 }]
        }
    }
});

watchEffect(() => {
    console.log('Set size:', complex.set.size);
    console.log('Map value:', complex.map.get('key'));
    console.log('Deep value:', complex.deep.nested.array[2].value);
});

// 修改复杂数据
complex.set.add(4);
complex.map.set('key', 'new value');
complex.deep.nested.array[2].value = 30;
```

