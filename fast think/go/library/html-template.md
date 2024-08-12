当然，下面是本次对话中的所有`html/template`包示例代码总结：

### 示例 1: 创建和解析HTML模板
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<head>
    <title>{{.Title}}</title>
</head>
<body>
    <h1>{{.Header}}</h1>
    <p>{{.Body}}</p>
</body>
</html>`

    t, err := template.New("webpage").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := map[string]string{
        "Title":  "My Page",
        "Header": "Welcome!",
        "Body":   "This is a simple HTML template example.",
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 2: 防止HTML注入攻击
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<body>
    <p>{{.Content}}</p>
</body>
</html>`

    t, err := template.New("webpage").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := map[string]string{
        "Content": "<script>alert('This is a script!');</script>",
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 3: 使用自定义函数
```go
package main

import (
    "html/template"
    "os"
    "strings"
)

func main() {
    funcMap := template.FuncMap{
        "toUpper": strings.ToUpper,
    }

    tmpl := `<!DOCTYPE html>
<html>
<body>
    <p>{{.Content | toUpper}}</p>
</body>
</html>`

    t, err := template.New("webpage").Funcs(funcMap).Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := map[string]string{
        "Content": "hello world",
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 4: `Execute`方法的作用
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `Hello, {{.Name}}!`

    t, err := template.New("greeting").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := map[string]string{
        "Name": "Alice",
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 5: 模板的嵌套
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `{{define "base"}}
<!DOCTYPE html>
<html>
<body>
    <h1>{{.Title}}</h1>
    {{template "content" .}}
</body>
</html>
{{end}}

{{define "content"}}
<p>{{.Body}}</p>
{{end}}`

    t, err := template.New("webpage").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := map[string]string{
        "Title": "My Page",
        "Body":  "This is the content section.",
    }

    err = t.ExecuteTemplate(os.Stdout, "base", data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 6: 使用 `{{if}}` 和 `{{else}}` 控制模板渲染
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<body>
    {{if .IsLoggedIn}}
        <p>Welcome, {{.Name}}!</p>
    {{else}}
        <p>Please log in.</p>
    {{end}}
</body>
</html>`

    t, err := template.New("login").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := struct {
        IsLoggedIn bool
        Name       string
    }{
        IsLoggedIn: true,
        Name:       "Alice",
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 7: 处理循环 `{{range}}`
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<body>
    <ul>
    {{range .Items}}
        <li>{{.}}</li>
    {{end}}
    </ul>
</body>
</html>`

    t, err := template.New("list").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := struct {
        Items []string
    }{
        Items: []string{"Apple", "Banana", "Cherry"},
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 8: 处理日期和时间
```go
package main

import (
    "html/template"
    "os"
    "time"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<body>
    <p>Current time: {{.CurrentTime.Format "2006-01-02 15:04:05"}}</p>
</body>
</html>`

    t, err := template.New("time").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := struct {
        CurrentTime time.Time
    }{
        CurrentTime: time.Now(),
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 9: 使用 `{{with}}` 限制上下文范围
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := `<!DOCTYPE html>
<html>
<body>
    {{with .User}}
        <p>Name: {{.Name}}</p>
        <p>Email: {{.Email}}</p>
    {{else}}
        <p>No user information available.</p>
    {{end}}
</body>
</html>`

    t, err := template.New("user").Parse(tmpl)
    if err != nil {
        panic(err)
    }

    data := struct {
        User *struct {
            Name  string
            Email string
        }
    }{
        User: &struct {
            Name  string
            Email string
        }{
            Name:  "Alice",
            Email: "alice@example.com",
        },
    }

    err = t.Execute(os.Stdout, data)
    if err != nil {
        panic(err)
    }
}
```

### 示例 10: 从文件中读取模板内容
**文件 `template.html`:**
```html
<!DOCTYPE html>
<html>
<body>
    <p>Hello, {{.Name}}!</p>
</body>
</html>
```

**代码:**
```go
package main

import (
    "html/template"
    "os"
)

func main() {
    t, err := template.ParseFiles("template.html")
    if err != nil {
        panic(err)
    }

    data := struct {
        Name string
    }{
        Name: "Alice",
    }

    err = t.ExecuteTemplate(os.Stdout, "template.html", data)
    if err != nil {
        panic(err)
    }
}
```

这些示例涵盖了`html/template`包的一些关键功能，希望能帮助你更好地理解如何使用这个包。