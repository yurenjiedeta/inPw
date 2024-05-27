好的，以下是关于如何在Go语言中处理错误的基础知识的完整例子：

### 使用字符串进行简单错误处理 (Use Strings for Simple Errors)
```go
package main

import (
    "errors"
    "fmt"
)

func main() {
    err := errors.New("这是一个简单的错误")
    if err != nil {
        fmt.Println(err)
    }
}
```
描述：使用 `errors.New` 创建一个简单的错误，并打印错误信息。

### 哨兵错误 (Sentinel Errors)
```go
package main

import (
    "fmt"
)

var ErrNotFound = errors.New("未找到")

func findItem(id int) error {
    if id == 0 {
        return ErrNotFound
    }
    return nil
}

func main() {
    err := findItem(0)
    if err == ErrNotFound {
        fmt.Println("错误: 项未找到")
    }
}
```
描述：定义一个哨兵错误 `ErrNotFound`，并在函数中返回该错误。

### 错误是值 (Errors Are Values)
```go
package main

import (
    "fmt"
)

type MyError struct {
    Msg string
}

func (e *MyError) Error() string {
    return e.Msg
}

func doSomething() error {
    return &MyError{Msg: "发生了一个自定义错误"}
}

func main() {
    err := doSomething()
    if err != nil {
        fmt.Println(err)
    }
}
```
描述：定义一个自定义错误类型，并在函数中返回该错误。

### 包装错误 (Wrapping Errors)
```go
package main

import (
    "fmt"
    "errors"
)

func doSomething() error {
    return errors.New("底层错误")
}

func main() {
    err := doSomething()
    if err != nil {
        wrappedErr := fmt.Errorf("包装的错误: %w", err)
        fmt.Println(wrappedErr)
    }
}
```
描述：使用 `fmt.Errorf` 包装一个底层错误。

### 使用 Is 和 As (Is and As)
```go
package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("未找到")

type MyError struct {
    Msg string
}

func (e *MyError) Error() string {
    return e.Msg
}

func findItem(id int) error {
    if id == 0 {
        return ErrNotFound
    }
    return &MyError{Msg: "自定义错误"}
}

func main() {
    err := findItem(0)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("错误: 项未找到")
    }

    var myErr *MyError
    if errors.As(err, &myErr) {
        fmt.Println("捕获到自定义错误:", myErr)
    }
}
```
描述：使用 `errors.Is` 和 `errors.As` 进行错误判断和类型断言。

### 使用 defer 包装错误 (Wrapping Errors with defer)
```go
package main

import (
    "fmt"
    "os"
)

func readFile(filename string) (err error) {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer func() {
        if cerr := file.Close(); cerr != nil {
            if err != nil {
                err = fmt.Errorf("file close error: %v, original error: %w", cerr, err)
            } else {
                err = cerr
            }
        }
    }()
    // 读文件的逻辑...
    return nil
}

func main() {
    err := readFile("example.txt")
    if err != nil {
        fmt.Println("错误:", err)
    }
}
```
描述：在 defer 中包装错误以确保文件关闭错误不会被忽略。

### 使用 panic 和 recover (panic and recover)
```go
package main

import (
    "fmt"
)

func mayPanic() {
    panic("出现了恐慌")
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("捕获到恐慌:", r)
        }
    }()
    mayPanic()
    fmt.Println("这句话不会被执行")
}
```
描述：使用 `panic` 触发恐慌，并使用 `recover` 捕获恐慌。

### 从错误中获取堆栈跟踪 (Getting a Stack Trace from an Error)
```go
package main

import (
    "fmt"
    "runtime/debug"
)

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("捕获到恐慌:", r)
            debug.PrintStack()
        }
    }()
    panic("出现了恐慌")
}
```
描述：使用 `runtime/debug` 包中的 `PrintStack` 函数从错误中获取堆栈跟踪。