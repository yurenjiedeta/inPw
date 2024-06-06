`net/http`包是Go语言标准库中用于实现HTTP客户端和服务端功能的一个包。它提供了处理HTTP协议的基础设施，使开发者能够轻松地编写HTTP服务器和客户端。

### 功能定义

1. **HTTP服务器功能**：
   - **监听和响应HTTP请求**：可以监听指定的端口，并处理传入的HTTP请求。
   - **路由和处理程序**：能够将请求路由到特定的处理函数，根据URL路径分发请求。
   - **响应构建**：提供便捷的方法来构建和发送HTTP响应。

2. **HTTP客户端功能**：
   - **发送HTTP请求**：可以发送各种类型的HTTP请求（GET、POST、PUT、DELETE等）。
   - **处理HTTP响应**：能够接收和处理HTTP响应，包括读取响应体、状态码和头信息。
   - **配置和控制**：支持配置请求的详细信息，如超时、重定向、代理等。

3. **中间件支持**：
   - **中间件**：能够在请求处理的前后插入自定义逻辑，如日志记录、认证等。

### 示例代码

#### HTTP服务器示例

```go
package main

import (
    "fmt"
    "net/http"
)

// 处理函数
func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    // 设置路由和处理函数
    http.HandleFunc("/hello", helloHandler)
    
    // 启动服务器
    fmt.Println("Starting server at port 8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Println("Server failed:", err)
    }
}
```

##### 运行结果
启动服务器后，访问 `http://localhost:8080/hello`，页面将显示：
```
Hello, World!
```

#### HTTP客户端示例

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    // 发送GET请求
    resp, err := http.Get("http://example.com")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()
    
    // 读取响应体
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    // 打印响应
    fmt.Println("Response status:", resp.Status)
    fmt.Println("Response body:", string(body))
}
```

##### 运行结果
```
Response status: 200 OK
Response body: <!doctype html>... (example.com的HTML内容)
```

### 小结
通过`net/http`包，Go语言提供了一个功能强大且简单易用的HTTP处理工具，既可以用来快速构建Web服务器，也可以方便地进行HTTP客户端请求处理。上面的示例展示了基本的服务器和客户端的使用方法。