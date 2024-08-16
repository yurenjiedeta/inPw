在HTML中，动态设置整个网页的字号比例通常是通过调整`<html>`元素的`font-size`来实现的。这个方法通常结合CSS的`rem`单位使用，因为`rem`是基于根元素的`font-size`计算的。

### 方法一：使用JavaScript动态设置
你可以使用JavaScript根据窗口的宽度、用户的选择或者其他条件来动态调整根元素的`font-size`。

#### 示例代码
以下是一个简单的JavaScript示例，根据浏览器窗口的宽度动态调整`<html>`元素的`font-size`，从而调整整个页面的字号比例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html {
      font-size: 16px; /* 默认的字体大小 */
    }

    body {
      font-family: Arial, sans-serif;
    }

    h1 {
      font-size: 2rem; /* 2 * 根元素的font-size */
    }

    p {
      font-size: 1rem; /* 1 * 根元素的font-size */
    }
  </style>
  <script>
    function setFontSize() {
      var baseSize = 16; // 基础大小
      var windowWidth = window.innerWidth;
      
      // 你可以根据需求调整这个公式
      var newSize = baseSize * (windowWidth / 1440); // 1440是参考宽度
      document.documentElement.style.fontSize = newSize + 'px';
    }

    window.addEventListener('resize', setFontSize);
    window.addEventListener('DOMContentLoaded', setFontSize);
  </script>
</head>
<body>
  <h1>标题</h1>
  <p>这是一个段落文字。</p>
</body>
</html>
```

### 方法二：使用CSS媒体查询设置
你也可以使用CSS媒体查询，根据屏幕大小调整根元素的`font-size`。

#### 示例代码
```css
html {
  font-size: 16px; /* 默认的字体大小 */
}

@media (max-width: 1200px) {
  html {
    font-size: 14px; /* 适应较小的屏幕 */
  }
}

@media (max-width: 768px) {
  html {
    font-size: 12px; /* 适应更小的屏幕 */
  }
}
```

这种方法不需要JavaScript，但无法实时动态调整。

### 方法三：结合CSS变量
你可以将根元素的`font-size`设置为CSS变量，然后动态调整该变量。

#### 示例代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      --base-font-size: 16px;
    }

    html {
      font-size: var(--base-font-size);
    }

    body {
      font-family: Arial, sans-serif;
    }

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  </style>
  <script>
    function updateFontSize(size) {
      document.documentElement.style.setProperty('--base-font-size', size + 'px');
    }
  </script>
</head>
<body>
  <h1>标题</h1>
  <p>这是一个段落文字。</p>
  <button onclick="updateFontSize(18)">增加字号</button>
  <button onclick="updateFontSize(14)">减少字号</button>
</body>
</html>
```

在这个示例中，点击按钮可以动态调整整个网页的字号比例。