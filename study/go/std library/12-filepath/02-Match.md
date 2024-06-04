`path/filepath.Match` 方法用于检查路径名是否与指定的模式匹配。模式中可以使用 `*`（匹配零个或多个字符）和 `?`（匹配单个字符）通配符。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：简单的文件名匹配

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	matched, err := filepath.Match("*.txt", "file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Matched:", matched)
}
```

**输出：**
```
Matched: true
```

**注释：** 这个场景中，使用 `path/filepath.Match` 方法检查文件名 "file.txt" 是否匹配模式 "*.txt"，返回匹配结果。

### 场景2：带有通配符的路径匹配

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	matched, err := filepath.Match("/path/to/*.txt", "/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Matched:", matched)
}
```

**输出：**
```
Matched: true
```

**注释：** 这个场景中，使用 `path/filepath.Match` 方法检查路径 "/path/to/file.txt" 是否匹配模式 "/path/to/*.txt"，返回匹配结果。

### 场景3：模糊匹配多个文件

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	pattern := "prefix-*.txt"
	files := []string{"prefix-file1.txt", "prefix-file2.txt", "other-file.txt"}

	for _, file := range files {
		matched, err := filepath.Match(pattern, file)
		if err != nil {
			fmt.Println("Error:", err)
			continue
		}

		if matched {
			fmt.Printf("Matched: %s\n", file)
		} else {
			fmt.Printf("Not matched: %s\n", file)
		}
	}
}
```

**输出：**
```
Matched: prefix-file1.txt
Matched: prefix-file2.txt
Not matched: other-file.txt
```

**注释：** 这个场景中，使用 `path/filepath.Match` 方法检查文件列表中的文件是否匹配模式 "prefix-*.txt"，并打印匹配结果。