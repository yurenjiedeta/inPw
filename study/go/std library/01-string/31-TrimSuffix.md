`TrimSuffix` 方法用于删除字符串末尾指定的后缀，并返回结果字符串。

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	// 1. 删除文件后缀名
	fileName := "document.txt"
	trimmed := strings.TrimSuffix(fileName, ".txt")
	fmt.Println(trimmed) // 输出: document

	// 2. 删除URL中的查询参数
	url := "https://example.com/page?param=value"
	trimmedURL := strings.TrimSuffix(url, "?param=value")
	fmt.Println(trimmedURL) // 输出: https://example.com/page

	// 3. 删除空白后缀
	sentence := "Hello, World!   "
	trimmedSentence := strings.TrimSuffix(sentence, "   ")
	fmt.Println(trimmedSentence) // 输出: Hello, World!

	// 4. 删除换行符后缀
	multiLine := "This is a multi-line string\n"
	trimmedLine := strings.TrimSuffix(multiLine, "\n")
	fmt.Println(trimmedLine) // 输出: This is a multi-line string
}
```

`TrimSuffix` 方法还可以应用于其他需要删除指定后缀的场景，如清理路径、修剪特殊字符等。