```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

type StringHandler struct {
	message string
}

func (sh StringHandler) ServeHTTP(writer http.ResponseWriter,
	request *http.Request) {
	io.WriteString(writer, sh.message)
}
func main() {
	err := http.ListenAndServe(":5000", StringHandler{message: "Hello, World"})
	if err != nil {
		fmt.Printf("Error: %v", err.Error())
	}
}

```

