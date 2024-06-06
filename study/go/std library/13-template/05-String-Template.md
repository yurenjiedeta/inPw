`html/template`包是Go语言中用于生成安全的HTML输出的一个重要工具。它基于`text/template`包，但增加了自动转义功能，以防止跨站脚本（XSS）攻击。以下是`html/template`包中模板语法的详细示例：

### 1. 基本语法

#### 定义模板
```go
{{define "T"}}
    <h1>{{.Title}}</h1>
    <p>{{.Content}}</p>
{{end}}
```

#### 使用模板
```go
t := template.Must(template.New("T").ParseFiles("template.html"))
data := map[string]string{
    "Title": "Welcome",
    "Content": "Hello, World!",
}
t.Execute(os.Stdout, data)
```

### 2. 动作（Actions）

#### 变量
```go
{{ $name := "John Doe" }}
<p>Name: {{ $name }}</p>
```

#### 条件语句
```go
{{ if .Authenticated }}
    <p>Welcome, {{ .User }}!</p>
{{ else }}
    <p>Please log in.</p>
{{ end }}
```

#### 循环
```go
<ul>
{{ range .Items }}
    <li>{{ . }}</li>
{{ end }}
</ul>
```

#### with动作
```go
{{ with .User }}
    <p>User: {{ .Name }}</p>
    <p>Email: {{ .Email }}</p>
{{ end }}
```

### 3. 管道（Pipelines）

#### 简单管道
```go
<p>{{ .Name | html }}</p>
```

#### 复杂管道
```go
<p>{{ printf "Hello, %s" .Name | html }}</p>
```

### 4. 嵌套模板

#### 定义嵌套模板
```go
{{ define "header" }}
    <h1>{{ .Title }}</h1>
{{ end }}

{{ define "footer" }}
    <p>Footer content here</p>
{{ end }}

{{ define "body" }}
    {{ template "header" . }}
    <p>{{ .Content }}</p>
    {{ template "footer" }}
{{ end }}
```

#### 使用嵌套模板
```go
t := template.Must(template.New("main").ParseFiles("template.html"))
data := map[string]string{
    "Title": "Welcome",
    "Content": "Hello, World!",
}
t.ExecuteTemplate(os.Stdout, "body", data)
```

### 5. 自定义函数

#### 注册自定义函数
```go
func add(a, b int) int {
    return a + b
}

func main() {
    t := template.New("T").Funcs(template.FuncMap{
        "add": add,
    })
    t = template.Must(t.Parse(`{{ add 1 2 }}`))
    t.Execute(os.Stdout, nil)
}
```

### 6. 原样输出文本

#### 不转义输出
```go
<p>{{ .RawHTML | safeHTML }}</p>
```

需要注意的是，自定义函数`safeHTML`需要自行实现：
```go
func safeHTML(text string) template.HTML {
    return template.HTML(text)
}

func main() {
    t := template.New("T").Funcs(template.FuncMap{
        "safeHTML": safeHTML,
    })
    t = template.Must(t.Parse(`<p>{{ .RawHTML | safeHTML }}</p>`))
    data := map[string]string{
        "RawHTML": "<b>Bold Text</b>",
    }
    t.Execute(os.Stdout, data)
}
```

### 7. 注释

```go
{{/* This is a comment */}}
<p>Hello, World!</p>
```

这些示例涵盖了`html/template`包中最常用的语法。通过这些例子，可以帮助你在Go语言开发中使用模板生成安全的HTML内容。