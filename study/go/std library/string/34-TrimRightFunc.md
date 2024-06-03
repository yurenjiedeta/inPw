`TrimRightFunc` 方法是 Go 语言 `strings` 包中的一个函数，它可以根据自定义的条件去除字符串末尾的字符。下面是一些 `TrimRightFunc` 方法的使用场景：

### 场景一：去除字符串末尾的空格和换行符
```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world\n\n"
	trimFunc := func(r rune) bool {
		return r == ' ' || r == '\n'
	}
	result := strings.TrimRightFunc(str, trimFunc)
	fmt.Println(result) // 输出：hello world
}
```
这个例子中，`TrimRightFunc` 方法通过自定义的函数 `trimFunc` 去除了字符串末尾的空格和换行符。

### 场景二：去除字符串末尾的数字
```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	str := "abc123456"
	trimFunc := func(r rune) bool {
		return unicode.IsDigit(r)
	}
	result := strings.TrimRightFunc(str, trimFunc)
	fmt.Println(result) // 输出：abc
}
```
在这个例子中，`TrimRightFunc` 方法通过自定义的函数 `trimFunc` 去除了字符串末尾的数字。

### 场景三：去除字符串末尾的特定字符集合
```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world!!!"
	trimFunc := func(r rune) bool {
		return strings.ContainsRune("!", r)
	}
	result := strings.TrimRightFunc(str, trimFunc)
	fmt.Println(result) // 输出：hello world
}
```
在这个例子中，`TrimRightFunc` 方法通过自定义的函数 `trimFunc` 去除了字符串末尾的感叹号。

### 场景四：去除字符串末尾的空格和指定字符
```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello world ! ! !"
	trimFunc := func(r rune) bool {
		return r == ' ' || r == '!'
	}
	result := strings.TrimRightFunc(str, trimFunc)
	fmt.Println(result) // 输出：hello world
}
```
在这个例子中，`TrimRightFunc` 方法通过自定义的函数 `trimFunc` 去除了字符串末尾的空格和感叹号。

这些场景展示了 `TrimRightFunc` 方法的灵活性，你可以根据自己的需求定义不同的函数来满足不同的去除条件。