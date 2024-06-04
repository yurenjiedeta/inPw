这些函数都是关于路径和环境的，它们用于获取各种常见位置的路径信息。下面是它们的使用场景：

### Getwd

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Current working directory:", wd)
}
```

**输出：**
```
Current working directory: /path/to/current/directory
```

**注释：** `os.Getwd` 用于获取当前工作目录的路径。

### UserHomeDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("User's home directory:", homeDir)
}
```

**输出：**
```
User's home directory: /home/user
```

**注释：** `os.UserHomeDir` 用于获取当前用户的主目录路径。

### UserCacheDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("User's cache directory:", cacheDir)
}
```

**输出：**
```
User's cache directory: /home/user/.cache
```

**注释：** `os.UserCacheDir` 用于获取当前用户的缓存目录路径。

### UserConfigDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	configDir, err := os.UserConfigDir()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("User's config directory:", configDir)
}
```

**输出：**
```
User's config directory: /home/user/.config
```

**注释：** `os.UserConfigDir` 用于获取当前用户的配置文件目录路径。

### TempDir

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	tempDir := os.TempDir()
	fmt.Println("Temporary directory:", tempDir)
}
```

**输出：**
```
Temporary directory: /tmp
```

**注释：** `os.TempDir` 用于获取系统的临时目录路径。