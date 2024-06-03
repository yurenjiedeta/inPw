`time.AfterFunc()` 方法用于在指定的时间过后执行一次函数。这里是几个使用场景：

### 1. 执行定时任务
```go
package main

import (
	"fmt"
	"time"
)

func task() {
	fmt.Println("执行定时任务")
}

func main() {
	duration := 2 * time.Second
	time.AfterFunc(duration, task)
	fmt.Println("定时任务已设置")
	time.Sleep(3 * time.Second) // 等待足够时间以保证任务执行完毕
}
```
输出：
```
定时任务已设置
（等待2秒后输出）
执行定时任务
```

### 2. 使用循环执行周期性任务
```go
package main

import (
	"fmt"
	"time"
)

func task() {
	fmt.Println("执行周期性任务")
}

func main() {
	duration := 1 * time.Second
	ticker := time.NewTicker(duration)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			go task()
		}
	}
}
```
输出：
```
（每隔1秒执行一次）
执行周期性任务
执行周期性任务
...
```

### 3. 结合`AfterFunc`实现超时控制
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	timeout := 3 * time.Second
	fmt.Println("开始执行任务")
	time.AfterFunc(timeout, func() {
		fmt.Println("任务超时，停止执行")
	})

	for i := 1; i <= 5; i++ {
		fmt.Println("执行子任务", i)
		time.Sleep(1 * time.Second) // 模拟子任务执行时间
	}
}
```
输出：
```
开始执行任务
执行子任务 1
执行子任务 2
执行子任务 3
任务超时，停止执行 （在3秒后输出）
执行子任务 4
执行子任务 5
```

### 4. 结合 `select` 实现异步任务等待
```go
package main

import (
	"fmt"
	"time"
)

func asyncTask() <-chan bool {
	ch := make(chan bool)
	go func() {
		time.Sleep(2 * time.Second) // 模拟异步任务执行时间
		ch <- true
	}()
	return ch
}

func main() {
	fmt.Println("开始执行异步任务")
	<-asyncTask()
	fmt.Println("异步任务执行完毕")
}
```
输出：
```
开始执行异步任务
（等待2秒后输出）
异步任务执行完毕
```

这些场景展示了 `time.AfterFunc()` 方法的使用，用于执行定时任务、周期性任务、超时控制以及异步任务等待。