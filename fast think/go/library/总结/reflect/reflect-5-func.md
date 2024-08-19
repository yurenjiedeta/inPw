在 Go 语言中，`reflect` 包提供了丰富的功能，可以让开发者在运行时动态地操作类型、函数、通道（channel）等。下面是你提到的 `reflect` 包中相关 API 的详细示例。

### 1. `NumIn`, `In`, `IsVariadic`, `NumOut`, `Out`

这些方法用于函数的反射信息。

```go
package main

import (
	"fmt"
	"reflect"
)

func exampleFunc(a int, b string, c ...float64) (bool, error) {
	return true, nil
}

func main() {
	typ := reflect.TypeOf(exampleFunc)

	// 参数数量
	fmt.Println("NumIn:", typ.NumIn()) // 3

	// 第一个参数的类型
	fmt.Println("In(0):", typ.In(0)) // int

	// 是否是可变参数
	fmt.Println("IsVariadic:", typ.IsVariadic()) // true

	// 返回值的数量
	fmt.Println("NumOut:", typ.NumOut()) // 2

	// 第一个返回值的类型
	fmt.Println("Out(0):", typ.Out(0)) // bool
}
```

### 2. `Call`

使用反射调用函数。

```go
package main

import (
	"fmt"
	"reflect"
)

func add(a, b int) int {
	return a + b
}

func main() {
	v := reflect.ValueOf(add)
	args := []reflect.Value{reflect.ValueOf(2), reflect.ValueOf(3)}

	results := v.Call(args)
	fmt.Println("Result:", results[0].Int()) // 5
}
```

### 3. `FuncOf`

动态创建函数类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	in := []reflect.Type{reflect.TypeOf(0), reflect.TypeOf(0)}
	out := []reflect.Type{reflect.TypeOf(0)}

	funcType := reflect.FuncOf(in, out, false)
	fmt.Println("Function Type:", funcType) // func(int, int) int
}
```

### 4. `MakeFunc`

动态创建函数。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	addFunc := reflect.MakeFunc(
		reflect.FuncOf([]reflect.Type{reflect.TypeOf(0), reflect.TypeOf(0)}, []reflect.Type{reflect.TypeOf(0)}, false),
		func(args []reflect.Value) []reflect.Value {
			sum := args[0].Int() + args[1].Int()
			return []reflect.Value{reflect.ValueOf(int(sum))}
		},
	)

	add := addFunc.Interface().(func(int, int) int)
	fmt.Println("Result:", add(2, 3)) // 5
}
```

### 5. `NumMethod`, `Method`, `MethodByName`

这些方法用于反射获取结构体的函数方法。

```go
package main

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name string
}

func (p Person) Greet() string {
	return "Hello, " + p.Name
}

func main() {
	p := Person{Name: "John"}
	t := reflect.TypeOf(p)

	// 方法数量
	fmt.Println("NumMethod:", t.NumMethod()) // 1

	// 获取方法
	m := t.Method(0)
	fmt.Println("Method:", m.Name) // Greet

	// 通过名称获取方法
	m2, _ := t.MethodByName("Greet")
	fmt.Println("MethodByName:", m2.Name) // Greet

	// 调用方法
	v := reflect.ValueOf(p)
	result := v.MethodByName("Greet").Call(nil)
	fmt.Println("Greet Result:", result[0].String()) // Hello, John
}
```

### 6. `Implements`

检查类型是否实现了某个接口。

```go
package main

import (
	"fmt"
	"reflect"
)

type Stringer interface {
	String() string
}

type Person struct {
	Name string
}

func (p Person) String() string {
	return p.Name
}

func main() {
	p := Person{Name: "John"}
	t := reflect.TypeOf(p)

	stringerType := reflect.TypeOf((*Stringer)(nil)).Elem()
	fmt.Println("Implements Stringer:", t.Implements(stringerType)) // true
}
```

### 7. `ChanDir`, `RecvDir`, `SendDir`, `BothDir`

这些用于获取和创建通道的方向（接收、发送、双向）。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 创建双向通道类型
	bothDir := reflect.ChanOf(reflect.BothDir, reflect.TypeOf(0))
	fmt.Println("BothDir:", bothDir) // chan int

	// 创建接收通道类型
	recvDir := reflect.ChanOf(reflect.RecvDir, reflect.TypeOf(0))
	fmt.Println("RecvDir:", recvDir) // <-chan int

	// 创建发送通道类型
	sendDir := reflect.ChanOf(reflect.SendDir, reflect.TypeOf(0))
	fmt.Println("SendDir:", sendDir) // chan<- int
}
```

### 8. `Send`, `Recv`, `TrySend`, `TryRecv`, `Close`

这些用于操作通道。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	ch := make(chan int, 2)
	v := reflect.ValueOf(ch)

	// 发送值到通道
	v.Send(reflect.ValueOf(42))
	v.Send(reflect.ValueOf(100))

	// 接收值
	val, ok := v.Recv()
	fmt.Println("Received:", val.Int(), ok) // 42 true

	// 非阻塞接收
	val, ok = v.TryRecv()
	fmt.Println("TryRecv:", val.Int(), ok) // 100 true

	// 关闭通道
	v.Close()
	val, ok = v.TryRecv()
	fmt.Println("TryRecv after close:", val.IsValid(), ok) // false false
}
```

### 9. `ChanOf`, `MakeChan`

动态创建通道类型和实例。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 创建 chan int 类型
	chanType := reflect.ChanOf(reflect.BothDir, reflect.TypeOf(0))

	// 创建一个通道实例
	ch := reflect.MakeChan(chanType, 2)

	// 发送和接收值
	ch.Send(reflect.ValueOf(42))
	val, _ := ch.Recv()
	fmt.Println("Received:", val.Int()) // 42
}
```

### 10. 使用 `reflect` 和 `select` 进行通道接收

```go
package main

import (
	"fmt"
	"reflect"
	"time"
)

func main() {
	ch1 := make(chan int, 1)
	ch2 := make(chan int, 1)

	ch1 <- 42
	ch2 <- 100

	cases := []reflect.SelectCase{
		{Dir: reflect.SelectRecv, Chan: reflect.ValueOf(ch1)},
		{Dir: reflect.SelectRecv, Chan: reflect.ValueOf(ch2)},
	}

	chosen, value, ok := reflect.Select(cases)
	if ok {
		fmt.Printf("Received %d from channel %d\n", value.Int(), chosen+1)
	}

	go func() {
		time.Sleep(1 * time.Second)
		close(ch1)
	}()

	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- 100
	}()

	// 再次使用 select 接收值
	chosen, value, ok = reflect.Select(cases)
	if ok {
		fmt.Printf("Received %d from channel %d\n", value.Int(), chosen+1)
	} else {
		fmt.Printf("Channel %d closed\n", chosen+1)
	}
}
```

### 总结

这些示例展示了 `reflect` 包中各种函数和方法的使用，这些 API 允许开发者动态地处理类型、函数和通道等。反射机制虽然强大，但应谨慎使用，因为它会带来一定的性能开销和类型安全问题。