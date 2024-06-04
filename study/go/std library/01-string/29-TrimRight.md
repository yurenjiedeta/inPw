`TrimRight`方法是Go语言中`strings`包中的一个函数，用于去除字符串结尾的指定字符集合。以下是该方法的各种使用场景及其输出注释：

1. **基本使用：去除字符串结尾的空格**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world    "
    result := strings.TrimRight(str, " ")
    fmt.Println(result) // 输出: "hello world"，去除字符串结尾的空格
}
```

2. **去除字符串结尾的制表符和换行符**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world\t\n"
    result := strings.TrimRight(str, "\t\n")
    fmt.Println(result) // 输出: "hello world"，去除字符串结尾的制表符和换行符
}
```

3. **去除字符串结尾的特定字符**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world!!!"
    result := strings.TrimRight(str, "!")
    fmt.Println(result) // 输出: "hello world"，去除字符串结尾的感叹号
}
```

4. **去除字符串结尾的多个连续相同字符**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world!!!!!"
    result := strings.TrimRight(str, "!")
    fmt.Println(result) // 输出: "hello world"，去除字符串结尾的多个连续感叹号
}
```

5. **去除字符串结尾的特殊字符**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world\t\f"
    result := strings.TrimRight(str, "\t\f")
    fmt.Println(result) // 输出: "hello world"，去除字符串结尾的水平制表符和换页符
}
```

6. **处理全是指定字符的字符串**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "!!!!!!"
    result := strings.TrimRight(str, "!")
    fmt.Println(result) // 输出: ""，全是感叹号的字符串被去除后变为空字符串
}
```

7. **处理空字符串**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := ""
    result := strings.TrimRight(str, "!")
    fmt.Println(result) // 输出: ""，空字符串仍然是空字符串
}
```

8. **处理无需去除字符的字符串**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    str := "hello world"
    result := strings.TrimRight(str, "!")
    fmt.Println(result) // 输出: "hello world"，无需去除字符的字符串不变
}
```

`TrimRight`方法的输出是去除字符串结尾的指定字符集合后的新字符串。如果字符串结尾没有指定字符集合或为空字符串，则返回结果与输入相同。