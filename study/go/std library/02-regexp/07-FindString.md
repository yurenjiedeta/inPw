`FindString` 方法用于在输入字符串中查找第一个匹配正则表达式的子串，并返回该子串。以下是 `FindString` 方法的几种使用场景及其注释：

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 场景1: 在输入字符串中查找第一个匹配的子串
	re := regexp.MustCompile(`\d+`)
	input := "There are 42 apples and 10 oranges"
	result := re.FindString(input)
	fmt.Println(result) // Output: 42

	// 场景2: 如果找不到匹配的子串，则返回空字符串
	re2 := regexp.MustCompile(`[a-z]+`)
	result2 := re2.FindString(input)
	fmt.Println(result2 == "") // Output: true

	// 场景3: 使用括号在正则表达式中定义子表达式，以便在结果中保留匹配的部分
	re3 := regexp.MustCompile(`(\d+) apples`)
	result3 := re3.FindString(input)
	fmt.Println(result3) // Output: 42 apples

	// 场景4: 如果有多个匹配项，则返回第一个匹配项
	input2 := "The first number is 42, the second is 10, and the third is 99"
	result4 := re.FindString(input2)
	fmt.Println(result4) // Output: 42
}
```

在上述示例中，`FindString` 方法用于在输入字符串中查找第一个匹配正则表达式的子串。如果找到匹配的子串，则返回该子串；如果找不到，则返回空字符串。可以使用括号在正则表达式中定义子表达式，以便在结果中保留匹配的部分。如果有多个匹配项，则返回第一个匹配项。