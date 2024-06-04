`strings.Trim` 是 Go 语言中的一个函数，用于去除字符串开头和结尾的指定字符集合。该函数签名如下：

```go
func Trim(s string, cutset string) string
```

参数：
- `s`: 要修剪的字符串。
- `cutset`: 要去除的字符集合。

返回值：
- 返回修剪后的字符串。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 去除字符串开头和结尾的空白字符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "  Hello, GoLang!  "
	trimmed := strings.Trim(str, " \t\n\r\v")
	fmt.Printf("[%s]\n", trimmed) // 输出: [Hello, GoLang!]
}
```

注释：此场景去除了字符串开头和结尾的空白字符（包括空格、制表符、换行符等）。结果为 `Hello, GoLang!`。

### 场景 2: 去除字符串开头和结尾的指定字符集合

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "-Hello, GoLang!-"
	trimmed := strings.Trim(str, "-!")
	fmt.Printf("[%s]\n", trimmed) // 输出: [Hello, GoLang]
}
```

注释：此场景去除了字符串开头和结尾的指定字符集合 `"-!"`。结果为 `Hello, GoLang`。

### 场景 3: 去除字符串开头的数字字符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "123GoLang"
	trimmed := strings.TrimLeftFunc(str, unicode.IsDigit)
	fmt.Println(trimmed) // 输出: GoLang
}
```

注释：此场景去除了字符串开头的数字字符。结果为 `GoLang`。

### 场景 4: 去除字符串结尾的特殊符号

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello, GoLang!!"
	trimmed := strings.TrimRightFunc(str, func(r rune) bool {
		return unicode.IsPunct(r)
	})
	fmt.Println(trimmed) // 输出: Hello, GoLang
}
```

注释：此场景去除了字符串结尾的特殊符号（标点符号）。结果为 `Hello, GoLang`。

### 场景 5: 去除字符串开头和结尾的空格和换行符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "\n   Hello, GoLang! \t\n"
	trimmed := strings.TrimSpace(str)
	fmt.Printf("[%s]\n", trimmed) // 输出: [Hello, GoLang!]
}
```

注释：此场景去除了字符串开头和结尾的空格和换行符。结果为 `Hello, GoLang!`。

这些示例展示了 `strings.Trim` 的多种使用场景，通过不同的字符集合去除字符串开头和结尾的指定字符。