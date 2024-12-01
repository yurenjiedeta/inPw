Effect 函数与响应式系统的关系详解

## 1. Effect 的本质

effect 函数是响应式系统的核心，它主要负责：
1. 创建响应式副作用
2. 追踪响应式依赖
3. 在依赖变化时重新执行

### 1.1 Effect 的基本实现

```javascript
// Effect 类的核心实现
class ReactiveEffect {
    constructor(fn, scheduler = null) {
        this.fn = fn;           // 用户传入的函数
        this.deps = [];         // 存储相关依赖
        this.active = true;     // effect 是否激活
        this.scheduler = scheduler; // 调度器
    }

    run() {
        if (!this.active) {
            return this.fn();
        }

        try {
            // 设置当前激活的 effect
            activeEffect = this;
            // 执行用户函数，触发依赖收集
            return this.fn();
        } finally {
            // 清理
            activeEffect = null;
        }
    }

    stop() {
        if (this.active) {
            // 清除依赖收集
            cleanupEffect(this);
            this.active = false;
        }
    }
}
```

### 1.2 Effect 的使用

```javascript
// 创建响应式数据
const state = reactive({
    count: 0
});

// 创建 effect
effect(() => {
    console.log('Count is:', state.count);
});

// 修改数据时会触发 effect 重新执行
state.count++;
```

## 2. Effect 与依赖收集的关系

### 2.1 依赖收集过程

```javascript
// 全局的当前激活 effect
let activeEffect = null;

// 依赖收集函数
function track(target, key) {
    if (!activeEffect) return;
    
    // 获取 target 对应的依赖映射
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    
    // 获取 key 对应的依赖集合
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    
    // 收集当前激活的 effect
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}
```

### 2.2 触发更新机制

```javascript
function trigger(target, key) {
    // 获取依赖映射
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    
    // 获取 key 对应的 effects
    const effects = depsMap.get(key);
    
    if (effects) {
        effects.forEach(effect => {
            // 如果有调度器，使用调度器执行
            if (effect.scheduler) {
                effect.scheduler();
            } else {
                // 否则直接运行 effect
                effect.run();
            }
        });
    }
}
```

## 3. Effect 的高级特性

### 3.1 嵌套 Effect

```javascript
const state = reactive({ foo: 1, bar: 2 });

effect(() => {               // effect1
    console.log('foo:', state.foo);
    effect(() => {          // effect2
        console.log('bar:', state.bar);
    });
});
```

处理嵌套的实现：
```javascript
// effect 栈
const effectStack = [];

function runEffect(effect) {
    if (!effectStack.includes(effect)) {
        try {
            effectStack.push(effect);
            activeEffect = effect;
            return effect.fn();
        } finally {
            effectStack.pop();
            activeEffect = effectStack[effectStack.length - 1];
        }
    }
}
```

### 3.2 调度器功能

```javascript
// 创建带调度器的 effect
effect(
    () => {
        console.log(state.count);
    },
    {
        scheduler: (effect) => {
            // 自定义调度逻辑
            setTimeout(() => {
                effect.run();
            }, 0);
        }
    }
);
```

### 3.3 停止效果

```javascript
const runner = effect(() => {
    console.log(state.count);
});

// 停止 effect
runner.effect.stop();
```

## 4. Effect 工作流程示例

```javascript
// 1. 创建响应式数据
const state = reactive({
    message: 'Hello'
});

// 2. 创建 effect
const runner = effect(() => {
    // 这里访问响应式数据
    document.body.textContent = state.message;
});

// 工作流程：
// a. effect 执行，设置 activeEffect
// b. 执行用户函数，访问 state.message
// c. 触发 proxy 的 get 陷阱
// d. 执行依赖收集，将当前 effect 收集到依赖中
// e. 完成首次渲染

// 3. 数据更新
state.message = 'World';
// 更新流程：
// a. 触发 proxy 的 set 陷阱
// b. 执行 trigger，找到相关的 effect
// c. 重新运行 effect，更新 DOM
```

## 5. Effect 与计算属性的关系

```javascript
// computed 内部也使用了 effect
function computed(getter) {
    let dirty = true;
    let value;
    
    const effect = new ReactiveEffect(getter, () => {
        if (!dirty) {
            dirty = true;
            trigger(computed, 'value');
        }
    });
    
    const computed = {
        get value() {
            if (dirty) {
                value = effect.run();
                dirty = false;
            }
            track(computed, 'value');
            return value;
        }
    };
    
    return computed;
}
```

## 6. Effect 的错误处理

```javascript
class ReactiveEffect {
    run() {
        try {
            // 运行用户函数
            return this.fn();
        } catch (e) {
            // 错误处理
            if (this.onError) {
                this.onError(e);
            } else {
                throw e;
            }
        }
    }
}
```

