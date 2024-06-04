`os.WriteFile` 方法用于将字节切片写入文件中。它提供了一种简单且高效的方式来将数据写入文件。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：写入文本内容到文件中

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "example.txt"
	content := []byte("This is an example content.")

	err := os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Content successfully written to", filePath)
}
```

**注释：** 这个场景中，使用 `os.WriteFile` 方法将指定的文本内容写入到文件中，并指定文件权限为 `0644`。

### 场景2：写入二进制数据到文件中

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "binary_file.bin"
	content := []byte{0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x77, 0x6F, 0x72, 0x6C, 0x64, 0x21}

	err := os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Binary data successfully written to", filePath)
}
```

**注释：** 这个场景中，使用 `os.WriteFile` 方法将指定的二进制数据写入到文件中，并指定文件权限为 `0644`。

### 场景3：覆盖已存在的文件内容

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "example.txt"
	content := []byte("This is a new content.")

	err := os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Content successfully overwritten in", filePath)
}
```

**注释：** 这个场景中，使用 `os.WriteFile` 方法将新的内容写入到已存在的文件中，会覆盖掉原有的内容。

### 场景4：创建新文件并写入内容

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "new_file.txt"
	content := []byte("This is a new file.")

	err := os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("New file created with content in", filePath)
}
```

**注释：** 这个场景中，使用 `os.WriteFile` 方法创建一个新文件，并将指定的内容写入到文件中。

### 场景5：写入空内容到文件中

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "empty_file.txt"
	content := []byte("")

	err := os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Empty content successfully written to", filePath)
}
```

**注释：** 这个场景中，使用 `os.WriteFile` 方法将空内容写入到文件中。