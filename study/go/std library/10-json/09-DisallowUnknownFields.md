`encoding/json`包中的`DisallowUnknownFields`方法用于创建一个新的JSON解码器，并配置该解码器以禁止未知字段。这在确保接收到的JSON数据与预期的Go结构体严格匹配时非常有用。以下是一些常见的使用场景及其输出示例和注释：

### 场景1：解析符合预期的JSON数据

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    jsonData := `{"Name": "Alice", "Age": 30}`
    var person Person
    decoder := json.NewDecoder(strings.NewReader(jsonData))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&person); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed successfully:", person)
    }
}
```

**输出：**
```text
Parsed successfully: {Alice 30}
```
**注释：** 这个场景中，解析一个符合预期结构的JSON数据，没有未知字段，解析成功。

### 场景2：解析包含未知字段的JSON数据

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    jsonData := `{"Name": "Alice", "Age": 30, "Gender": "Female"}`
    var person Person
    decoder := json.NewDecoder(strings.NewReader(jsonData))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&person); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed successfully:", person)
    }
}
```

**输出：**
```text
Error: json: unknown field "Gender"
```
**注释：** 这个场景中，解析一个包含未知字段的JSON数据，由于`DisallowUnknownFields`的设置，解析失败并返回错误。

### 场景3：解析嵌套结构中包含未知字段的JSON数据

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Address struct {
    City  string
    State string
}

type Person struct {
    Name    string
    Age     int
    Address Address
}

func main() {
    jsonData := `{"Name": "Alice", "Age": 30, "Address": {"City": "New York", "State": "NY", "Zip": "10001"}}`
    var person Person
    decoder := json.NewDecoder(strings.NewReader(jsonData))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&person); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed successfully:", person)
    }
}
```

**输出：**
```text
Error: json: unknown field "Zip"
```
**注释：** 这个场景中，解析一个包含嵌套结构且嵌套结构中有未知字段的JSON数据，由于`DisallowUnknownFields`的设置，解析失败并返回错误。

### 场景4：解析JSON数组并禁止未知字段

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    jsonData := `[{"Name": "Alice", "Age": 30}, {"Name": "Bob", "Age": 25, "Gender": "Male"}]`
    var people []Person
    decoder := json.NewDecoder(strings.NewReader(jsonData))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&people); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed successfully:", people)
    }
}
```

**输出：**
```text
Error: json: unknown field "Gender"
```
**注释：** 这个场景中，解析一个JSON数组，其中一个对象包含未知字段，由于`DisallowUnknownFields`的设置，解析失败并返回错误。

### 场景5：解析空JSON对象

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    jsonData := `{}`
    var person Person
    decoder := json.NewDecoder(strings.NewReader(jsonData))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&person); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed successfully:", person)
    }
}
```

**输出：**
```text
Parsed successfully: { 0}
```
**注释：** 这个场景中，解析一个空的JSON对象，尽管没有任何字段，解析成功并生成零值的`Person`结构体。

通过这些示例，我们可以看到`DisallowUnknownFields`方法在不同场景下的使用方式，以及它在解析JSON数据时的行为。每个场景展示了当JSON数据包含未知字段时，该方法如何帮助确保数据与预期结构严格匹配。