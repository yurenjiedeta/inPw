`html/template`包中的`Lookup`方法用于在模板集合中查找并返回一个已命名的模板。如果找到该模板，则返回模板实例；如果未找到，则返回nil。这对于动态选择和执行模板非常有用。

### 示例代码

假设我们有以下两个模板文件：

1. `header.html`
    ```html
    {{ define "header" }}<h1>{{.Title}}</h1>{{ end }}
    ```

2. `content.html`
    ```html
    {{ define "content" }}
    <p>Name: {{.Name}}</p>
    <p>Age: {{.Age}}</p>
    <p>Message: {{.Message}}</p>
    {{ end }}
    ```

我们将使用`ParseFiles`方法解析这些模板，并使用`Lookup`方法查找并执行特定模板。

```go
package main

import (
    "html/template"
    "os"
)

type User struct {
    Title   string
    Name    string
    Age     int
    Message string
}

func main() {
    // 解析模板文件
    tmpl, err := template.ParseFiles("templates/header.html", "templates/content.html")
    if err != nil {
        panic(err)
    }

    // 创建一个用户数据
    user := User{
        Title:   "User Profile",
        Name:    "Alice",
        Age:     30,
        Message: "<script>alert('Hello!')</script>", // 这里包含一个潜在的XSS攻击脚本
    }

    // 查找并执行名为 "header" 的模板
    headerTmpl := tmpl.Lookup("header")
    if headerTmpl != nil {
        err = headerTmpl.Execute(os.Stdout, user)
        if err != nil {
            panic(err)
        }
    }

    // 查找并执行名为 "content" 的模板
    contentTmpl := tmpl.Lookup("content")
    if contentTmpl != nil {
        err = contentTmpl.Execute(os.Stdout, user)
        if err != nil {
            panic(err)
        }
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
    ├── header.html
    └── content.html
```

### 运行结果（fmt输出）

运行上述代码会在标准输出中生成以下HTML内容：

```html
<h1>User Profile</h1>
<p>Name: Alice</p>
<p>Age: 30</p>
<p>Message: &lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;</p> <!-- 注意这里的脚本被安全地转义了 -->
```

### 解析

1. **模板解析**：
   - `template.ParseFiles("templates/header.html", "templates/content.html")`：解析`templates`目录中的`header.html`和`content.html`文件，并将它们包含在一个模板集合中。

2. **模板查找与执行**：
   - `tmpl.Lookup("header")`：在模板集合中查找名为`header`的模板。如果找到，则返回模板实例。
   - `headerTmpl.Execute(os.Stdout, user)`：将`user`数据绑定到`header`模板上，并将生成的HTML输出到标准输出中。
   - `tmpl.Lookup("content")`：在模板集合中查找名为`content`的模板。如果找到，则返回模板实例。
   - `contentTmpl.Execute(os.Stdout, user)`：将`user`数据绑定到`content`模板上，并将生成的HTML输出到标准输出中。

3. **HTML转义**：
   - 模板中使用了`{{.Message}}`来插入用户提供的消息。`html/template`包会自动将`<script>alert('Hello!')</script>`转义为`&lt;script&gt;alert(&#39;Hello!&#39;)&lt;/script&gt;`，从而防止了XSS攻击。

通过以上示例，可以看到如何使用`html/template`包中的`Lookup`方法来查找并执行特定的模板，同时确保生成的HTML内容是安全的。