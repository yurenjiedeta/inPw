`FindStringSubmatch()` 方法是用于正则表达式的匹配，并返回第一个匹配到的子字符串及其匹配的子表达式结果。下面是 `FindStringSubmatch()` 方法的几种常见用法及其输出的注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 创建正则表达式模式
	re := regexp.MustCompile(`(\w+)-(\d+)`)

	// 创建测试字符串
	testString := "apple-123 banana-456"

	// 场景1: 匹配整个模式
	fmt.Println("场景1:")
	match := re.FindStringSubmatch(testString)
	fmt.Println("匹配结果:", match) // 输出: 匹配结果: [apple-123 apple 123]

	// 场景2: 匹配多个模式
	fmt.Println("场景2:")
	testString2 := "apple-123 banana-456 cherry-789"
	matches := re.FindAllStringSubmatch(testString2, -1)
	for _, match := range matches {
		fmt.Println("匹配结果:", match) // 输出: 匹配结果: [apple-123 apple 123] [banana-456 banana 456] [cherry-789 cherry 789]
	}

	// 场景3: 匹配失败的情况
	fmt.Println("场景3:")
	testString3 := "no match here"
	match3 := re.FindStringSubmatch(testString3)
	fmt.Println("匹配结果:", match3) // 输出: 匹配结果: []，因为没有找到匹配的子字符串

	// 场景4: 使用命名子表达式
	fmt.Println("场景4:")
	reNamed := regexp.MustCompile(`(?P<Name>\w+)-(?P<Number>\d+)`)
	testString4 := "apple-123"
	match4 := reNamed.FindStringSubmatch(testString4)
	if len(match4) > 0 {
		fmt.Println("名称:", match4[1])     // 输出: 名称: apple
		fmt.Println("数字:", match4[2])     // 输出: 数字: 123
		fmt.Println("命名子表达式:", match4) // 输出: 命名子表达式: [apple-123 apple 123]
	} else {
		fmt.Println("没有匹配到结果")
	}
}
```

这些场景演示了 `FindStringSubmatch()` 方法在不同情况下的使用，包括匹配成功、匹配失败、匹配多个模式以及使用命名子表达式等。