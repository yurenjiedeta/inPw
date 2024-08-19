当然，可以通过Chrome扩展程序的消息传递机制，在popup页面和content脚本之间发送和接收消息。下面是一个详细的示例。

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
popup页面包含一个简单的表单，用于发送消息。

```html
<!DOCTYPE html>
<html>
<head>
  <title>Popup</title>
  <script src="popup.js"></script>
</head>
<body>
  <input type="text" id="message" placeholder="Type a message"/>
  <button id="send">Send to Content Script</button>
  <div id="response"></div>
</body>
</html>
```

### 3. popup.js
在popup.js中，添加发送消息到content脚本的功能，并接收来自content脚本的响应。

```javascript
document.getElementById('send').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "popup-to-content", message: message }, (response) => {
      document.getElementById('response').innerText = response.reply;
    });
  });
});
```

### 4. content.js
在content脚本中，监听来自popup页面的消息，并发送响应。

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "popup-to-content") {
    console.log("Message from popup:", request.message);
    sendResponse({ reply: "Message received by content script" });
  }
});
```

### 5. background.js
在这个示例中，不需要修改background.js，除非你需要在background脚本中处理其他逻辑。可以保持background.js为空或包含最小的初始化逻辑。

```javascript
// background.js content (if needed)
```

### 总结
这个示例展示了如何通过Chrome扩展程序的消息传递机制，在popup页面和content脚本之间发送和接收消息。用户在popup页面中输入消息并点击按钮后，消息会发送到当前活动的选项卡中的content脚本，并且content脚本会返回响应，显示在popup页面中。