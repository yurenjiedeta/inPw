`WriteByte` 方法用于将单个字节写入字符串中。这个方法接受一个字节作为参数，并将其附加到字符串的末尾。以下是 `WriteByte` 方法的一些使用场景及其输出的示例：

1. **将字节逐个添加到字符串中：**

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var strBuilder strings.Builder
	strBuilder.WriteByte('H')
	strBuilder.WriteByte('e')
	strBuilder.WriteByte('l')
	strBuilder.WriteByte('l')
	strBuilder.WriteByte('o')

	result := strBuilder.String()
	fmt.Println(result) // 输出: Hello
}
```

2. **追加非ASCII字符到字符串：**

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var strBuilder strings.Builder
	strBuilder.WriteByte(228) // Unicode 编码中的 'ä'

	result := strBuilder.String()
	fmt.Println(result) // 输出: ä
}
```

3. **使用循环批量添加字节到字符串：**

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var strBuilder strings.Builder
	for i := 0; i < 5; i++ {
		strBuilder.WriteByte(byte('a' + i))
	}

	result := strBuilder.String()
	fmt.Println(result) // 输出: abcde
}
```

4. **处理二进制数据，转换为字符串：**

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var strBuilder strings.Builder
	binaryData := []byte{0x48, 0x65, 0x6C, 0x6C, 0x6F} // ASCII 编码的 'Hello'
	for _, b := range binaryData {
		strBuilder.WriteByte(b)
	}

	result := strBuilder.String()
	fmt.Println(result) // 输出: Hello
}
```

这些场景展示了 `WriteByte` 方法的一些常见用法，从简单的字符串构建到处理二进制数据的转换。