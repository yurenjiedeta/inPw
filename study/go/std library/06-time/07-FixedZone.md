`time.FixedZone` 方法用于创建一个固定偏移量的时区对象。这个方法接受两个参数：时区名称和相对于UTC的偏移量（以秒为单位）。以下是 `time.FixedZone` 方法的一些使用场景及其输出的示例：

1. **创建一个固定偏移量的时区对象：**

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个偏移量为-18000秒（即5小时）的时区对象，命名为"EST"
	est := time.FixedZone("EST", -18000)

	// 获取当前时间
	currentTime := time.Now().In(est)

	fmt.Println(currentTime) // 输出: 当前时间（以"EST"时区显示）
}
```

2. **在指定时区下解析时间：**

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个偏移量为3600秒（即1小时）的时区对象，命名为"Europe/Paris"
	parisTZ := time.FixedZone("Europe/Paris", 3600)

	// 解析字符串表示的时间，指定时区为"Europe/Paris"
	t, _ := time.ParseInLocation("2006-01-02 15:04:05", "2024-06-03 12:00:00", parisTZ)

	fmt.Println(t) // 输出: 解析后的时间（以"Europe/Paris"时区显示）
}
```

3. **在特定时区下创建时间对象：**

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个偏移量为-25200秒（即-7小时）的时区对象，命名为"PDT"
	pdt := time.FixedZone("PDT", -25200)

	// 在指定时区下创建时间对象
	specificTime := time.Date(2024, 6, 3, 9, 0, 0, 0, pdt)

	fmt.Println(specificTime) // 输出: 创建的时间对象（以"PDT"时区显示）
}
```

4. **获取指定时区的当前时间：**

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个偏移量为0的时区对象，命名为"UTC"
	utc := time.FixedZone("UTC", 0)

	// 获取当前时间，并使用指定时区显示
	currentTime := time.Now().In(utc)

	fmt.Println(currentTime) // 输出: 当前时间（以"UTC"时区显示）
}
```

