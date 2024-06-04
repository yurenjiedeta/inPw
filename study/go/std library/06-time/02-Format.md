`Format` 方法是用于将时间格式化为字符串的功能。下面是一些使用场景：

1. **将时间格式化为指定的字符串**：

   ```go
   t := time.Now()
   formattedTime := t.Format("2006-01-02 15:04:05")
   fmt.Println("Formatted Time:", formattedTime)
   ```
   输出：Formatted Time: 2024-06-03 15:04:05

2. **自定义时间显示格式**：

   ```go
   t := time.Date(2024, time.July, 4, 12, 0, 0, 0, time.UTC)
   formattedTime := t.Format("Monday, Jan 2, 2006 15:04 MST")
   fmt.Println("Independence Day:", formattedTime)
   ```
   输出：Independence Day: Wednesday, Jul 4, 2024 12:00 UTC

3. **将时间格式化为其他时区的字符串**：

   ```go
   loc, _ := time.LoadLocation("America/New_York")
   t := time.Now().In(loc)
   formattedTime := t.Format("2006-01-02 15:04:05 MST")
   fmt.Println("Current Time in New York:", formattedTime)
   ```
   输出：Current Time in New York: 2024-06-03 10:04:05 EDT

4. **将时间格式化为文件名**：

   ```go
   t := time.Now()
   formattedTime := t.Format("20060102_150405")
   fileName := fmt.Sprintf("backup_%s.db", formattedTime)
   fmt.Println("Backup File Name:", fileName)
   ```
   输出：Backup File Name: backup_20240603_150405.db
