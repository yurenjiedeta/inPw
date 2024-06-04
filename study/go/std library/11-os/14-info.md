这些方法都与文件系统交互，并提供了关于文件和目录信息的访问。下面是它们的使用场景：

### ReadDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	dirEntries, err := os.ReadDir("/path/to/directory")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	for _, entry := range dirEntries {
		fmt.Println(entry.Name())
	}
}
```

**注释：** `os.ReadDir` 用于读取目录中的条目，并返回一个包含 `os.DirEntry` 结构体的切片。

### Name

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("File name:", info.Name())
}
```

**输出：**
```
File name: file.txt
```

**注释：** `os.FileInfo.Name` 用于获取文件或目录的名称。

### IsDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/directory")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Is directory:", info.IsDir())
}
```

**输出：**
```
Is directory: true
```

**注释：** `os.FileInfo.IsDir` 用于检查文件是否是目录。

### Type

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("File type:", info.Type())
}
```

**输出：**
```
File type: file
```

**注释：** `os.FileInfo.Type` 用于获取文件的类型，可能是 `file`、`dir`、`symlink` 等。

### Info

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("File info:", info)
}
```

**输出：**
```
File info: -rw-r--r-- 1 user group 1234 Jun 1 12:34 file.txt
```

**注释：** `os.Stat` 返回的 `os.FileInfo` 包含有关文件的信息，如权限、大小、修改时间等。

### Size

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("File size (bytes):", info.Size())
}
```

**输出：**
```
File size (bytes): 1234
```

**注释：** `os.FileInfo.Size` 用于获取文件的大小（以字节为单位）。

### Mode

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("File mode:", info.Mode())
}
```

**输出：**
```
File mode: -rw-r--r--
```

**注释：** `os.FileInfo.Mode` 用于获取文件的权限模式。

### ModTime

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	info, err := os.Stat("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Modification time:", info.ModTime())
}
```

**输出：**
```
Modification time: 2022-06-01 12:34:56 +0000 UTC
```

**注释：** `os.FileInfo.ModTime` 用于获取文件的修改时间。