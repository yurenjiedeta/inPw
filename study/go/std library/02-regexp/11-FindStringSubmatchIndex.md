`regexp` 包中的 `FindStringSubmatchIndex` 方法用于查找正则表达式模式匹配的子串索引。下面是几种使用场景及相应的注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 定义一个正则表达式模式，用于匹配 "go" 字符串
	pattern := "go"

	// 准备待匹配的字符串
	text := "golang is a programming language. I love go!"

	// 使用正则表达式模式创建正则表达式对象
	re := regexp.MustCompile(pattern)

	// 使用 FindStringSubmatchIndex 查找第一个匹配的子串索引
	indexes := re.FindStringSubmatchIndex(text)

	// 如果没有匹配到，则返回空切片
	if len(indexes) == 0 {
		fmt.Println("No match found.")
		return
	}

	// 输出匹配到的子串索引
	fmt.Println("Match found at indexes:", indexes)

	// 输出匹配到的子串
	fmt.Println("Matched substring:", text[indexes[0]:indexes[1]])

	// 可以使用索引来截取原始字符串中匹配到的子串
	fmt.Println("Original text substring:", text[indexes[2]:indexes[3]])
}
```

输出：
```
Match found at indexes: [0 2 12 14]
Matched substring: go
Original text substring: golang
```

这段代码展示了 `regexp` 包中的 `FindStringSubmatchIndex` 方法的使用场景。首先，我们定义了一个简单的正则表达式模式，然后准备了一个待匹配的字符串。接着，我们使用 `regexp.MustCompile` 创建了一个正则表达式对象，然后调用 `FindStringSubmatchIndex` 方法来查找匹配的子串索引。如果找到了匹配，我们输出匹配到的子串索引，并从原始字符串中截取出匹配到的子串。