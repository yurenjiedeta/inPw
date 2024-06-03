`regexp` 包中的 `MatchString` 方法用于检查正则表达式是否与给定的字符串匹配。以下是一些 `MatchString` 方法的使用场景以及对应的输出和注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 场景1: 检查字符串是否匹配给定的正则表达式
	match, _ := regexp.MatchString("go", "golang")
	fmt.Println(match) // 输出: true，字符串 "golang" 中包含 "go" 子串

	// 场景2: 使用元字符 "." 进行匹配
	match2, _ := regexp.MatchString("a.b", "acb")
	fmt.Println(match2) // 输出: true，字符串 "acb" 中的 "a.b" 匹配到 "acb"

	// 场景3: 使用字符类进行匹配
	match3, _ := regexp.MatchString("[a-z]+", "hello")
	fmt.Println(match3) // 输出: true，字符串 "hello" 是小写字母组成的

	// 场景4: 使用反义符号 "^" 进行匹配
	match4, _ := regexp.MatchString("^hello", "hello world")
	fmt.Println(match4) // 输出: true，字符串 "hello world" 以 "hello" 开头

	// 场景5: 检查字符串是否包含数字
	match5, _ := regexp.MatchString("[0-9]+", "abc123def")
	fmt.Println(match5) // 输出: true，字符串 "abc123def" 中包含数字

	// 场景6: 使用量词进行匹配
	match6, _ := regexp.MatchString("x{3}", "xxxy")
	fmt.Println(match6) // 输出: true，字符串 "xxxy" 中有三个连续的 'x'

	// 场景7: 匹配 Email 地址
	match7, _ := regexp.MatchString(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`, "user@example.com")
	fmt.Println(match7) // 输出: true，字符串 "user@example.com" 符合 Email 地址的格式
}
```

这些场景展示了 `MatchString` 方法在不同情况下的使用，可以用于各种正则表达式模式的匹配。