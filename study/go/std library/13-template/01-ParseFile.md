报错的原因是模板文件中没有定义名为`"base"`的模板。`template.ExecuteTemplate`方法期望的模板名称应该是文件中定义的模板块名，而不是文件名。

我们需要确保在`content.html`中定义的块名称与我们在`ExecuteTemplate`方法中使用的名称匹配。以下是修正后的示例：

### 模板文件

#### base.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ block "title" . }}{{ end }}</title>
</head>
<body>
    {{ block "content" . }}{{ end }}
</body>
</html>
```

#### content.html
```html
{{ define "title" }}User Profile{{ end }}

{{ define "content" }}
    <h1>User Profile</h1>
    <p>Name: {{.Name}}</p>
    <p>Age: {{.Age}}</p>
    <p>Message: {{.Message}}</p>
{{ end }}
```

### 主程序文件

#### main.go
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
    // 解析模板文件
    tmpl, err := template.ParseFiles("base.html", "content.html")
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
    err = tmpl.Execute(os.Stdout, user) // 使用顶级模板
    if err != nil {
        panic(err)
    }
}
```

### 运行结果

运行上述代码后，将在标准输出中生成以下HTML内容：

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

1. **模板文件**：
   - `base.html`：定义了HTML的基础结构，包括`title`和`content`块。
   - `content.html`：定义了如何填充`title`和`content`块。

2. **模板解析**：
   - `template.ParseFiles("base.html", "content.html")`：解析`base.html`和`content.html`文件，并将它们组合成一个模板。

3. **模板执行**：
   - `tmpl.Execute(os.Stdout, user)`：将`user`数据绑定到模板上，并将生成的HTML输出到标准输出中。由于顶级模板包含所有定义的模板块，因此可以直接执行。

4. **HTML转义**：
   - 模板中使用了`{{.Message}}`来插入用户提供的消息。`html/template`包会自动将`<script>alert('Hello!')</script>`转义为`&lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;`，从而防止了XSS攻击。

通过这个修正后的示例，可以看到如何正确地使用`ParseFiles`方法从文件系统中解析多个模板文件，并安全地生成HTML输出。