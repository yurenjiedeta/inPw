下面是对话中涉及的所有Go语言 `net/http` 包的示例代码汇总：

### 1. **设置和读取HTTP Cookie**

**设置Cookie：**
```go
package main

import (
	"fmt"
	"net/http"
)

func setCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie := &http.Cookie{
		Name:     "username",
		Value:    "JohnDoe",
		Path:     "/",
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)
	fmt.Fprintln(w, "Cookie set successfully!")
}

func main() {
	http.HandleFunc("/set-cookie", setCookieHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

**读取Cookie：**
```go
package main

import (
	"fmt"
	"net/http"
)

func getCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("username")
	if err != nil {
		http.Error(w, "Cookie not found", http.StatusNotFound)
		return
	}
	fmt.Fprintf(w, "Cookie Value: %s", cookie.Value)
}

func main() {
	http.HandleFunc("/get-cookie", getCookieHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 2. **处理HTTP请求中的表单数据**

```go
package main

import (
	"fmt"
	"net/http"
)

func formHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}
	name := r.FormValue("name")
	email := r.FormValue("email")
	fmt.Fprintf(w, "Name: %s\n", name)
	fmt.Fprintf(w, "Email: %s\n", email)
}

func main() {
	http.HandleFunc("/submit", formHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 3. **实现HTTP基本身份认证（Basic Authentication）**

```go
package main

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"
)

func basicAuthHandler(w http.ResponseWriter, r *http.Request) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
		http.Error(w, "Authorization required", http.StatusUnauthorized)
		return
	}
	authParts := strings.SplitN(auth, " ", 2)
	if len(authParts) != 2 || authParts[0] != "Basic" {
		http.Error(w, "Invalid Authorization header", http.StatusBadRequest)
		return
	}
	payload, _ := base64.StdEncoding.DecodeString(authParts[1])
	pair := strings.SplitN(string(payload), ":", 2)
	if len(pair) != 2 || pair[0] != "admin" || pair[1] != "password" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	fmt.Fprintln(w, "Welcome, admin!")
}

func main() {
	http.HandleFunc("/", basicAuthHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 4. **使用 `http.ServeFile` 函数处理静态文件请求**

```go
package main

import (
	"net/http"
)

func fileHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static"+r.URL.Path)
}

func main() {
	http.HandleFunc("/", fileHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 5. **处理和解析JSON格式的HTTP请求体**

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func jsonHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "Name: %s\n", user.Name)
	fmt.Fprintf(w, "Email: %s\n", user.Email)
}

func main() {
	http.HandleFunc("/json", jsonHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 6. **处理HTTP请求中的表单数据（非文件上传）**

```go
package main

import (
	"fmt"
	"net/http"
)

func formHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}
	name := r.FormValue("name")
	email := r.FormValue("email")
	fmt.Fprintf(w, "Name: %s\n", name)
	fmt.Fprintf(w, "Email: %s\n", email)
}

func main() {
	http.HandleFunc("/submit", formHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 7. **实现HTTP基本身份认证（Basic Authentication）**

```go
package main

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"
)

func basicAuthHandler(w http.ResponseWriter, r *http.Request) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
		http.Error(w, "Authorization required", http.StatusUnauthorized)
		return
	}
	authParts := strings.SplitN(auth, " ", 2)
	if len(authParts) != 2 || authParts[0] != "Basic" {
		http.Error(w, "Invalid Authorization header", http.StatusBadRequest)
		return
	}
	payload, _ := base64.StdEncoding.DecodeString(authParts[1])
	pair := strings.SplitN(string(payload), ":", 2)
	if len(pair) != 2 || pair[0] != "admin" || pair[1] != "password" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	fmt.Fprintln(w, "Welcome, admin!")
}

func main() {
	http.HandleFunc("/", basicAuthHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 8. **使用 `http.ServeFile` 函数处理静态文件请求**

```go
package main

import (
	"net/http"
)

func fileHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static"+r.URL.Path)
}

func main() {
	http.HandleFunc("/", fileHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 9. **处理和解析JSON格式的HTTP请求体**

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func jsonHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "Name: %s\n", user.Name)
	fmt.Fprintf(w, "Email: %s\n", user.Email)
}

func main() {
	http.HandleFunc("/json", jsonHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 10. **如何在Go中实现HTTP基本身份认证（Basic Authentication）**

```go
package main

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"
)

func basicAuthHandler(w http.ResponseWriter, r *http.Request) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
		http.Error(w, "Authorization required", http.StatusUnauthorized)
		return
	}
	authParts := strings.SplitN(auth, " ", 2)
	if len(authParts) != 2 || authParts[0] != "Basic" {
		http.Error(w, "Invalid Authorization header", http.StatusBadRequest)
		return
	}
	payload, _ := base64.StdEncoding.DecodeString(authParts[1])
	pair := strings.SplitN(string(payload), ":", 2)
	if len(pair) != 2 || pair[0] != "admin" || pair[1] != "password" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	fmt.Fprintln(w, "Welcome, admin!")
}

func main() {
	http.HandleFunc("/", basicAuthHandler)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
```

以上是对话中涉及的所有示例代码。如果你有更多问题或需要进一步的帮助，请告诉

我！