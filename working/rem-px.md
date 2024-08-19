要获取并转换 CSS 文件中的 `rem` 单位为 `px` 单位，你可以使用以下步骤：

1. **读取 CSS 文件的内容**：这通常需要通过 JavaScript 来获取。

2. **查找并转换 `rem` 单位**：使用正则表达式查找所有包含 `rem` 的值，然后根据根元素的 `font-size` 将其转换为 `px`。

3. **生成新的 CSS 文件或样式字符串**：将转换后的 `px` 值插入回 CSS 样式中。

下面是一个示例代码，它展示了如何使用 JavaScript 来读取并转换 CSS 文件中的 `rem` 为 `px`：

```javascript
function convertRemToPxInCss(cssText) {
    // 获取根元素的 font-size
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    // 正则表达式查找所有 rem 值
    const remRegex = /([\d.]+)rem/g;

    // 替换 rem 为 px
    const newCssText = cssText.replace(remRegex, (match, remValue) => {
        const pxValue = remValue * rootFontSize;
        return `${pxValue}px`;
    });

    return newCssText;
}

// 示例：假设我们已经通过 fetch 获取了 CSS 文件内容
const cssText = `
    body {
        margin: 2rem;
    }
    .container {
        padding: 1.5rem;
    }
`;

const pxCssText = convertRemToPxInCss(cssText);
console.log(pxCssText);
```

### 步骤详解：

1. **获取 CSS 内容**：
    - 如果 CSS 文件在同一域名下，可以使用 `fetch` 请求来获取文件内容：
    ```javascript
    fetch('style.css')
        .then(response => response.text())
        .then(cssText => {
            const pxCssText = convertRemToPxInCss(cssText);
            console.log(pxCssText);
        });
    ```

2. **转换逻辑**：
    
- 该逻辑利用正则表达式找到所有以 `rem` 为单位的样式属性，并将其值乘以根元素的字体大小 (`rootFontSize`) 来计算对应的 `px` 值。
    
3. **应用或保存新的 CSS**：
    - 你可以将转换后的 CSS 内容写回到 `<style>` 标签中，或者动态创建一个新的样式表。

    ```javascript
    const styleElement = document.createElement('style');
    styleElement.textContent = pxCssText;
    document.head.appendChild(styleElement);
    ```

### Relevant Docs

* [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)