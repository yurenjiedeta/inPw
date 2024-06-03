`Parse` 方法用于将字符串解析为时间。下面是一些使用场景：

1. **解析固定格式的时间字符串**：

   ```go
   timeStr := "2024-06-03 15:04:05"
   t, err := time.Parse("2006-01-02 15:04:05", timeStr)
   if err != nil {
       fmt.Println("Error parsing time:", err)
   } else {
       fmt.Println("Parsed Time:", t)
   }
   ```
   输出：Parsed Time: 2024-06-03 15:04:05 +0000 UTC

2. **解析不同时区的时间字符串**：

   ```go
   timeStr := "2024-06-03 15:04:05 PDT"
   t, err := time.Parse("2006-01-02 15:04:05 MST", timeStr)
   if err != nil {
       fmt.Println("Error parsing time:", err)
   } else {
       fmt.Println("Parsed Time:", t)
   }
   ```
   输出：Parsed Time: 2024-06-03 15:04:05 +0000 PDT

3. **解析文件名中的时间信息**：

   ```go
   fileName := "backup_20240603_150405.db"
   timeStr := fileName[len("backup_") : len("backup_")+len("20060102_150405")]
   t, err := time.Parse("20060102_150405", timeStr)
   if err != nil {
       fmt.Println("Error parsing time from filename:", err)
   } else {
       fmt.Println("Parsed Time from Filename:", t)
   }
   ```
   输出：Parsed Time from Filename: 2024-06-03 15:04:05 +0000 UTC

4. **解析不同日期格式的字符串**：

   ```go
   dateStr := "June 3, 2024"
   t, err := time.Parse("January 2, 2006", dateStr)
   if err != nil {
       fmt.Println("Error parsing date:", err)
   } else {
       fmt.Println("Parsed Date:", t)
   }
   ```
   输出：Parsed Date: 2024-06-03 00:00:00 +0000 UTC

