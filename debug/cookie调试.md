1、浏览器启用开发者选项；

2、修改点：

```javascript
 const originalDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
                             console.log(11111111113344);

  Object.defineProperty(document, 'cookie', {
    set: function(value) {
      debugger; // 当设置 cookie 时，程序会在这里暂停
      originalDescriptor.set.call(this, value);
    },
    get: originalDescriptor.get
  });
```

3、安装插件：

https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld

