Go 语言中的 `fmt` 包提供了格式化输入和输出的功能。以下是 `fmt` 包中一些常用的基本 API 方法及示例：

### 1. `fmt.Print()`
输出格式化的内容到标准输出，不带换行符。
```go
package main

import "fmt"

func main() {
    fmt.Print("Hello, ")
    fmt.Print("world!")
}
```
**输出:**
```
Hello, world!
```

### 2. `fmt.Println()`
输出格式化的内容到标准输出，并在末尾添加换行符。
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
```
**输出:**
```
Hello, world!
```

### 3. `fmt.Printf()`
根据格式化字符串输出内容到标准输出。
```go
package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    fmt.Printf("Name: %s, Age: %d\n", name, age)
}
```
**输出:**
```
Name: Alice, Age: 30
```

### 4. `fmt.Sprintf()`
根据格式化字符串生成格式化的字符串，不输出到标准输出，而是返回这个字符串。
```go
package main

import "fmt"

func main() {
    result := fmt.Sprintf("Name: %s, Age: %d", "Bob", 25)
    fmt.Println(result)
}
```
**输出:**
```
Name: Bob, Age: 25
```

### 5. `fmt.Errorf()`
创建一个格式化的错误对象，用于错误处理。
```go
package main

import (
    "fmt"
    "errors"
)

func main() {
    err := fmt.Errorf("an error occurred: %s", "file not found")
    if err != nil {
        fmt.Println(err)
    }
}
```
**输出:**
```
an error occurred: file not found
```

### 6. `fmt.Fprint()`
将格式化的内容写入指定的 `io.Writer`，如文件或网络连接。
```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Fprint(os.Stdout, "Hello, File!")
}
```
**输出:**
```
Hello, File!
```

### 7. `fmt.Fprintln()`
将格式化的内容写入指定的 `io.Writer`，并在末尾添加换行符。
```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Fprintln(os.Stdout, "Hello, File!")
}
```
**输出:**
```
Hello, File!
```

### 8. `fmt.Fprintf()`
根据格式化字符串将内容写入指定的 `io.Writer`。
```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Fprintf(os.Stdout, "Name: %s, Age: %d\n", "Charlie", 40)
}
```
**输出:**
```
Name: Charlie, Age: 40
```

### 9. `fmt.Scan()`
从标准输入读取格式化的数据，类似于 `scanf`。
```go
package main

import "fmt"

func main() {
    var name string
    fmt.Print("Enter your name: ")
    fmt.Scan(&name)
    fmt.Println("Hello,", name)
}
```
**示例输入:**
```
Alice
```
**示例输出:**
```
Hello, Alice
```

### 10. `fmt.Sscan()`
从字符串中读取格式化的数据。
```go
package main

import "fmt"

func main() {
    var name string
    fmt.Sscan("Bob", &name)
    fmt.Println("Hello,", name)
}
```
**输出:**
```
Hello, Bob
```

这些方法覆盖了 `fmt` 包的主要功能，可以帮助你进行格式化输出、输入和错误处理等操作。