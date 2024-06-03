`strings.Replace` 是 Go 语言中的一个函数，用于将字符串中的指定子串替换为另一个子串。该函数签名如下：

```go
func Replace(s, old, new string, n int) string
```

参数：
- `s`: 要进行替换操作的原始字符串。
- `old`: 要被替换的子串。
- `new`: 替换后的子串。
- `n`: 指定替换的次数，如果为 -1，则替换所有匹配的子串。

返回值：
- 返回替换后的新字符串。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 替换单个匹配的子串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world hello"
	newStr := strings.Replace(str, "hello", "hi", 1)
	fmt.Println(newStr) // 输出: hi world hello
}
```

注释：此场景将第一个匹配到的子串 "hello" 替换为 "hi"。结果为 `hi world hello`。

### 场景 2: 替换所有匹配的子串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world hello"
	newStr := strings.Replace(str, "hello", "hi", -1)
	fmt.Println(newStr) // 输出: hi world hi
}
```

注释：此场景将所有匹配到的子串 "hello" 替换为 "hi"。结果为 `hi world hi`。

### 场景 3: 替换包含特殊字符的子串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world, hello"
	newStr := strings.Replace(str, ",", ";", -1)
	fmt.Println(newStr) // 输出: hello world; hello
}
```

注释：此场景将字符串中的逗号替换为分号。结果为 `hello world; hello`。

### 场景 4: 替换空串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world hello"
	newStr := strings.Replace(str, "hello", "", -1)
	fmt.Println(newStr) // 输出:  world 
}
```

注释：此场景将字符串中的所有 "hello" 替换为空串，相当于删除 "hello"。结果为 ` world `。

### 场景 5: 指定替换次数

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world hello"
	newStr := strings.Replace(str, "hello", "hi", 1)
	fmt.Println(newStr) // 输出: hi world hello
}
```

注释：此场景将字符串中的第一个 "hello" 替换为 "hi"，因为指定了替换次数为 1。结果为 `hi world hello`。

### 场景 6: 替换空字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world hello"
	newStr := strings.Replace(str, "o", "", -1)
	fmt.Println(newStr) // 输出: hell wrld hell
}
```

注释：此场景将字符串中的所有 "o" 替换为空字符串。结果为 `hell wrld hell`。

这些示例展示了 `strings.Replace` 的多种使用场景，通过不同的参数替换字符串中的子串。