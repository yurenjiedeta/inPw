`bufio.Peek` 方法用于在不读取数据的情况下查看下一个字节或字符。以下是 `bufio.Peek` 方法的一些使用场景及其输出的示例：

1. **查看下一个字节但不读取：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter a character: ")
	char, err := reader.Peek(1)
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	fmt.Printf("Next character: %q\n", char[0]) // 输出下一个字符
}
```

2. **查看下一个字节并与指定字节比较：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter a character: ")
	nextChar, err := reader.Peek(1)
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	if nextChar[0] == 'A' {
		fmt.Println("Next character is 'A'")
	} else {
		fmt.Println("Next character is not 'A'")
	}
}
```

3. **查看下一个字符并决定是否继续读取：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter a character: ")
	nextChar, _, err := reader.ReadRune()
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	if nextChar == 'y' || nextChar == 'Y' {
		fmt.Println("Reading user input further...")
		// 继续读取用户输入
	} else {
		fmt.Println("Reading stopped")
	}
}
```

4. **查看下一个字节并决定是否读取下一行：**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter a line of text: ")
	nextLine, err := reader.Peek(1)
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	if nextLine[0] == '\n' {
		fmt.Println("Empty line detected")
	} else {
		// 读取整行文本
		line, _, _ := reader.ReadLine()
		fmt.Println("Line of text:", string(line))
	}
}
```

这些场景展示了 `bufio.Peek` 方法的一些常见用法，从查看下一个字节但不读取到查看下一个字节并决定是否读取下一行。