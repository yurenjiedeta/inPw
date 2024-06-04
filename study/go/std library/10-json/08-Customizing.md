`encoding/json`包是Go语言标准库的一部分，用于处理JSON数据。使用这个包可以轻松地将结构体（struct）编码为JSON格式或从JSON格式解码。以下是一些常见的使用场景以及它们的输出示例：

### 1. 基本用法：将结构体编码为JSON

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"Name":"Alice","Age":30}
```
**说明：**
这是最基本的用法，结构体的字段名会直接映射为JSON对象的键名。

### 2. 使用结构体标签（struct tags）指定JSON键名

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"name":"Alice","age":30}
```
**说明：**
通过在结构体字段后面添加`json`标签，可以自定义JSON对象中的键名。

### 3. 忽略字段

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"-"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"name":"Alice"}
```
**说明：**
使用`json:"-"`标签可以忽略某个字段，使其不会出现在生成的JSON中。

### 4. 嵌套结构体

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Address struct {
    City  string `json:"city"`
    State string `json:"state"`
}

type Person struct {
    Name    string  `json:"name"`
    Age     int     `json:"age"`
    Address Address `json:"address"`
}

func main() {
    p := Person{Name: "Alice", Age: 30, Address: Address{City: "Wonderland", State: "Fantasy"}}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"name":"Alice","age":30,"address":{"city":"Wonderland","state":"Fantasy"}}
```
**说明：**
结构体可以嵌套，嵌套的结构体也会被正确地编码为JSON对象。

### 5. Omitempty标签：忽略零值字段

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age,omitempty"`
}

func main() {
    p := Person{Name: "Alice"}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"name":"Alice"}
```
**说明：**
使用`omitempty`标签，零值字段（如空字符串、0、nil等）在编码时会被忽略。

### 6. 指定JSON数字的编码格式

```go
package main

import (
    "encoding/json"
    "fmt"
    "strconv"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age,string"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData))
}
```

**输出：**
```json
{"name":"Alice","age":"30"}
```
**说明：**
使用`json:",string"`标签，数值会被编码为字符串形式。

### 7. 解码JSON到结构体

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    jsonData := `{"name":"Alice","age":30}`
    var p Person
    json.Unmarshal([]byte(jsonData), &p)
    fmt.Printf("%+v\n", p)
}
```

**输出：**
```
{Name:Alice Age:30}
```
**说明：**
使用`json.Unmarshal`函数可以将JSON数据解码到结构体中。

这些示例展示了`encoding/json`包在各种常见使用场景下的用法和输出。通过理解和应用这些用法，可以有效地处理JSON数据。