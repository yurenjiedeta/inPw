Vue3 createApp 源码执行流程深度解析

## 1. createApp 初始化流程

当执行 `createApp(App)` 时，首先进入 `packages/runtime-dom/src/index.ts`：

```typescript
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)
  
  const { mount } = app
  // 重写 mount 方法
  app.mount = (containerOrSelector: Element | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    
    // 清空容器
    container.innerHTML = ''
    // 调用原始 mount
    const proxy = mount(container)
    return proxy
  }
  
  return app
}) as CreateAppFunction<Element>
```

### 1.1 ensureRenderer 创建渲染器

```typescript
function ensureRenderer() {
  return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
}
```

这里的 rendererOptions 包含了针对 DOM 的具体操作方法：
- createElement
- patchProp
- insert
- remove
- setElementText 等

### 1.2 createRenderer 核心流程

```typescript
function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  // 1. 解构所有 DOM 操作方法
  const {
    insert: hostInsert,
    createElement: hostCreateElement,
    setElementText: hostSetElementText,
    // ... 其他方法
  } = options

  // 2. 创建各种处理函数
  const processElement = (n1, n2, container) => {
    if (n1 === null) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2)
    }
  }

  const mountElement = (vnode, container) => {
    const el = (vnode.el = hostCreateElement(vnode.type))
    // 处理 children
    if (typeof vnode.children === 'string') {
      hostSetElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      mountChildren(vnode.children, el)
    }
    // 处理 props
    if (vnode.props) {
      for (const key in vnode.props) {
        hostPatchProp(el, key, null, vnode.props[key])
      }
    }
    hostInsert(el, container)
  }

  // 3. 返回渲染器
  return {
    createApp: createAppAPI(render)
  }
}
```

## 2. 应用实例创建流程

当调用 createApp() 创建应用实例时：

```typescript
function createAppAPI(render) {
  return function createApp(rootComponent, rootProps = null) {
    const context = createAppContext()
    const installedPlugins = new Set()
    
    const app = {
      _component: rootComponent,
      _props: rootProps,
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          return app
        }
        plugin.install?.(app, ...options)
        installedPlugins.add(plugin)
        return app
      },
      
      mount(rootContainer) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps)
          // 设置应用上下文
          vnode.appContext = context
          
          render(vnode, rootContainer)
          isMounted = true
          
          return getExposeProxy(vnode.component) || vnode.component.proxy
        }
      }
    }
    
    return app
  }
}
```

## 3. mount 挂载流程

当执行 app.mount('#app') 时：

```typescript
function mount(rootContainer) {
  // 1. 创建根组件的 VNode
  const vnode = createVNode(rootComponent, rootProps)
  
  // 2. 渲染 VNode
  render(vnode, rootContainer)
  
  // 3. render 函数内部流程
  const render = (vnode, container) => {
    if (vnode == null) {
      // 卸载
      if (container._vnode) {
        unmount(container._vnode)
      }
    } else {
      // 更新或挂载
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }
  
  // 4. patch 函数处理
  const patch = (n1, n2, container) => {
    const { type } = n2
    if (typeof type === 'string') {
      processElement(n1, n2, container)
    } else if (typeof type === 'object') {
      processComponent(n1, n2, container)
    }
  }
}
```

## 4. 组件处理流程

```typescript
const processComponent = (n1, n2, container) => {
  if (n1 == null) {
    mountComponent(n2, container)
  } else {
    updateComponent(n1, n2)
  }
}

const mountComponent = (vnode, container) => {
  // 1. 创建组件实例
  const instance = createComponentInstance(vnode)
  
  // 2. 设置组件实例
  setupComponent(instance)
  
  // 3. 设置渲染效果
  setupRenderEffect(instance, container)
}
```

## 5. 响应式系统初始化

在处理组件时，会初始化响应式系统：

```typescript
function setupComponent(instance) {
  // 1. 处理 props
  initProps(instance, instance.vnode.props)
  
  // 2. 处理 slots
  initSlots(instance, instance.vnode.children)
  
  // 3. 设置有状态的组件
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  // 1. 创建渲染上下文代理
  instance.proxy = new Proxy({}, publicInstanceProxyHandlers)
  
  // 2. 获取组件配置
  const Component = instance.type
  const { setup } = Component
  
  // 3. 如果有 setup 函数则调用
  if (setup) {
    const setupContext = createSetupContext(instance)
    const setupResult = setup(instance.props, setupContext)
    handleSetupResult(instance, setupResult)
  }
}
```

## 6. 渲染效果设置

```typescript
function setupRenderEffect(instance, container) {
  // 创建响应式效果
  instance.update = effect(() => {
    if (!instance.isMounted) {
      // 首次挂载
      const subTree = (instance.subTree = renderComponentRoot(instance))
      patch(null, subTree, container)
      instance.isMounted = true
    } else {
      // 更新
      let { next, vnode } = instance
      if (next) {
        updateComponentPreRender(instance, next)
      }
      const subTree = renderComponentRoot(instance)
      patch(instance.subTree, subTree, container)
      instance.subTree = subTree
    }
  })
}
```

## 7. 完整的生命周期

在整个过程中，会依次触发以下生命周期钩子：

1. beforeCreate: 组件实例被创建之前
2. created: 组件实例创建完成
3. beforeMount: 组件挂载之前
4. mounted: 组件挂载完成
5. beforeUpdate: 组件更新之前
6. updated: 组件更新完成
7. beforeUnmount: 组件卸载之前
8. unmounted: 组件卸载完成