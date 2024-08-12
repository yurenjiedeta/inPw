Go 语言中的 `regexp` 包用于处理正则表达式。以下是一些常用的 API 方法和示例：

1. **`regexp.Compile`**  
   编译正则表达式并返回一个 `*Regexp` 对象，如果编译失败，则返回一个错误。
   ```go
   import "regexp"

   re, err := regexp.Compile(`\d+`)
   if err != nil {
       panic(err)
   }
   ```

2. **`regexp.MustCompile`**  
   和 `Compile` 相似，但是当正则表达式编译失败时，它会引发恐慌（panic）。适合在程序启动时确定的正则表达式。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\d+`)
   ```

3. **`(*Regexp).Match`**  
   检查输入字符串是否匹配正则表达式。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\d+`)
   matched := re.MatchString("123abc")
   fmt.Println(matched) // 输出: true
   ```

4. **`(*Regexp).FindString`**  
   返回第一个匹配的子串。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\d+`)
   result := re.FindString("abc 123 def")
   fmt.Println(result) // 输出: 123
   ```

5. **`(*Regexp).FindAllString`**  
   返回所有匹配的子串。如果指定了 `n`，则返回前 `n` 个匹配的子串。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\d+`)
   results := re.FindAllString("123 abc 456 def 789", -1)
   fmt.Println(results) // 输出: [123 456 789]
   ```

6. **`(*Regexp).ReplaceAllString`**  
   用指定的字符串替换所有匹配的子串。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\d+`)
   result := re.ReplaceAllString("abc 123 def 456", "number")
   fmt.Println(result) // 输出: abc number def number
   ```

7. **`(*Regexp).Split`**  
   使用正则表达式将字符串分割成切片。
   ```go
   import "regexp"

   re := regexp.MustCompile(`\W+`)
   result := re.Split("a,b,c;d:e", -1)
   fmt.Println(result) // 输出: [a b c d e]
   ```

8. **`(*Regexp).FindStringSubmatch`**  
   查找字符串中第一个匹配正则表达式的子串以及所有子匹配的子串（分组匹配）。
   ```go
   import "regexp"

   re := regexp.MustCompile(`(\d+)-(\d+)`)
   match := re.FindStringSubmatch("2024-08-07")
   fmt.Println(match) // 输出: [2024-08-07 2024 08]
   ```

9. **`(*Regexp).FindAllStringSubmatch`**  
   查找字符串中所有匹配正则表达式的子串及其子匹配的子串。
   ```go
   import "regexp"

   re := regexp.MustCompile(`(\d+)-(\d+)`)
   matches := re.FindAllStringSubmatch("2024-08-07 and 2025-09-08", -1)
   fmt.Println(matches) // 输出: [[2024-08-07 2024 08] [2025-09-08 2025 09]]
   ```

这些方法可以帮助你在 Go 语言中处理常见的正则表达式操作。你可以根据需要选择合适的方法来完成任务。