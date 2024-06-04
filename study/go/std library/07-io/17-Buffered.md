`io.Buffered` 方法用于返回当前缓冲区中的可用字节数。这个方法通常与实现了 `io.Reader` 或 `io.Writer` 接口的类型一起使用，例如 `bufio.Reader` 和 `bufio.Writer`。以下是 `io.Buffered` 方法的一些使用场景及其输出的示例：

1. **检查缓冲区中的可用字节数：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 在标准输入中读取一行文本
	line, _, _ := reader.ReadLine()

	// 获取缓冲区中的可用字节数
	buffered := reader.Buffered()

	fmt.Printf("Buffered bytes: %d\n", buffered) // 输出: 缓冲区中的可用字节数
}
```

2. **在读取之前检查缓冲区中的可用字节数：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 在读取之前检查缓冲区中的可用字节数
	buffered := reader.Buffered()
	fmt.Printf("Buffered bytes before reading: %d\n", buffered) // 输出: 读取前缓冲区中的可用字节数

	// 读取下一个字节
	nextByte, _ := reader.ReadByte()

	fmt.Printf("Next byte read: %q\n", nextByte) // 输出: 读取的下一个字节

	// 再次检查缓冲区中的可用字节数
	buffered = reader.Buffered()
	fmt.Printf("Buffered bytes after reading: %d\n", buffered) // 输出: 读取后缓冲区中的可用字节数
}
```

3. **在写入之前检查缓冲区中的可用字节数：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	writer := bufio.NewWriter(os.Stdout)

	// 在写入之前检查缓冲区中的可用字节数
	buffered := writer.Buffered()
	fmt.Printf("Buffered bytes before writing: %d\n", buffered) // 输出: 写入前缓冲区中的可用字节数

	// 写入数据到缓冲区
	message := []byte("Hello, Buffered!")
	writer.Write(message)

	// 将缓冲区中的数据刷新到底层的写入器
	writer.Flush()

	// 再次检查缓冲区中的可用字节数
	buffered = writer.Buffered()
	fmt.Printf("Buffered bytes after writing: %d\n", buffered) // 输出: 写入后缓冲区中的可用字节数
}
```

这些场景展示了 `io.Buffered` 方法的一些常见用法，从检查缓冲区中的可用字节数到在读取或写入之前检查缓冲区。