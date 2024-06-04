`WriteString()` 方法用于将字符串写入实现了 `io.Writer` 接口的对象中。下面是 `WriteString()` 方法的几种常见用法及其输出的注释：

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	// 场景1: 将字符串写入标准输出
	fmt.Println("场景1:")
	str := "Hello, World!"
	_, err := io.WriteString(os.Stdout, str)
	if err != nil {
		fmt.Println("写入错误:", err)
	}

	// 场景2: 将字符串写入文件
	fmt.Println("\n场景2:")
	file, err := os.Create("output.txt")
	if err != nil {
		fmt.Println("创建文件错误:", err)
		return
	}
	defer file.Close()
	_, err = io.WriteString(file, str)
	if err != nil {
		fmt.Println("写入文件错误:", err)
	}

	// 场景3: 使用缓冲区进行字符串写入
	fmt.Println("\n场景3:")
	buffer := make([]byte, 0, 1024) // 创建一个大小为1024字节的缓冲区
	writer := io.MultiWriter(os.Stdout, file, &buffer)
	_, err = io.WriteString(writer, str)
	if err != nil {
		fmt.Println("写入错误:", err)
	}
	fmt.Println("\n缓冲区内容:", string(buffer)) // 输出: 缓冲区内容: Hello, World!
}
```

这些场景展示了 `WriteString()` 方法的使用，包括将字符串写入标准输出、文件以及缓冲区等不同场景。