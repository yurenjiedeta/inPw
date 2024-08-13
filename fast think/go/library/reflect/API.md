`reflect` 包提供了大量的 API 方法，用于动态地操作和检查 Go 中的变量类型和值。下面是每个主要 API 方法的例子。

### 1. `reflect.TypeOf`

获取变量的类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	t := reflect.TypeOf(num)
	fmt.Println("Type:", t) // int
}
```

### 2. `reflect.ValueOf`

获取变量的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	v := reflect.ValueOf(num)
	fmt.Println("Value:", v) // 42
}
```

### 3. `Value.Kind`

获取变量的种类（类别）。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	v := reflect.ValueOf(num)
	fmt.Println("Kind:", v.Kind()) // int
}
```

### 4. `Value.Type`

获取变量的类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	v := reflect.ValueOf(num)
	fmt.Println("Type:", v.Type()) // int
}
```

### 5. `Value.Int`, `Value.String`, `Value.Bool`, `Value.Float`

获取不同类型的具体值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	var str string = "hello"
	var b bool = true
	var f float64 = 3.14

	vNum := reflect.ValueOf(num)
	vStr := reflect.ValueOf(str)
	vBool := reflect.ValueOf(b)
	vFloat := reflect.ValueOf(f)

	fmt.Println("Int:", vNum.Int())       // 42
	fmt.Println("String:", vStr.String()) // hello
	fmt.Println("Bool:", vBool.Bool())    // true
	fmt.Println("Float:", vFloat.Float()) // 3.14
}
```

### 6. `Value.SetInt`, `Value.SetString`, `Value.SetBool`, `Value.SetFloat`

设置不同类型的具体值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var num int = 42
	v := reflect.ValueOf(&num).Elem() // 使用指针获取可修改的Value
	v.SetInt(100)
	fmt.Println("Modified Int:", num) // 100
}
```

### 7. `Value.Len`

获取集合类型的长度，如切片、数组、字符串、Map。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	str := "hello"
	slice := []int{1, 2, 3}
	m := map[string]int{"a": 1, "b": 2}

	fmt.Println("String length:", reflect.ValueOf(str).Len()) // 5
	fmt.Println("Slice length:", reflect.ValueOf(slice).Len()) // 3
	fmt.Println("Map length:", reflect.ValueOf(m).Len())       // 2
}
```

### 8. `Value.Index`

获取集合类型的特定索引处的值，如切片、数组、字符串。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	slice := []int{10, 20, 30}
	v := reflect.ValueOf(slice)

	fmt.Println("Index 0:", v.Index(0).Int()) // 10
}
```

### 9. `Value.MapIndex`, `Value.SetMapIndex`

获取和设置 Map 中的键值对。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"foo": 1, "bar": 2}
	v := reflect.ValueOf(m)

	// 获取Map中的值
	fmt.Println("Value for 'foo':", v.MapIndex(reflect.ValueOf("foo")).Int()) // 1

	// 设置Map中的值
	v.SetMapIndex(reflect.ValueOf("baz"), reflect.ValueOf(42))
	fmt.Println("Modified Map:", m) // map[bar:2 baz:42 foo:1]
}
```

### 10. `Value.Field`, `Value.SetField`

获取和设置结构体中的字段。

```go
package main

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	p := Person{"John", 30}
	v := reflect.ValueOf(&p).Elem()

	// 获取字段
	fmt.Println("Name:", v.FieldByName("Name").String()) // John

	// 设置字段
	v.FieldByName("Name").SetString("Jane")
	fmt.Println("Modified Struct:", p) // {Jane 30}
}
```

### 11. `Value.Call`

调用反射表示的函数。

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
	fn := reflect.ValueOf(add)
	args := []reflect.Value{reflect.ValueOf(10), reflect.ValueOf(20)}

	result := fn.Call(args)
	fmt.Println("Result:", result[0].Int()) // 30
}
```

### 12. `Value.Interface`

获取 `interface{}` 类型的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	num := 42
	v := reflect.ValueOf(num)
	i := v.Interface()

	fmt.Printf("Interface Value: %v, Type: %T\n", i, i) // 42, int
}
```

### 13. `reflect.New`

创建一个新类型的指针。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	t := reflect.TypeOf(0)          // int 类型
	v := reflect.New(t)             // 创建一个 *int
	*v.Interface().(*int) = 100     // 修改值
	fmt.Println(v.Elem().Int())     // 100
}
```

### 14. `reflect.Zero`

返回一个类型的零值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	t := reflect.TypeOf(0)
	v := reflect.Zero(t)

	fmt.Println("Zero Value:", v.Int()) // 0
}
```

### 15. `reflect.Value.Pointer`

获取指针的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	num := 42
	ptr := &num
	v := reflect.ValueOf(ptr)

	fmt.Printf("Pointer Value: %v\n", v.Pointer()) // 打印指针地址
}
```

### 16. `reflect.Value.IsNil`, `reflect.Value.IsValid`

检查值是否为 nil 或者是否有效。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var ptr *int
	var nilSlice []int

	vPtr := reflect.ValueOf(ptr)
	vSlice := reflect.ValueOf(nilSlice)

	fmt.Println("Is Nil Pointer:", vPtr.IsNil())      // true
	fmt.Println("Is Nil Slice:", vSlice.IsNil())      // true
	fmt.Println("Is Valid:", reflect.ValueOf(42).IsValid()) // true
}
```

### 17. `reflect.Indirect`

获取指针指向的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	num := 42
	ptr := &num
	v := reflect.ValueOf(ptr)

	indirect := reflect.Indirect(v)
	fmt.Println("Indirect Value:", indirect.Int()) // 42
}
```

### 18. `reflect.DeepEqual`

深度比较两个值是否相等。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	a := map[string]int{"foo": 1, "bar": 2}
	b := map[string]int{"foo": 1, "bar": 2}

	fmt.Println("DeepEqual:", reflect.DeepEqual(a, b)) // true
}
```

### 19. `reflect.SliceOf`, `reflect.MapOf`, `reflect.ChanOf`

动态创建 Slice、Map 和 Channel 类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// SliceOf
	intType := reflect.TypeOf(0)
	sliceType := reflect.SliceOf(intType)
	slice := reflect.MakeSlice(sliceType, 0, 0)
	fmt.Println("Slice Type:", slice.Type()) // []int

	// MapOf
	stringType := reflect.TypeOf("")
	mapType := reflect.MapOf(stringType, intType)
	m := reflect.MakeMap(mapType)
	fmt.Println("Map Type:", m.Type()) // map[string]int

	// ChanOf
	chanType := reflect.ChanOf(reflect.BothDir, intType)
	c := reflect.MakeChan(chanType, 0)
	fmt.Println("Chan Type:", c.Type()) // chan int
}
```

这些示例涵盖了 `reflect` 包中的大部分常用 API 方法，帮助你了解如何使用反射进行动态类型操作。