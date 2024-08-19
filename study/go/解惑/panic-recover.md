`panic`和`recover`通常用来处理Go程序中的异常情况。在一个函数内部触发`panic`之后，可以通过`recover`来捕获这个异常，从而让程序继续运行。以下是一个包含`panic`和`recover`的示例：

```go
package main

import (
    "fmt"
)

func main() {
    fmt.Println("Start of the program")

    // 调用可以触发panic的函数，并尝试恢复
    safeFunction()

    fmt.Println("End of the program") // recover 后，此处也被执行了
}

// safeFunction 包装了可能会触发 panic 的 riskyFunction，并尝试恢复
func safeFunction() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    riskyFunction()
}

// riskyFunction 触发 panic
func riskyFunction() {
    fmt.Println("About to panic!")
    panic("Something went wrong!")
    fmt.Println("This line will not be executed")
}
```

运行这段代码时，你会看到以下输出：

```
Start of the program
About to panic!
Recovered from panic: Something went wrong!
End of the program
```

在这个示例中：

1. `main`函数开始执行并输出"Start of the program"。
2. `main`函数调用了`safeFunction`，而`safeFunction`使用了`defer`和`recover`来捕获`panic`。
3. `riskyFunction`触发了`panic`，输出"About to panic!"并立即触发`panic`。
4. `defer`关键字保证在`safeFunction`返回之前执行匿名函数，这个匿名函数通过`recover`捕获了`panic`并输出"Recovered from panic: Something went wrong!"。
5. `main`函数继续执行，输出"End of the program"。

通过这种方式，可以在不终止程序的情况下处理异常情况。