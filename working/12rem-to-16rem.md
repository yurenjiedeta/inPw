要将 HTML 中 `font-size` 为 `12px` 的 CSS 代码转换为 `16px` 的 CSS 代码，你可以编写一个 JavaScript 函数来解析并转换 CSS 文件中的 `rem` 单位值。以下是一个示例函数，它将 `12px` 基准的 `rem` 值转换为 `16px` 基准的 `rem` 值：

```javascript
function convertRemFrom12pxTo16px(cssText) {
    // 基于 12px 基准计算 rem 值
    const base12px = 12;
    // 基于 16px 基准计算 rem 值
    const base16px = 16;
    const conversionFactor = base16px / base12px;

    // 使用正则表达式查找 rem 值
    const remRegex = /([\d.]+)rem/g;

    // 替换函数
    return cssText.replace(remRegex, (match, remValue) => {
        // 将 rem 值转换为基于 16px 的 rem 值
        const newRemValue = parseFloat(remValue) * conversionFactor;
        return `${newRemValue}rem`;
    });
}

// 示例用法
const originalCSS = `
    .example {
        font-size: 1rem; /* 12px 基准 */
        margin: 0.5rem;  /* 12px 基准 */
        padding: 2rem;   /* 12px 基准 */
    }
`;

const convertedCSS = convertRemFrom12pxTo16px(originalCSS);
console.log(convertedCSS);
```

### 说明：
- **base12px**：原始基准（12px）。
- **base16px**：目标基准（16px）。
- **conversionFactor**：从 12px 转换到 16px 的比例。
- **remRegex**：匹配 `rem` 值的正则表达式。
- **replace**：使用正则表达式查找所有 `rem` 值并转换它们。

#### 输出
这个函数会将原始基于 `12px` 的 `rem` 值转换为基于 `16px` 的 `rem` 值。

### 示例输出
原始 CSS:
```css
.example {
    font-size: 1rem; /* 12px 基准 */
    margin: 0.5rem;  /* 12px 基准 */
    padding: 2rem;   /* 12px 基准 */
}
```
转换后的 CSS:
```css
.example {
    font-size: 1.3333333333333333rem; /* 16px 基准 */
    margin: 0.6666666666666666rem;  /* 16px 基准 */
    padding: 2.6666666666666665rem;   /* 16px 基准 */
}
```

这样你就可以将基于 `12px` 的 `rem` 单位转换为基于 `16px` 的 `rem` 单位。