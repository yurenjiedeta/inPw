在 Go 语言中，给自定义包（如 `mypackage`）编写单元测试的过程与对主包（`main` 包）进行单元测试类似。下面我将详细说明如何创建、编写和运行 `mypackage` 的单元测试，涵盖你提到的所有关键问题。

### 1. 创建项目结构和自定义包

首先，假设你的项目结构如下：

```
myproject/
├── main.go
├── mypackage/
│   ├── mypackage.go
│   └── mypackage_test.go
```

### 2. 编写 `mypackage` 代码

在 `mypackage` 目录中，编写一个简单的函数：

**`mypackage/mypackage.go`**:

```go
package mypackage

// Multiply 函数返回两个整数的乘积
func Multiply(a, b int) int {
	return a * b
}
```

### 3. 编写 `mypackage` 的单元测试

为 `mypackage` 编写一个测试文件 `mypackage_test.go`：

**`mypackage/mypackage_test.go`**:

```go
package mypackage

import (
	"log"
	"testing"
)

func TestMultiply(t *testing.T) {
	log.Println("Starting TestMultiply")
	result := Multiply(2, 3)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
	log.Println("Finished TestMultiply")
}

func BenchmarkMultiply(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Multiply(2, 3)
	}
}
```

### 4. 运行 `mypackage` 的测试

在项目根目录运行 `go test ./mypackage` 命令，测试 `mypackage` 包中的所有测试函数：

```sh
go test ./mypackage
```

如果你想只运行 `TestMultiply` 测试函数，可以使用 `-run` 选项：

```sh
go test ./mypackage -run TestMultiply
```

### 5. 管理测试执行的顺序和跳过某个测试

和之前一样，测试执行的顺序是随机的。可以使用 `t.Skip` 来跳过某个测试。下面是如何在 `mypackage_test.go` 中跳过 `TestMultiply` 测试的示例：

```go
func TestMultiply(t *testing.T) {
	t.Skip("Skipping TestMultiply for now")
	log.Println("Starting TestMultiply")
	result := Multiply(2, 3)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
	log.Println("Finished TestMultiply")
}
```

### 6. 使用 `-bench` 选项运行基准测试

你可以使用 `-bench` 选项运行 `mypackage` 的基准测试：

```sh
go test ./mypackage -bench=.
```

这个命令会运行所有以 `Benchmark` 开头的测试函数（如 `BenchmarkMultiply`），并输出性能指标。

### 7. 在测试中结合 `log` 包进行打印

在测试函数中，可以使用 `log` 包来打印调试信息，这样做的好处是可以在测试日志中保留调试信息，帮助你理解测试的执行情况。

### 完整示例

以下是一个完整的项目结构和代码示例，展示了如何为 `mypackage` 编写和运行单元测试。

**项目结构**：

```
myproject/
├── main.go
├── mypackage/
│   ├── mypackage.go
│   └── mypackage_test.go
```

**`mypackage/mypackage.go`**：

```go
package mypackage

// Multiply 函数返回两个整数的乘积
func Multiply(a, b int) int {
	return a * b
}
```

**`mypackage/mypackage_test.go`**：

```go
package mypackage

import (
	"log"
	"testing"
)

func TestMultiply(t *testing.T) {
	log.Println("Starting TestMultiply")
	result := Multiply(2, 3)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
	log.Println("Finished TestMultiply")
}

func BenchmarkMultiply(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Multiply(2, 3)
	}
}
```

### 运行测试的命令

- **运行所有 `mypackage` 的测试**：`go test ./mypackage`
- **运行 `TestMultiply` 测试函数**：`go test ./mypackage -run TestMultiply`
- **运行基准测试**：`go test ./mypackage -bench=.`

通过以上步骤，你可以为 `mypackage` 编写、运行和管理单元测试，适用于你提到的所有需求。