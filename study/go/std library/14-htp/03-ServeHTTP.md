`net/http`包中的`ServeHTTP`方法是用来处理HTTP请求的一个核心方法。要使用`ServeHTTP`方法，你需要定义一个实现`http.Handler`接口的结构体或类型，然后在这个结构体或类型上定义`ServeHTTP`方法。

以下是一个简单的示例，展示了如何使用`ServeHTTP`方法来处理HTTP请求：

```go
package main

import (
	"fmt"
	"net/http"
)

// 定义一个结构体
type myHandler struct{}

// 实现ServeHTTP方法
func (h *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, this is a custom handler!")
}

func main() {
	// 创建一个myHandler的实例
	handler := &myHandler{}

	// 使用http.Handle来注册我们的handler
	http.Handle("/", handler)

	// 启动HTTP服务器
	fmt.Println("Starting server on :8080")
	http.ListenAndServe(":8080", nil)
}
```

在这个示例中，我们定义了一个名为`myHandler`的结构体，并在这个结构体上实现了`ServeHTTP`方法。这个方法会处理传入的HTTP请求，并向客户端发送响应。

然后，我们在`main`函数中创建了一个`myHandler`的实例，并使用`http.Handle`函数将这个实例注册为根路径（"/"）的处理器。最后，我们使用`http.ListenAndServe`函数启动HTTP服务器，监听8080端口。

当你运行这个程序并访问`http://localhost:8080`时，你应该会看到浏览器中显示了"Hello, this is a custom handler!"。

这只是一个基本的示例，`ServeHTTP`方法可以根据需要实现更复杂的逻辑，例如路由、静态文件服务、模板渲染等。