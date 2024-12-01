响应式数据与渲染函数的关联机制

## 1. 组件初始化过程

```javascript
// 简化的组件挂载流程
function mountComponent(initialVNode, container) {
    // 创建组件实例
    const instance = createComponentInstance(initialVNode);
    
    // 设置组件实例
    setupComponent(instance);
    
    // 设置并运行带副作用的渲染函数
    setupRenderEffect(instance, container);
}

// 设置渲染副作用
function setupRenderEffect(instance, container) {
    // 创建响应式副作用
    instance.update = effect(function componentEffect() {
        if (!instance.isMounted) {
            // 首次挂载
            const subTree = (instance.subTree = renderComponentRoot(instance));
            patch(null, subTree, container);
            instance.isMounted = true;
        } else {
            // 更新
            const nextTree = renderComponentRoot(instance);
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            patch(prevTree, nextTree, container);
        }
    });
}
```

## 2. 响应式数据与渲染函数的关联过程

### 2.1 创建响应式数据
```javascript
// 组件中的数据
const state = reactive({
    count: 0
});

// 模板
// <div>{{ count }}</div>
```

### 2.2 渲染函数包装
```javascript
// 编译后的渲染函数
function render() {
    return h('div', null, state.count);
}

// 被 effect 包装
effect(() => {
    // 在这里访问响应式数据，触发依赖收集
    const vnode = render();
    // 更新 DOM
    patch(prevVNode, vnode, container);
});
```

## 3. 关联机制的核心步骤

1. **组件初始化**：
   - 创建组件实例
   - 初始化响应式数据
   - 准备渲染函数

2. **首次渲染**：
   ```javascript
   // 创建渲染副作用
   effect(() => {
       // 执行渲染函数时会访问响应式数据
       const vnode = instance.render.call(proxyToUse, proxyToUse);
       
       // 此时触发 reactive 对象的 get 操作
       // 进行依赖收集，将当前渲染的 effect 收集到依赖中
       patch(null, vnode, container);
   });
   ```

3. **建立联系**：
   - 渲染函数执行时访问响应式数据
   - 触发响应式数据的 get 拦截器
   - 执行依赖收集，将渲染 effect 添加到依赖集合

4. **更新机制**：
   - 响应式数据变化触发 set 拦截器
   - 找到收集的渲染 effect
   - 重新执行渲染函数更新视图

## 4. 具体工作流程示例

```javascript
// 1. 创建响应式数据
const state = reactive({ count: 0 });

// 2. 组件渲染函数
const render = () => {
    return h('div', null, state.count);
};

// 3. effect 包装渲染函数
const componentEffect = effect(() => {
    // 访问 state.count，触发 get 拦截器
    const vnode = render();
    // 执行真实的 DOM 更新
    patch(prevVnode, vnode, container);
}, {
    scheduler: queueJob // 调度器，用于批量更新
});

// 4. 数据更新时
state.count++; // 触发 set 拦截器，通知相关 effect 重新执行
```

## 5. 依赖收集和更新的完整链路

1. **初始化阶段**：
```javascript
// 创建响应式数据
const state = reactive({ count: 0 });

// 渲染函数被 effect 包装
effect(() => {
    // 在这里读取 state.count
    document.body.innerHTML = state.count;
});
```

2. **依赖收集阶段**：
```javascript
// get 拦截器中
get(target, key, receiver) {
    // 进行追踪
    track(target, TrackOpTypes.GET, key);
    return Reflect.get(target, key, receiver);
}

// 追踪过程
function track(target, type, key) {
    // 将当前渲染 effect 收集到依赖中
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect); // activeEffect 就是渲染函数
    }
}
```

3. **更新阶段**：
```javascript
// set 拦截器中
set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // 触发更新
    trigger(target, TriggerOpTypes.SET, key, value);
    return result;
}

// 触发过程
function trigger(target, type, key, newValue) {
    // 找到相关的 effect（包括渲染函数）并执行
    const deps = getDeps(target, key);
    deps.forEach(dep => {
        if (dep.scheduler) {
            dep.scheduler(); // 调度执行
        } else {
            dep.run(); // 直接执行
        }
    });
}
```

通过这个过程，响应式数据和渲染函数就建立了关联，形成了完整的响应式更新链路。

