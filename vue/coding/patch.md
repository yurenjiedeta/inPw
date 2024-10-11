`patch` 函数在 Vue.js 2.6.14 的源码中是一个关键部分，负责实现虚拟 DOM（VNode）的差异比对和实际 DOM 的更新。它通过比较旧的虚拟节点 (`oldVnode`) 和新的虚拟节点 (`vnode`)，高效地将必要的更改应用到真实 DOM 上，从而保持应用状态与视图的一致性。

以下是对 `patch` 函数的详细解释，包括代码段说明、示例说明以及各个 `if` 条件的触发情况。

---

## **`patch` 函数的总体目的**

`patch` 函数主要负责以下几项任务：

1. **初始渲染**：在没有现有 DOM 时创建并插入新的 DOM 元素。
2. **更新**：比较旧的和新的虚拟节点，确定需要的最小更改，并将这些更改应用到 DOM 中。
3. **水合（Hydration）**：将服务器渲染的 HTML 与客户端的 Vue 实例结合，使其成为可交互的应用。

---

## **函数分解与条件逻辑**

### **1. 处理新的 VNode (`vnode`) 为未定义的情况**

```javascript
if (isUndef(vnode)) {
  if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
  return
}
```

**解释：**

- **条件**：检查新的虚拟节点 `vnode` 是否未定义。
- **操作**：
  - 如果 `vnode` 未定义但 `oldVnode` 存在，则调用 `invokeDestroyHook` 销毁旧的虚拟节点。
  - 之后，函数提前返回，因为没有新的节点需要补丁。

**示例场景：**

- **卸载组件**：当一个组件被移除时，新的 VNode 可能为 `undefined`，此时会触发销毁现有的 VNode。

### **2. 初始化补丁相关的变量**

```javascript
var isInitialPatch = false;
var insertedVnodeQueue = [];
```

**解释：**

- **`isInitialPatch`**：标记是否为初始补丁（即初次挂载）。
- **`insertedVnodeQueue`**：一个队列，用于存储需要在补丁完成后调用 `inserted` 钩子的 VNode。

### **3. 处理初始挂载（没有旧的 VNode）**

```javascript
if (isUndef(oldVnode)) {
  // 空挂载（可能作为组件），创建新的根元素
  isInitialPatch = true;
  createElm(vnode, insertedVnodeQueue);
}
```

**解释：**

- **条件**：检查旧的虚拟节点 `oldVnode` 是否未定义。
- **操作**：
  - 如果没有 `oldVnode`，表示这是一次初始挂载，设置 `isInitialPatch` 为 `true`。
  - 调用 `createElm` 创建新的 DOM 元素，并将其插入到 `insertedVnodeQueue` 中。

**示例场景：**

- **挂载根 Vue 实例**：当实例化一个新的 Vue 实例并挂载到一个元素上时，没有现有的 VNode，此代码块负责初始的 DOM 创建。

### **4. 处理更新或挂载到已有的 DOM 元素**

```javascript
else {
  var isRealElement = isDef(oldVnode.nodeType);
  if (!isRealElement && sameVnode(oldVnode, vnode)) {
    // 补丁现有的根节点
    patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
  } else {
    // 处理挂载到真实 DOM 或替换元素
  }
}
```

**解释：**

- **`isRealElement`**：判断 `oldVnode` 是否为真实的 DOM 元素（通过检查 `nodeType`）。
- **条件1**：如果 `oldVnode` 不是一个真实的 DOM 元素，并且 `sameVnode(oldVnode, vnode)` 返回 `true`，则表示两者代表相同的元素，调用 `patchVnode` 对现有节点进行补丁更新。
- **条件2**：如果 `oldVnode` 是一个真实的 DOM 元素或 `sameVnode` 返回 `false`，则需要处理挂载到真实 DOM 或替换现有元素的情况。

**示例场景：**

- **更新现有组件**：当组件的 props 或 state 变化时，新的 VNode 与旧的 VNode 相同，此时通过 `patchVnode` 只更新变化的部分。
- **替换元素类型**：如果 VNode 类型发生变化（例如从 `<div>` 变为 `<span>`），需要完全替换现有的 DOM 元素。

### **5. 处理真实的 DOM 元素和水合**

```javascript
if (isRealElement) {
  // 挂载到真实元素
  // 检查是否为服务器渲染的内容，并判断是否可以成功水合
  if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
    oldVnode.removeAttribute(SSR_ATTR);
    hydrating = true;
  }
  if (isTrue(hydrating)) {
    if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
      invokeInsertHook(vnode, insertedVnodeQueue, true);
      return oldVnode
    } else {
      warn(
        '客户端渲染的虚拟 DOM 树与服务器渲染的内容不匹配。可能原因包括不正确的 HTML 标记，例如在 <p> 内嵌套块级元素，或缺少 <tbody>。放弃水合并执行完整的客户端渲染。'
      );
    }
  }
  // 如果不是服务器渲染，或水合失败，创建一个空节点并替换
  oldVnode = emptyNodeAt(oldVnode);
}
```

**解释：**

- **水合（Hydration）**：将服务器渲染的 HTML 与客户端的 Vue 实例结合，使其成为可交互的应用。
- **条件1**：检查真实的 DOM 元素是否具有 `SSR_ATTR` 属性，表示是服务器渲染的内容。
  - **操作**：移除 `SSR_ATTR` 属性，并设置 `hydrating` 为 `true`，准备进行水合。
- **条件2**：如果 `hydrating` 为 `true`，尝试调用 `hydrate` 进行水合。
  - **成功**：调用 `invokeInsertHook`，并返回旧的 DOM 元素。
  - **失败**：发出警告，并执行完整的客户端渲染，将现有 DOM 替换。
- **后备处理**：如果不是服务器渲染或水合失败，调用 `emptyNodeAt` 创建一个空的 VNode，以便后续替换。

**示例场景：**

- **服务器端渲染（SSR）**：当应用由服务器渲染并发送到客户端时，客户端需要通过 `hydrate` 将现有的 HTML 与 Vue 实例结合，避免重新创建整个 DOM。

### **6. 替换现有元素**

```javascript
// 替换现有元素
var oldElm = oldVnode.elm;
var parentElm = nodeOps.parentNode(oldElm);

// 创建新节点
createElm(
  vnode,
  insertedVnodeQueue,
  // 极其罕见的边缘情况：如果旧元素正在进行离场过渡，则不插入新元素。
  oldElm._leaveCb ? null : parentElm,
  nodeOps.nextSibling(oldElm)
);
```

**解释：**

- **操作**：
  - 获取旧的 DOM 元素 `oldElm` 及其父元素 `parentElm`。
  - 调用 `createElm` 创建新的 DOM 元素，并将其插入到 `parentElm` 中，位置在 `oldElm` 的下一个兄弟节点之前。
  - 如果旧元素正在进行离场过渡（即 `oldElm._leaveCb` 存在），则不立即插入新元素，避免冲突。

**示例场景：**

- **元素类型变化**：当组件的根元素从 `<div>` 变为 `<span>` 时，旧的 `<div>` 会被新的 `<span>` 替换。

### **7. 递归更新父占位节点元素**

```javascript
// 递归更新父占位节点元素
if (isDef(vnode.parent)) {
  var ancestor = vnode.parent;
  var patchable = isPatchable(vnode);
  while (ancestor) {
    for (var i = 0; i < cbs.destroy.length; ++i) {
      cbs.destroy[i](ancestor);
    }
    ancestor.elm = vnode.elm;
    if (patchable) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, ancestor);
      }
      // 调用可能已由 create 钩子合并的插入钩子
      var insert = ancestor.data.hook.insert;
      if (insert.merged) {
        // 从索引 1 开始，避免重新调用组件挂载钩子
        for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
          insert.fns[i$2]();
        }
      }
    } else {
      registerRef(ancestor);
    }
    ancestor = ancestor.parent;
  }
}
```

**解释：**

- **条件**：检查新的 VNode 是否有父节点。
- **操作**：
  - 遍历所有的祖先 VNode。
  - 调用销毁钩子 `cbs.destroy` 来销毁每个祖先节点。
  - 将每个祖先的 `elm` 更新为新的 VNode 的 DOM 元素。
  - 如果 VNode 是可补丁的，调用创建钩子 `cbs.create`，并处理可能由创建钩子合并的插入钩子（如指令的 `inserted` 钩子）。
  - 如果不可补丁，注册引用 `registerRef`。
  - 继续遍历上一级祖先。

**示例场景：**

- **嵌套组件更新**：在更新嵌套组件时，确保所有父组件正确引用新的 DOM 元素，并适当地调用它们的生命周期钩子。

### **8. 销毁旧节点**

```javascript
// 销毁旧节点
if (isDef(parentElm)) {
  removeVnodes([oldVnode], 0, 0);
} else if (isDef(oldVnode.tag)) {
  invokeDestroyHook(oldVnode);
}
```

**解释：**

- **条件1**：如果旧的 VNode 有父元素，则调用 `removeVnodes` 从 DOM 中移除旧节点。
- **条件2**：如果没有父元素但旧的 VNode 有标签（表示它是一个组件或元素），则直接调用销毁钩子 `invokeDestroyHook`。

**示例场景：**

- **组件卸载**：当组件被移除时，确保相应的 DOM 元素被删除，并调用必要的清理钩子。

### **9. 调用插入钩子并完成补丁**

```javascript
invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
return vnode.elm
```

**解释：**

- **操作**：在补丁或挂载完成后，调用所有在 `insertedVnodeQueue` 中排队的 `insert` 钩子。如果是初始补丁，传递 `isInitialPatch` 以处理任何特殊的初始插入逻辑。
- **返回**：返回新的 VNode 关联的 DOM 元素 `vnode.elm`。

**示例场景：**

- **挂载后操作**：例如，初始化第三方库或执行需要在元素插入 DOM 后进行的操作，可以通过 `insert` 钩子实现。

---

## **`if` 条件的总结及其触发场景**

1. **`if (isUndef(vnode))`**
   - **何时进入**：当新的 VNode 为 `undefined` 时。
   - **操作**：如果存在旧的 VNode，则销毁它并提前返回。

2. **`if (isUndef(oldVnode))`**
   - **何时进入**：当没有旧的 VNode（即初始挂载）。
   - **操作**：创建新的 DOM 元素。

3. **`if (!isRealElement && sameVnode(oldVnode, vnode))`**
   - **何时进入**：当旧的和新的 VNode 都是虚拟节点，并且代表相同的元素时。
   - **操作**：调用 `patchVnode` 更新现有的 DOM 节点。

4. **`if (isRealElement)`**
   - **何时进入**：当旧的 VNode 是一个真实的 DOM 元素（非虚拟节点）。
   - **操作**：处理水合或替换现有的 DOM 元素。

5. **`if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR))`**
   - **何时进入**：当旧的 DOM 元素具有 `SSR_ATTR` 属性，表示是服务器渲染的内容。
   - **操作**：准备进行水合，移除 `SSR_ATTR` 并设置 `hydrating` 标志。

6. **`if (isTrue(hydrating))`**
   - **何时进入**：当水合是可能的（服务器渲染的内容）。
   - **操作**：尝试进行水合；如果失败，发出警告并执行完整的客户端渲染。

7. **`if (isDef(vnode.parent))`**
   - **何时进入**：当新的 VNode 有父节点时。
   - **操作**：递归更新所有祖先 VNode，调用销毁和创建钩子，并处理插入钩子。

8. **`if (isDef(parentElm))`**
   - **何时进入**：当旧的 VNode 有父元素在 DOM 中。
   - **操作**：从 DOM 中移除旧的 VNode。

9. **`else if (isDef(oldVnode.tag))`**
   - **何时进入**：当旧的 VNode 没有父元素但有标签（表示是组件或元素）。
   - **操作**：直接调用销毁钩子销毁旧的 VNode。

---

## **实际示例**

假设有一个简单的 Vue 应用，其中一个组件在显示和隐藏一个 `<div>` 元素之间切换。

### **初始挂载**

```vue
<template>
  <div v-if="isVisible">Hello, World!</div>
</template>

<script>
export default {
  data() {
    return { isVisible: true };
  }
}
</script>
```

**初始 `patch` 执行：**

- `oldVnode` 为 `undefined`（没有现有的 DOM）。
- `vnode` 代表包含 "Hello, World!" 的 `<div>`。
- 进入 `if (isUndef(oldVnode))`，调用 `createElm` 创建并插入 `<div>` 到 DOM 中。

### **更新 DOM（切换可见性）**

```javascript
// 用户将 `isVisible` 设置为 `false`
this.isVisible = false;
```

**后续 `patch` 执行：**

- `oldVnode` 代表现有的 `<div>`。
- `vnode` 现在为 `undefined`，因为 `v-if="false"`。
- 进入 `if (isUndef(vnode))`，调用销毁钩子并从 DOM 中移除 `<div>`。

### **替换元素类型**

假设组件修改为在 `isVisible` 为 `true` 时渲染一个 `<span>` 而不是 `<div>`。

```vue
<template>
  <span v-if="isVisible">Hello, World!</span>
</template>
```

**`patch` 执行：**

- `oldVnode` 代表 `<div>`。
- `vnode` 现在代表 `<span>`。
- `sameVnode(oldVnode, vnode)` 返回 `false`，因为标签类型不同。
- 进入 `else` 块，调用 `createElm` 创建新的 `<span>`，并移除旧的 `<div>`。

---

## **总结**

`patch` 函数在 Vue.js 2.6.14 中通过智能地比较和协调虚拟节点，有效地更新真实 DOM。每个 `if` 条件处理特定的场景，如初始挂载、更新现有元素、水合服务器渲染内容以及管理生命周期钩子。理解这些条件及其触发情况，对于调试和优化 Vue 应用至关重要。