`sort` 包中的 `Stable` 方法用于稳定地对切片进行排序，即保持相等元素的原始顺序。以下是一些 `Stable` 方法的使用场景以及对应的输出和注释：

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

// ByAge implements sort.Interface for []Person based on the Age field.
type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

// ByName implements sort.Interface for []Person based on the Name field.
type ByName []Person

func (a ByName) Len() int           { return len(a) }
func (a ByName) Less(i, j int) bool { return a[i].Name < a[j].Name }
func (a ByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

func main() {
	// 场景1: 对切片按照年龄进行稳定排序
	peopleByAge := []Person{
		{"Alice", 25},
		{"Bob", 20},
		{"Charlie", 30},
		{"David", 25},
	}
	sort.Stable(ByAge(peopleByAge))
	fmt.Println(peopleByAge) // 输出: [{Bob 20} {Alice 25} {David 25} {Charlie 30}]

	// 场景2: 对切片按照名称进行稳定排序
	peopleByName := []Person{
		{"David", 25},
		{"Bob", 20},
		{"Alice", 25},
		{"Charlie", 30},
	}
	sort.Stable(ByName(peopleByName))
	fmt.Println(peopleByName) // 输出: [{Alice 25} {Bob 20} {Charlie 30} {David 25}]
}
```

这些场景展示了 `Stable` 方法在不同情况下的使用，可以根据需要对切片中的元素进行稳定排序，保持相等元素的相对顺序不变。