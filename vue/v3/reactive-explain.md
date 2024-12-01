Vue3 Reactivity 内部实现详解

## 1. reactive 的内部实现

当我们调用 `reactive({ name: 'John' })` 时，内部发生了以下步骤：

```javascript
const user = reactive({
  name: 'John',
  age: 30
});
```

### 1.1 创建步骤

1. 首先进入 `reactive` 函数：
```javascript
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
```

2. `createReactiveObject` 会：
   - 检查目标对象是否可被代理
   - 创建一个 Proxy 对象
   - 使用 WeakMap 缓存已创建的代理

```javascript
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  // 如果目标不是对象，直接返回
  if (!isObject(target)) {
    return target;
  }
  
  // 检查缓存
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  // 创建代理
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
```

3. `mutableHandlers` 定义了代理的行为：
```javascript
const mutableHandlers = {
  get(target, key, receiver) {
    // 进行依赖收集
    track(target, "get", key);
    const value = Reflect.get(target, key, receiver);
    if (isObject(value)) {
      // 深层响应式
      return reactive(value);
    }
    return value;
  },
  set(target, key, value, receiver) {
    const oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    // 触发更新
    trigger(target, "set", key, value, oldValue);
    return result;
  }
};
```

## 2. ref 的内部实现

当调用 `ref(0)` 时：

```javascript
const count = ref(0);
```

### 2.1 创建过程

1. 进入 `ref` 函数：
```javascript
function ref(value) {
  return createRef(value, false);
}
```

2. `createRef` 创建 RefImpl 实例：
```javascript
class RefImpl {
  constructor(value, isShallow) {
    this._value = isShallow ? value : toReactive(value);
    this.dep = new Dep();
    this.__v_isRef = true;
  }

  get value() {
    // 收集依赖
    this.dep.track({
      target: this,
      type: "get",
      key: "value"
    });
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = toReactive(newValue);
      // 触发更新
      this.dep.trigger({
        target: this,
        type: "set",
        key: "value",
        newValue,
        oldValue: this._rawValue
      });
    }
  }
}
```

## 3. effect 的内部实现

当我们使用 effect 时：

```javascript
effect(() => {
  console.log(count.value);
});
```

### 3.1 执行流程

1. 创建 ReactiveEffect 实例：
```javascript
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = [];
    this.flags = 1 | 4;
  }

  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    
    // 准备依赖收集
    const lastEffect = activeEffect;
    activeEffect = this;
    
    try {
      return this.fn();
    } finally {
      // 恢复状态
      activeEffect = lastEffect;
    }
  }
}
```

2. 依赖收集过程：
```javascript
function track(target, type, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}
```

3. 触发更新过程：
```javascript
function trigger(target, type, key, newValue, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const effects = new Set();
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => effects.add(effect));
    }
  };
  
  // 添加相关的 effects
  add(depsMap.get(key));
  
  // 执行 effects
  effects.forEach(effect => {
    effect.run();
  });
}
```

## 4. computed 的内部实现

当使用 computed 时：

```javascript
const doubled = computed(() => count.value * 2);
```

### 4.1 实现过程

1. 创建 ComputedRefImpl 实例：
```javascript
class ComputedRefImpl {
  constructor(getter, setter) {
    this._dirty = true;
    this.dep = new Dep();
    
    // 创建 effect
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        this.dep.notify();
      }
    });
  }
  
  get value() {
    this.dep.depend();
    if (this._dirty) {
      this._value = this.effect.run();
      this._dirty = false;
    }
    return this._value;
  }
}
```

## 5. watch 的内部实现

当使用 watch 时：

```javascript
watch(source, callback, options)
```

### 5.1 执行流程

1. 创建监听器：
```javascript
function watch(source, cb, options = {}) {
  // 创建 effect
  const effect = new ReactiveEffect(getter);
  
  // 设置调度器
  effect.scheduler = () => {
    // 执行回调
    cb(effect.run(), oldValue);
  };
  
  // 首次运行
  if (options.immediate) {
    effect.scheduler();
  } else {
    oldValue = effect.run();
  }
}
```

## 6. 核心数据结构

### 6.1 依赖收集的 Map 结构
```javascript
// WeakMap<Target, Map<Key, Set<Effect>>>
const targetMap = new WeakMap();
```

### 6.2 Effect 系统
```javascript
let activeEffect = undefined;
const effectStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
```

## 7. 性能优化

1. WeakMap 的使用
2. effect 调度系统
3. 缓存系统
4. 批量更新机制

## 8. 主要工作流程

1. 创建响应式对象
2. 收集依赖
3. 数据变化
4. 触发更新
5. 执行副作用

## 9. 注意事项

1. 循环引用处理
2. 边界情况处理
3. 性能考虑
4. 内存泄漏防护