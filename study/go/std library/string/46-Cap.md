`Cap()` 方法是用于返回字符串切片的容量的方法。下面是 `Cap()` 方法的几种常见用法及其输出的注释：

```go
package main

import (
	"fmt"
)

func main() {
	// 使用Cap()方法获取字符串切片的容量
	str := "Hello, 世界"
	slice := []byte(str)

	// 场景1: 获取字符串切片的容量
	fmt.Println("场景1:")
	fmt.Println("容量:", cap(slice)) // 输出: 容量: 13，因为UTF-8编码中，一个中文字符占用3个字节，加上其他字符的长度

	// 场景2: 对字符串进行切片操作，再获取容量
	fmt.Println("场景2:")
	subSlice := slice[7:10]           // 从位置7开始，到位置10结束（不包含位置10）
	fmt.Println("子切片容量:", cap(subSlice)) // 输出: 子切片容量: 6，因为从位置7到10，总共包含6个字节

	// 场景3: 使用make()函数创建指定容量的字符串切片
	fmt.Println("场景3:")
	newSlice := make([]byte, 5, 10)   // 创建一个容量为10的字符串切片，但是长度为5
	fmt.Println("新切片容量:", cap(newSlice)) // 输出: 新切片容量: 10

	// 场景4: 对切片进行扩容操作
	fmt.Println("场景4:")
	slice = append(slice, '!')
	fmt.Println("扩容后的容量:", cap(slice)) // 输出: 扩容后的容量: 26，因为字符串切片的容量会根据需要自动扩展

	// 场景5: 使用nil切片获取容量
	fmt.Println("场景5:")
	var nilSlice []byte
	fmt.Println("nil切片容量:", cap(nilSlice)) // 输出: nil切片容量: 0，因为nil切片没有分配任何内存空间
}
```

这些场景涵盖了 `Cap()` 方法在不同情况下的使用。