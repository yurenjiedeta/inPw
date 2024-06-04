Go语言的`strings`包中的`Contains`方法是一个非常有用的工具，用于检查一个子字符串是否存在于另一个字符串中。以下是`Contains`方法的定义和各种使用场景：

### 方法定义

```go
func Contains(s, substr string) bool
```

该方法返回一个布尔值，如果`substr`是`str`的子字符串，则返回`true`，否则返回`false`。

### 使用场景

1. **基本字符串搜索**

    用于检查某个字符串是否包含特定子字符串。

    ```go
    package main

    import (
        "fmt"
        "strings"
    )

    func main() {
        str := "Hello, World!"
        substr := "World"
        fmt.Println(strings.Contains(str, substr)) // 输出: true
    }
    ```

2. **验证输入**

    在表单验证或用户输入验证时，确保输入内容符合预期。

    ```go
    package main

    import (
        "fmt"
        "strings"
    )

    func main() {
        userInput := "admin@example.com"
        if strings.Contains(userInput, "@") {
            fmt.Println("Valid email address")
        } else {
            fmt.Println("Invalid email address")
        }
    }
    ```

3. **过滤数据**

    在处理数据时，根据是否包含某个子字符串来过滤数据。

    ```go
    package main

    import (
        "fmt"
        "strings"
    )

    func main() {
        data := []string{"apple", "banana", "cherry", "date"}
        filter := "a"

        for _, item := range data {
            if strings.Contains(item, filter) {
                fmt.Println(item)
            }
        }
        // 输出: apple, banana, date
    }
    ```

4. **日志分析**

    分析日志文件，查找包含特定关键词的日志条目。

    ```go
    package main

    import (
        "bufio"
        "fmt"
        "os"
        "strings"
    )

    func main() {
        file, err := os.Open("server.log")
        if err != nil {
            fmt.Println("Error opening file:", err)
            return
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        keyword := "ERROR"

        for scanner.Scan() {
            line := scanner.Text()
            if strings.Contains(line, keyword) {
                fmt.Println(line)
            }
        }

        if err := scanner.Err(); err != nil {
            fmt.Println("Error reading file:", err)
        }
    }
    ```

5. **命令行工具**

    在编写命令行工具时，用于解析命令行参数或选项。

    ```go
    package main

    import (
        "fmt"
        "os"
        "strings"
    )

    func main() {
        args := os.Args[1:]
        for _, arg := range args {
            if strings.Contains(arg, "--help") {
                fmt.Println("Usage: command [options]")
                return
            }
        }
        // 继续处理其他参数
    }
    ```

6. **字符串替换前的检查**

    在进行字符串替换操作前，先检查子字符串是否存在。

    ```go
    package main

    import (
        "fmt"
        "strings"
    )

    func main() {
        original := "foo bar baz"
        old := "bar"
        new := "qux"

        if strings.Contains(original, old) {
            result := strings.Replace(original, old, new, -1)
            fmt.Println(result) // 输出: foo qux baz
        } else {
            fmt.Println("Substring not found")
        }
    }
    ```

这些场景展示了`strings.Contains`方法在各种情况下的使用方式，帮助开发者更高效地处理字符串操作。