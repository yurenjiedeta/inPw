当然，下面是一个使用 `net/http` 包中的 `ListenAndServeTLS` 方法的示例。这段代码展示了如何在 Go 中设置一个支持 HTTPS 的服务器。

首先，需要准备好证书文件（例如，`server.crt` 和 `server.key`）。这些文件可以通过自签名证书或者从证书颁发机构获取。

```go
package main

import (
    "crypto/tls"
    "fmt"
    "log"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, HTTPS!")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", helloHandler)

    // 加载证书和私钥
    cert, err := tls.LoadX509KeyPair("server.crt", "server.key")
    if err != nil {
        log.Fatalf("failed to load key pair: %s", err)
    }

    // 创建一个 HTTPS 服务器
    server := &http.Server{
        Addr:    ":443",
        Handler: mux,
        TLSConfig: &tls.Config{
            Certificates: []tls.Certificate{cert},
        },
    }

    log.Println("Starting HTTPS server on https://localhost:443")
    err = server.ListenAndServeTLS("", "")
    if err != nil {
        log.Fatalf("failed to start server: %s", err)
    }
}
```

### 代码解释

1. **Handler 函数**：
   ```go
   func helloHandler(w http.ResponseWriter, r *http.Request) {
       fmt.Fprintf(w, "Hello, HTTPS!")
   }
   ```
   这是一个简单的处理函数，当客户端访问服务器根路径时，它会返回 "Hello, HTTPS!"。

2. **创建多路复用器（Mux）**：
   ```go
   mux := http.NewServeMux()
   mux.HandleFunc("/", helloHandler)
   ```
   这里我们创建了一个 `http.ServeMux`，并将根路径 "/" 映射到 `helloHandler` 函数。

3. **加载证书和私钥**：
   ```go
   cert, err := tls.LoadX509KeyPair("server.crt", "server.key")
   if err != nil {
       log.Fatalf("failed to load key pair: %s", err)
   }
   ```
   我们使用 `tls.LoadX509KeyPair` 加载证书和私钥。如果加载失败，程序会记录错误并退出。

4. **创建 HTTPS 服务器**：
   ```go
   server := &http.Server{
       Addr:    ":443",
       Handler: mux,
       TLSConfig: &tls.Config{
           Certificates: []tls.Certificate{cert},
       },
   }
   ```
   我们创建了一个 `http.Server` 实例，并设置监听地址为 `:443`（默认 HTTPS 端口），以及使用刚才加载的证书配置。

5. **启动 HTTPS 服务器**：
   ```go
   log.Println("Starting HTTPS server on https://localhost:443")
   err = server.ListenAndServeTLS("", "")
   if err != nil {
       log.Fatalf("failed to start server: %s", err)
   }
   ```
   最后，我们调用 `ListenAndServeTLS` 启动服务器。因为我们已经在 `server.TLSConfig` 中配置了证书，所以这里参数传空字符串。

### 运行代码前的准备工作

确保在运行这段代码前，已经生成了 `server.crt` 和 `server.key` 文件。你可以使用 `openssl` 来生成自签名证书：

```sh
openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt -days 365
```

运行上述命令后，按照提示填写信息，最后会生成 `server.crt` 和 `server.key` 文件。将这两个文件放置在与 Go 代码相同的目录下，即可运行代码并启动 HTTPS 服务器。