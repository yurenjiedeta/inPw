# Vue3 Render 函数执行流程详细分析

## 1. render 函数的入口

```typescript
// packages/runtime-core/src/renderer.ts
const render = (vnode, container, isSVG = false) => {
  if (vnode == null) {
    // 如果新的 vnode 为空，且容器上存在旧的 vnode，则执行卸载
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    // 否则执行 patch 更新或挂载操作
    patch(container._vnode || null, vnode, container, null, null, null, isSVG)
  }
  // 缓存 vnode 在容器上，用于下次更新比对
  container._vnode = vnode
}
```

## 2. patch 函数核心流程

patch 函数是整个渲染过程的核心，它处理不同类型的 vnode：

```typescript
const patch = (
  n1: VNode | null,    // 旧的 vnode
  n2: VNode,           // 新的 vnode
  container: Element,  // 容器元素
  anchor: Element | null = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  optimized = false
) => {
  // 1. 如果新旧节点类型不同，直接卸载旧节点
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }

  // 2. 根据新节点的类型，调用不同的处理函数
  const { type, shapeFlag } = n2
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor)
      break
    case Comment:
      processCommentNode(n1, n2, container, anchor)
      break
    case Static:
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, isSVG)
      }
      break
    case Fragment:
      processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
      break
    default:
      // 处理组件或元素
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        ;(type as typeof TeleportImpl).process(...)
      }
  }
}
```

## 3. processElement 处理元素节点

```typescript
const processElement = (
  n1: VNode | null,
  n2: VNode,
  container: Element,
  anchor: Element | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  if (n1 == null) {
    // 挂载新元素
    mountElement(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  } else {
    // 更新已有元素
    patchElement(
      n1,
      n2,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  }
}
```

### 3.1 mountElement 挂载元素

```typescript
const mountElement = (
  vnode: VNode,
  container: Element,
  anchor: Element | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  let el: Element
  const { type, props, shapeFlag } = vnode
  
  // 1. 创建元素
  el = vnode.el = hostCreateElement(type, isSVG)
  
  // 2. 处理子节点
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 文本子节点
    hostSetElementText(el, vnode.children as string)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 数组子节点，递归处理
    mountChildren(
      vnode.children as VNode[],
      el,
      null,
      parentComponent,
      parentSuspense,
      isSVG && type !== 'foreignObject',
      optimized || !!vnode.dynamicChildren
    )
  }
  
  // 3. 处理属性
  if (props) {
    for (const key in props) {
      if (!isReservedProp(key)) {
        hostPatchProp(
          el,
          key,
          null,
          props[key],
          isSVG,
          vnode.children as VNode[],
          parentComponent,
          parentSuspense,
          unmountChildren
        )
      }
    }
  }
  
  // 4. 插入DOM
  hostInsert(el, container, anchor)
}
```

### 3.2 patchElement 更新元素

```typescript
const patchElement = (
  n1: VNode,
  n2: VNode,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  const el = (n2.el = n1.el!)
  const oldProps = n1.props || EMPTY_OBJ
  const newProps = n2.props || EMPTY_OBJ
  
  // 1. 更新子节点
  patchChildren(
    n1,
    n2,
    el,
    null,
    parentComponent,
    parentSuspense,
    isSVG
  )
  
  // 2. 更新属性
  patchProps(
    el,
    n2,
    oldProps,
    newProps,
    parentComponent,
    parentSuspense,
    isSVG
  )
}
```

## 4. processComponent 处理组件节点

```typescript
const processComponent = (
  n1: VNode | null,
  n2: VNode,
  container: Element,
  anchor: Element | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  if (n1 == null) {
    // 挂载组件
    mountComponent(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  } else {
    // 更新组件
    updateComponent(n1, n2, optimized)
  }
}
```

## 5. patchChildren 子节点更新策略

```typescript
const patchChildren = (
  n1: VNode,
  n2: VNode,
  container: Element,
  anchor: Element | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean = false
) => {
  const c1 = n1 && n1.children
  const prevShapeFlag = n1 ? n1.shapeFlag : 0
  const c2 = n2.children
  const { shapeFlag } = n2
  
  // 子节点有三种可能：文本、数组或无子节点
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 新子节点是文本
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 旧子节点是数组，需要卸载
      unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
    }
    if (c2 !== c1) {
      // 更新文本
      hostSetElementText(container, c2 as string)
    }
  } else {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 旧子节点是数组
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新子节点也是数组，需要diff
        patchKeyedChildren(
          c1 as VNode[],
          c2 as VNode[],
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        )
      } else {
        // 新子节点不是数组，卸载旧节点
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
      }
    } else {
      // 旧子节点是文本或无子节点
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 清除文本
        hostSetElementText(container, '')
      }
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 挂载新数组子节点
        mountChildren(
          c2 as VNode[],
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        )
      }
    }
  }
}
```

## 关键点总结

1. **渲染过程的核心是 patch 函数**：
   - 负责处理新旧节点的对比和更新
   - 根据节点类型调用不同的处理函数
   - 处理组件、元素、文本等不同类型的节点

2. **元素节点处理**：
   - mountElement：创建新元素，设置属性，处理子节点
   - patchElement：更新已有元素，对比属性和子节点

3. **组件节点处理**：
   - mountComponent：创建组件实例，设置状态，建立更新机制
   - updateComponent：触发组件更新，复用已有实例

4. **子节点更新策略**：
   - 处理文本、数组等不同类型的子节点
   - 使用高效的 diff 算法对比数组子节点
   - 优化更新性能

5. **DOM 操作的抽象**：
   - 所有 DOM 操作都通过 hostXXX 方法进行
   - 支持跨平台渲染
   - 便于测试和维护