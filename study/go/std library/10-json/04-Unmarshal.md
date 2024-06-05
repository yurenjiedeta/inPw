```
1、给定json字符串，定义好结构体；
2、转为 byte 切片；
3、把切片和结构体指针传入方法。
```

Go 语言中的 `encoding/json` 包提供了强大的 JSON 编码和解码功能。`Unmarshal` 方法用于将 JSON 数据解码为 Go 语言中的数据结构。下面是一些常见的使用场景以及相应的输出示例和注释。

### 1. 解码到结构体
假设我们有一个结构体和对应的 JSON 数据：

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
	jsonData := `{"name": "Alice", "age": 30}`
	var person Person
	err := json.Unmarshal([]byte(jsonData), &person)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", person)
}
```

**输出：**

```
{Name:Alice Age:30}
```

**注释：**
- `Unmarshal` 将 JSON 数据解码到 `Person` 结构体中。
- JSON 字段通过结构体字段标签 `json:"name"` 映射到结构体字段。

### 2. 解码到 map[string]interface{}
这种方式适用于未知 JSON 结构的情况：

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	jsonData := `{"name": "Alice", "age": 30}`
	var data map[string]interface{}
	err := json.Unmarshal([]byte(jsonData), &data)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", data)
}
```

**输出：**

```
map[age:30 name:Alice]
```

**注释：**
- `Unmarshal` 将 JSON 数据解码到 `map[string]interface{}` 中。
- 这种方式适用于结构不固定的 JSON 数据。

### 3. 解码到 slice
用于 JSON 数组的解码：

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	jsonData := `[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]`
	var people []map[string]interface{}
	err := json.Unmarshal([]byte(jsonData), &people)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", people)
}
```

**输出：**

```
[map[age:30 name:Alice] map[age:25 name:Bob]]
```

**注释：**
- `Unmarshal` 将 JSON 数组解码到 `[]map[string]interface{}` 中。
- 每个 JSON 对象被解码为一个 map。

### 4. 解码到嵌套结构体
当 JSON 包含嵌套对象时：

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
	jsonData := `{"name": "Alice", "age": 30, "address": {"city": "Wonderland", "state": "Dream"}}`
	var person Person
	err := json.Unmarshal([]byte(jsonData), &person)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", person)
}
```

**输出：**

```
{Name:Alice Age:30 Address:{City:Wonderland State:Dream}}
```

**注释：**
- `Unmarshal` 将嵌套的 JSON 对象解码到嵌套的结构体中。

### 5. 解码到空接口
这种方式允许解码任意 JSON 数据：

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	jsonData := `{"name": "Alice", "age": 30, "skills": ["Go", "Python"]}`
	var data interface{}
	err := json.Unmarshal([]byte(jsonData), &data)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v\n", data)
}
```

**输出：**

```
map[string]interface {}{"age":30, "name":"Alice", "skills":[]interface {}{"Go", "Python"}}
```

**注释：**
- `Unmarshal` 将 JSON 数据解码到 `interface{}` 类型。
- 结果可以是 map 或 slice，具体取决于 JSON 数据结构。

这些示例涵盖了 `encoding/json` 包中 `Unmarshal` 方法的常见使用场景和其输出格式。根据具体需求选择合适的数据结构，可以更高效地处理 JSON 数据。