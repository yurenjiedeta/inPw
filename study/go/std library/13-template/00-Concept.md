`html/template`包是Go语言中的一个包，用于安全地生成HTML输出。它基于`text/template`包，提供了相同的模板解析和执行功能，并添加了防止HTML注入攻击的功能。`html/template`包会自动对数据进行HTML转义，从而避免跨站脚本攻击（XSS）。

### 功能定义

`html/template`包的主要功能包括：

1. **模板解析**：
   - 可以解析定义在字符串、文件或文件集合中的模板。
   - 支持模板嵌套和模板继承。
   
2. **模板执行**：
   - 可以将数据与模板进行绑定，并生成最终的HTML输出。
   - 自动对输出内容进行HTML转义，防止XSS攻击。

3. **模板函数**：
   - 提供了一些内置函数，并允许用户自定义函数，以增强模板的功能。

### 示例代码

以下是一个使用`html/template`包的示例代码，展示了如何解析和执行模板，并在生成的HTML中安全地嵌入用户数据。

```go
package main

import (
    "html/template"
    "os"
)

type User struct {
    Name    string
    Age     int
    Message string
}

func main() {
    // 定义一个HTML模板
    const tmpl = `
<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
</head>
<body>
    <h1>User Profile</h1>
    <p>Name: {{.Name}}</p>
    <p>Age: {{.Age}}</p>
    <p>Message: {{.Message}}</p>
</body>
</html>`

    // 解析模板
    t, err := template.New("profile").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    // 创建一个用户数据
    user := User{
        Name:    "Alice",
        Age:     30,
        Message: "<script>alert('Hello!')</script>", // 这里包含一个潜在的XSS攻击脚本
    }

    // 将模板与数据绑定并生成输出
    err = t.Execute(os.Stdout, user)
    if err != nil {
        panic(err)
    }
}
```

### 运行结果（fmt输出）

运行上述代码会在标准输出中生成以下HTML内容：

```html
<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
</head>
<body>
    <h1>User Profile</h1>
    <p>Name: Alice</p>
    <p>Age: 30</p>
    <p>Message: &lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;</p> <!-- 注意这里的脚本被安全地转义了 -->
</body>
</html>
```

### 解析

1. **模板解析**：
   - `template.New("profile").Parse(tmpl)`：解析名为`profile`的模板，并从字符串`tmpl`中读取模板定义。
   
2. **模板执行**：
   - `t.Execute(os.Stdout, user)`：将`user`数据绑定到模板`profile`上，并将生成的HTML输出到标准输出中。
   
3. **HTML转义**：
   - 模板中使用了`{{.Message}}`来插入用户提供的消息。`html/template`包会自动将`<script>alert('Hello!')</script>`转义为`&lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;`，从而防止了XSS攻击。

通过以上示例，可以看到`html/template`包如何在生成HTML的过程中自动进行HTML转义，确保生成的HTML内容是安全的。