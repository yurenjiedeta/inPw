`sort.IsSorted` 方法用于检查给定的切片是否已经按照升序排列。以下是 `sort.IsSorted` 方法的一些使用场景及其输出的示例：

1. **检查已排序的整数切片：**

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	intSlice := []int{1, 2, 3, 4, 5}
	fmt.Println(sort.IsSorted(intSlice)) // 输出: true
}
```

2. **检查未排序的整数切片：**

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	intSlice := []int{5, 3, 2, 1, 4}
	fmt.Println(sort.IsSorted(intSlice)) // 输出: false
}
```

3. **检查已排序的字符串切片：**

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	stringSlice := []string{"apple", "banana", "cherry"}
	fmt.Println(sort.IsSorted(stringSlice)) // 输出: true
}
```

4. **检查未排序的自定义类型切片：**

```go
package main

import (
	"fmt"
	"sort"
)

type Person struct {
	Name string
	Age  int
}

type ByAge []Person

func (p ByAge) Len() int           { return len(p) }
func (p ByAge) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
func (p ByAge) Less(i, j int) bool { return p[i].Age < p[j].Age }

func main() {
	persons := []Person{
		{"Alice", 25},
		{"Bob", 20},
		{"Charlie", 30},
	}
	sort.Sort(ByAge(persons))

	fmt.Println(sort.IsSorted(ByAge(persons))) // 输出: true
}
```

这些场景展示了 `sort.IsSorted` 方法的一些常见用法，从检查已排序的整数切片到自定义类型切片的排序。