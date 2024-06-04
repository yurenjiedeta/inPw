`encoding/json`包中的`SetEscapeHTML`方法用于设置是否在JSON编码期间转义HTML字符（如`<`、`>`和`&`）。默认情况下，这些字符是被转义的，以防止某些类型的XSS（跨站脚本）攻击。下面是一些使用`SetEscapeHTML`方法的场景示例，并附上输出和注释。

### 场景1：默认行为（转义HTML字符）

默认情况下，JSON编码器会转义HTML字符。

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Example struct {
	Content string `json:"content"`
}

func main() {
	e := Example{Content: "<div>Hello & Welcome</div>"}
	data, _ := json.Marshal(e)
	fmt.Println(string(data))
}
```

**输出：**
```json
{"content":"\u003cdiv\u003eHello \u0026 Welcome\u003c/div\u003e"}
```

**注释：**
默认情况下，HTML字符被转义：`<` -> `\u003c`，`>` -> `\u003e`，`&` -> `\u0026`。

### 场景2：禁用HTML转义

使用`SetEscapeHTML(false)`禁用HTML字符的转义。

```go
package main

import (
	"encoding/json"
	"fmt"
	"bytes"
)

type Example struct {
	Content string `json:"content"`
}

func main() {
	e := Example{Content: "<div>Hello & Welcome</div>"}
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	encoder.Encode(e)
	fmt.Println(buffer.String())
}
```

**输出：**
```json
{"content":"<div>Hello & Welcome</div>"}
```

**注释：**
禁用HTML字符的转义后，输出中的HTML字符保留原样。

### 场景3：对嵌套结构禁用HTML转义

在嵌套结构中禁用HTML转义。

```go
package main

import (
	"encoding/json"
	"fmt"
	"bytes"
)

type Inner struct {
	Detail string `json:"detail"`
}

type Outer struct {
	Info Inner `json:"info"`
}

func main() {
	o := Outer{Info: Inner{Detail: "<span>Safe & Sound</span>"}}
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	encoder.Encode(o)
	fmt.Println(buffer.String())
}
```

**输出：**
```json
{"info":{"detail":"<span>Safe & Sound</span>"}}
```

**注释：**
在嵌套结构中禁用HTML转义，输出中的HTML字符同样保留原样。

### 场景4：在包含HTML的切片中禁用HTML转义

在包含HTML内容的切片中禁用HTML转义。

```go
package main

import (
	"encoding/json"
	"fmt"
	"bytes"
)

type Item struct {
	Name string `json:"name"`
}

func main() {
	items := []Item{
		{Name: "<a href='url'>Link</a>"},
		{Name: "<b>Bold Text</b>"},
	}
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	encoder.Encode(items)
	fmt.Println(buffer.String())
}
```

**输出：**
```json
[{"name":"<a href='url'>Link</a>"},{"name":"<b>Bold Text</b>"}]
```

**注释：**
对包含HTML内容的切片禁用HTML转义，输出中的HTML字符保留原样。

### 场景5：在带有特殊字符的结构中禁用HTML转义

在带有其他特殊字符（如引号）的结构中禁用HTML转义。

```go
package main

import (
	"encoding/json"
	"fmt"
	"bytes"
)

type Document struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func main() {
	doc := Document{
		Title:   "Example \"Title\"",
		Content: "<p>Paragraph with 'single' & \"double\" quotes</p>",
	}
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	encoder.Encode(doc)
	fmt.Println(buffer.String())
}
```

**输出：**
```json
{"title":"Example \"Title\"","content":"<p>Paragraph with 'single' & \"double\" quotes</p>"}
```

**注释：**
禁用HTML转义后，包含HTML字符和引号的字符串保留原样。

通过这些示例，可以看到在不同场景下使用`SetEscapeHTML`方法来控制JSON编码期间是否转义HTML字符的效果。这对于防止XSS攻击或确保输出中的HTML字符保持原样非常有用。