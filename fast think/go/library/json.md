以下是此对话中涉及的所有Go语言`encoding/json`包的示例代码总结：

### 1. 基本JSON编码

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Address struct {
	Province string
	City     string
}

type Person struct {
	Name    string  `json:"name"`
	Age     int     `json:"age"`
	Address Address `json:"address"`
}

func main() {
	p := Person{
		Name: "Alice",
		Age:  30,
		Address: Address{
			Province: "Guangdong",
			City:     "Shenzhen",
		},
	}
	jsonData, err := json.Marshal(p)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return
	}
	fmt.Println(string(jsonData))
}
```

**输出**:
```json
{"name":"Alice","age":30,"address":{"province":"Guangdong","city":"Shenzhen"}}
```

### 2. 基本JSON解码

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Address struct {
	Province string `json:"province"`
	City     string `json:"city"`
}

type Person struct {
	Name    string  `json:"name"`
	Age     int     `json:"age"`
	Address Address `json:"address"`
}

func main() {
	jsonString := `{"name":"Alice","age":30,"address":{"province":"Guangdong","city":"Shenzhen"}}`

	var p Person

	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p)
}
```

**输出**:
```plaintext
{Name:Alice Age:30 Address:{Province:Guangdong City:Shenzhen}}
```

### 3. 处理可选字段

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Address struct {
	Province string `json:"province,omitempty"`
	City     string `json:"city,omitempty"`
}

type Person struct {
	Name    string  `json:"name"`
	Age     int     `json:"age"`
	Address *Address `json:"address,omitempty"`
}

func main() {
	jsonString := `{"name":"Alice","age":30}`

	var p Person

	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p)
}
```

**输出**:
```plaintext
{Name:Alice Age:30 Address:<nil>}
```

### 4. 自定义字段名

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func main() {
	jsonString := `{"first_name":"John","last_name":"Doe"}`

	var p Person

	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p)
}
```

**输出**:
```plaintext
{FirstName:John LastName:Doe}
```

### 5. 处理数据类型不匹配

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
	jsonString := `{"name":"Alice","age":"thirty"}`

	var p Person

	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p)
}
```

**输出**:
```plaintext
Error unmarshaling JSON: json: cannot unmarshal string into Go struct field Person.age of type int
```

### 6. 处理嵌套的JSON结构

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Address struct {
	Province string `json:"province"`
	City     string `json:"city"`
}

type Person struct {
	Name    string  `json:"name"`
	Age     int     `json:"age"`
	Address Address `json:"address"`
}

func main() {
	p := Person{
		Name: "Alice",
		Age:  30,
		Address: Address{
			Province: "Guangdong",
			City:     "Shenzhen",
		},
	}

	jsonData, err := json.Marshal(p)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return
	}

	fmt.Println(string(jsonData))
}
```

**输出**:
```json
{"name":"Alice","age":30,"address":{"province":"Guangdong","city":"Shenzhen"}}
```

### 7. 处理空值字段

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	Name string  `json:"name"`
	Age  *int    `json:"age,omitempty"`
}

func main() {
	jsonString := `{"name":"Alice"}`

	var p Person

	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p)
}
```

**输出**:
```plaintext
{Name:Alice Age:<nil>}
```

### 8. 自定义编码和解码

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

func (p Person) MarshalJSON() ([]byte, error) {
	type Alias Person
	return json.Marshal(&struct {
		*Alias
		Age string `json:"age"`
	}{
		Alias: (*Alias)(&p),
		Age:   fmt.Sprintf("%d years", p.Age),
	})
}

func (p *Person) UnmarshalJSON(data []byte) error {
	type Alias Person
	aux := &struct {
		Age string `json:"age"`
		*Alias
	}{
		Alias: (*Alias)(p),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	var age int
	_, err := fmt.Sscanf(aux.Age, "%d years", &age)
	if err != nil {
		return err
	}
	p.Age = age
	return nil
}

func main() {
	p := Person{Name: "Alice", Age: 30}

	jsonData, err := json.Marshal(p)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return
	}

	fmt.Println(string(jsonData))

	var p2 Person
	err = json.Unmarshal(jsonData, &p2)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	fmt.Printf("%+v\n", p2)
}
```

**输出**:
```json
{"name":"Alice","age":"30 years"}
```
```plaintext
{Name:Alice Age:30}
```

这些示例代码展示了如何使用`encoding/json`包进行编码、解码，以及处理各种常见的JSON数据情况。如果有任何进一步的疑问或需要更详细的解释，请随时告诉我！