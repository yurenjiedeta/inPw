当然，这里是 `net/http` 包中的 `SetCookie`、`Cookie` 和 `Cookies` 方法的示例：

### 1. `http.SetCookie`
`http.SetCookie` 用于在 HTTP 响应中设置一个或多个 Cookie。

示例：
```go
package main

import (
	"net/http"
	"time"
)

func setCookieHandler(w http.ResponseWriter, r *http.Request) {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	cookie := http.Cookie{Name: "username", Value: "golang", Expires: expiration}
	http.SetCookie(w, &cookie)
	w.Write([]byte("Cookie has been set"))
}

func main() {
	http.HandleFunc("/setcookie", setCookieHandler)
	http.ListenAndServe(":8080", nil)
}
```
这个示例创建了一个名为 `username` 的 Cookie，值为 `golang`，并设置过期时间为一年后。

### 2. `http.Request.Cookie`
`http.Request.Cookie` 用于获取 HTTP 请求中指定名称的单个 Cookie。

示例：
```go
package main

import (
	"net/http"
	"fmt"
)

func getCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("username")
	if err != nil {
		if err == http.ErrNoCookie {
			w.Write([]byte("Cookie not found"))
			return
		}
		w.Write([]byte("Error retrieving the cookie"))
		return
	}
	fmt.Fprintf(w, "Cookie value: %s\n", cookie.Value)
}

func main() {
	http.HandleFunc("/getcookie", getCookieHandler)
	http.ListenAndServe(":8080", nil)
}
```
这个示例尝试获取名为 `username` 的 Cookie，并在响应中写出其值。

### 3. `http.Request.Cookies`
`http.Request.Cookies` 用于获取 HTTP 请求中的所有 Cookie。

示例：
```go
package main

import (
	"net/http"
	"fmt"
)

func getAllCookiesHandler(w http.ResponseWriter, r *http.Request) {
	cookies := r.Cookies()
	if len(cookies) == 0 {
		w.Write([]byte("No cookies found"))
		return
	}
	for _, cookie := range cookies {
		fmt.Fprintf(w, "Cookie name: %s, value: %s\n", cookie.Name, cookie.Value)
	}
}

func main() {
	http.HandleFunc("/getallcookies", getAllCookiesHandler)
	http.ListenAndServe(":8080", nil)
}
```
这个示例获取所有的 Cookie，并在响应中逐个列出其名称和值。

### 综合示例

将设置、获取单个 Cookie 和获取所有 Cookie 结合在一起的综合示例：

```go
package main

import (
	"net/http"
	"time"
	"fmt"
)

func setCookieHandler(w http.ResponseWriter, r *http.Request) {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	cookie := http.Cookie{Name: "username", Value: "golang", Expires: expiration}
	http.SetCookie(w, &cookie)
	w.Write([]byte("Cookie has been set"))
}

func getCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("username")
	if err != nil {
		if err == http.ErrNoCookie {
			w.Write([]byte("Cookie not found"))
			return
		}
		w.Write([]byte("Error retrieving the cookie"))
		return
	}
	fmt.Fprintf(w, "Cookie value: %s\n", cookie.Value)
}

func getAllCookiesHandler(w http.ResponseWriter, r *http.Request) {
	cookies := r.Cookies()
	if len(cookies) == 0 {
		w.Write([]byte("No cookies found"))
		return
	}
	for _, cookie := range cookies {
		fmt.Fprintf(w, "Cookie name: %s, value: %s\n", cookie.Name, cookie.Value)
	}
}

func main() {
	http.HandleFunc("/setcookie", setCookieHandler)
	http.HandleFunc("/getcookie", getCookieHandler)
	http.HandleFunc("/getallcookies", getAllCookiesHandler)
	http.ListenAndServe(":8080", nil)
}
```

运行这个示例，您可以通过访问 `/setcookie` 设置 Cookie，通过访问 `/getcookie` 获取特定 Cookie，通过访问 `/getallcookies` 获取所有 Cookie。