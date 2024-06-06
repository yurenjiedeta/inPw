作为一个资深 Go 开发工程师，以下是一些使用 `net/http` 包中的 `Form`、`PostForm`、`MultipartForm`、`FormValue`、`PostFormValue`、`FormFile`、`ParseForm` 和 `ParseMultipartForm` 方法的示例。这些示例展示了如何处理不同类型的表单数据。

### 示例代码

```go
package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "log"
)

func formHandler(w http.ResponseWriter, r *http.Request) {
    // 解析表单数据
    err := r.ParseForm()
    if err != nil {
        http.Error(w, "ParseForm() error", http.StatusInternalServerError)
        return
    }

    // 获取表单中的数据
    fmt.Fprintf(w, "Form data:\n")
    for key, values := range r.Form {
        for _, value := range values {
            fmt.Fprintf(w, "%s: %s\n", key, value)
        }
    }

    // 获取Post表单中的数据
    fmt.Fprintf(w, "\nPostForm data:\n")
    for key, values := range r.PostForm {
        for _, value := range values {
            fmt.Fprintf(w, "%s: %s\n", key, value)
        }
    }

    // 获取单个表单值
    name := r.FormValue("name")
    age := r.FormValue("age")
    fmt.Fprintf(w, "\nFormValue:\nname: %s, age: %s\n", name, age)

    // 获取单个Post表单值
    email := r.PostFormValue("email")
    fmt.Fprintf(w, "\nPostFormValue:\nemail: %s\n", email)
}

func multipartFormHandler(w http.ResponseWriter, r *http.Request) {
    // 解析 multipart/form-data 表单
    err := r.ParseMultipartForm(10 << 20) // 限制上传文件大小为10MB
    if err != nil {
        http.Error(w, "ParseMultipartForm() error", http.StatusInternalServerError)
        return
    }

    // 获取表单数据
    fmt.Fprintf(w, "MultipartForm data:\n")
    for key, values := range r.MultipartForm.Value {
        for _, value := range values {
            fmt.Fprintf(w, "%s: %s\n", key, value)
        }
    }

    // 获取文件
    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "FormFile() error", http.StatusInternalServerError)
        return
    }
    defer file.Close()

    fmt.Fprintf(w, "\nUploaded File:\n")
    fmt.Fprintf(w, "Filename: %s\n", handler.Filename)
    fmt.Fprintf(w, "Size: %d\n", handler.Size)
    fmt.Fprintf(w, "MIME Header: %v\n", handler.Header)

    // 将文件内容读到内存中并打印
    fileBytes, err := ioutil.ReadAll(file)
    if err != nil {
        http.Error(w, "ReadAll() error", http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, "\nFile content:\n%s\n", fileBytes)
}

func main() {
    http.HandleFunc("/form", formHandler)
    http.HandleFunc("/multipart", multipartFormHandler)

    fmt.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### 示例说明

1. **表单处理**：
   - `formHandler` 处理普通表单数据。首先调用 `ParseForm` 解析表单数据，然后通过 `r.Form` 和 `r.PostForm` 获取表单和 POST 表单数据。
   - `FormValue` 用于获取表单中的单个值。
   - `PostFormValue` 用于获取 POST 表单中的单个值。

2. **多部分表单处理**：
   - `multipartFormHandler` 处理包含文件上传的 multipart/form-data 表单。首先调用 `ParseMultipartForm` 解析表单数据，然后通过 `r.MultipartForm` 获取表单字段和值。
   - `FormFile` 用于获取上传的文件。

### 测试示例

你可以使用 `curl` 命令行工具来测试上述处理程序：

```sh
# 测试普通表单数据
curl -X POST http://localhost:8080/form -d "name=John" -d "age=30" -d "email=john@example.com"

# 测试multipart表单数据
curl -X POST http://localhost:8080/multipart -F "name=John" -F "age=30" -F "file=@/path/to/your/file.txt"
```

这些示例展示了如何使用 `net/http` 包中的各种方法处理表单数据和文件上传。希望这些示例对你有所帮助！