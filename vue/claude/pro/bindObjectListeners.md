对于这个模板：
```html
<button v-on="{ 
  click: onClick,
  mouseover: onMouseover 
}">
</button>
```

`bindObjectListeners`函数的实参会是:
- `data`: 一个包含事件监听器信息的对象,最初可能是 `{ on: {} }`
- `value`: 就是模板中的对象字面量 `{ click: onClick, mouseover: onMouseover }`

执行后,`data.on` 会变成 `{ click: onClick, mouseover: onMouseover }`

假设组件已经有了一个点击事件处理器：

```html
<button 
  @click="oldHandler"
  v-on="{ 
    click: newHandler,
    mouseover: onMouseover 
  }">
</button>
```

这种情况下：
- `data` 初始状态是 `{ on: { click: oldHandler } }`
- `value` 是 `{ click: newHandler, mouseover: onMouseover }`

处理后 `data.on` 变为:
```js
{
  click: [oldHandler, newHandler],
  mouseover: onMouseover
}
```