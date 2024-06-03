`io` 包中的 `MultiReader` 方法用于将多个 `Reader` 组合成单个 `Reader`，顺序读取数据。这在需要从多个来源读取数据的情况下非常有用。以下是 `MultiReader` 方法的一些使用场景以及对应的输出和注释：

```go
package main

import (
	"bytes"
	"fmt"
	"io"
)

func main() {
	// 场景1: 从多个字节切片中读取数据并合并成单个字节流
	reader1 := bytes.NewReader([]byte("Hello, "))
	reader2 := bytes.NewReader([]byte("world!"))
	multiReader := io.MultiReader(reader1, reader2)
	var result1 bytes.Buffer
	io.Copy(&result1, multiReader)
	fmt.Println(result1.String()) // 输出: Hello, world!

	// 场景2: 从文件和字节流中读取数据并合并成单个字节流
	fileContent := bytes.NewReader([]byte("This is the content of the file."))
	bufferContent := bytes.NewReader([]byte(" This is the content of the buffer."))
	multiReader2 := io.MultiReader(fileContent, bufferContent)
	var result2 bytes.Buffer
	io.Copy(&result2, multiReader2)
	fmt.Println(result2.String()) // 输出: This is the content of the file. This is the content of the buffer.

	// 场景3: 从多个来源读取数据并实时监测读取进度
	reader3 := bytes.NewReader([]byte("123"))
	reader4 := bytes.NewReader([]byte("456"))
	multiReader3 := io.MultiReader(reader3, reader4)
	var result3 bytes.Buffer
	var totalBytes int64
	buf := make([]byte, 1)
	for {
		n, err := multiReader3.Read(buf)
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
		totalBytes += int64(n)
		fmt.Printf("Read %d bytes, Total: %d\n", n, totalBytes)
		result3.Write(buf[:n])
	}
	fmt.Println(result3.String()) // 输出: 123456
}
```

这些场景展示了 `MultiReader` 方法在不同情况下的使用，可以用于从多个来源读取数据并合并成单个数据流，以及实时监测读取进度。