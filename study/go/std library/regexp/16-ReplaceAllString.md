`ReplaceAllString`方法是`regexp`包中的一个函数，用于在输入字符串中使用指定的替换字符串替换所有与正则表达式匹配的子串。下面是一些`ReplaceAllString`方法的使用场景及其输出的注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 场景1: 替换匹配的单个子串
	text1 := "apple orange banana apple"
	pattern1 := "apple"
	replacer1 := "fruit"
	result1 := regexp.MustCompile(pattern1).ReplaceAllString(text1, replacer1)
	fmt.Println("场景1输出:", result1) // 场景1输出: fruit orange banana fruit

	// 场景2: 替换匹配的多个子串
	text2 := "hello123world456"
	pattern2 := "[0-9]+"
	replacer2 := "number"
	result2 := regexp.MustCompile(pattern2).ReplaceAllString(text2, replacer2)
	fmt.Println("场景2输出:", result2) // 场景2输出: hellonumberworldnumber

	// 场景3: 替换匹配的子串，并限制替换次数
	text3 := "one two three four"
	pattern3 := "[a-z]+"
	replacer3 := "word"
	result3 := regexp.MustCompile(pattern3).ReplaceAllString(text3, replacer3, 2)
	fmt.Println("场景3输出:", result3) // 场景3输出: word two three four
}
```

`ReplaceAllString`方法允许您在输入字符串中使用指定的替换字符串替换所有与正则表达式匹配的子串。