在 Vue 2.6.14 的源码中，`getStyle` 函数的主要作用是**合并和获取一个虚拟节点（vnode）及其相关组件（子组件和父组件）的所有样式**。它确保静态样式和动态样式能够正确地组合在一起，并且父组件的样式可以覆盖子组件的样式，从而实现样式的层级管理和优先级控制。

### 代码段说明

```javascript
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}
```

1. **初始化**：
   - `res`：用于存储最终合并后的样式对象。
   - `styleData`：临时变量，用于存储当前处理的样式数据。

2. **处理子组件样式（可选）**：
   - 如果 `checkChild` 为 `true`，函数会遍历当前 vnode 的所有子组件（通过 `componentInstance`），并将每个子组件的样式数据合并到 `res` 中。
   - 使用 `normalizeStyleData` 函数规范化样式数据，确保静态样式和动态样式都被正确处理。

3. **处理当前 vnode 的样式**：
   - 规范化当前 vnode 的样式数据，并将其合并到 `res` 中。

4. **处理父组件样式**：
   - 遍历当前 vnode 的所有父节点（通过 `parent`），将每个父节点的样式数据合并到 `res` 中。
   - 这样做确保父组件的样式可以覆盖子组件和当前 vnode 的样式，实现样式的优先级控制。

5. **返回合并后的样式对象**：
   - 最终，`res` 包含了所有相关组件的样式数据，按照从子到父的顺序合并，确保样式的正确应用。

### 示例说明

假设有如下组件结构：

- **父组件** `ParentComponent`：
  - 静态样式：`{ color: 'blue', fontSize: '14px' }`
  
- **子组件** `ChildComponent`：
  - 静态样式：`{ color: 'red', margin: '10px' }`
  - 动态样式（绑定）：`{ padding: '5px' }`

当我们调用 `getStyle` 函数来获取 `ChildComponent` 的最终样式时，过程如下：

1. **处理子组件样式**（假设 `checkChild` 为 `false`，则跳过此步）。
2. **处理当前 vnode（ChildComponent）的样式**：
   - 静态样式：`{ color: 'red', margin: '10px' }`
   - 动态样式：`{ padding: '5px' }`
   - 合并后：`{ color: 'red', margin: '10px', padding: '5px' }`
3. **处理父组件样式**：
   - 静态样式：`{ color: 'blue', fontSize: '14px' }`
   - 合并后：`{ color: 'blue', margin: '10px', padding: '5px', fontSize: '14px' }`

**最终结果**：
```javascript
{
  color: 'blue',      // 父组件的 color 覆盖了子组件的 color
  margin: '10px',
  padding: '5px',
  fontSize: '14px'
}
```

在这个例子中，`getStyle` 函数确保了父组件的 `color: 'blue'` 覆盖了子组件的 `color: 'red'`，同时保留了子组件的其他样式属性。这种样式合并机制使得开发者可以灵活地控制组件的样式优先级和继承关系。