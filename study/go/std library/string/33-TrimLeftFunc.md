`TrimLeftFunc` 方法是 `strings` 包中的一个功能，它可以根据用户定义的函数来删除字符串开头的字符。下面是一些 `TrimLeftFunc` 方法的使用场景及其输出的注释：

1. **删除字符串开头的空格**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // 定义一个函数，判断字符是否为空格
    isSpace := func(r rune) bool {
        return r == ' '
    }
    // 使用 TrimLeftFunc 删除字符串开头的空格
    trimmed := strings.TrimLeftFunc("   Hello, World!", isSpace)
    fmt.Println(trimmed) // Output: "Hello, World!"
}
```

2. **删除字符串开头的特定字符**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // 定义一个函数，判断字符是否为特定字符
    isChar := func(r rune) bool {
        return r == 'H' || r == 'e'
    }
    // 使用 TrimLeftFunc 删除字符串开头的特定字符
    trimmed := strings.TrimLeftFunc("Hello, World!", isChar)
    fmt.Println(trimmed) // Output: ", World!"
}
```

3. **删除字符串开头的数字**：

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    // 定义一个函数，判断字符是否为数字
    isDigit := func(r rune) bool {
        return unicode.IsDigit(r)
    }
    // 使用 TrimLeftFunc 删除字符串开头的数字
    trimmed := strings.TrimLeftFunc("123Hello, World!", isDigit)
    fmt.Println(trimmed) // Output: "Hello, World!"
}
```

4. **删除字符串开头的自定义字符集合**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // 定义一个函数，判断字符是否为自定义字符集合中的字符
    isInCustomSet := func(r rune) bool {
        customSet := "!@#$%^&*()"
        return strings.ContainsRune(customSet, r)
    }
    // 使用 TrimLeftFunc 删除字符串开头的自定义字符集合中的字符
    trimmed := strings.TrimLeftFunc("!@#$Hello, World!", isInCustomSet)
    fmt.Println(trimmed) // Output: "Hello, World!"
}
```

这些例子展示了 `TrimLeftFunc` 方法的灵活性，你可以根据自己的需求定义任何函数来决定删除哪些字符。