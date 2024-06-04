io包中的Copy方法提供了一种简便的方式来将数据从一个Reader复制到一个Writer，适用于各种数据传输场景。以下是一些使用场景及其对应的注释：

1. **从文件复制到另一个文件**：
   ```go
   package main

   import (
       "fmt"
       "io"
       "os"
   )

   func main() {
       src, err := os.Open("source.txt")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer src.Close()

       dest, err := os.Create("destination.txt")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer dest.Close()

       n, err := io.Copy(dest, src)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Printf("Copied %d bytes from source to destination.\n", n)
   }
   ```
   输出注释：从文件"source.txt"复制数据到文件"destination.txt"。

2. **从HTTP响应体复制到文件**：
   ```go
   package main

   import (
       "fmt"
       "io"
       "net/http"
       "os"
   )

   func main() {
       response, err := http.Get("http://example.com/resource")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer response.Body.Close()

       file, err := os.Create("response_body.txt")
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       defer file.Close()

       n, err := io.Copy(file, response.Body)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Printf("Copied %d bytes from response body to file.\n", n)
   }
   ```
   输出注释：从HTTP响应体复制数据到文件"response_body.txt"。

3. **从标准输入复制到标准输出**：
   ```go
   package main

   import (
       "fmt"
       "io"
       "os"
   )

   func main() {
       n, err := io.Copy(os.Stdout, os.Stdin)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Printf("Copied %d bytes from stdin to stdout.\n", n)
   }
   ```
   输出注释：从标准输入复制数据到标准输出。

4. **使用Reader和Writer接口进行数据传输**：
   ```go
   package main

   import (
       "fmt"
       "io"
       "bytes"
   )

   func main() {
       data := []byte("Hello, world!")
       reader := bytes.NewReader(data)
       writer := new(bytes.Buffer)

       n, err := io.Copy(writer, reader)
       if err != nil {
           fmt.Println("Error:", err)
           return
       }
       fmt.Printf("Copied %d bytes from reader to writer.\n", n)
       fmt.Println("Data in writer:", writer.String())
   }
   ```
   输出注释：使用Reader和Writer接口将数据从内存中的Reader复制到内存中的Writer，并打印复制的字节数以及Writer中的数据。

这些场景展示了Copy方法在不同情况下的灵活性和通用性，可以适用于各种数据传输的操作。