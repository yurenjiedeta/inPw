`time.Sleep()` 方法用于让当前 goroutine 休眠一段时间。这里是几个使用场景：

### 1. 休眠固定时间
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("开始任务")
	time.Sleep(2 * time.Second)
	fmt.Println("任务完成")
}
```
输出：
```
开始任务
任务完成 （等待2秒后输出）
```

### 2. 使用在循环中模拟定时任务
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for {
		fmt.Println("执行任务")
		time.Sleep(1 * time.Minute) // 每隔1分钟执行一次任务
	}
}
```
输出：
```
执行任务
（等待1分钟后输出）
执行任务
（等待1分钟后输出）
...（以此类推）
```

### 3. 在并发程序中控制任务执行顺序
```go
package main

import (
	"fmt"
	"time"
)

func task1() {
	fmt.Println("任务1开始执行")
	time.Sleep(2 * time.Second)
	fmt.Println("任务1执行完毕")
}

func task2() {
	fmt.Println("任务2开始执行")
	time.Sleep(1 * time.Second)
	fmt.Println("任务2执行完毕")
}

func main() {
	go task1()
	go task2()

	time.Sleep(3 * time.Second) // 等待足够时间以保证任务执行完毕
	fmt.Println("所有任务执行完毕")
}
```
输出：
```
任务2开始执行
任务1开始执行
任务2执行完毕
任务1执行完毕
所有任务执行完毕 （等待3秒后输出）
```

### 4. 结合 `select` 实现超时机制
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan int)
	go func() {
		time.Sleep(2 * time.Second)
		ch <- 1
	}()

	select {
	case <-ch:
		fmt.Println("任务完成")
	case <-time.After(1 * time.Second):
		fmt.Println("任务超时")
	}
}
```
输出：
```
任务超时 （等待1秒后输出）
```

这些场景展示了 `time.Sleep()` 方法的使用，用于控制程序的执行时机、模拟定时任务、控制任务执行顺序以及实现超时机制。