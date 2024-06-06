`html/template`包中的`ParseGlob`方法用于解析匹配指定通配符模式的文件。它可以一次性解析多个文件，并将它们包含在一个模板集合中。这对于管理多个模板文件非常有用，例如在大型Web应用程序中。

### 示例代码

假设我们有以下三个模板文件：

1. `base.html`
    ```html
    {{ define "base" }}  <!----- ExecuteTemplate 方法中的第二个参数用到 -------->
    <!DOCTYPE html>
    <html>
    <head>
        <title>{{ block "title" . }}{{ end }}</title>
    </head>
    <body>
        {{ block "content" . }}{{ end }}
    </body>
    </html>
{{ end }}
    ```
    
2. `header.html`
    ```html
    {{ define "title" }}User Profile{{ end }}
    ```

3. `content.html`
    ```html
    {{ define "content" }}
    <h1>User Profile</h1>
    <p>Name: {{.Name}}</p>
    <p>Age: {{.Age}}</p>
    <p>Message: {{.Message}}</p>
    {{ end }}
    ```

以下是一个使用`ParseGlob`方法的示例代码，展示了如何解析这些模板文件，并在其中插入用户数据。

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
    // 解析匹配通配符模式的模板文件
    tmpl, err := template.ParseGlob("templates/*.html")
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
    err = tmpl.ExecuteTemplate(os.Stdout, "base", user)
    if err != nil {
        panic(err)
    }
}
```

### 文件结构

假设文件结构如下：
```
project/
│
├── main.go
└── templates/
    ├── base.html
    ├── header.html
    └── content.html
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
   - `template.ParseGlob("templates/*.html")`：解析`templates`目录中所有符合`*.html`模式的文件，并将它们包含在一个模板集合中。

2. **模板执行**：
   - `tmpl.ExecuteTemplate(os.Stdout, "base", user)`：将`user`数据绑定到名为`base`的模板上，并将生成的HTML输出到标准输出中。
   
3. **模板继承与嵌套**：
   - `base.html`中使用了`{{ block "title" . }}{{ end }}`和`{{ block "content" . }}{{ end }}`来定义可替换的块。
   - `header.html`和`content.html`分别使用`{{ define "title" }}`和`{{ define "content" }}`来提供这些块的具体内容。
   
4. **HTML转义**：
   - 模板中使用了`{{.Message}}`来插入用户提供的消息。`html/template`包会自动将`<script>alert('Hello!')</script>`转义为`&lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;`，从而防止了XSS攻击。

通过以上示例，可以看到如何使用`html/template`包中的`ParseGlob`方法来解析多个模板文件，并生成安全的HTML输出。