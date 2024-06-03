io包中的Write方法提供了一种通用的写入数据的接口，适用于各种输出目标。以下是一些使用场景及其对应的注释：

1. **写入文件内容**：
   ```go
   package main

   import (
       "fmt"
       "os"
   )

   func main() {
       file, err := os.Create("output.txt")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer file.Close()

       data := []byte("Hello, world!\n")
       _, err = file.Write(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println("Data written to file.")
   }
   ```
   输出注释：将字符串"Hello, world!"写入文件"output.txt"。

2. **写入网络连接**：
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

       data := []byte("GET / HTTP/1.1\r\nHost: example.com\r\n\r\n")
       _, err = conn.Write(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Println("Data sent to server.")
   }
   ```
   输出注释：向"example.com:80"的TCP连接发送HTTP请求。

3. **写入标准输出**：
   ```go
   package main

   import (
       "fmt"
       "os"
   )

   func main() {
       data := []byte("Hello, world!\n")
       _, err := os.Stdout.Write(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
   }
   ```
   输出注释：将字符串"Hello, world!"写入标准输出。

4. **使用Writer接口写入到内存中**：
   ```go
   package main

   import (
       "fmt"
       "bytes"
   )

   func main() {
       var buf bytes.Buffer

       data := []byte("Hello, world!\n")
       _, err := buf.Write(data)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }

       fmt.Println("Data written to buffer:", buf.String())
   }
   ```
   输出注释：将字符串"Hello, world!"写入到内存缓冲区，并将缓冲区内容打印在控制台上。
