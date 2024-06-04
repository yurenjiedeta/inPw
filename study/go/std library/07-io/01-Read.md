io包中的Reader方法提供了一种通用的读取数据的接口，适用于各种输入源。以下是一些使用场景及其对应的注释：

1. **读取文件内容**：
   ```go
   package main

   import (
       "fmt"
       "io"
       "os"
   )

   func main() {
       file, err := os.Open("example.txt")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer file.Close()

       data := make([]byte, 100)
       n, err := file.Read(data)
       if err != nil && err != io.EOF {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println(string(data[:n]))
   }
   ```
   输出注释：读取文件"example.txt"的内容，并打印在控制台上。

2. **从网络连接中读取数据**：
   ```go
   package main

   import (
       "fmt"
       "net"
   )

   func main() {
       conn, err := net.Dial("tcp", "example.com:80")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer conn.Close()

       data := make([]byte, 100)
       _, err = conn.Read(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println(string(data))
   }
   ```
   输出注释：从TCP连接中读取数据，并将其打印在控制台上。

3. **读取标准输入**：
   ```go
   package main

   import (
       "fmt"
       "os"
   )

   func main() {
       data := make([]byte, 100)
       _, err := os.Stdin.Read(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println(string(data))
   }
   ```
   输出注释：从标准输入读取数据，并将其打印在控制台上。

4. **使用Reader接口读取内存中的数据**：
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       data := "Hello, world!"
       reader := strings.NewReader(data)

       buf := make([]byte, 100)
       n, err := reader.Read(buf)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println(string(buf[:n]))
   }
   ```
   输出注释：从字符串"Hello, world!"中读取数据，并将其打印在控制台上。
