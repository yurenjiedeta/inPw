在 Go 语言中，`reflect` 包提供了丰富的 API 来操作各种数据类型，包括指针、数组、切片、映射和结构体。下面是对 `reflect` 包中你提到的 API 的详细示例。

### 1. `reflect.PtrTo`

`reflect.PtrTo` 返回一个指向给定类型的指针类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	t := reflect.TypeOf(42)
	ptrType := reflect.PtrTo(t)

	fmt.Println("Pointer Type:", ptrType) // *int
}
```

### 2. `reflect.Elem`

`reflect.Elem` 返回指针指向的值或数组/切片/映射的元素类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var i int = 42
	v := reflect.ValueOf(&i)

	fmt.Println("Elem:", v.Elem()) // 42
}
```

### 3. `reflect.Addr`

`reflect.Addr` 返回指向值的指针，前提是该值可以寻址。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var i int = 42
	v := reflect.ValueOf(i)

	// 需要先使用 Elem 获取到可寻址的值
	vp := reflect.ValueOf(&i).Elem()
	fmt.Println("Addr:", vp.Addr()) // 0xc000014088 (指针地址)
}
```

### 4. `reflect.CanAddr`

`reflect.CanAddr` 检查 `reflect.Value` 是否可以获取地址。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var i int = 42
	v := reflect.ValueOf(i)

	fmt.Println("CanAddr:", v.CanAddr()) // false

	// 需要先使用 Elem 获取到可寻址的值
	vp := reflect.ValueOf(&i).Elem()
	fmt.Println("CanAddr:", vp.CanAddr()) // true
}
```

### 5. `reflect.ArrayOf`

`reflect.ArrayOf` 创建一个给定类型和长度的数组类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arrType := reflect.ArrayOf(3, reflect.TypeOf(0))

	fmt.Println("Array Type:", arrType) // [3]int
}
```

### 6. `reflect.SliceOf`

`reflect.SliceOf` 创建一个给定类型的切片类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	sliceType := reflect.SliceOf(reflect.TypeOf(0))

	fmt.Println("Slice Type:", sliceType) // []int
}
```

### 7. `reflect.Index`

`reflect.Index` 返回数组或切片中指定索引处的元素。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := []int{1, 2, 3}
	v := reflect.ValueOf(arr)

	fmt.Println("Index 0:", v.Index(0).Int()) // 1
}
```

### 8. `reflect.Len`

`reflect.Len` 返回数组、切片或映射的长度。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := []int{1, 2, 3}
	v := reflect.ValueOf(arr)

	fmt.Println("Length:", v.Len()) // 3
}
```

### 9. `reflect.Cap`

`reflect.Cap` 返回数组或切片的容量。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := make([]int, 2, 5)
	v := reflect.ValueOf(arr)

	fmt.Println("Capacity:", v.Cap()) // 5
}
```

### 10. `reflect.SetLen`

`reflect.SetLen` 设置切片的长度（需要 `CanSet` 为 `true`）。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := make([]int, 2, 5)
	v := reflect.ValueOf(arr)

	// v 是不可设置的，所以不能直接修改
	// 必须使用切片的元素进行操作
	v = reflect.ValueOf(&arr).Elem()
	v.SetLen(3)

	fmt.Println("New Length:", v.Len()) // 3
}
```

### 11. `reflect.SetCap`

`reflect.SetCap` 设置切片的容量（需要 `CanSet` 为 `true`，并且新容量不能小于长度）。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := make([]int, 2, 5)
	v := reflect.ValueOf(&arr).Elem()

	v.SetCap(3)
	fmt.Println("New Capacity:", v.Cap()) // 3
}
```

### 12. `reflect.Slice`

`reflect.Slice` 返回一个切片，它引用原始切片的子片段。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := []int{1, 2, 3, 4, 5}
	v := reflect.ValueOf(arr)

	subSlice := v.Slice(1, 3)
	fmt.Println("Sub Slice:", subSlice.Interface()) // [2 3]
}
```

### 13. `reflect.Slice3`

`reflect.Slice3` 返回一个切片，它引用原始切片的子片段，指定起始、结束和容量。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	arr := []int{1, 2, 3, 4, 5}
	v := reflect.ValueOf(arr)

	subSlice := v.Slice3(1, 3, 4)
	fmt.Println("Sub Slice3:", subSlice.Interface()) // [2 3]
}
```

### 14. `reflect.MakeSlice`

`reflect.MakeSlice` 创建一个指定类型和长度的切片。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	sliceType := reflect.SliceOf(reflect.TypeOf(0))
	v := reflect.MakeSlice(sliceType, 3, 5)

	v.Index(0).SetInt(1)
	v.Index(1).SetInt(2)
	v.Index(2).SetInt(3)

	fmt.Println("New Slice:", v.Interface()) // [1 2 3]
}
```

### 15. `reflect.Append`

`reflect.Append` 在切片末尾追加元素。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	slice := []int{1, 2, 3}
	v := reflect.ValueOf(slice)

	v = reflect.Append(v, reflect.ValueOf(4), reflect.ValueOf(5))
	fmt.Println("Appended Slice:", v.Interface()) // [1 2 3 4 5]
}
```

### 16. `reflect.AppendSlice`

`reflect.AppendSlice` 将一个切片追加到另一个切片。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	slice1 := []int{1, 2, 3}
	slice2 := []int{4, 5, 6}
	v1 := reflect.ValueOf(slice1)
	v2 := reflect.ValueOf(slice2)

	v1 = reflect.AppendSlice(v1, v2)
	fmt.Println("Combined Slice:", v1.Interface()) // [1 2 3 4 5 6]
}
```

### 17. `reflect.Copy`

`reflect.Copy` 将源切片的内容复制到目标切片中。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	src := []int{1, 2, 3}
	dst := make([]int, 3)
	vSrc := reflect.ValueOf(src)
	vDst := reflect.ValueOf(dst)

	reflect.Copy(vDst, vSrc)
	fmt.Println("Copied Slice:", dst) // [1 2 3]
}
```

### 18. `reflect.Key`

`reflect.Key` 返回映射中指定键的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	key := reflect.ValueOf("a")
	val := v.MapIndex(key)
	fmt.Println("Value for 'a':", val.Int()) // 1
}
```

### 19. `reflect.MapKeys`

`reflect.MapKeys` 返回映射的所有键。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	keys := v.MapKeys()
	for _, key := range keys {
		fmt.Println("Key:", key.String())
	}
}
```

### 20. `reflect.MapIndex`

`reflect.MapIndex` 返回映射中指定键的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	val := v.MapIndex(reflect.ValueOf("b"))
	fmt.Println("Value for 'b':", val.Int())

 // 2
}
```

### 21. `reflect.MapRange`

`reflect.MapRange` 返回一个迭代器，用于遍历映射中的键值对。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	iter := v.MapRange()
	for iter.Next() {
		fmt.Printf("Key: %s, Value: %d\n", iter.Key().String(), iter.Value().Int())
	}
}
```

### 22. `reflect.SetMapIndex`

`reflect.SetMapIndex` 设置映射中指定键的值。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	v.SetMapIndex(reflect.ValueOf("b"), reflect.ValueOf(42))
	fmt.Println("Updated Map:", m) // map[a:1 b:42]
}
```

### 23. `reflect.Next`

`reflect.Next` 用于 `MapRange` 的迭代器，移动到下一个键值对。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	m := map[string]int{"a": 1, "b": 2}
	v := reflect.ValueOf(m)

	iter := v.MapRange()
	for iter.Next() {
		fmt.Printf("Key: %s, Value: %d\n", iter.Key().String(), iter.Value().Int())
	}
}
```

### 24. `reflect.Value`

`reflect.Value` 表示 Go 中的一个值，它有很多方法可以进行操作。这里我们已经通过之前的例子展示了如何获取、设置和操作 `reflect.Value`。

### 25. `reflect.Lookup`

`reflect.Lookup` 查找结构体中的字段，类似于访问结构体的属性。

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
	p := Person{Name: "John", Age: 30}
	v := reflect.ValueOf(p)

	nameField := v.FieldByName("Name")
	fmt.Println("Name:", nameField.String()) // John
}
```

### 26. `reflect.StructOf`

`reflect.StructOf` 动态创建一个结构体类型。

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	fields := []reflect.StructField{
		{
			Name: "Name",
			Type: reflect.TypeOf(""),
		},
		{
			Name: "Age",
			Type: reflect.TypeOf(0),
		},
	}

	structType := reflect.StructOf(fields)
	v := reflect.New(structType).Elem()

	v.FieldByName("Name").SetString("John")
	v.FieldByName("Age").SetInt(30)

	fmt.Println("Dynamic Struct:", v.Interface()) // {John 30}
}
```

### 总结

通过以上示例，你可以看到 `reflect` 包中的这些 API 是如何用于操作各种 Go 类型的。`reflect` 包提供了极大的灵活性，允许你在运行时动态地检查和操作 Go 的类型系统，但由于其复杂性和性能成本，建议在需要动态性或构建通用库时慎重使用。