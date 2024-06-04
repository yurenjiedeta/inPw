`path/filepath.WalkDir` 方法用于递归遍历目录结构，并对每个文件或目录执行指定的函数。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：遍历目录结构并打印所有文件名

```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	root := "/path/to/directory"

	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Println("Error:", err)
			return err
		}
		if d.IsDir() {
			fmt.Printf("[%s]\n", path)
		} else {
			fmt.Println(path)
		}
		return nil
	})

	if err != nil {
		fmt.Println("Error:", err)
		return
	}
}
```

**输出：**
```
/path/to/directory/file1.txt
/path/to/directory/file2.txt
/path/to/directory/subdir1/file3.txt
[path/to/directory/subdir2]
/path/to/directory/subdir2/file4.txt
```

**注释：** 这个场景中，使用 `path/filepath.WalkDir` 方法递归地遍历目录 "/path/to/directory" 下的所有文件和子目录，并打印它们的路径。如果是目录，则路径会被方括号括起来。

### 场景2：在遍历目录结构时执行特定操作

```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	root := "/path/to/directory"
	totalSize := int64(0)

	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Println("Error:", err)
			return err
		}
		if !d.IsDir() {
			info, err := d.Info()
			if err != nil {
				return err
			}
			totalSize += info.Size()
		}
		return nil
	})

	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Total size of files in %s: %d bytes\n", root, totalSize)
}
```

**输出：**
```
Total size of files in /path/to/directory: 12345 bytes
```

**注释：** 这个场景中，使用 `path/filepath.WalkDir` 方法递归地遍历目录 "/path/to/directory" 下的所有文件，并计算它们的总大小。