`math/rand.Int` 方法用于生成一个伪随机的整数。以下是 `math/rand.Int` 方法的一些使用场景及其输出的示例：

1. **生成一个指定范围内的随机整数：**

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano()) // 初始化随机数种子

	randomNumber := rand.Intn(100) // 生成0到99之间的随机整数
	fmt.Println(randomNumber)     // 输出: 生成的随机整数
}
```

2. **生成一个指定范围内的随机整数序列：**

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano()) // 初始化随机数种子

	for i := 0; i < 5; i++ {
		randomNumber := rand.Intn(100) // 生成0到99之间的随机整数
		fmt.Println(randomNumber)     // 输出: 生成的随机整数序列
	}
}
```

3. **生成一个指定范围内的随机整数，并加上偏移量：**

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano()) // 初始化随机数种子

	offset := 10
	randomNumber := rand.Intn(100) + offset // 生成10到109之间的随机整数
	fmt.Println(randomNumber)              // 输出: 生成的随机整数
}
```

4. **生成一个指定范围内的随机整数，且范围包括负数：**

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano()) // 初始化随机数种子

	min := -50
	max := 50
	randomNumber := rand.Intn(max-min+1) + min // 生成-50到50之间的随机整数
	fmt.Println(randomNumber)                  // 输出: 生成的随机整数
}
```

这些场景展示了 `math/rand.Int` 方法的一些常见用法，从生成单个随机整数到生成随机整数序列，并控制生成范围。