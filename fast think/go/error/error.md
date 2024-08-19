在 Go 语言中，可以通过定义一个结构体并为其实现 `error` 接口来创建自定义错误。然后，可以在函数中返回这个自定义错误。以下是一个示例：

1. 定义结构体并实现 `error` 接口。
2. 定义一个函数并在函数中返回自定义错误。

```go
package main

import (
	"fmt"
)

// 定义一个结构体
type MyError struct {
	Code    int
	Message string
}

// 实现 error 接口
func (e *MyError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// 定义一个函数，在运行过程中返回错误
func doSomething() error {
	// 模拟一个错误情况
	return &MyError{
		Code:    404,
		Message: "Resource not found",
	}
}

func main() {
	err := doSomething()
	if err != nil {
		fmt.Println("An error occurred:", err)
	}
}
```

在这个示例中：

1. `MyError` 结构体包含两个字段：`Code` 和 `Message`。
2. `MyError` 结构体实现了 `error` 接口的 `Error()` 方法。
3. `doSomething()` 函数返回一个 `MyError` 实例，表示发生了某种错误。
4. 在 `main()` 函数中，调用 `doSomething()` 并检查是否返回了错误，如果有错误，则输出错误信息。

运行这段代码时，输出将是：

```
An error occurred: Error 404: Resource not found
```

这表明自定义错误已成功返回并处理。