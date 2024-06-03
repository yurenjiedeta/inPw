`strings.Split` 是 Go 语言中的一个函数，用于根据指定的分隔符将字符串分割成多个子串。该函数签名如下：

```go
func Split(s, sep string) []string
```

参数：
- `s`: 要分割的字符串。
- `sep`: 用于分割的子字符串。

返回值：
- 一个字符串切片，包含分割后的各个子串。

下面是一些常见的使用场景及其输出示例：

### 场景 1: 使用逗号作为分隔符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "apple,banana,cherry"
	parts := strings.Split(str, ",")
	fmt.Println(parts) // 输出: [apple banana cherry]
}
```

注释：此场景使用逗号作为分隔符，将字符串分割成多个子串。结果为 `["apple", "banana", "cherry"]`。

### 场景 2: 使用空格作为分隔符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Hello Go Lang"
	parts := strings.Split(str, " ")
	fmt.Println(parts) // 输出: [Hello Go Lang]
}
```

注释：此场景使用空格作为分隔符，将字符串分割成多个子串。结果为 `["Hello", "Go", "Lang"]`。

### 场景 3: 使用换行符作为分隔符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "line1\nline2\nline3"
	parts := strings.Split(str, "\n")
	fmt.Println(parts) // 输出: [line1 line2 line3]
}
```

注释：此场景使用换行符作为分隔符，将字符串分割成多个子串。结果为 `["line1", "line2", "line3"]`。

### 场景 4: 使用多个字符作为分隔符

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Go<>Lang<>Rocks"
	parts := strings.Split(str, "<>")
	fmt.Println(parts) // 输出: [Go Lang Rocks]
}
```

注释：此场景使用多个字符 `"<>"` 作为分隔符，将字符串分割成多个子串。结果为 `["Go", "Lang", "Rocks"]`。

### 场景 5: 分割结果包含空字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "a,b,,c"
	parts := strings.Split(str, ",")
	fmt.Println(parts) // 输出: [a b  c]
}
```

注释：此场景在字符串中有两个连续的逗号，结果包含空字符串。结果为 `["a", "b", "", "c"]`。

### 场景 6: 分隔符不存在于字符串中

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "GoLang"
	parts := strings.Split(str, ",")
	fmt.Println(parts) // 输出: [GoLang]
}
```

注释：此场景分隔符 `","` 不存在于字符串中，结果为包含整个字符串的切片。结果为 `["GoLang"]`。

### 场景 7: 分隔符为空字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "abc"
	parts := strings.Split(str, "")
	fmt.Println(parts) // 输出: [a b c]
}
```

注释：此场景使用空字符串作为分隔符，将字符串中的每个字符分割成单独的子串。结果为 `["a", "b", "c"]`。

这些示例展示了 `strings.Split` 的多种使用场景，通过不同的分隔符将字符串分割成多个子串。