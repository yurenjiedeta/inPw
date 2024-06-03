`Len` 方法是用于返回字符串的字节长度的。它在 `string` 包中提供了一些常见的用例，例如：

1. **获取字符串的字节长度**：
   ```go
   str := "Hello, 世界"
   fmt.Println(len(str)) // 输出：13
   ```

2. **检查字符串是否为空**：
   ```go
   str := ""
   if len(str) == 0 {
       fmt.Println("字符串为空")
   } else {
       fmt.Println("字符串不为空")
   }
   // 输出：字符串为空
   ```

3. **循环遍历字符串**：
   ```go
   str := "Hello"
   for i := 0; i < len(str); i++ {
       fmt.Printf("%c ", str[i])
   }
   // 输出：H e l l o
   ```

4. **在读取文件或网络流时，使用字节长度来判断是否已经读取完全**：
   ```go
   // 假设 conn 是一个网络连接
   buf := make([]byte, 1024)
   bytesRead := 0
   for bytesRead < len(buf) {
       n, err := conn.Read(buf[bytesRead:])
       if err != nil {
           fmt.Println("读取错误：", err)
           return
       }
       bytesRead += n
   }
   ```

5. **使用 `range` 关键字来遍历字符串的 Unicode 字符**：
   ```go
   str := "世界"
   for _, char := range str {
       fmt.Printf("%c ", char)
   }
   // 输出：世 界
   ```

这些场景展示了 `Len` 方法在不同情况下的应用，可以根据具体的需求来选择合适的用法。