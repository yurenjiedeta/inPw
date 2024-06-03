`FindAllStringSubmatchIndex` 方法用于在输入字符串中查找所有匹配正则表达式的子串，并返回它们的起始和结束索引。下面是一些使用场景和对应的输出注释：

1. **匹配邮箱地址并提取用户名和域名**：

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // 定义邮箱地址的正则表达式
    emailRegex := regexp.MustCompile(`([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})`)
    // 待匹配的字符串
    text := "我的邮箱是test@example.com和another@example.org。"
    // 查找所有匹配项的索引
    matches := emailRegex.FindAllStringSubmatchIndex(text, -1)
    // 遍历匹配项
    for _, match := range matches {
        // 提取用户名和域名
        usernameStart := match[2]
        usernameEnd := match[3]
        domainStart := match[4]
        domainEnd := match[5]
        fmt.Printf("用户名：%s, 域名：%s\n", text[usernameStart:usernameEnd], text[domainStart:domainEnd])
    }
}
```

输出注释：

```
用户名：test, 域名：example.com
用户名：another, 域名：example.org
```

2. **提取HTML标签及其内容**：

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // 定义HTML标签的正则表达式
    htmlRegex := regexp.MustCompile(`<([a-zA-Z]+)[^>]*>(.*?)<\/\1>`)
    // 待匹配的字符串
    html := "<div>这是一个<div>嵌套</div>的示例。</div>"
    // 查找所有匹配项的索引
    matches := htmlRegex.FindAllStringSubmatchIndex(html, -1)
    // 遍历匹配项
    for _, match := range matches {
        // 提取标签和内容
        tagStart := match[2]
        tagEnd := match[3]
        contentStart := match[4]
        contentEnd := match[5]
        fmt.Printf("标签：%s, 内容：%s\n", html[tagStart:tagEnd], html[contentStart:contentEnd])
    }
}
```

输出注释：

```
标签：div, 内容：这是一个<div>嵌套</div>的示例。
标签：div, 内容：嵌套
```

3. **提取文本中的日期**：

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // 定义日期的正则表达式
    dateRegex := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    // 待匹配的字符串
    text := "在2024-06-03这一天，我们学习正则表达式。"
    // 查找所有匹配项的索引
    matches := dateRegex.FindAllStringSubmatchIndex(text, -1)
    // 遍历匹配项
    for _, match := range matches {
        // 提取年、月、日
        yearStart := match[2]
        yearEnd := match[3]
        monthStart := match[4]
        monthEnd := match[5]
        dayStart := match[6]
        dayEnd := match[7]
        fmt.Printf("日期：%s年%s月%s日\n", text[yearStart:yearEnd], text[monthStart:monthEnd], text[dayStart:dayEnd])
    }
}
```

输出注释：

```
日期：2024年06月03日
```