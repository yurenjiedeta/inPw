`fmt.Errorf` 是 Go 标准库 `fmt` 包中的一个函数，用于创建带有格式化字符串的错误对象。它的主要作用是创建带有动态信息的错误消息，这在生成包含变量值的错误消息时特别有用。`fmt.Errorf` 返回一个实现了 `error` 接口的错误对象。

以下是使用 `fmt.Errorf` 创建和处理错误的示例：

```go
package main

import (
	"fmt"
)

// 一个执行某些操作并可能产生错误的函数
func doSomething(param int) error {
	if param <= 0 {
		// 使用 fmt.Errorf 创建一个带有格式化字符串的错误对象
		return fmt.Errorf("invalid parameter: %d. Parameter must be greater than 0", param)
	}
	// 如果参数有效，返回 nil 表示没有错误
	return nil
}

func main() {
	// 调用函数并检查是否返回错误
	err := doSomething(-1)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Operation succeeded")
	}
}
```

在这个示例中：

1. `doSomething` 函数接受一个参数 `param`，并检查它是否小于等于 0。
2. 如果参数无效，使用 `fmt.Errorf` 创建一个包含详细信息的错误对象。
3. 在 `main` 函数中，调用 `doSomething` 并检查是否返回了错误。如果返回了错误，则输出错误信息。

运行这段代码时，输出将是：

```
Error: invalid parameter: -1. Parameter must be greater than 0
```

这表明使用 `fmt.Errorf` 创建的带有动态信息的错误对象已成功返回并处理。

此外，`fmt.Errorf` 还可以与其他错误处理机制结合使用。例如，包装已有的错误信息：

```go
package main

import (
	"errors"
	"fmt"
)

// 一个执行某些操作并可能产生错误的函数
func doSomething(param int) error {
	if param <= 0 {
		// 使用 fmt.Errorf 包装已有的错误信息
		return fmt.Errorf("doSomething failed: %w", errors.New("invalid parameter"))
	}
	// 如果参数有效，返回 nil 表示没有错误
	return nil
}

func main() {
	// 调用函数并检查是否返回错误
	err := doSomething(-1)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Operation succeeded")
	}
}
```

在这个扩展示例中：

1. 使用 `fmt.Errorf` 包装了已有的错误信息，通过 `%w` 占位符可以将已有的错误嵌入到新的错误信息中。
2. 在 `main` 函数中，调用 `doSomething` 并检查是否返回了错误。如果返回了错误，则输出错误信息。

运行这段代码时，输出将是：

```
Error: doSomething failed: invalid parameter
```

这表明使用 `fmt.Errorf` 可以方便地创建包含格式化字符串的错误消息，并且可以与已有的错误对象结合使用，提供更灵活和详细的错误信息。