要在顶层页面中获取 iframe 内某个选中元素在整个页面中的坐标位置，可以遵循以下步骤：

1. **获取选中元素的相对坐标位置**：在 iframe 内获取选中元素相对于 iframe 的坐标位置。
2. **获取 iframe 的相对坐标位置**：在顶层页面中获取 iframe 相对于顶层页面的坐标位置。
3. **计算元素的绝对坐标位置**：将选中元素相对于 iframe 的坐标位置与 iframe 相对于顶层页面的坐标位置相加，即可得到选中元素在整个页面中的绝对坐标位置。

下面是实现这个过程的示例代码：

### 在 iframe 中的代码
首先，在 iframe 中获取选中元素相对于 iframe 的坐标位置，并将其传递给顶层页面。

```html
<!-- iframe 内部的 HTML 结构 -->
<!DOCTYPE html>
<html>
<head>
  <title>Iframe Content</title>
</head>
<body>
  <div id="selected-element">选中的元素</div>
  <script>
    // 获取选中元素
    var selectedElement = document.getElementById('selected-element');
    
    // 获取选中元素的相对于 iframe 的坐标位置
    var rect = selectedElement.getBoundingClientRect();
    var elementPosition = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
    
    // 将坐标位置发送给顶层页面
    window.parent.postMessage(elementPosition, '*');
  </script>
</body>
</html>
```

### 在顶层页面中的代码
然后，在顶层页面中接收 iframe 传递的坐标位置，并获取 iframe 相对于顶层页面的坐标位置，最后计算出选中元素的绝对坐标位置。

```html
<!DOCTYPE html>
<html>
<head>
  <title>Top Page</title>
</head>
<body>
  <iframe id="my-iframe" src="iframe.html"></iframe>
  <script>
    // 获取 iframe 元素
    var iframe = document.getElementById('my-iframe');
    
    // 监听来自 iframe 的消息
    window.addEventListener('message', function(event) {
      var iframeRect = iframe.getBoundingClientRect();
      var elementPosition = event.data;

      // 计算选中元素在顶层页面中的绝对坐标位置
      var absolutePosition = {
        top: iframeRect.top + elementPosition.top,
        left: iframeRect.left + elementPosition.left
      };

      // 输出绝对坐标位置
      console.log('选中元素的绝对坐标位置:', absolutePosition);
    });
  </script>
</body>
</html>
```

### 关键步骤解释

1. **获取选中元素的相对坐标位置**：在 iframe 内部，通过 `getBoundingClientRect` 方法获取选中元素相对于 iframe 的坐标位置，并加上 `window.scrollY` 和 `window.scrollX` 以考虑滚动偏移。
2. **发送坐标位置给顶层页面**：使用 `window.parent.postMessage` 将选中元素的相对坐标位置发送给顶层页面。
3. **获取 iframe 的相对坐标位置**：在顶层页面中，通过 `getBoundingClientRect` 方法获取 iframe 相对于顶层页面的坐标位置。
4. **计算绝对坐标位置**：将选中元素相对于 iframe 的坐标位置与 iframe 相对于顶层页面的坐标位置相加，即可得到选中元素在顶层页面中的绝对坐标位置。

这样，顶层页面就可以知道选中元素在整个页面中的具体位置。