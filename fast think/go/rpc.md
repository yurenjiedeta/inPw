在Go语言中，可以使用`net/rpc`包来实现一个简单的RPC（远程过程调用）服务。下面是一个Hello World的RPC例子，包括服务器和客户端。

### RPC服务器

首先，我们需要定义一个服务对象，并且注册这个服务对象使其可以被RPC调用。然后，启动一个监听特定端口的服务器。

```go
package main

import (
	"errors"
	"net"
	"net/rpc"
	"fmt"
)

// 定义服务对象
type HelloService struct{}

// 服务方法
func (h *HelloService) SayHello(request string, reply *string) error {
	if request == "" {
		return errors.New("empty request")
	}
	*reply = "Hello, " + request + "!"
	return nil
}

func main() {
	// 创建服务对象
	helloService := new(HelloService)
	// 注册服务
	rpc.Register(helloService)

	// 启动监听器
	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		fmt.Println("Listen error:", err)
		return
	}
	defer listener.Close()

	fmt.Println("Serving RPC handler")

	// 接受并处理连接
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Accept error:", err)
			continue
		}
		go rpc.ServeConn(conn)
	}
}
```

### RPC客户端

接下来，编写客户端代码来调用上述服务。

```go
package main

import (
	"fmt"
	"net/rpc"
)

func main() {
	// 连接到RPC服务器
	client, err := rpc.Dial("tcp", "localhost:1234")
	if err != nil {
		fmt.Println("Dialing error:", err)
		return
	}

	var reply string
	// 调用远程方法
	err = client.Call("HelloService.SayHello", "World", &reply)
	if err != nil {
		fmt.Println("RPC call error:", err)
		return
	}

	fmt.Println(reply) // 输出：Hello, World!
}
```

### 运行步骤

1. 启动RPC服务器：

   ```bash
   go run server.go
   ```

2. 启动RPC客户端：

   ```bash
   go run client.go
   ```

你应该会在客户端看到输出的"Hello, World!"。这个简单的例子展示了如何使用Go语言的`net/rpc`包来实现基本的RPC服务和客户端。