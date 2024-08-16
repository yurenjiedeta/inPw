- **Method（方法）**: 在 Go 语言中，方法是与特定类型关联的函数，用于定义该类型的行为和操作。
- **Interface（接口）**: 接口是定义了一组方法的集合的类型，用于实现多态和抽象，允许不同类型提供自己的具体实现。

以下是以示例总结的对话内容：

### 1. 给函数类型定义方法

```go
package main

import "fmt"

// 定义函数类型
type MyFunc func(int) int

// 给 MyFunc 类型定义方法
func (f MyFunc) Double(x int) int {
    return f(x) * 2
}

func main() {
    // 创建 MyFunc 类型的实例
    f := MyFunc(func(x int) int {
        return x + 1
    })

    // 使用 Double 方法
    result := f.Double(3)
    fmt.Println(result) // 输出 8
}
```

### 2. 给 `string` 类型定义方法

```go
package main

import (
    "fmt"
    "strings"
)

// 定义新类型 MyString 基于 string
type MyString string

// 给 MyString 类型定义方法
func (s MyString) ToUpper() string {
    return strings.ToUpper(string(s))
}

func (s MyString) Length() int {
    return len(s)
}

func main() {
    // 创建 MyString 类型的实例
    myStr := MyString("hello world")

    // 使用 MyString 类型的方法
    fmt.Println(myStr.ToUpper()) // 输出 "HELLO WORLD"
    fmt.Println(myStr.Length())  // 输出 11
}
```

### 3. 为类型实现接口

```go
package main

import (
    "fmt"
    "strconv"
)

// 定义接口
type MyInterface interface {
    DoSomething(x int) int
    GetValue() int
    SetValue(x int)
    Stringify() string
}

// 定义函数类型 MyFunc
type MyFunc func(int) int

// 实现接口方法
func (f MyFunc) DoSomething(x int) int {
    return f(x)
}

func (f MyFunc) GetValue() int {
    return 0
}

func (f MyFunc) SetValue(x int) {
    // 无实际效果
}

func (f MyFunc) Stringify() string {
    return "MyFunc type"
}

// 定义类型 MyString
type MyString string

// 实现接口方法
func (s MyString) DoSomething(x int) int {
    return len(s) + x
}

func (s MyString) GetValue() int {
    return len(s)
}

func (s MyString) SetValue(x int) {
    // 无实际效果
}

func (s MyString) Stringify() string {
    return string(s)
}

func main() {
    // 使用 MyFunc 类型
    f := MyFunc(func(x int) int {
        return x * 2
    })

    var iface MyInterface = f
    fmt.Println(iface.DoSomething(3))   // 输出 6
    fmt.Println(iface.GetValue())       // 输出 0
    fmt.Println(iface.Stringify())      // 输出 "MyFunc type"

    // 使用 MyString 类型
    s := MyString("example")

    iface = s
    fmt.Println(iface.DoSomething(5))   // 输出 12
    fmt.Println(iface.GetValue())       // 输出 7
    fmt.Println(iface.Stringify())      // 输出 "example"
}
```

这些示例展示了如何给函数类型和自定义类型定义方法，以及如何实现一个接口。