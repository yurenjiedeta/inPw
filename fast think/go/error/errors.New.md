`errors.New` 是 Go 语言标准库 `errors` 包中的一个函数，用于创建一个简单的错误对象。这个错误对象实现了 `error` 接口，包含一个字符串形式的错误消息。`errors.New` 通常用于创建不需要复杂结构的错误消息。

以下是使用 `errors.New` 创建和处理错误的示例：

```go
package main

import (
	"errors"
	"fmt"
)

// 一个执行某些操作并可能产生错误的函数
func doSomething() error {
	// 模拟一个错误情况
	return errors.New("an unexpected error occurred")
}

func main() {
	// 调用函数并检查是否返回错误
	err := doSomething()
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Operation succeeded")
	}
}
```

在这个示例中：

1. 导入 `errors` 包。
2. 在 `doSomething` 函数中，使用 `errors.New` 创建一个包含错误消息的错误对象。
3. 在 `main` 函数中，调用 `doSomething` 并检查是否返回了错误。如果返回了错误，则输出错误信息。

运行这段代码时，输出将是：

```
Error: an unexpected error occurred
```

这表明使用 `errors.New` 创建的错误对象已成功返回并处理。

此外，你可以结合自定义错误和 `errors.New` 一起使用，例如在更复杂的错误处理中：

```go
package main

import (
	"errors"
	"fmt"
)

// 一个自定义错误类型
type MyError struct {
	Code    int
	Message string
}

// 实现 error 接口
func (e *MyError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// 一个执行某些操作并可能产生错误的函数
func doSomething() error {
	// 模拟一个简单的错误情况
	if true {
		return errors.New("an unexpected error occurred")
	}

	// 模拟一个复杂的错误情况
	return &MyError{
		Code:    404,
		Message: "Resource not found",
	}
}

func main() {
	// 调用函数并检查是否返回错误
	err := doSomething()
	if err != nil {
		fmt.Println("Error:", err)
		switch e := err.(type) {
		case *MyError:
			fmt.Println("This is a MyError with code:", e.Code)
		default:
			fmt.Println("This is a generic error")
		}
	} else {
		fmt.Println("Operation succeeded")
	}
}
```

在这个扩展示例中，`doSomething` 函数可以返回简单的错误（使用 `errors.New`）或自定义的复杂错误（使用自定义结构体）。在 `main` 函数中，通过类型断言可以区分不同类型的错误，并进行相应的处理。