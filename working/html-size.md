要监听整个 HTML 标签（`<html>` 元素）的 `font-size` 属性变化，你可以使用 `ResizeObserver` 和定时器轮询的方法。由于 `MutationObserver` 只能监听属性变化而不能直接监听 `font-size` 的变化，`ResizeObserver` 可以间接实现这一目标。

### 使用 `ResizeObserver` 监听 `<html>` 的 `font-size` 变化

虽然 `ResizeObserver` 主要是监听元素的尺寸变化，但由于 `font-size` 变化通常会导致尺寸变化，因此它可以用于间接监听 `font-size` 的变化。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Font Size Change on HTML</title>
    <style>
        html {
            font-size: 16px;
        }
    </style>
</head>
<body>

<div id="content">Observe the HTML font-size change</div>
<button id="increaseFontBtn">Increase HTML Font Size</button>

<script>
    const htmlElement = document.documentElement;

    // 使用 ResizeObserver 监听 HTML 元素尺寸的变化
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.target === htmlElement) {
                const newFontSize = window.getComputedStyle(htmlElement).fontSize;
                console.log(`HTML font-size changed to: ${newFontSize}`);
            }
        }
    });

    // 开始观察 <html> 元素
    resizeObserver.observe(htmlElement);

    // 按钮用于增加 <html> 元素的 font-size
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    increaseFontBtn.addEventListener('click', () => {
        const currentFontSize = parseInt(window.getComputedStyle(htmlElement).fontSize);
        htmlElement.style.fontSize = (currentFontSize + 2) + 'px';
    });

    // 可以在不需要时使用 resizeObserver.disconnect() 停止观察
</script>

</body>
</html>
```

### 解释

1. **目标节点**: `htmlElement` 是整个文档的根元素 `<html>`。

2. **`ResizeObserver`**:
   - 监听 HTML 元素的尺寸变化。
   - 当 `font-size` 改变时，通常会引发元素尺寸变化，从而触发 `ResizeObserver`。

3. **修改 `font-size`**:
   - 使用按钮点击事件增加 `<html>` 的 `font-size`。
   - 当 `font-size` 改变时，`ResizeObserver` 捕捉到尺寸变化，并输出新的 `font-size`。

### 使用定时器轮询（Polling）

如果你希望更加精确地监听 `font-size` 变化，而不依赖于元素尺寸变化，可以使用定时器轮询的方式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Font Size Change Polling</title>
    <style>
        html {
            font-size: 16px;
        }
    </style>
</head>
<body>

<div id="content">Observe the HTML font-size change</div>
<button id="increaseFontBtn">Increase HTML Font Size</button>

<script>
    const htmlElement = document.documentElement;
    let lastFontSize = window.getComputedStyle(htmlElement).fontSize;

    function checkFontSize() {
        const currentFontSize = window.getComputedStyle(htmlElement).fontSize;
        if (currentFontSize !== lastFontSize) {
            console.log(`HTML font-size changed to: ${currentFontSize}`);
            lastFontSize = currentFontSize;
        }
    }

    // 每500毫秒检查一次
    setInterval(checkFontSize, 500);

    // 按钮用于增加 <html> 元素的 font-size
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    increaseFontBtn.addEventListener('click', () => {
        const currentFontSize = parseInt(lastFontSize);
        htmlElement.style.fontSize = (currentFontSize + 2) + 'px';
    });
</script>

</body>
</html>
```

### 解释

1. **定时器轮询**: 每隔 500 毫秒检查一次 `font-size`，对比当前和上次的 `font-size`，如果有变化则记录并输出。

2. **按钮事件**: 按钮点击事件中增加 `<html>` 的 `font-size`，触发定时器检查到变化并输出结果。

### 总结

- **`ResizeObserver`** 可以间接监听 `font-size` 变化，因为 `font-size` 的变化会导致元素尺寸的变化。
- **定时器轮询** 是更直接的监听方法，通过不断检查 `font-size` 来捕捉变化。

这两种方法都可以用来监听整个 HTML 标签的 `font-size` 属性变化，根据实际需求选择合适的方法。