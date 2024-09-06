要使用 jQuery 取消整个 HTML 页面上所有元素的所有事件绑定，你可以使用以下函数：

```javascript
function unbindAllEvents() {
    $('*').off(); // 取消绑定页面中所有元素的所有事件
}
```

### 解释：
- `$(' * ')`: 选择整个页面的所有元素。
- `.off()`: 取消选定元素的所有事件处理程序。

### 使用示例：
假设你在页面上绑定了一些事件，现在你想取消它们，只需调用 `unbindAllEvents()`：

```javascript
$(document).ready(function() {
    // 示例事件绑定
    $('#myButton').on('click', function() {
        console.log('Button clicked');
    });

    $('#myDiv').on('mouseenter', function() {
        console.log('Mouse entered div');
    });

    // 取消所有事件绑定
    unbindAllEvents();
});
```

调用 `unbindAllEvents()` 后，页面中的所有事件处理程序都会被移除。