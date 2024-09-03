要让一个已经存在于 HTML 中的 `<script>` 标签重新加载并执行一次，可以通过以下几种方式来实现：

### 方法一：克隆并重新插入 `<script>` 标签
你可以克隆现有的 `<script>` 标签，然后将其重新插入到文档中。这会导致浏览器重新执行脚本。

```javascript
// 获取现有的 script 标签
var scriptElement = document.querySelector('script#my-script');

// 克隆该 script 标签
var newScriptElement = scriptElement.cloneNode(true);

// 移除旧的 script 标签
scriptElement.parentNode.removeChild(scriptElement);

// 重新插入新的 script 标签
document.body.appendChild(newScriptElement);
```

### 方法二：通过创建新 `<script>` 标签来重新加载
你可以创建一个新的 `<script>` 标签，并将旧的脚本内容或脚本 URL 设置到新的标签中，然后插入文档中以执行。

#### 如果脚本是内联的：
```javascript
// 获取现有的 script 标签内容
var scriptContent = document.querySelector('script#my-script').innerHTML;

// 创建新的 script 标签
var newScriptElement = document.createElement('script');
newScriptElement.text = scriptContent;

// 插入新的 script 标签到文档中
document.body.appendChild(newScriptElement);
```

#### 如果脚本是外部引用的：
```javascript
// 获取现有的 script 标签的 src 属性
var scriptSrc = document.querySelector('script#my-script').src;

// 创建新的 script 标签
var newScriptElement = document.createElement('script');
newScriptElement.src = scriptSrc;

// 插入新的 script 标签到文档中
document.body.appendChild(newScriptElement);
```

### 方法三：使用 `eval()` 执行内联脚本（不推荐）
对于内联脚本，可以使用 `eval()` 来重新执行脚本内容，但通常不推荐使用 `eval()`，因为它存在安全性和性能问题。

```javascript
// 获取现有的 script 标签内容并执行
var scriptContent = document.querySelector('script#my-script').innerHTML;
eval(scriptContent);
```

### 示例：
假设你有以下 HTML 结构：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reload Script Example</title>
</head>
<body>

<script id="my-script">
    console.log("Script executed!");
</script>

<script>
    // 克隆并重新插入 script 标签
    var scriptElement = document.querySelector('script#my-script');
    var newScriptElement = scriptElement.cloneNode(true);
    scriptElement.parentNode.removeChild(scriptElement);
    document.body.appendChild(newScriptElement);
</script>

</body>
</html>
```

在这个示例中，页面加载后会执行 `console.log("Script executed!");`。然后，脚本会被重新插入并再次执行，导致控制台中会看到两次输出。

### 总结
为了让一个已有的 `<script>` 标签重新加载执行一次，最简单的方法是克隆该元素并重新插入到文档中，或者创建一个新的 `<script>` 标签来加载脚本。这些方法可以确保脚本在页面上重新执行。