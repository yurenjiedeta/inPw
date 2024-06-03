`time.Since()` 方法用于计算自从指定时间到现在经过的时间。这里是一些使用场景：

### 1. 计算代码执行时间
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()
	// 执行一些耗时的操作
	time.Sleep(2 * time.Second)
	elapsed := time.Since(start)
	fmt.Println("代码执行耗时:", elapsed)
}
```
输出：
```
代码执行耗时: 2.0000239s
```

### 2. 计算函数执行时间
```go
package main

import (
	"fmt"
	"time"
)

func someFunction() {
	time.Sleep(1 * time.Second)
}

func main() {
	start := time.Now()
	someFunction()
	elapsed := time.Since(start)
	fmt.Println("函数执行耗时:", elapsed)
}
```
输出：
```
函数执行耗时: 1.0000282s
```

### 3. 记录事件间隔
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	eventStart := time.Now()
	// 模拟某个事件
	time.Sleep(500 * time.Millisecond)
	eventEnd := time.Now()

	interval := time.Since(eventStart)
	fmt.Println("事件持续时间:", interval)

	intervalFromEnd := time.Since(eventEnd)
	fmt.Println("从事件结束到现在的时间:", intervalFromEnd)
}
```
输出：
```
事件持续时间: 500.0284ms
从事件结束到现在的时间: 500.0301ms
```

### 4. 计算任务运行时间
```go
package main

import (
	"fmt"
	"time"
)

func task() {
	start := time.Now()
	// 模拟任务
	time.Sleep(2 * time.Second)
	elapsed := time.Since(start)
	fmt.Println("任务运行耗时:", elapsed)
}

func main() {
	// 启动任务
	task()
}
```
输出：
```
任务运行耗时: 2.0000662s
```

这些场景展示了 `time.Since()` 方法在不同情况下的用法，用于测量程序运行时间、记录事件间隔以及计算任务执行时间。