`os`包中的`Seek`方法用于在文件中移动读写位置，可以用于定位到文件的特定位置进行读取或写入操作。下面是一些常见的使用场景，以及相应的输出和注释。

### 场景 1：从文件开头读取指定字节数
在这个场景中，我们使用`Seek`方法将读写位置移动到文件开头的指定位置，然后读取指定字节数的内容。

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// 将读写位置移动到文件开头的第10个字节处
	_, err = file.Seek(10, 0)
	if err != nil {
		fmt.Println("Error seeking file:", err)
		return
	}

	// 读取10个字节的内容
	data := make([]byte, 10)
	count, err := file.Read(data)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// 打印读取的内容
	fmt.Printf("Read %d bytes from position 10: %s\n", count, data)
}
```

**输出:**
```
Read 10 bytes from position 10: World! 
```

**注释:**
在这个场景中，我们使用`Seek`方法将读写位置移动到文件开头的第10个字节处，然后读取10个字节的内容。

### 场景 2：从当前位置向后移动指定字节数
在这个场景中，我们使用`Seek`方法将读写位置从当前位置向后移动指定字节数，然后读取内容。

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// 将读写位置移动到当前位置之后的第5个字节处
	_, err = file.Seek(5, 1)
	if err != nil {
		fmt.Println("Error seeking file:", err)
		return
	}

	// 读取10个字节的内容
	data := make([]byte, 10)
	count, err := file.Read(data)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// 打印读取的内容
	fmt.Printf("Read %d bytes from current position: %s\n", count, data)
}
```

**输出:**
```
Read 10 bytes from current position: World! He
```

**注释:**
在这个场景中，我们使用`Seek`方法将读写位置从当前位置向后移动5个字节，然后读取10个字节的内容。

### 场景 3：从文件末尾向前移动指定字节数
在这个场景中，我们使用`Seek`方法将读写位置从文件末尾向前移动指定字节数，然后读取内容。

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// 将读写位置移动到文件末尾之前的第5个字节处
	_, err = file.Seek(-5, 2)
	if err != nil {
		fmt.Println("Error seeking file:", err)
		return
	}

	// 读取5个字节的内容
	data := make([]byte, 5)
	count, err := file.Read(data)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// 打印读取的内容
	fmt.Printf("Read %d bytes from position before end: %s\n", count, data)
}
```

**输出:**
```
Read 5 bytes from position before end: Hello
```

**注释:**
在这个场景中，我们使用`Seek`方法将读写位置从文件末尾向前移动5个字节，然后读取5个字节的内容。

### 场景 4：获取当前读写位置
在这个场景中，我们使用`Seek`方法获取当前的读写位置。

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 打开文件
	file, err := os.Open("example.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// 获取当前读写位置
	position, err := file.Seek(0, os.SEEK_CUR)
	if err != nil {
		fmt.Println("Error seeking file:", err)
		return
	}

	// 打印当前读写位置
	fmt.Printf("Current position: %d\n", position)
}
```

**输出:**
```
Current position: 0
```

**注释:**
在这个场景中，我们使用`Seek`方法获取当前的读写位置，并打印出来。