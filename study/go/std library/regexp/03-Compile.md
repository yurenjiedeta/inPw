`regexp.Compile` 方法用于编译正则表达式字符串，返回一个正则表达式对象。这个对象可以用于执行各种正则表达式操作，如匹配、查找和替换等。以下是 `regexp.Compile` 方法的一些使用场景及其输出的示例：

1. **简单的正则表达式匹配：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re, err := regexp.Compile("hello")
	if err != nil {
		fmt.Println("Error compiling regex:", err)
		return
	}

	fmt.Println(re.MatchString("hello world")) // 输出: true
	fmt.Println(re.MatchString("goodbye"))     // 输出: false
}
```

2. **使用正则表达式进行字符串查找：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re, err := regexp.Compile("Go")
	if err != nil {
		fmt.Println("Error compiling regex:", err)
		return
	}

	text := "Golang is a great language. Go is powerful."
	fmt.Println(re.FindString(text)) // 输出: Go
}
```

3. **提取匹配到的子串：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re, err := regexp.Compile(`(\d+)-(\d+)-(\d+)`)
	if err != nil {
		fmt.Println("Error compiling regex:", err)
		return
	}

	text := "Today's date is 2024-06-03"
	match := re.FindStringSubmatch(text)
	if match != nil {
		fmt.Println("Year:", match[1])  // 输出: Year: 2024
		fmt.Println("Month:", match[2]) // 输出: Month: 06
		fmt.Println("Day:", match[3])   // 输出: Day: 03
	}
}
```

4. **使用命名捕获组提取匹配到的子串：**

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	re, err := regexp.Compile(`(?P<year>\d+)-(?P<month>\d+)-(?P<day>\d+)`)
	if err != nil {
		fmt.Println("Error compiling regex:", err)
		return
	}

	text := "Today's date is 2024-06-03"
	match := re.FindStringSubmatch(text)
	if match != nil {
		fmt.Println("Year:", match[re.SubexpIndex("year")])   // 输出: Year: 2024
		fmt.Println("Month:", match[re.SubexpIndex("month")]) // 输出: Month: 06
		fmt.Println("Day:", match[re.SubexpIndex("day")])     // 输出: Day: 03
	}
}
```

这些场景展示了 `regexp.Compile` 方法的一些常见用法，从简单的匹配到提取复杂的子串。