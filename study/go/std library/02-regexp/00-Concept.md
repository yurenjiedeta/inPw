### 功能概述
`regexp`包提供了一整套功能，支持正则表达式的编译、匹配、替换和分割等操作。主要功能包括：

1. **编译正则表达式**：
   - 使用`regexp.Compile`和`regexp.MustCompile`函数编译正则表达式模式，生成`Regexp`对象。
   
2. **匹配操作**：
   - `MatchString`方法：检查整个字符串是否匹配正则表达式。
   - `Match`方法：检查字节切片是否匹配正则表达式。
   - `Find`、`FindAll`系列方法：在输入字符串中查找与正则表达式匹配的子串，支持返回第一个匹配或所有匹配。

3. **捕获组和子表达式**：
   - 支持通过括号定义捕获组，提取匹配的子串。
   - `FindStringSubmatch`和`FindAllStringSubmatch`方法：返回匹配的子串及其捕获组。

4. **替换操作**：
   - `ReplaceAllString`和`ReplaceAll`: 将匹配的子串替换为指定的字符串或字节切片。

5. **分割字符串**：
   - `Split`方法：根据正则表达式匹配的位置将字符串分割成多个子串。

6. **正则表达式属性和信息**：
   - `String`方法：返回正则表达式的字符串表示形式。
   - `NumSubexp`方法：返回正则表达式中捕获组的数量。

### 示例代码

以下是一个简单的示例代码，演示如何使用`regexp`包的主要功能：

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // 编译正则表达式
    re, err := regexp.Compile(`(\w+)\s+(\w+)`)
    if err != nil {
        fmt.Println("Error compiling regex:", err)
        return
    }

    // 匹配字符串
    str := "Hello World"
    if re.MatchString(str) {
        fmt.Println("String matches the regex")
    }

    // 查找匹配的子串
    matches := re.FindStringSubmatch(str)
    if len(matches) > 0 {
        fmt.Println("Full match:", matches[0])
        fmt.Println("First word:", matches[1])
        fmt.Println("Second word:", matches[2])
    }

    // 替换匹配的子串
    replacedStr := re.ReplaceAllString(str, "$2, $1")
    fmt.Println("Replaced string:", replacedStr)

    // 分割字符串
    parts := re.Split("Hello World and Universe", -1)
    fmt.Println("Split parts:", parts)
}
```
