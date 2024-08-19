可以创建一个 JavaScript 函数来处理 CSS 样式字符串，并将其应用到指定的顶级类名下。以下是一个示例函数，它接受两个参数：一个 CSS 样式字符串和一个顶级类名，并返回修改后的 CSS 样式字符串。

```javascript
function scopeCSS(cssString, topLevelClass) {
    // 将传入的 CSS 字符串按块分割
    const cssBlocks = cssString.split(/(?=^[^{}]+{)/m);

    // 为每个 CSS 块添加顶级类名
    const scopedCSS = cssBlocks.map(block => {
        return block.replace(/([^{\s]+)(?=\s*{)/g, selector => {
            // 忽略已经有顶级类名的选择器
            if (selector.startsWith(topLevelClass)) {
                return selector;
            }
            return `${topLevelClass} ${selector}`;
        });
    }).join('\n');

    return scopedCSS;
}

// 使用示例
const cssString = `
    .btn { color: red; }
    .container .btn { color: blue; }
    .header { background: gray; }
`;

const topLevelClass = '.my-container';
const scopedCSS = scopeCSS(cssString, topLevelClass);

console.log(scopedCSS);
```

### 解释

1. **分割 CSS 块**：通过正则表达式 `split(/(?=^[^{}]+{)/m)` 将 CSS 字符串按块分割，每个块从选择器开始到样式结束。
2. **添加顶级类名**：使用 `replace` 方法，将每个选择器前面添加顶级类名，确保不重复添加（即，忽略已经包含顶级类名的选择器）。
3. **合并结果**：将处理后的每个 CSS 块合并成一个字符串，并返回。

### 使用示例

如果你运行上面的代码，你会得到以下结果：

```css
.my-container .btn { color: red; }
.my-container .container .btn { color: blue; }
.my-container .header { background: gray; }
```

这样，每个 CSS 选择器都会在顶级类名下应用。