你可以使用JavaScript编写一个函数，将 CSS 样式文本中 `rem` 单位的值从基于 `html` 的 `font-size: 10vw` 转换为基于 `html` 的 `font-size: 16px`。以下是一个实现此功能的示例：

### JavaScript 实现

```javascript
function convertRemToPx(cssText) {
    // 获取当前的html font-size（10vw）
    const vwFontSize = window.innerWidth * 0.1; // 10vw对应的px值
    const targetFontSize = 16; // 目标font-size：16px

    // 创建一个正则表达式，匹配所有的rem值
    const remRegex = /(\d*\.?\d+)rem/g;

    // 替换cssText中的rem值
    const convertedCssText = cssText.replace(remRegex, (match, remValue) => {
        // 将rem值从10vw转换为16px基准
        const pxValue = (parseFloat(remValue) * vwFontSize * targetFontSize) / vwFontSize;
        return `${pxValue}px`;
    });

    return convertedCssText;
}

// 示例使用
const originalCssText = `
    body {
        font-size: 1rem;
        margin: 2rem;
    }
`;

const convertedCssText = convertRemToPx(originalCssText);
console.log(convertedCssText);
```

### 代码说明

1. **`vwFontSize`**: 计算基于 `10vw` 的 `font-size` 值。
2. **`targetFontSize`**: 目标 `font-size`，即 `16px`。
3. **`remRegex`**: 正则表达式用于匹配所有以 `rem` 为单位的值。
4. **`replace` 方法**: 使用正则表达式匹配到的 `rem` 值，按比例将其转换为目标 `font-size`（16px）基准下的 `px` 值。

### 示例输出
假设 `originalCssText` 是：

```css
body {
    font-size: 1rem;
    margin: 2rem;
}
```

转换后输出的 `convertedCssText` 将是：

```css
body {
    font-size: 16px;
    margin: 32px;
}
```

这个方法假设 `10vw` 和 `16px` 是直接对应的，如果有更复杂的情况，比如包含媒体查询等复杂CSS规则，可能需要进一步调整正则表达式和处理逻辑。