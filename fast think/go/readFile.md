好的，`io/ioutil`包中的一些功能在新的Go版本中已经被标记为过时（deprecated）。我们可以使用`os`包和`io`包来读取文件内容。以下是使用这些包的一个示例：

```go
package main

import (
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// 读取文件内容
	content, err := io.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	// 输出文件内容
	fmt.Println(string(content))
}
```

如果你需要逐行读取文件内容，可以继续使用`bufio`包：

```go
package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// 创建一个扫描器来读取文件内容
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		// 输出每一行的内容
		fmt.Println(scanner.Text())
	}

	// 检查扫描过程中是否有错误
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
```

这两个示例展示了如何使用现代的Go标准库读取文件内容。