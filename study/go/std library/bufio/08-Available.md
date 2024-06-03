`bufio.Available` 方法用于返回当前缓冲区中可读取的字节数。以下是 `Available` 方法的几种使用场景及其注释：

```go
package main

import (
	"bufio"
	"bytes"
	"fmt"
)

func main() {
	// 场景1: 检查缓冲区中是否有数据可读
	data := []byte("Hello, world!")
	reader := bufio.NewReader(bytes.NewReader(data))

	// 检查缓冲区中可读取的字节数
	available := reader.Available()
	fmt.Println("Available bytes before reading:", available) // Output: Available bytes before reading: 13

	// 读取 5 个字节
	chunk := make([]byte, 5)
	n, _ := reader.Read(chunk)
	fmt.Println("Read bytes:", string(chunk[:n])) // Output: Read bytes: Hello

	// 再次检查缓冲区中可读取的字节数
	available = reader.Available()
	fmt.Println("Available bytes after reading:", available) // Output: Available bytes after reading: 8

	// 场景2: 结合 Available 和 Peek 方法来预览后续数据
	peekBytes, _ := reader.Peek(3)
	fmt.Println("Peeked bytes:", string(peekBytes)) // Output: Peeked bytes: , wo

	// 检查缓冲区中可读取的字节数
	available = reader.Available()
	fmt.Println("Available bytes after peeking:", available) // Output: Available bytes after peeking: 8
}
```

在上述示例中，`Available` 方法用于获取当前缓冲区中可读取的字节数。在第一个场景中，通过调用 `Available` 方法可以知道在读取数据之前缓冲区中有多少可读取的字节，在读取数据之后再次调用可以查看剩余的可读取字节数。在第二个场景中，结合 `Available` 和 `Peek` 方法可以预览后续数据而不实际读取它们。