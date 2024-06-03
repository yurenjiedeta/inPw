`strings.IndexFunc` 是 Go 语言中的一个函数，用于查找字符串中满足给定条件的第一个字符的索引。该函数签名如下：

```go
func IndexFunc(s string, f func(rune) bool) int
```

参数：
- `s`: 要搜索的字符串。
- `f`: 一个函数，接收一个 `rune` 并返回一个 `bool`，用于指定搜索条件。

返回值：
- 满足条件的第一个字符的索引。如果没有找到，则返回 -1。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 查找第一个数字字符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello, GoLang123"
	index := strings.IndexFunc(str, unicode.IsDigit)
	fmt.Println(index) // 输出: 12
}
```

注释：此场景查找字符串中第一个数字字符（`'1'`）的位置。结果为 12，因为 `'1'` 是第 13 个字符，索引从 0 开始。

### 场景 2: 查找第一个大写字母

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "hello, GoLang"
	index := strings.IndexFunc(str, unicode.IsUpper)
	fmt.Println(index) // 输出: 7
}
```

注释：此场景查找字符串中第一个大写字母（`'G'`）的位置。结果为 7。

### 场景 3: 查找第一个非字母字符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "HelloWorld!123"
	index := strings.IndexFunc(str, func(r rune) bool {
		return !unicode.IsLetter(r)
	})
	fmt.Println(index) // 输出: 10
}
```

注释：此场景查找字符串中第一个非字母字符（`'!'`）的位置。结果为 10。

### 场景 4: 查找第一个空白字符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello GoLang"
	index := strings.IndexFunc(str, unicode.IsSpace)
	fmt.Println(index) // 输出: 5
}
```

注释：此场景查找字符串中第一个空白字符（空格 `' '`）的位置。结果为 5。

### 场景 5: 查找第一个特殊符号

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Go-Lang!123"
	index := strings.IndexFunc(str, func(r rune) bool {
		return unicode.IsPunct(r)
	})
	fmt.Println(index) // 输出: 2
}
```

注释：此场景查找字符串中第一个标点符号（`'-'`）的位置。结果为 2。

这些示例展示了 `strings.IndexFunc` 的多种使用场景，通过不同的条件函数查找字符串中第一个满足条件的字符的位置。