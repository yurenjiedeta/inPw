`os.Stat` 方法用于获取文件的信息，包括文件的大小、权限、修改时间等。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：获取文件信息并打印文件大小

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "example.txt"
	info, err := os.Stat(filePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("File size of %s: %d bytes\n", filePath, info.Size())
}
```

**输出：**
```
File size of example.txt: 1024 bytes
```

**注释：** 这个场景中，使用 `os.Stat` 方法获取了文件 "example.txt" 的信息，并打印了文件的大小。

### 场景2：检查文件是否为目录

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "directory"
	info, err := os.Stat(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Println("File or directory does not exist")
		} else {
			fmt.Println("Error:", err)
		}
		return
	}

	if info.IsDir() {
		fmt.Printf("%s is a directory\n", filePath)
	} else {
		fmt.Printf("%s is not a directory\n", filePath)
	}
}
```

**输出：**
```
directory is a directory
```

**注释：** 这个场景中，使用 `os.Stat` 方法获取了目录 "directory" 的信息，并检查该目录是否为目录类型。

### 场景3：获取文件的权限模式

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "example.txt"
	info, err := os.Stat(filePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("File mode of %s: %s\n", filePath, info.Mode().String())
}
```

**输出：**
```
File mode of example.txt: -rw-r--r--
```

**注释：** 这个场景中，使用 `os.Stat` 方法获取了文件 "example.txt" 的信息，并打印了文件的权限模式。

### 场景4：获取文件的修改时间

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	filePath := "example.txt"
	info, err := os.Stat(filePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Modification time of %s: %s\n", filePath, info.ModTime().String())
}
```

**输出：**
```
Modification time of example.txt: 2022-06-01 12:34:56 +0000 UTC
```

**注释：** 这个场景中，使用 `os.Stat` 方法获取了文件 "example.txt" 的信息，并打印了文件的修改时间。