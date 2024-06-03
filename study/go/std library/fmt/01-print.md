当使用 `fmt` 包中的 `Print`、`Println`、`Fprint` 和 `Fprintln` 方法时，通常会用于输出文本到标准输出（`os.Stdout`）或者到其他实现了 `io.Writer` 接口的目标，比如文件、网络连接等。下面是这些方法的使用场景及其注释：

1. `Print` 方法：

```go
package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    fmt.Print("Name: ", name, ", Age: ", age)
}
```

输出注释：`Name: Alice, Age: 30`

2. `Println` 方法：

```go
package main

import "fmt"

func main() {
    name := "Bob"
    age := 25
    fmt.Println("Name:", name)
    fmt.Println("Age:", age)
}
```

输出注释：
```
Name: Bob
Age: 25
```

3. `Fprint` 方法（将输出写入到指定的 `io.Writer` 接口）：

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    name := "Charlie"
    age := 35
    file, _ := os.Create("output.txt")
    defer file.Close()
    fmt.Fprint(file, "Name: ", name, ", Age: ", age)
}
```

输出注释：在当前目录下生成一个名为 `output.txt` 的文件，内容为 `Name: Charlie, Age: 35`

4. `Fprintln` 方法（将输出写入到指定的 `io.Writer` 接口，并在末尾添加换行符）：

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    name := "David"
    age := 40
    file, _ := os.Create("output.txt")
    defer file.Close()
    fmt.Fprintln(file, "Name:", name)
    fmt.Fprintln(file, "Age:", age)
}
```

输出注释：在当前目录下生成一个名为 `output.txt` 的文件，内容为：
```
Name: David
Age: 40
```

这些方法可以根据需要将数据输出到标准输出或文件中，并且可以灵活控制输出的格式。