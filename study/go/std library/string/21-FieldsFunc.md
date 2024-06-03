`strings.FieldsFunc` 是 Go 语言中的一个函数，用于根据自定义的分隔条件将字符串分割成多个子串。该函数签名如下：

```go
func FieldsFunc(s string, f func(rune) bool) []string
```

参数：
- `s`: 要分割的字符串。
- `f`: 一个函数，接收一个 `rune` 并返回一个 `bool`，用于指定分割条件。

返回值：
- 一个字符串切片，包含分割后的各个子串。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 使用空白字符作为分隔符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello GoLang World"
	fields := strings.FieldsFunc(str, unicode.IsSpace)
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用空白字符（如空格、制表符、换行符等）作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

### 场景 2: 使用标点符号作为分隔符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello,GoLang!World?"
	fields := strings.FieldsFunc(str, unicode.IsPunct)
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用标点符号作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

### 场景 3: 使用自定义字符作为分隔符（如逗号和分号）

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Hello,GoLang;World"
	fields := strings.FieldsFunc(str, func(r rune) bool {
		return r == ',' || r == ';'
	})
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用逗号和分号作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

### 场景 4: 使用数字字符作为分隔符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello1GoLang2World3"
	fields := strings.FieldsFunc(str, unicode.IsDigit)
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用数字字符作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

### 场景 5: 使用多个连续空白字符作为分隔符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello   GoLang\tWorld\n"
	fields := strings.FieldsFunc(str, unicode.IsSpace)
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用多个连续的空白字符作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

### 场景 6: 使用自定义的复合条件作为分隔符

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "Hello, GoLang!123 World?"
	fields := strings.FieldsFunc(str, func(r rune) bool {
		return unicode.IsPunct(r) || unicode.IsDigit(r) || unicode.IsSpace(r)
	})
	fmt.Println(fields) // 输出: [Hello GoLang World]
}
```

注释：此场景使用标点符号、数字字符和空白字符作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "GoLang", "World"]`。

这些示例展示了 `strings.FieldsFunc` 的多种使用场景，通过不同的条件函数将字符串分割成多个子串。