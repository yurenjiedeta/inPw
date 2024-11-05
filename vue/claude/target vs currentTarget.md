JavaScript 的 DOM 事件中,`target` 和 `currentTarget` 属性的区别如下:

1. `target`:
   - `target` 属性表示触发事件的元素(事件源)。
   - 在事件冒泡过程中,`target` 永远指向触发事件的最内层元素,即事件的起点。

2. `currentTarget`:
   - `currentTarget` 属性表示当前正在处理事件的元素。
   - 在事件冒泡过程中,`currentTarget` 会随着事件冒泡而依次指向事件处理函数所绑定的元素。

例如:

```html
<div id="outer">
  <div id="inner">
    Click me
  </div>
</div>
```

```javascript
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');

outer.addEventListener('click', (event) => {
  console.log('target:', event.target.id); // 输出 "inner"
  console.log('currentTarget:', event.currentTarget.id); // 输出 "outer"
});

inner.addEventListener('click', (event) => {
  console.log('target:', event.target.id); // 输出 "inner"
  console.log('currentTarget:', event.currentTarget.id); // 输出 "inner"
});
```

在这个例子中:

- 当点击内层 `<div id="inner">` 时,`target` 指向 `"inner"`, `currentTarget` 指向 `"inner"`,因为事件处理函数是绑定在 `inner` 元素上。
- 当点击外层 `<div id="outer">` 时,`target` 指向 `"inner"`, `currentTarget` 指向 `"outer"`,因为事件冒泡到了 `outer` 元素上。

总之,`target` 属性始终指向触发事件的元素,而 `currentTarget` 属性则指向当前正在处理事件的元素。理解这两个属性的差异对于事件处理非常重要。