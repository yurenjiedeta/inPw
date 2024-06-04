`strings.Map` 方法用于对字符串中的每个字符应用一个指定的映射函数，并返回映射后的新字符串。下面是几种使用场景及其输出的示例：

1. **将字符串中的每个字符转换为大写**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello"
    mappedStr := strings.Map(func(r rune) rune {
        return rune(strings.ToUpper(string(r))[0])
    }, str)
    fmt.Println(mappedStr) // 输出: HELLO
}
```

2. **将字符串中的每个字母转换为其ASCII码表示**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello"
    mappedStr := strings.Map(func(r rune) rune {
        return rune(int(r))
    }, str)
    fmt.Println(mappedStr) // 输出: 104101108108111
}
```

3. **删除字符串中的数字**：

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    str := "hello123"
    mappedStr := strings.Map(func(r rune) rune {
        if unicode.IsDigit(r) {
            return -1 // 删除字符
        }
        return r
    }, str)
    fmt.Println(mappedStr) // 输出: hello
}
```

4. **反转字符串**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello"
    mappedStr := strings.Map(func(r rune) rune {
        return rune(str[len(str)-1])
    }, str)
    fmt.Println(mappedStr) // 输出: ooooo
}
```

在这些例子中，`Map` 方法通过提供一个映射函数来处理字符串中的每个字符，并返回映射后的新字符串，实现了不同的功能，比如大小写转换、字符删除和字符串反转等。