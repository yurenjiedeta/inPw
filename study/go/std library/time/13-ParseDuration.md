`time.ParseDuration()` 方法用于解析表示持续时间的字符串。下面是几个使用场景：

### 1. 解析常见的持续时间字符串
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	durationStr := "1h30m"
	duration, err := time.ParseDuration(durationStr)
	if err != nil {
		fmt.Println("解析持续时间失败:", err)
		return
	}
	fmt.Println("解析的持续时间:", duration)
}
```
输出：
```
解析的持续时间: 1h30m0s
```

### 2. 解析带有小数的持续时间字符串
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	durationStr := "2.5s"
	duration, err := time.ParseDuration(durationStr)
	if err != nil {
		fmt.Println("解析持续时间失败:", err)
		return
	}
	fmt.Println("解析的持续时间:", duration)
}
```
输出：
```
解析的持续时间: 2.5s
```

### 3. 解析包含多种时间单位的持续时间字符串
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	durationStr := "1h30m10s"
	duration, err := time.ParseDuration(durationStr)
	if err != nil {
		fmt.Println("解析持续时间失败:", err)
		return
	}
	fmt.Println("解析的持续时间:", duration)
}
```
输出：
```
解析的持续时间: 1h30m10s
```

### 4. 解析负数持续时间字符串
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	durationStr := "-10m"
	duration, err := time.ParseDuration(durationStr)
	if err != nil {
		fmt.Println("解析持续时间失败:", err)
		return
	}
	fmt.Println("解析的持续时间:", duration)
}
```
输出：
```
解析的持续时间: -10m0s
```

这些场景展示了 `time.ParseDuration()` 方法的使用，用于解析各种形式的持续时间字符串。