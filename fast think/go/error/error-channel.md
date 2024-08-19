在Go语言中，可以通过channels在goroutine之间传递自定义错误。首先，你需要定义一个包含错误的结构体，然后在一个goroutine中创建错误，并通过channel将其传递给另一个goroutine。

以下是一个示例，展示了如何实现这一功能：

```go
package main

import (
	"fmt"
)

// 定义一个错误的结构体
type MyError struct {
	Code    int
	Message string
}

// 实现 error 接口
func (e *MyError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// 定义一个包含错误的结构体
type Result struct {
	Error *MyError
	// 可以添加其他字段
}

// 一个执行某些操作并可能产生错误的函数
func doSomething(resultChan chan Result) {
	// 模拟一个错误情况
	err := &MyError{
		Code:    404,
		Message: "Resource not found",
	}

	// 创建一个Result对象并通过channel传递
	resultChan <- Result{Error: err}
}

func main() {
	// 创建一个channel用于传递Result对象
	resultChan := make(chan Result)

	// 启动一个goroutine来执行doSomething函数
	go doSomething(resultChan)

	// 从channel中接收Result对象
	result := <-resultChan

	// 检查是否有错误
	if result.Error != nil {
		fmt.Println("An error occurred:", result.Error)
	} else {
		fmt.Println("Operation succeeded")
	}
}
```

在这个示例中：

1. 定义了 `MyError` 结构体，并实现了 `error` 接口。
2. 定义了一个包含 `MyError` 指针的 `Result` 结构体，可以在其中包含更多信息。
3. `doSomething` 函数创建一个 `MyError` 实例，并将其包装在 `Result` 结构体中，通过channel传递。
4. 在 `main` 函数中，创建一个channel用于传递 `Result` 对象，启动一个goroutine来执行 `doSomething` 函数，并通过channel接收结果。
5. 检查接收到的 `Result` 对象是否包含错误，并根据情况输出相应的信息。

运行这段代码时，输出将是：

```
An error occurred: Error 404: Resource not found
```

这表明错误已通过channel在goroutine之间成功传递和处理。