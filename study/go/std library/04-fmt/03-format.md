当使用 `fmt` 包中的格式化动词时，例如 `%v`、`%T` 等，它们可以用来格式化不同类型的数据输出。以下是各种格式化动词的使用场景及其注释：

1. `%v` 格式化动词（用于默认格式化输出）：

```go
package main

import "fmt"

func main() {
    num := 42
    str := "hello"
    floatNum := 3.14
    boolVal := true

    fmt.Printf("%v\n", num)      // 输出：42
    fmt.Printf("%v\n", str)      // 输出：hello
    fmt.Printf("%v\n", floatNum) // 输出：3.14
    fmt.Printf("%v\n", boolVal)  // 输出：true
}
```

2. `%T` 格式化动词（输出数据类型）：

```go
package main

import "fmt"

func main() {
    num := 42
    str := "hello"
    floatNum := 3.14
    boolVal := true

    fmt.Printf("%T\n", num)      // 输出：int
    fmt.Printf("%T\n", str)      // 输出：string
    fmt.Printf("%T\n", floatNum) // 输出：float64
    fmt.Printf("%T\n", boolVal)  // 输出：bool
}
```

3. `%d` 格式化动词（输出十进制整数）：

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Printf("%d\n", num) // 输出：42
}
```

4. `%s` 格式化动词（输出字符串）：

```go
package main

import "fmt"

func main() {
    str := "hello"
    fmt.Printf("%s\n", str) // 输出：hello
}
```

5. `%f` 格式化动词（输出浮点数）：

```go
package main

import "fmt"

func main() {
    floatNum := 3.14
    fmt.Printf("%f\n", floatNum) // 输出：3.140000
}
```

6. `%t` 格式化动词（输出布尔值）：

```go
package main

import "fmt"

func main() {
    boolVal := true
    fmt.Printf("%t\n", boolVal) // 输出：true
}
```

7. `%p` 格式化动词（输出指针）：

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Printf("%p\n", &num) // 输出：0xc0000140a0（示例值，实际输出根据系统和内存布局而变化）
}
```

8. `%b` 格式化动词（输出二进制数）：

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Printf("%b\n", num) // 输出：101010
}
```

9. `%o` 格式化动词（输出八进制数）：

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Printf("%o\n", num) // 输出：52
}
```

10. `%x` 和 `%X` 格式化动词（输出十六进制数，小写或大写字母表示）：

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Printf("%x\n", num) // 输出：2a
    fmt.Printf("%X\n", num) // 输出：2A
}
```

这些格式化动词可以帮助我们在输出时控制数据的格式，以满足不同的需求。