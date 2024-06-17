当iframe加载一个不同于父文档的域时，浏览器的同源策略会阻止它们之间直接的DOM交互。但是，可以通过以下方法实现跨域通信：

1.window.postMessage()方法：这是一个安全的跨文档消息传递API，可以向包含iframe的页面发送消息，反之亦然。

父文档向iframe发送消息的示例代码：

```javascript
var iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({ message: 'hello' }, '*');
```

iframe向父文档发送消息的示例代码：

```javascript
window.parent.postMessage({ message: 'hello' }, '*');
```

在父文档中监听消息的示例代码：

```javascript
window.addEventListener('message', function(event) {
  if (event.origin !== 'http://example.org') return; // 可选：检查消息来源
  console.log('Received message:', event.data);
}, false);
```

2.通过设置document.domain：如果两个域共享同一个顶级域，可以通过设置document.domain来允许它们之间的DOM交互。

在设置了相同document.domain的情况下，父文档可以访问iframe中的属性和方法，反之亦然。例如，如果两个文档都设置document.domain = 'example.com'，则它们可以交互。

在两个文档中设置document.domain的示例代码：

```javascript
// 在父文档中
document.domain = 'example.com';

// 在iframe中
document.domain = 'example.com';
```

注意：document.domain的设置有一定的安全风险，因为它允许两个通常完全隔离的网站共享同一个cookies。在设置时要确保两个域真的是需要共享数据的，并且了解这可能带来的安全隐患。