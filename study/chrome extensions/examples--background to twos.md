在Chrome扩展程序开发中，可以通过消息传递在不同部分（例如，background脚本、content脚本和popup页面）之间进行通信。下面是一个示例，展示如何从background脚本发送消息到popup和content脚本。

### 1. manifest.json
首先，确保在你的manifest.json文件中正确配置了所有的脚本。

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

### 2. background.js
在background脚本中，使用chrome.runtime.sendMessage发送消息。

```javascript
// 发送消息到popup
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.sendMessage({ type: "background-to-popup", message: "Hello from background" });
});

// 发送消息到content脚本
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        chrome.runtime.sendMessage({ type: "background-to-content", message: "Hello from background" });
      }
    });
  });
});
```

### 3. popup.html
popup页面需要包含一个脚本来监听来自background脚本的消息。

```html
<!DOCTYPE html>
<html>
<head>
  <title>Popup</title>
  <script src="popup.js"></script>
</head>
<body>
  <div id="message"></div>
</body>
</html>
```

### 4. popup.js
在popup.js中，监听来自background脚本的消息。

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "background-to-popup") {
    document.getElementById('message').innerText = request.message;
  }
});
```

### 5. content.js
content脚本也需要监听来自background脚本的消息。

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "background-to-content") {
    console.log(request.message);
  }
});
```

### 总结
以上示例展示了如何通过Chrome扩展程序的消息传递机制，在background脚本中发送消息到popup页面和content脚本。这些代码片段需要分别放置在对应的文件中，并且确保manifest.json正确配置了这些脚本文件。