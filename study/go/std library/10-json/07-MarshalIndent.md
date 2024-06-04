在Go语言中，`encoding/json`包提供了强大的JSON编码和解码功能，其中`json.Marshal`和`json.MarshalIndent`方法用来将Go对象编码成JSON格式的字符串。虽然`encoding/json`包本身没有名为`SetIndent`的方法，但我们通常使用`json.MarshalIndent`来实现类似功能，它允许我们设置输出的缩进格式。以下是几个常见的使用场景及其输出结果，并附有注释。

### 使用场景1：简单结构体的缩进JSON编码
**代码：**
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
	jsonData, err := json.MarshalIndent(p, "", "  ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}
	fmt.Println(string(jsonData))
}
```

**输出：**
```json
{
  "Name": "Alice",
  "Age": 30
}
```
**注释：**
在这个场景中，我们定义了一个`Person`结构体，并创建了一个实例`p`。使用`json.MarshalIndent`方法将其编码成JSON格式，其中缩进字符串为两个空格，结果是具有良好可读性的JSON格式。

### 使用场景2：嵌套结构体的缩进JSON编码
**代码：**
```go
package main

import (
	"encoding/json"
	"fmt"
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
	p := Person{Name: "Bob", Age: 25, Address: Address{City: "New York", State: "NY"}}
	jsonData, err := json.MarshalIndent(p, "", "    ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}
	fmt.Println(string(jsonData))
}
```

**输出：**
```json
{
    "Name": "Bob",
    "Age": 25,
    "Address": {
        "City": "New York",
        "State": "NY"
    }
}
```
**注释：**
在这个例子中，我们有一个包含嵌套结构体的`Person`结构体。`json.MarshalIndent`方法以四个空格作为缩进符，生成的JSON更加层次分明，便于阅读。

### 使用场景3：包含数组的结构体缩进JSON编码
**代码：**
```go
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	Name   string
	Age    int
	Hobbies []string
}

func main() {
	p := Person{Name: "Charlie", Age: 28, Hobbies: []string{"Reading", "Hiking", "Swimming"}}
	jsonData, err := json.MarshalIndent(p, "", "  ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}
	fmt.Println(string(jsonData))
}
```

**输出：**
```json
{
  "Name": "Charlie",
  "Age": 28,
  "Hobbies": [
    "Reading",
    "Hiking",
    "Swimming"
  ]
}
```
**注释：**
在这个场景中，`Person`结构体包含一个字符串数组`Hobbies`。通过`json.MarshalIndent`方法编码后，数组元素在JSON中也是缩进格式的，从而保持了整个JSON的良好结构和可读性。

### 使用场景4：复杂结构体的缩进JSON编码
**代码：**
```go
package main

import (
	"encoding/json"
	"fmt"
)

type Job struct {
	Title  string
	Salary int
}

type Person struct {
	Name    string
	Age     int
	Address Address
	Job     Job
}

func main() {
	p := Person{
		Name:    "Diana",
		Age:     35,
		Address: Address{City: "San Francisco", State: "CA"},
		Job:     Job{Title: "Engineer", Salary: 120000},
	}
	jsonData, err := json.MarshalIndent(p, "", "    ")
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}
	fmt.Println(string(jsonData))
}
```

**输出：**
```json
{
    "Name": "Diana",
    "Age": 35,
    "Address": {
        "City": "San Francisco",
        "State": "CA"
    },
    "Job": {
        "Title": "Engineer",
        "Salary": 120000
    }
}
```
**注释：**
在这个例子中，我们定义了一个包含多个嵌套结构体的`Person`结构体，包括`Address`和`Job`。使用`json.MarshalIndent`方法进行编码，设置了四个空格的缩进，使得输出的JSON更加清晰、层次分明。

### 总结
`json.MarshalIndent`方法非常适合在需要生成可读性良好的JSON输出时使用，比如日志记录、调试信息输出、配置文件生成等场景。通过设置合适的缩进字符串，可以轻松地调整输出格式，使得JSON数据更加美观易读。