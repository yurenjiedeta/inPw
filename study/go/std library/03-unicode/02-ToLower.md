`unicode` 包中的 `ToLower` 方法用于将给定的字符转换为小写字母。以下是一些常见的使用场景：

1. **标准化用户输入：** 将用户输入的字符统一转换为小写，以便进行不区分大小写的比较或存储。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func normalizeInput(s string) string {
        result := []rune(s)
        for i, r := range result {
            result[i] = unicode.ToLower(r)
        }
        return string(result)
    }

    func main() {
        input := "Hello World!"
        normalizedInput := normalizeInput(input)
        fmt.Println(normalizedInput) // 输出: hello world!
    }
    ```

2. **忽略大小写的字符串比较：** 在字符串比较时，将字符转换为小写以忽略大小写的差异。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func equalIgnoreCase(s1, s2 string) bool {
        if len(s1) != len(s2) {
            return false
        }
        for i := 0; i < len(s1); i++ {
            if unicode.ToLower(rune(s1[i])) != unicode.ToLower(rune(s2[i])) {
                return false
            }
        }
        return true
    }

    func main() {
        str1 := "GoLang"
        str2 := "golang"
        fmt.Println(equalIgnoreCase(str1, str2)) // 输出: true
    }
    ```

3. **文本处理和分析：** 在文本处理和分析时，将字符转换为小写，以便进行一致的处理或统计。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func countLowerCase(s string) int {
        count := 0
        for _, r := range s {
            if unicode.IsLower(unicode.ToLower(r)) {
                count++
            }
        }
        return count
    }

    func main() {
        text := "Hello World!"
        lowerCaseCount := countLowerCase(text)
        fmt.Printf("The string contains %d lowercase letters.\n", lowerCaseCount)
    }
    ```

4. **处理文件和路径名：** 在处理文件和路径名时，将字符转换为小写，以便进行一致的操作。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func normalizeFileName(fileName string) string {
        result := []rune(fileName)
        for i, r := range result {
            result[i] = unicode.ToLower(r)
        }
        return string(result)
    }

    func main() {
        fileName := "MyDocument.TXT"
        normalizedFileName := normalizeFileName(fileName)
        fmt.Println(normalizedFileName) // 输出: mydocument.txt
    }
    ```

5. **数据库查询：** 在进行数据库查询时，将输入字符串转换为小写，以便进行不区分大小写的查询。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func normalizeQuery(query string) string {
        result := []rune(query)
        for i, r := range result {
            result[i] = unicode.ToLower(r)
        }
        return string(result)
    }

    func main() {
        query := "SELECT * FROM Users WHERE Username = 'JohnDoe'"
        normalizedQuery := normalizeQuery(query)
        fmt.Println(normalizedQuery) // 输出: select * from users where username = 'johndoe'
    }
    ```

6. **国际化处理：** 在多语言环境中，将字符转换为小写，以便进行一致的文本处理。

    ```go
    import (
        "fmt"
        "unicode"
    )

    func normalizeText(s string) string {
        result := []rune(s)
        for i, r := range result {
            result[i] = unicode.ToLower(r)
        }
        return string(result)
    }

    func main() {
        text := "Привет Мир"
        normalizedText := normalizeText(text)
        fmt.Println(normalizedText) // 输出: привет мир
    }
    ```

这些例子展示了 `unicode.ToLower` 方法在标准化用户输入、忽略大小写的字符串比较、文本处理和分析、文件和路径名处理、数据库查询以及国际化处理等多种场景中的应用。