`TrimFunc` 方法可以根据自定义函数中定义的规则来修剪字符串。以下是一些可能的使用场景和它们的输出：

1. **去除字符串中的空格和换行符：**
```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "  Hello\nWorld  "
    trimFunc := func(r rune) bool {
        return r == ' ' || r == '\n'
    }
    trimmed := strings.TrimFunc(str, trimFunc)
    fmt.Println(trimmed) // Output: "HelloWorld"
}
```

2. **去除字符串中的元音字母：**
```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "Hello World"
    trimFunc := func(r rune) bool {
        return strings.ContainsRune("aeiouAEIOU", r)
    }
    trimmed := strings.TrimFunc(str, trimFunc)
    fmt.Println(trimmed) // Output: "Hll Wrld"
}
```

3. **去除字符串中的非字母字符：**
```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    str := "123abc456"
    trimFunc := func(r rune) bool {
        return !unicode.IsLetter(r)
    }
    trimmed := strings.TrimFunc(str, trimFunc)
    fmt.Println(trimmed) // Output: "abc"
}
```

4. **去除字符串中的特定字符序列：**
```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "appleorangeapplebananaapple"
    trimFunc := func(r rune) bool {
        return strings.HasPrefix(str, "apple")
    }
    trimmed := strings.TrimFunc(str, trimFunc)
    fmt.Println(trimmed) // Output: "orangebananaapple"
}
```

`TrimFunc` 方法允许您根据自定义的规则来修剪字符串，使得它非常灵活和适用于各种不同的情况。