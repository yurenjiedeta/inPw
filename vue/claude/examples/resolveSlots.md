在 Vue.js 2.6.14 的源代码中,`resolveSlots` 函数负责处理 `children` 节点,并根据节点 `data` 中的 `slot` 属性将它们组织成 `slots` 对象。

典型的对应 `resolveSlots` 函数的 HTML 模板如下:

```html
<div>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
    <slot name="content"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

在这个模板中,有三个命名槽 (`header`、`content` 和 `footer`) 和一个默认槽。`resolveSlots` 函数会根据 `slot` 属性将 `children` 节点组织到 `slots` 对象中。

例如,如果 `children` 数组包含以下节点:

```javascript
[
  { tag: 'h1', slot: 'header', children: ['Header Content'] },
  { tag: 'p', children: ['Main Content'] },
  { tag: 'div', slot: 'content', children: ['Additional Content'] },
  { tag: 'p', slot: 'footer', children: ['Footer Content'] }
]
```

`resolveSlots` 函数会产生以下 `slots` 对象:

```javascript
{
  header: [{ tag: 'h1', slot: 'header', children: ['Header Content'] }],
  content: [{ tag: 'div', slot: 'content', children: ['Additional Content'] }],
  footer: [{ tag: 'p', slot: 'footer', children: ['Footer Content'] }],
  default: [{ tag: 'p', children: ['Main Content'] }]
}
```

这个 `slots` 对象将被 Vue.js 渲染过程使用,以正确渲染内容到相应的槽中。