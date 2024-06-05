### `encoding/json`包的功能定义

`encoding/json`包是Go标准库中的一个包，提供了对JSON（JavaScript Object Notation）数据进行编码和解码的支持。JSON是一种轻量级的数据交换格式，广泛用于网络通信和数据存储。`encoding/json`包主要功能包括：

1. **JSON数据的编码和解码**：
   - 提供了将Go数据结构编码为JSON格式的功能，通过`Marshal`和`MarshalIndent`函数将Go数据结构转换为JSON字节片或字符串。
   - 提供了将JSON数据解码为Go数据结构的功能，通过`Unmarshal`函数将JSON字节片或字符串解析为Go的数据结构。

2. **数据流处理**：
   - 支持对JSON数据流的逐步读取和写入，通过`Encoder`和`Decoder`类型实现对JSON数据流的编码和解码操作，适用于大数据量的处理和网络通信。
   - 支持通过`Encode`和`Decode`方法对数据流进行编码和解码，方便处理文件和网络数据流。

3. **自定义编码和解码**：
   - 提供了自定义编码和解码行为的支持，通过实现`json.Marshaler`和`json.Unmarshaler`接口，可以定义复杂类型的自定义JSON序列化和反序列化行为。
   - 支持通过标签（tag）在结构体字段上定义编码和解码规则，如字段名、忽略字段等。

4. **支持多种数据类型**：
   - 支持对常见的基本数据类型、结构体、切片、数组、字典等多种Go数据类型进行编码和解码。
   - 提供对接口类型的支持，可以动态解析未知的JSON数据结构。

5. **处理特殊情况**：
   - 处理空值和默认值，通过`omitempty`标签和零值处理，可以灵活控制JSON数据的生成。
   - 处理数字和布尔值的各种情况，通过解析和序列化选项，可以控制浮点数和整型的表示。

### 使用示例

以下是`encoding/json`包的一些常见用法示例：

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type Person struct {
	Name   string `json:"name"`
	Age    int    `json:"age"`
	Email  string `json:"email,omitempty"`
}

func main() {
	// 结构体实例
	person := Person{Name: "Alice", Age: 30}

	// 编码为JSON
	jsonData, err := json.Marshal(person)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("JSON:", string(jsonData)) // 输出: {"name":"Alice","age":30}

	// 带缩进的JSON编码
	jsonDataIndented, err := json.MarshalIndent(person, "", "  ")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Indented JSON:", string(jsonDataIndented))
	// 输出:
	// {
	//   "name": "Alice",
	//   "age": 30
	// }

	// 解码JSON数据
	jsonStr := `{"name":"Bob","age":25,"email":"bob@example.com"}`
	var personDecoded Person
	err = json.Unmarshal([]byte(jsonStr), &personDecoded)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Decoded: %+v\n", personDecoded) // 输出: Decoded: {Name:Bob Age:25 Email:bob@example.com}

	// 使用Decoder进行流式解码
	jsonStream := `{"name":"Charlie","age":35}`
	decoder := json.NewDecoder(strings.NewReader(jsonStream))
	var personStream Person
	err = decoder.Decode(&personStream)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Stream Decoded: %+v\n", personStream) // 输出: Stream Decoded: {Name:Charlie Age:35 Email:}
}
```

### 结论

`encoding/json`包是Go语言中进行JSON数据处理的基础工具。它提供了丰富的编码和解码功能，支持多种数据类型和自定义行为。通过`encoding/json`包，开发人员可以在Go语言中方便地处理JSON数据，实现网络通信和数据存储的需求。