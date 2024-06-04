`WriteRune` 方法可用于将 Unicode 字符（rune）写入字符串中。它的主要应用场景是在构建或修改字符串时，需要将单个字符添加到字符串中。下面是一些使用场景和对应的输出以及注释：

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	// 场景1: 将单个字符 'a' 写入字符串中
	var builder1 strings.Builder
	builder1.WriteRune('a')
	fmt.Println(builder1.String()) // 输出: a

	// 场景2: 将 Unicode 字符 '😊' 写入字符串中
	var builder2 strings.Builder
	builder2.WriteRune('😊')
	fmt.Println(builder2.String()) // 输出: 😊

	// 场景3: 将一个字符串逐字符写入另一个字符串中
	var builder3 strings.Builder
	str := "hello"
	for _, char := range str {
		builder3.WriteRune(char)
	}
	fmt.Println(builder3.String()) // 输出: hello

	// 场景4: 将多个字符逐个写入字符串中
	var builder4 strings.Builder
	builder4.WriteRune('G')
	builder4.WriteRune('o')
	builder4.WriteRune('l')
	builder4.WriteRune('a')
	builder4.WriteRune('n')
	fmt.Println(builder4.String()) // 输出: Golan
}
```

这些场景展示了 `WriteRune` 方法在不同情况下的使用，它使得在构建字符串时可以逐个添加 Unicode 字符。