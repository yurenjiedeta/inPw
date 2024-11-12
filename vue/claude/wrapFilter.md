在这个文本中：

```html
<div>{{ message | capitalize | append('!') }}</div>
```

假设我们在 Vue 的编译过程中解析这个表达式，`wrapFilter` 函数会被用来包装过滤器，每次传入的参数是不同的。接下来，我们通过逐步解析来看每次 `wrapFilter` 函数被调用时传入的参数。

### 过滤器链的处理顺序

在模板表达式 `message | capitalize | append('!')` 中，存在两个过滤器：`capitalize` 和 `append('!')`。这意味着，`wrapFilter` 会先处理 `capitalize` 过滤器，然后处理 `append('!')` 过滤器。

### 第一次调用 `wrapFilter`

1. **`exp` 参数**：第一次调用时，`exp` 是 `message`，即原始数据或表达式。
2. **`filter` 参数**：`filter` 是 `capitalize`，即第一个过滤器。

所以，第一次调用 `wrapFilter` 时，传入的参数是：

```javascript
wrapFilter("message", "capitalize")
```

`wrapFilter` 会返回：

```javascript
"_f("capitalize")(message)"
```

### 第二次调用 `wrapFilter`

在 `capitalize` 过滤器已经处理完毕之后，接下来会处理 `append('!')` 过滤器。此时，`exp` 参数变成了 `_f("capitalize")(message)`，即经过第一个过滤器处理后的表达式。

1. **`exp` 参数**：这是经过 `capitalize` 过滤器处理后的表达式 `_f("capitalize")(message)`。
2. **`filter` 参数**：`filter` 是 `append('!')`，即第二个过滤器，带有参数 `'!'`。

所以，第二次调用 `wrapFilter` 时，传入的参数是：

```javascript
wrapFilter("_f('capitalize')(message)", "append('!')")
```

`wrapFilter` 会返回：

```javascript
"_f("append")(_f("capitalize")(message), '!' )"
```

### 最终生成的表达式

通过逐步包装过滤器，我们最终得到一个完整的表达式，带有所有过滤器的调用：

```javascript
_f("append")(_f("capitalize")(message), '!')
```

### 总结每次调用的参数

1. **第一次调用 `wrapFilter`**：
   - `exp`: `"message"`
   - `filter`: `"capitalize"`
   - 生成的结果：`"_f("capitalize")(message)"`

2. **第二次调用 `wrapFilter`**：
   - `exp`: `"_f("capitalize")(message)"`
   - `filter`: `"append('!')"`
   - 生成的结果：`"_f("append")(_f("capitalize")(message), '!')"`

最终，所有的过滤器都被应用到表达式 `message` 上，结果是：`_f("append")(_f("capitalize")(message), '!')`。

这样，`wrapFilter` 函数每次调用的参数在 Vue 编译模板的过程中是逐步更新的，先处理最内层的过滤器，再向外逐层处理其他过滤器。