`strings`包中的`Index`方法用于在字符串中查找子串的第一次出现的位置索引。以下是一些`Index`方法的常见使用场景：

1. **查找子串的第一次出现位置：**
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       str := "Hello, world!"
       subStr := "world"
       index := strings.Index(str, subStr)
       if index != -1 {
           fmt.Printf("The substring '%s' first appears at index %d in the string.\n", subStr, index)
       } else {
           fmt.Printf("The substring '%s' does not appear in the string.\n", subStr)
       }
   }
   ```

2. **查找字符的第一次出现位置：**
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       str := "apple"
       char := "p"
       index := strings.Index(str, char)
       if index != -1 {
           fmt.Printf("The character '%s' first appears at index %d in the string.\n", char, index)
       } else {
           fmt.Printf("The character '%s' does not appear in the string.\n", char)
       }
   }
   ```

3. **查找单词的第一次出现位置（根据空格分割）：**
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       sentence := "The quick brown fox jumps over the lazy dog."
       word := "brown"
       index := strings.Index(sentence, word)
       if index != -1 {
           fmt.Printf("The word '%s' first appears at index %d in the sentence.\n", word, index)
       } else {
           fmt.Printf("The word '%s' does not appear in the sentence.\n", word)
       }
   }
   ```

4. **检查字符串中是否包含特定子串：**
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       str := "The quick brown fox jumps over the lazy dog."
       subStr := "fox"
       if strings.Index(str, subStr) != -1 {
           fmt.Printf("The string contains the substring '%s'.\n", subStr)
       } else {
           fmt.Printf("The string does not contain the substring '%s'.\n", subStr)
       }
   }
   ```

5. **处理可能不存在的子串：**
   ```go
   package main

   import (
       "fmt"
       "strings"
   )

   func main() {
       str := "Hello, world!"
       subStr := "universe"
       index := strings.Index(str, subStr)
       if index != -1 {
           fmt.Printf("The substring '%s' first appears at index %d in the string.\n", subStr, index)
       } else {
           fmt.Printf("The substring '%s' does not appear in the string.\n", subStr)
       }
   }
   ```

这些示例展示了`strings.Index`方法在不同情景下的使用方法，但实际应用中，你可以根据具体需求进行更多的定制化操作。