`regexp.ReplaceAllStringFunc` 方法用于根据正则表达式将文本中的匹配项替换为指定的字符串，替换规则由传入的函数控制。这个方法接受一个函数作为参数，该函数接受匹配到的字符串作为输入，并返回替换后的字符串。以下是 `regexp.ReplaceAllStringFunc` 方法的一些使用场景及其输出的示例：

1. **简单的字符串替换：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`\bapp\b`)

	text := "This app is very useful. The new app version is coming soon."
	result := re.ReplaceAllStringFunc(text, func(match string) string {
		return "application"
	})

	fmt.Println(result) // 输出: This application is very useful. The new application version is coming soon.
}
```

2. **根据匹配内容动态替换：**

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`\[([^]]+)\]`)

	text := "These are some [keywords] in a [text]."
	result := re.ReplaceAllStringFunc(text, func(match string) string {
		keyword := strings.Trim(match, "[]")
		return "<" + keyword + ">"
	})

	fmt.Println(result) // 输出: These are some <keywords> in a <text>.
}
```

3. **使用命名捕获组替换：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)

	text := "Today is 2024-06-03."
	result := re.ReplaceAllStringFunc(text, func(match string) string {
		return "Date: " + match
	})

	fmt.Println(result) // 输出: Today is Date: 2024-06-03.
}
```

4. **根据匹配内容进行动态计算替换：**

```go
package main

import (
	"fmt"
	"regexp"
	"strconv"
)

func main() {
	re := regexp.MustCompile(`\b(\d+)\b`)

	text := "There are 5 apples and 10 oranges."
	result := re.ReplaceAllStringFunc(text, func(match string) string {
		num, _ := strconv.Atoi(match)
		return strconv.Itoa(num * 2)
	})

	fmt.Println(result) // 输出: There are 10 apples and 20 oranges.
}
```

这些场景展示了 `regexp.ReplaceAllStringFunc` 方法的一些常见用法，从简单的字符串替换到根据匹配内容进行动态替换。