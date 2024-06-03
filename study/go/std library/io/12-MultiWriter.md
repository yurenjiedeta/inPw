`io.MultiWriter` 方法用于创建一个同时向多个写入器写入数据的写入器。这使得可以将数据同时写入多个目标，例如文件、标准输出、网络连接等。以下是 `io.MultiWriter` 方法的一些使用场景及其输出的示例：

1. **将数据同时写入文件和标准输出：**

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	file, err := os.Create("output.txt")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	multiWriter := io.MultiWriter(file, os.Stdout)

	message := []byte("Hello, MultiWriter!\n")
	_, err = multiWriter.Write(message)
	if err != nil {
		fmt.Println("Error writing:", err)
		return
	}
}
```

2. **同时将数据写入多个文件：**

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	file1, err := os.Create("file1.txt")
	if err != nil {
		fmt.Println("Error creating file1:", err)
		return
	}
	defer file1.Close()

	file2, err := os.Create("file2.txt")
	if err != nil {
		fmt.Println("Error creating file2:", err)
		return
	}
	defer file2.Close()

	multiWriter := io.MultiWriter(file1, file2)

	message := []byte("Hello, MultiWriter!\n")
	_, err = multiWriter.Write(message)
	if err != nil {
		fmt.Println("Error writing:", err)
		return
	}
}
```

3. **同时将数据写入网络连接和标准输出：**

```go
package main

import (
	"fmt"
	"io"
	"net"
	"os"
)

func main() {
	conn, err := net.Dial("tcp", "example.com:80")
	if err != nil {
		fmt.Println("Error connecting to server:", err)
		return
	}
	defer conn.Close()

	multiWriter := io.MultiWriter(conn, os.Stdout)

	message := []byte("GET / HTTP/1.1\nHost: example.com\n\n")
	_, err = multiWriter.Write(message)
	if err != nil {
		fmt.Println("Error writing:", err)
		return
	}
}
```

这些场景展示了 `io.MultiWriter` 方法的一些常见用法，从将数据同时写入文件和标准输出到同时将数据写入多个文件。