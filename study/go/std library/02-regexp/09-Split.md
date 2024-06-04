`Split` 方法用于根据正则表达式来分割字符串，返回一个字符串数组。下面是一些 `regexp` 包中 `Split` 方法的使用场景：

1. **按空格分割字符串**：
   ```go
   package main
   
   import (
       "fmt"
       "regexp"
   )
   
   func main() {
       str := "Hello world 世界"
       re := regexp.MustCompile(`\s+`)
       result := re.Split(str, -1)
       for _, word := range result {
           fmt.Println(word)
       }
   }
   // 输出：
   // Hello
   // world
   // 世界
   ```

2. **按逗号分割字符串**：
   ```go
   package main
   
   import (
       "fmt"
       "regexp"
   )
   
   func main() {
       str := "apple,banana,orange"
       re := regexp.MustCompile(`,`)
       result := re.Split(str, -1)
       for _, fruit := range result {
           fmt.Println(fruit)
       }
   }
   // 输出：
   // apple
   // banana
   // orange
   ```

3. **按多个不同的分隔符分割字符串**：
   ```go
   package main
   
   import (
       "fmt"
       "regexp"
   )
   
   func main() {
       str := "apple,banana;orange|grape"
       re := regexp.MustCompile(`[,;|]`)
       result := re.Split(str, -1)
       for _, fruit := range result {
           fmt.Println(fruit)
       }
   }
   // 输出：
   // apple
   // banana
   // orange
   // grape
   ```

4. **使用正则表达式进行高级分割**：
   ```go
   package main
   
   import (
       "fmt"
       "regexp"
   )
   
   func main() {
       str := "apple123banana456orange789"
       re := regexp.MustCompile(`\d+`)
       result := re.Split(str, -1)
       for _, part := range result {
           fmt.Println(part)
       }
   }
   // 输出：
   // apple
   // banana
   // orange
   ```

这些示例展示了 `Split` 方法在不同场景下的应用，可以根据具体的需求编写适当的正则表达式来进行字符串分割。