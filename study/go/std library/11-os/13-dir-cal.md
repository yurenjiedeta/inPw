这些函数都是关于文件和目录操作的，它们用于更改目录、创建目录、创建临时目录、移动文件、删除文件等。下面是它们的使用场景：

### Chdir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.Chdir("/path/to/new/directory")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Changed directory to /path/to/new/directory")
}
```

**注释：** `os.Chdir` 用于改变当前工作目录到指定的目录。

### Mkdir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.Mkdir("/path/to/new/directory", 0755)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Created directory /path/to/new/directory")
}
```

**注释：** `os.Mkdir` 用于在指定路径创建一个新的目录。

### MkdirAll

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.MkdirAll("/path/to/new/directory", 0755)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Created directory /path/to/new/directory and any necessary parents")
}
```

**注释：** `os.MkdirAll` 用于递归地创建指定路径中的所有目录。

### MkdirTemp

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	dir, err := os.MkdirTemp("", "prefix-")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Created temporary directory:", dir)
}
```

**注释：** `os.MkdirTemp` 用于创建一个新的临时目录，返回目录路径。

### Remove

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.Remove("/path/to/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("File /path/to/file.txt removed")
}
```

**注释：** `os.Remove` 用于删除指定的文件或空目录。

### RemoveAll

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.RemoveAll("/path/to/directory")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Directory /path/to/directory and its contents removed")
}
```

**注释：** `os.RemoveAll` 用于递归地删除指定的目录及其所有内容。

### Rename

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.Rename("/path/to/old/file.txt", "/path/to/new/file.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("File /path/to/old/file.txt renamed to /path/to/new/file.txt")
}
```

**注释：** `os.Rename` 用于将文件从一个路径移动到另一个路径，也可用于重命名文件。

### Symlink

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := os.Symlink("/path/to/target", "/path/to/symlink")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Symbolic link created: /path/to/symlink -> /path/to/target")
}
```

**注释：** `os.Symlink` 用于创建一个指向目标路径的符号链接。