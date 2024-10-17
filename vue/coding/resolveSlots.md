在 Vue 2.6.14 的源码中，`resolveSlots` 函数的主要作用是将组件的子节点（`children`）根据它们的 `slot` 属性分配到相应的插槽（slots）中。这使得开发者可以在使用组件时，通过具名插槽（named slots）或默认插槽（default slot）来组织和渲染内容。

### 函数作用详解

1. **初始化**：
   - 如果没有子节点或子节点数组为空，直接返回一个空对象。
   - 创建一个空的 `slots` 对象，用于存储不同名称的插槽内容。

2. **遍历子节点**：
   - 遍历每一个子节点，检查其是否有 `slot` 属性。
   - 如果子节点的上下文（`context`）与当前上下文匹配，并且有指定的 `slot` 名称，则将该子节点分配到对应的插槽中。
   - 如果子节点是 `<template>` 标签，则将其内部的子节点展开后添加到插槽中。
   - 如果没有指定 `slot` 名称，则将该子节点归入默认插槽（`default`）。

3. **过滤空白插槽**：
   - 遍历所有收集到的插槽，如果某个插槽内的所有内容仅为空白字符，则删除该插槽。

4. **返回结果**：
   - 返回整理好的 `slots` 对象，其中包含按名称分类的插槽内容。

### 示例

假设我们有以下组件使用方式：

```vue
<my-component>
  <div slot="header">Header Content</div>
  <template slot="footer">
    <span>Footer Part 1</span>
    <span>Footer Part 2</span>
  </template>
  <p>Default Content</p>
</my-component>
```

对应的 `children` 数据结构可以模拟如下：

```javascript
const children = [
  {
    tag: 'div',
    data: {
      attrs: { slot: 'header' },
      slot: 'header'
    },
    children: [{ /* Header VNode */ }],
    context: currentContext
  },
  {
    tag: 'template',
    data: {
      attrs: { slot: 'footer' },
      slot: 'footer'
    },
    children: [
      { tag: 'span', children: ['Footer Part 1'], context: currentContext },
      { tag: 'span', children: ['Footer Part 2'], context: currentContext }
    ],
    context: currentContext
  },
  {
    tag: 'p',
    data: {},
    children: ['Default Content'],
    context: currentContext
  }
];
```

调用 `resolveSlots(children, currentContext)` 后，返回的 `slots` 对象将会是：

```javascript
{
  header: [
    {
      tag: 'div',
      data: { /* attrs 已被删除 */ },
      children: [{ /* Header VNode */ }],
      context: currentContext
    }
  ],
  footer: [
    { tag: 'span', children: ['Footer Part 1'], context: currentContext },
    { tag: 'span', children: ['Footer Part 2'], context: currentContext }
  ],
  default: [
    {
      tag: 'p',
      data: {},
      children: ['Default Content'],
      context: currentContext
    }
  ]
}
```

### 解释

- **header 插槽**：包含一个 `<div>` 元素，原本带有 `slot="header"` 属性，但在函数内部该属性已被删除。
- **footer 插槽**：由于是 `<template>` 标签，函数会将其内部的两个 `<span>` 元素展开后分别添加到 `footer` 插槽中。
- **default 插槽**：包含一个 `<p>` 元素，因为它没有指定 `slot` 名称，因此归入默认插槽。

通过这种方式，`resolveSlots` 函数有效地将不同的子节点按照插槽名称分类，方便组件在渲染时正确显示各个插槽的内容。