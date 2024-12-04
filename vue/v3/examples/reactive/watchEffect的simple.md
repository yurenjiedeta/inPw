```js
// 当前活跃的副作用函数
let activeEffect = null

// 存储响应式对象的依赖关系
const targetMap = new WeakMap()

// 用于追踪和触发副作用
function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
}

// 触发副作用函数
function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    }
}

// 创建响应式对象
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key) {
            track(target, key)
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
            trigger(target, key)
            return true
        }
    })
}

// watchEffect 实现
function watchEffect(effect) {
    activeEffect = effect
    effect()  // 首次执行收集依赖
    activeEffect = null
}

// 使用示例
const state = reactive({
    count: 0
})

watchEffect(() => {
    console.log('count changed:', state.count)
})

state.count++ // 将触发副作用函数
```

