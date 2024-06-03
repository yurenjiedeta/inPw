`Intn` 方法用于生成一个介于 0 和 n-1 之间的伪随机整数，其中 n 是传入的参数。以下是 `Intn` 方法的几种使用场景及其注释：

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 设置种子，以确保每次运行程序时都会生成不同的随机数序列
	rand.Seed(time.Now().UnixNano())

	// 场景1: 生成一个介于 0 和 9 之间的随机整数
	num1 := rand.Intn(10)
	fmt.Println(num1) // Output: (随机数 0 到 9 之间的整数)

	// 场景2: 生成一个介于 1 和 100 之间的随机整数
	num2 := rand.Intn(100) + 1
	fmt.Println(num2) // Output: (随机数 1 到 100 之间的整数)

	// 场景3: 使用循环生成多个随机数
	for i := 0; i < 5; i++ {
		fmt.Println(rand.Intn(10)) // Output: (5个随机数 0 到 9 之间的整数)
	}

	// 场景4: 结合其他生成随机数的方法，例如 Float64，生成更复杂的随机数
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	num3 := int(r.Float64() * 100)
	fmt.Println(num3) // Output: (0 到 100 之间的随机整数)
}
```

在上述示例中，`Intn` 方法用于生成指定范围内的随机整数。通过结合不同的参数，可以生成不同范围内的随机数，也可以通过循环生成多个随机数。结合其他方法如 `Float64` 可以生成更复杂范围内的随机整数。