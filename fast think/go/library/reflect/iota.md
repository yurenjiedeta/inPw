`iota` 是 Go 语言中的一个常量生成器，常用于枚举类型。每次 `const` 声明中的 `iota` 会自动递增，从 0 开始。以下是一些使用 `iota` 的示例：

### 1. 基本用法

```go
package main

import "fmt"

const (
	First  = iota // 0
	Second        // 1
	Third         // 2
)

func main() {
	fmt.Println(First, Second, Third) // 0 1 2
}
```

### 2. 跳过值

可以通过显式赋值跳过某些值。

```go
package main

import "fmt"

const (
	First  = iota // 0
	_             // 跳过 1
	Third         // 2
	Fourth        // 3
)

func main() {
	fmt.Println(First, Third, Fourth) // 0 2 3
}
```

### 3. 位运算与 iota

`iota` 常用于生成位掩码。

```go
package main

import "fmt"

const (
	FlagA = 1 << iota // 1 << 0 = 1
	FlagB             // 1 << 1 = 2
	FlagC             // 1 << 2 = 4
	FlagD             // 1 << 3 = 8
)

func main() {
	fmt.Println(FlagA, FlagB, FlagC, FlagD) // 1 2 4 8
}
```

### 4. 复杂表达式中的 iota

`iota` 可以用于复杂的表达式。

```go
package main

import "fmt"

const (
	KB = 1 << (10 * iota) // 1 << (10 * 0) = 1 (1 KB)
	MB                    // 1 << (10 * 1) = 1024 (1 MB)
	GB                    // 1 << (10 * 2) = 1048576 (1 GB)
	TB                    // 1 << (10 * 3) = 1073741824 (1 TB)
)

func main() {
	fmt.Println(KB, MB, GB, TB) // 1024 1048576 1073741824 ...
}
```

### 5. 重置 iota

每次 `const` 块都会重置 `iota` 的值。

```go
package main

import "fmt"

const (
	A = iota // 0
	B        // 1
)

const (
	C = iota // 0
	D        // 1
)

func main() {
	fmt.Println(A, B) // 0 1
	fmt.Println(C, D) // 0 1
}
```

### 6. 在同一行中使用 iota

可以在同一行中使用 `iota`。

```go
package main

import "fmt"

const (
	X, Y = iota + 1, iota + 2 // X=1, Y=2
	Z, W                      // Z=2, W=3
)

func main() {
	fmt.Println(X, Y, Z, W) // 1 2 2 3
}
```

### 7. 自定义枚举类型

使用 `iota` 创建自定义类型的枚举值。

```go
package main

import "fmt"

type Weekday int

const (
	Sunday Weekday = iota // 0
	Monday                // 1
	Tuesday               // 2
	Wednesday             // 3
	Thursday              // 4
	Friday                // 5
	Saturday              // 6
)

func main() {
	fmt.Println(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday) // 0 1 2 3 4 5 6
}
```

这些示例展示了 `iota` 的多种用法，适用于生成枚举值、位掩码以及其他需要自动递增常量的场景。