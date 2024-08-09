你可以通过在不同的 `div` 元素中动态修改 CSS 变量的值，从而影响继承自 `html` 元素的 `font-size`。具体来说，你可以使用 CSS 自定义属性（CSS 变量）来设置 `html` 的 `font-size`，然后在不同的 `div` 中覆盖该变量的值。

### 例子说明
假设你有一个全局的 CSS 变量 `--base-font-size`，你可以在 `html` 元素上定义它，然后在特定的 `div` 中修改该变量的值，从而动态调整 `font-size`。

```html
<html>
  <head>
    <style>
      :root {
        --base-font-size: 16px; /* 定义全局font-size */
      }

      html {
        font-size: var(--base-font-size);
      }

      /* 不同的div覆盖全局的font-size */
      .container-1 {
        --base-font-size: 18px; /* 修改变量值 */
      }

      .container-2 {
        --base-font-size: 14px; /* 修改变量值 */
      }

      /* 元素使用rem，受变量影响 */
      .content {
        font-size: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="container-1">
      <div class="content">这段文字的font-size为18px。</div>
    </div>

    <div class="container-2">
      <div class="content">这段文字的font-size为14px。</div>
    </div>

    <div class="default">
      <div class="content">这段文字的font-size为16px。</div>
    </div>
  </body>
</html>
```

### 代码解析
1. 在 `:root` 中定义了一个全局的 CSS 变量 `--base-font-size`，初始值为 `16px`。
2. `html` 的 `font-size` 被设置为 `var(--base-font-size)`，即使用这个 CSS 变量的值。
3. `.container-1` 和 `.container-2` 中，分别覆盖了 `--base-font-size` 变量，将它们的 `font-size` 动态修改为 `18px` 和 `14px`。
4. 在各个 `div` 中，使用 `rem` 作为单位的 `font-size` 将会根据该变量的当前值来计算。

### 动态修改的效果
- `.container-1` 中的 `.content` 的 `font-size` 会被计算为 `18px`。
- `.container-2` 中的 `.content` 的 `font-size` 会被计算为 `14px`。
- 未覆盖变量的 `.default` 中的 `.content` 的 `font-size` 会被计算为 `16px`。

### 结论
通过在不同的 `div` 中覆盖全局的 CSS 变量 `--base-font-size`，你可以动态修改元素的 `font-size`，实现不同区域根据需要调整字体大小的效果。