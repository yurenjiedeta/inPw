Go 语言标准库中的 `strings` 包提供了很多字符串处理相关的方法，其中 `LastIndex` 方法用于查找字符串中指定子串最后一次出现的位置索引。下面是一些 `LastIndex` 方法的使用场景：

1. **查找字符串中最后一次出现子串的位置索引：**
   ```go
   import "strings"

   func main() {
       str := "hello world, hello go"
       lastIndex := strings.LastIndex(str, "hello")
       fmt.Println(lastIndex) // Output: 13
   }
   ```

2. **当子串不存在时返回 -1：**
   ```go
   import "strings"

   func main() {
       str := "hello world"
       lastIndex := strings.LastIndex(str, "go")
       fmt.Println(lastIndex) // Output: -1
   }
   ```

3. **在特定位置之前查找最后一次出现子串的位置索引：**
   ```go
   import "strings"

   func main() {
       str := "hello world, hello go"
       lastIndex := strings.LastIndex(str[:10], "hello")
       fmt.Println(lastIndex) // Output: 0
   }
   ```

4. **忽略大小写进行查找：**
   ```go
   import "strings"

   func main() {
       str := "Hello World"
       lastIndex := strings.LastIndex(strings.ToLower(str), "world")
       fmt.Println(lastIndex) // Output: 6
   }
   ```

5. **处理 Unicode 字符串：**
   ```go
   import "strings"

   func main() {
       str := "こんにちは、世界"
       lastIndex := strings.LastIndex(str, "に")
       fmt.Println(lastIndex) // Output: 6
   }
   ```

这些示例展示了 `strings.LastIndex` 方法的几种常见用法，您可以根据具体需求来使用它。