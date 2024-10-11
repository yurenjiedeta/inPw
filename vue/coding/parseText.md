在Vue.js 2.6.14版本的源码中，`parseText`函数主要用于解析包含绑定表达式的文本。这个函数接受两个参数：`text`（需要解析的文本字符串）和`delimiters`（可选的自定义界定符，用于标记绑定表达式的开始和结束）。下面我们来详细解析这个函数的工作原理、代码逻辑和示例。

### 函数的工作原理

1. **初始化正则表达式**：函数首先确定用于查找绑定表达式的正则表达式`tagRE`。如果提供了`delimiters`参数，则调用`buildRegex`来生成对应的正则表达式；如果没有提供，则使用默认的正则表达式`defaultTagRE`。

2. **文本匹配检查**：使用`tagRE`测试文本`text`，如果没有匹配到任何内容，则函数直接返回，不进行任何解析。

3. **循环解析文本**：通过`while`循环，使用正则表达式`tagRE`来连续匹配文本中的绑定表达式。每次匹配到一个表达式时，都会更新循环使用的`lastIndex`，确保下一次匹配从上一次匹配结束的地方开始。

4. **提取文本和表达式**：在每次循环中，函数首先检查匹配到的绑定表达式前是否有普通文本（非绑定表达式的文本），如果有，则将这部分文本作为一个单独的token存储；然后将绑定表达式本身也存储为一个特殊的token。

5. **构建返回值**：函数返回一个对象，包括：
   - `expression`：一个字符串，由各个token组成，用`+`连接，表示整个文本的动态表达式。
   - `tokens`：一个数组，包含解析后的原始token，其中文本token为普通字符串，绑定表达式token为一个特殊对象。

### 代码段说明

- `var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;`：根据是否有自定义界定符来决定使用哪个正则表达式。
- `if (!tagRE.test(text)) { return }`：如果文本中没有匹配的绑定表达式，则函数直接返回。
- `while ((match = tagRE.exec(text)))`：循环使用正则表达式来找到所有的绑定表达式。
- `tokens.push(JSON.stringify(tokenValue));`：将普通文本token转换为JSON字符串格式并存储。
- `tokens.push(("_s(" + exp + ")"));`：将绑定表达式转换为一个可执行的函数调用形式，并存储。

### 示例说明

假设我们有以下文本和自定义分隔符：

```javascript
var text = "Hello {{name}}, you have {{messages.length}} new messages.";
var delimiters = ["{{", "}}"];
```

使用`parseText`函数解析这个文本，函数将：

1. 使用`delimiters`构建一个匹配`{{...}}`形式的正则表达式。
2. 从文本中提取两个绑定表达式：`name`和`messages.length`。
3. 提取普通文本`"Hello "`、`", you have "`和`" new messages."`。
4. 构建返回的对象，其中`expression`可能是`"Hello " + _s(name) + ", you have " + _s(messages.length) + " new messages."`。

这个函数对于将Vue模板中的绑定表达式与普通文本结合，生成动态更新的视图非常关键。