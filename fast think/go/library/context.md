在 Go 语言中，`context` 包提供了一种在多个 goroutine 之间传递取消信号和请求范围内的值的机制。以下是 `context` 包中每个 API 方法的例子。

### `context.Background`

```go
package main

import (
	"context"
	"fmt"
)

func main() {
	ctx := context.Background()
	fmt.Println(ctx)
}
```

`context.Background` 返回一个空的上下文，可以用在应用程序的主函数、初始化、测试等场景中。

### `context.TODO`

```go
package main

import (
	"context"
	"fmt"
)

func main() {
	ctx := context.TODO()
	fmt.Println(ctx)
}
```

`context.TODO` 返回一个未决定使用的上下文，通常在代码还未确定使用哪个上下文时使用。

### `context.WithCancel`

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	go func() {
		time.Sleep(2 * time.Second)
		cancel()
	}()

	<-ctx.Done()
	fmt.Println("Cancelled")
}
```

`context.WithCancel` 返回一个子上下文和一个取消函数。调用取消函数会取消子上下文，`Done` 通道会关闭，goroutine 会收到取消信号。

### `context.WithDeadline`

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	d := time.Now().Add(1 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), d)
	defer cancel()

	select {
	case <-time.After(2 * time.Second):
		fmt.Println("Operation completed")
	case <-ctx.Done():
		fmt.Println("Deadline exceeded:", ctx.Err())
	}
}
```

`context.WithDeadline` 返回一个子上下文，当达到指定时间点时，`Done` 通道会关闭。

### `context.WithTimeout`

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	select {
	case <-time.After(2 * time.Second):
		fmt.Println("Operation completed")
	case <-ctx.Done():
		fmt.Println("Timeout:", ctx.Err())
	}
}
```

`context.WithTimeout` 与 `WithDeadline` 类似，不过它是基于持续时间的。超时后 `Done` 通道会关闭。

### `context.WithValue`

```go
package main

import (
	"context"
	"fmt"
)

func main() {
	type key string
	ctx := context.WithValue(context.Background(), key("language"), "Go")

	retrieveValue(ctx)
}

func retrieveValue(ctx context.Context) {
	type key string
	if v := ctx.Value(key("language")); v != nil {
		fmt.Println("Language:", v)
	} else {
		fmt.Println("Language not found")
	}
}
```

`context.WithValue` 返回一个带有键值对的子上下文，可以用来在不同的函数之间传递请求范围内的值。

### 总结

这些例子涵盖了 `context` 包中的主要 API 方法。使用 `context` 可以方便地在 Go 中管理 goroutine 的生命周期，传递取消信号，和在多个函数之间传递值。在实际使用时，注意避免滥用 `context.WithValue`，建议只在少量场景中使用该方法传递值。