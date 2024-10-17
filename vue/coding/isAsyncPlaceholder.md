在 Vue 2.6.14 的源码中，`isAsyncPlaceholder` 函数的作用是**判断一个节点是否为异步组件的占位符**。Vue 在处理异步组件时，如果组件还没有被加载完成，Vue 会渲染一个占位符节点，通常是一个注释节点，直到异步组件加载完成并替换为实际组件。这个函数通过检查节点是否为注释节点（`isComment`）并且是否有异步工厂函数（`asyncFactory`）来确定该节点是否是异步组件的占位符。

### 函数解释：
```js
function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory;
}
```

- `node.isComment`：用于检查该节点是否是一个注释节点。
- `node.asyncFactory`：检查该节点是否包含异步组件的工厂函数。Vue 的异步组件在被加载之前，`asyncFactory` 会保存异步加载组件的逻辑。

只有当一个节点同时满足以上两个条件时，才可以认为它是一个异步组件的占位符节点。

### Mock 数据运行示例

假设我们有以下节点数据：

```js
const asyncPlaceholderNode = {
  isComment: true,      // 是注释节点
  asyncFactory: () => {  // 异步组件工厂函数
    return Promise.resolve({ /* 组件定义 */ });
  }
};

const normalNode = {
  isComment: false,     // 不是注释节点
  asyncFactory: null    // 没有异步组件工厂函数
};
```

使用 `isAsyncPlaceholder` 函数对这两个节点进行判断：

```js
console.log(isAsyncPlaceholder(asyncPlaceholderNode)); // true
console.log(isAsyncPlaceholder(normalNode));           // false
```

### 结论：
- 对于 `asyncPlaceholderNode`，它是一个异步组件的占位符，因为它既是注释节点又有异步工厂函数，所以函数返回 `true`。
- 对于 `normalNode`，它不是异步组件占位符，所以函数返回 `false`。

### 总结：
`isAsyncPlaceholder` 函数的主要目的是在异步组件加载过程中，检测节点是否为一个异步组件的占位符节点，以便在组件加载完成后正确地替换成实际组件。