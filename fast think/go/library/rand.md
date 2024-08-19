以下是关于 Go 语言 `math/rand` 包的一些关键函数及其示例总结：

### 1. 生成 `[1.0, 2.0)` 范围内的随机浮点数

你可以使用 `rand.Float64` 生成 `[0.0, 1.0)` 的随机浮点数，并将其缩放到 `[1.0, 2.0)` 范围内。

**示例代码：**

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 使用当前时间作为随机种子
    min := 1.0
    max := 2.0
    randomFloat := min + (max-min)*rand.Float64() // 生成一个范围在 [1.0, 2.0) 之间的随机浮点数
    fmt.Println(randomFloat)
}
```

### 2. `Intn` 函数的作用

`Intn(n int) int` 生成一个 `[0, n)` 范围内的随机整数，`n` 是上限（不包含）。

**示例代码：**

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 使用当前时间作为随机种子
    max := 10
    randomInt := rand.Intn(max) // 生成一个范围在 [0, 10) 之间的随机整数
    fmt.Println(randomInt)
}
```

### 3. 生成 `[50, 150)` 范围内的随机整数

使用 `rand.Intn` 生成 `[50, 150)` 的随机整数，包括 `50` 和 `150`。

**示例代码：**

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 使用当前时间作为随机种子
    min := 50
    max := 150
    randomInt := rand.Intn(max-min+1) + min // 生成一个范围在 [50, 150) 之间的随机整数
    fmt.Println(randomInt)
}
```

### 4. `Perm` 函数的作用

`Perm(n int) []int` 生成一个包含 `[0, n-1]` 范围内的随机排列。

**示例代码：**

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 使用当前时间作为随机种子
    n := 10
    permutation := rand.Perm(n) // 生成一个包含 0 到 9 的随机排列
    fmt.Println(permutation)
}
```

### 5. 生成小于 `0.5` 的随机浮点数

使用 `rand.Float64()` 生成 `[0.0, 1.0)` 范围内的随机浮点数，并将其缩放到 `[0.0, 0.5)` 范围内。

**示例代码：**

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 使用当前时间作为随机种子
    max := 0.5
    randomFloat := rand.Float64() * max // 生成一个范围在 [0.0, 0.5) 之间的随机浮点数
    fmt.Println(randomFloat)
}
```

以上总结了五个关于 `math/rand` 包的常见操作及其示例代码。这些示例涵盖了生成不同范围的随机数和排列等操作。