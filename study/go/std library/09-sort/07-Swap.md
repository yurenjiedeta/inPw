`Swap` 方法是 `sort` 包中的一个函数，通常用于交换切片中的元素位置。这个方法用于在排序算法中，如快速排序和堆排序等，交换元素位置。以下是 `Swap` 方法的一些使用场景及其注释：

1. 在自定义排序中交换切片元素位置：

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

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

func main() {
    people := []Person{
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35},
    }

    sort.Sort(ByAge(people))
    fmt.Println(people)
}
```

注释：在自定义排序 `ByAge` 中使用 `Swap` 方法交换人员切片中的元素位置，以实现按年龄排序。

2. 在堆排序中交换元素位置：

```go
package main

import (
    "fmt"
    "sort"
)

func main() {
    numbers := []int{5, 2, 7, 1, 9}
    sort.Ints(numbers)
    sort.Sort(sort.Reverse(sort.IntSlice(numbers))) // 倒序排列
    fmt.Println(numbers) // 输出：[9 7 5 2 1]
}
```

注释：在对切片 `numbers` 进行排序时，使用 `Swap` 方法在堆排序算法中交换元素位置，以实现倒序排列。

`Swap` 方法在排序算法中经常用到，它可以帮助我们在处理数据时灵活地交换元素位置，以实现特定的排序需求。