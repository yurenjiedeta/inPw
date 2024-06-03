`regexp.FindAllStringIndex` 方法用于查找输入文本中所有与正则表达式匹配的子串，并返回它们在输入文本中的起始和结束索引。以下是 `regexp.FindAllStringIndex` 方法的一些使用场景及其输出的示例：

1. **查找文本中所有匹配的子串索引：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile("Go")

	text := "Golang is a great language. Go is powerful."
	indices := re.FindAllStringIndex(text, -1)
	for _, index := range indices {
		fmt.Printf("Match found at index [%d, %d]\n", index[0], index[1])
	}
}
// Match found at index [0, 2]
// Match found at index [28, 30]
```

2. **查找文本中所有匹配的邮箱地址的索引：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`\b[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`)

	text := "My email addresses are abc@example.com and xyz@gmail.com."
	indices := re.FindAllStringIndex(text, -1)
	for _, index := range indices {
		fmt.Printf("Email found at index [%d, %d]: %s\n", index[0], index[1], text[index[0]:index[1]])
	}
}
```

3. **查找文本中所有匹配的日期格式的索引：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`\b\d{4}-\d{2}-\d{2}\b`)

	text := "Today's date is 2024-06-03. Tomorrow will be 2024-06-04."
	indices := re.FindAllStringIndex(text, -1)
	for _, index := range indices {
		fmt.Printf("Date found at index [%d, %d]: %s\n", index[0], index[1], text[index[0]:index[1]])
	}
}
```

4. **查找文本中所有匹配的 URL 的索引：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`\bhttps?://\S+\b`)

	text := "Check out my website at https://example.com. For more info, visit http://example.org."
	indices := re.FindAllStringIndex(text, -1)
	for _, index := range indices {
		fmt.Printf("URL found at index [%d, %d]: %s\n", index[0], index[1], text[index[0]:index[1]])
	}
}
```

这些场景展示了 `regexp.FindAllStringIndex` 方法的一些常见用法，从简单的匹配到复杂的正则表达式匹配。