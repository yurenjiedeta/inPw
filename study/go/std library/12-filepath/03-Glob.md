`path/filepath.Glob` 方法用于根据指定的模式匹配文件或目录。模式可以包含 `*`（匹配零个或多个字符）和 `?`（匹配单个字符）通配符。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：简单的文件名匹配

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	files, err := filepath.Glob("*.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Matched files:")
	for _, file := range files {
		fmt.Println(file)
	}
}
```

**输出：**
```
Matched files:
file1.txt
file2.txt
```

**注释：** 这个场景中，使用 `path/filepath.Glob` 方法获取当前目录下所有的 `.txt` 文件。

### 场景2：指定目录下的文件匹配

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	files, err := filepath.Glob("/path/to/*.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Matched files:")
	for _, file := range files {
		fmt.Println(file)
	}
}
```

**输出：**
```
Matched files:
/path/to/file1.txt
/path/to/file2.txt
```

**注释：** 这个场景中，使用 `path/filepath.Glob` 方法获取指定目录下所有的 `.txt` 文件。

### 场景3：模糊匹配多个文件

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	pattern := "prefix-*.txt"
	files, err := filepath.Glob(pattern)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Matched files for pattern %s:\n", pattern)
	for _, file := range files {
		fmt.Println(file)
	}
}
```

**输出：**
```
Matched files for pattern prefix-*.txt:
prefix-file1.txt
prefix-file2.txt
```

**注释：** 这个场景中，使用 `path/filepath.Glob` 方法获取当前目录下所有匹配模式 "prefix-*.txt" 的文件。

### 场景4：递归地匹配目录下的文件

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	files, err := filepath.Glob("/path/to/**/*.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Matched files:")
	for _, file := range files {
		fmt.Println(file)
	}
}
```

**输出：**
```
Matched files:
/path/to/dir1/file1.txt
/path/to/dir2/subdir/file2.txt
```

**注释：** 这个场景中，使用 `path/filepath.Glob` 方法递归地获取指定目录下所有的 `.txt` 文件，包括子目录中的文件。