`String` 方法是在 Go 语言中 `fmt` 包内定义的一个接口，用于定制类型的字符串表示形式。通过实现 `String` 方法，我们可以定义自定义类型的字符串输出格式。

这里给出几种 `String` 方法的使用场景以及相应的注释：

1. **自定义类型的字符串输出**：
```go
package main

import (
	"fmt"
)

type MyType struct {
	value int
}

// String 方法定义了 MyType 类型的字符串表示形式
func (m MyType) String() string {
	return fmt.Sprintf("MyType: %d", m.value)
}

func main() {
	obj := MyType{42}
	fmt.Println(obj) // 输出: MyType: 42
}
```

2. **实现接口时的字符串输出**：
```go
package main

import (
	"fmt"
)

// MyInterface 是一个接口
type MyInterface interface {
	Method() int
	fmt.Stringer
}

// MyType 实现了 MyInterface 接口
type MyType struct {
	value int
}

func (m MyType) Method() int {
	return m.value
}

// 实现了 String 方法以满足 fmt.Stringer 接口
func (m MyType) String() string {
	return fmt.Sprintf("MyType: %d", m.value)
}

func main() {
	obj := MyType{42}
	var iface MyInterface = obj
	fmt.Println(iface) // 输出: MyType: 42
}
```

3. **错误类型的自定义字符串表示**：
```go
package main

import (
	"fmt"
)

// MyError 是一个自定义错误类型
type MyError struct {
	Code    int
	Message string
}

// 实现 Error 方法以满足 error 接口
func (e MyError) Error() string {
	return fmt.Sprintf("Error: %d - %s", e.Code, e.Message)
}

func main() {
	err := MyError{404, "Not Found"}
	fmt.Println(err) // 输出: Error: 404 - Not Found
}
```

这些示例展示了 `String` 方法的几种典型用法，它允许我们在自定义类型上定义自定义的字符串表示形式，以及如何使用它来实现接口和错误类型。