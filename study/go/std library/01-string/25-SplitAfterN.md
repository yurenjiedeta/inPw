`strings.SplitAfterN` 是 Go 语言中的一个函数，用于根据指定的分隔符将字符串分割成多个子串，分割结果包含分隔符，并限制分割的次数。该函数签名如下：

```go
func SplitAfterN(s, sep string, n int) []string
```

参数：
- `s`: 要分割的字符串。
- `sep`: 用于分割的子字符串。
- `n`: 分割的次数。如果 `n` 小于等于 0，结果包含整个字符串。如果 `n` 大于分隔符出现的次数，结果包含所有的子字符串。

返回值：
- 一个字符串切片，包含分割后的各个子串。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 使用逗号作为分隔符，限制分割次数为 2

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "apple,banana,cherry,dates"
	parts := strings.SplitAfterN(str, ",", 2)
	fmt.Println(parts) // 输出: [apple, banana, cherry,dates]
}
```

注释：此场景使用逗号作为分隔符，限制分割次数为 2。结果为 `["apple,", "banana,", "cherry,dates"]`，即只分割了前两个逗号。

### 场景 2: 使用空格作为分隔符，限制分割次数为 3

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Hello Go Lang Developers"
	parts := strings.SplitAfterN(str, " ", 3)
	fmt.Println(parts) // 输出: [Hello  Go  Lang  Developers]
}
```

注释：此场景使用空格作为分隔符，限制分割次数为 3。结果为 `["Hello ", "Go ", "Lang ", "Developers"]`，即只分割了前三个空格。

### 场景 3: 使用换行符作为分隔符，限制分割次数为 1

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "line1\nline2\nline3"
	parts := strings.SplitAfterN(str, "\n", 1)
	fmt.Println(parts) // 输出: [line1\n line2\nline3]
}
```

注释：此场景使用换行符作为分隔符，限制分割次数为 1。结果为 `["line1\n", "line2\nline3"]`，即只分割了第一个换行符。

### 场景 4: 使用多个字符作为分隔符，限制分割次数为 3

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Go<>Lang<>Rocks<>2024"
	parts := strings.SplitAfterN(str, "<>", 3)
	fmt.Println(parts) // 输出: [Go<> Lang<> Rocks<> 2024]
}
```

注释：此场景使用多个字符 `"<>"` 作为分隔符，限制分割次数为 3。结果为 `["Go<>", "Lang<>", "Rocks<>", "2024"]`，即只分割了前三个 `"<>"`。

### 场景 5: 分隔符不存在于字符串中

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "GoLang"
	parts := strings.SplitAfterN(str, ",", 2)
	fmt.Println(parts) // 输出: [GoLang]
}
```

注释：此场景分隔符 `","` 不存在于字符串中，结果为包含整个字符串的切片。结果为 `["GoLang"]`。

### 场景 6: 分隔符为空字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "abc"
	parts := strings.SplitAfterN(str, "", 2)
	fmt.Println(parts) // 输出: [a b c]
}
```

注释：此场景使用空字符串作为分隔符，限制分割次数为 2。结果为 `["a", "b", "c"]`，即每个字符作为一个子串。

### 场景 7: 分割次数为 0

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "apple,banana,cherry"
	parts := strings.SplitAfterN(str, ",", 0)
	fmt.Println(parts) // 输出: [apple,banana,cherry]
}
```

注释：此场景限制分割次数为 0，结果为包含整个字符串的切片。结果为 `["apple,banana,cherry"]`。

### 场景 8: 分割次数为负数

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "apple,banana,cherry"
	parts := strings.SplitAfterN(str, ",", -1)
	fmt.Println(parts) // 输出: [apple, banana, cherry]
}
```

注释：此场景限制分割次数为负数，相当于不限制分割次数，结果为 `["apple,", "banana,", "cherry"]`。

这些示例展示了 `strings.SplitAfterN` 的多种使用场景，通过不同的分隔符和分割次数将字符串分割成多个子串。