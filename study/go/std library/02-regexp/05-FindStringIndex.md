`FindStringIndex` 方法用于在给定的字符串中查找与正则表达式匹配的第一个子串，并返回其起始和结束索引。以下是一些 `FindStringIndex` 方法的使用场景以及对应的输出和注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 场景1: 查找字符串中匹配 "go" 的子串的起始和结束索引
	re1 := regexp.MustCompile("go")
	index1 := re1.FindStringIndex([]byte("golang"))
	fmt.Println(index1) // 输出: [0 2]，子串 "go" 在字符串的索引范围 [0, 2) 中

	// 场景2: 查找字符串中匹配 "a.b" 的子串的起始和结束索引
	re2 := regexp.MustCompile("a.b")
	index2 := re2.FindStringIndex([]byte("acb"))
	fmt.Println(index2) // 输出: [0 3]，子串 "acb" 在字符串的索引范围 [0, 3) 中

	// 场景3: 查找字符串中匹配小写字母的子串的起始和结束索引
	re3 := regexp.MustCompile("[a-z]+")
	index3 := re3.FindStringIndex([]byte("hello"))
	fmt.Println(index3) // 输出: [0 5]，子串 "hello" 在字符串的索引范围 [0, 5) 中

	// 场景4: 查找以 "hello" 开头的子串的起始和结束索引
	re4 := regexp.MustCompile("^hello")
	index4 := re4.FindStringIndex([]byte("hello world"))
	fmt.Println(index4) // 输出: [0 5]，子串 "hello" 在字符串的索引范围 [0, 5) 中

	// 场景5: 查找字符串中的数字子串的起始和结束索引
	re5 := regexp.MustCompile("[0-9]+")
	index5 := re5.FindStringIndex([]byte("abc123def"))
	fmt.Println(index5) // 输出: [3 6]，子串 "123" 在字符串的索引范围 [3, 6) 中

	// 场景6: 查找字符串中连续三个 'x' 的子串的起始和结束索引
	re6 := regexp.MustCompile("x{3}")
	index6 := re6.FindStringIndex([]byte("xxxy"))
	fmt.Println(index6) // 输出: [0 3]，子串 "xxx" 在字符串的索引范围 [0, 3) 中

	// 场景7: 查找字符串中的 Email 地址的起始和结束索引
	re7 := regexp.MustCompile(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`)
	index7 := re7.FindStringIndex([]byte("user@example.com"))
	fmt.Println(index7) // 输出: [0 16]，子串 "user@example.com" 在字符串的索引范围 [0, 16) 中
}
```

这些场景展示了 `FindStringIndex` 方法在不同情况下的使用，可以用于查找匹配正则表达式的子串在原始字符串中的位置。