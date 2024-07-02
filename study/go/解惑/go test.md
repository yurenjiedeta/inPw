在Go项目中，编写测试用例是确保代码质量的重要步骤。Go语言内置了一个强大的测试框架，可以使用`go test`命令来运行测试。以下是一个简单的Go项目，包括一个测试用例的例子。

首先，创建一个新的Go项目：

1. 创建项目目录，例如 `myproject`。
2. 在项目目录中创建一个文件 `main.go` 和一个测试文件 `main_test.go`。

`main.go` 文件的内容如下：

```go
package main

import "fmt"

// Add 函数返回两个整数的和
func Add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println("Hello, World!")
}
```

`main_test.go` 文件的内容如下：

```go
package main

import "testing"

// 测试Add函数
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5

    if result != expected {
        t.Errorf("Add(2, 3) = %d; want %d", result, expected)
    }
}
```

在这个测试文件中，我们编写了一个简单的测试用例 `TestAdd`，它测试了 `Add` 函数是否能够正确地计算两个整数的和。

要运行这个测试用例，可以在项目目录中打开终端，然后运行以下命令：

```sh
go test
```

如果一切正常，你会看到类似下面的输出：

```
ok  	myproject	0.001s
```

如果测试失败，你会看到错误信息，类似这样：

```
--- FAIL: TestAdd (0.00s)
    main_test.go:10: Add(2, 3) = 4; want 5
FAIL
exit status 1
FAIL	myproject	0.002s
```

这种方式可以帮助你确保你的代码逻辑是正确的，并且在修改代码后，测试用例能够快速验证你的更改是否引入了错误。