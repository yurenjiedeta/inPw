`regexp` 包中的 `FindAllString` 方法用于在输入字符串中查找所有匹配正则表达式的子串，并以字符串切片的形式返回结果。下面是一些使用场景和相应的输出的注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 场景1: 查找单个匹配项
	input := "apple, banana, orange, grape"
	re := regexp.MustCompile(`\b\w+\b`)
	matches := re.FindAllString(input, -1)
	fmt.Println("单个匹配项:", matches) // 输出: 单个匹配项: [apple banana orange grape]

	// 场景2: 查找匹配项并限制数量
	input = "apple, banana, orange, grape"
	re = regexp.MustCompile(`\b\w+\b`)
	matches = re.FindAllString(input, 2)
	fmt.Println("限制数量的匹配项:", matches) // 输出: 限制数量的匹配项: [apple banana]

	// 场景3: 匹配子组
	input = "apple:3 banana:5 orange:2 grape:6"
	re = regexp.MustCompile(`(\w+):(\d+)`)
	matches = re.FindAllString(input, -1)
	fmt.Println("匹配子组:", matches) // 输出: 匹配子组: [apple:3 banana:5 orange:2 grape:6]
	for _, match := range matches {
		submatches := re.FindStringSubmatch(match)
		fmt.Printf("水果: %s, 数量: %s\n", submatches[1], submatches[2])
	}
	// 输出:
	// 水果: apple, 数量: 3
	// 水果: banana, 数量: 5
	// 水果: orange, 数量: 2
	// 水果: grape, 数量: 6
}

```

在这个示例中，`FindAllString` 方法用于查找匹配的子串，并根据场景进行了相应的处理。