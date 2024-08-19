**总结**: `strings`包提供了查找、替换、分割、拼接、转换大小写等字符串操作的函数，用于处理和操作文本数据。

**示例**:
```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "  Hello, Go!  "

    // 1. 查找是否包含子串
    contains := strings.Contains(str, "Go")
    fmt.Println("Contains 'Go':", contains) // 输出: Contains 'Go': true

    // 2. 替换子串
    replacedStr := strings.Replace(str, "Go", "Golang", 1)
    fmt.Println("Replaced string:", replacedStr) // 输出: Replaced string:   Hello, Golang!  

    // 3. 分割字符串
    parts := strings.Split(str, ",")
    fmt.Println("Splitted parts:", parts) // 输出: Splitted parts: [  Hello  Go!  ]

    // 4. 拼接字符串
    joinedStr := strings.Join(parts, " & ")
    fmt.Println("Joined string:", joinedStr) // 输出: Joined string:   Hello &  Go!  

    // 5. 转换为大写
    upperStr := strings.ToUpper(str)
    fmt.Println("Uppercase string:", upperStr) // 输出: Uppercase string:   HELLO, GO!  
}
```

**解析**: 这个例子展示了`strings`包的几个主要功能：查找子串、替换子串、分割字符串、拼接字符串以及转换字符串为大写。