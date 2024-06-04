`io.CopyN` 方法用于将数据从源读取并写入到目标，直到达到指定的字节数为止。以下是 `io.CopyN` 方法的一些使用场景及其输出的示例：

1. **复制文件的一部分到另一个文件：**

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	sourceFile, err := os.Open("source.txt")
	if err != nil {
		fmt.Println("Error opening source file:", err)
		return
	}
	defer sourceFile.Close()

	destinationFile, err := os.Create("destination.txt")
	if err != nil {
		fmt.Println("Error creating destination file:", err)
		return
	}
	defer destinationFile.Close()

	// 复制源文件的前100字节到目标文件
	n, err := io.CopyN(destinationFile, sourceFile, 100)
	if err != nil {
		fmt.Println("Error copying file:", err)
		return
	}

	fmt.Printf("Copied %d bytes\n", n) // 输出: Copied 100 bytes
}
```

2. **复制HTTP响应的一部分到文件：**

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	resp, err := http.Get("https://example.com")
	if err != nil {
		fmt.Println("Error fetching URL:", err)
		return
	}
	defer resp.Body.Close()

	destinationFile, err := os.Create("response.txt")
	if err != nil {
		fmt.Println("Error creating destination file:", err)
		return
	}
	defer destinationFile.Close()

	// 复制HTTP响应的前1KB到文件
	n, err := io.CopyN(destinationFile, resp.Body, 1024)
	if err != nil {
		fmt.Println("Error copying file:", err)
		return
	}

	fmt.Printf("Copied %d bytes\n", n) // 输出: Copied 1024 bytes
}
```

3. **限制从标准输入读取的字节数：**

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	// 复制标准输入的前50字节到标准输出
	n, err := io.CopyN(os.Stdout, os.Stdin, 50)
	if err != nil {
		fmt.Println("Error copying:", err)
		return
	}

	fmt.Printf("\nCopied %d bytes\n", n) // 输出: Copied 50 bytes
}
```

这些场景展示了 `io.CopyN` 方法的一些常见用法，从复制文件的一部分到另一个文件到限制从标准输入读取的字节数。