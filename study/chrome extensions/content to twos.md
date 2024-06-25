要在Chrome扩展程序中实现content脚本向popup页面发送消息并接收响应，可以通过background脚本作为中介进行消息传递。以下是一个详细的示例：

### 1. manifest.json
确保在manifest.json文件中正确配置了所有的脚本。

```json
{
  "manifest_version": 3,
  "name": "Messaging Example",
  "version": "1.0",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### 2. popup.html
popup页面包含一个简单的div，用于显示从content脚本接收的消息。

```html
<!DOCTYPE html>
<html>
<head>
  <title>Popup</title>
  <script src="popup.js"></script>
</head>
<body>
  <div id="content-message">Waiting for message...</div>
</body>
</html>
```

### 3. popup.js
在popup.js中，添加监听来自background脚本的消息功能。

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "content-to-popup") {
    document.getElementById('content-message').innerText = request.message;
    sendResponse({ reply: "Message received by popup" });
  }
});
```

### 4. content.js
在content脚本中，向background脚本发送消息，请求其转发消息到popup页面。

```javascript
// 向background脚本发送消息
chrome.runtime.sendMessage({ type: "content-to-popup", message: "Hello from content script" }, response => {
  console.log(response.reply);
});
```

### 5. background.js
在background脚本中，监听content脚本的消息并转发到popup页面。

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "content-to-popup") {
    // 查找当前活动的选项卡并发送消息到popup页面
    chrome.runtime.sendMessage(request, sendResponse);
    return true;  // 表示将异步发送响应
  }
});
```

### 总结
这个示例展示了如何通过background脚本作为中介，实现content脚本向popup页面发送消息并接收响应的过程。content脚本发送消息到background脚本，background脚本再将消息转发到popup页面。popup页面处理消息并发送响应回content脚本。