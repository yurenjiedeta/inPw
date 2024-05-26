在MySQL 8中使用PHP连接数据库的一般步骤如下：

1. 连接数据库前的准备工作：
   - 确保PHP已经安装并启用了mysqli扩展。
   - 确保你拥有连接MySQL数据库的正确凭据（主机名、用户名、密码等）。

2. 访问数据库：
   ```php
   // 使用mysqli_connect()函数连接MySQL服务器
   $conn = mysqli_connect("hostname", "username", "password", "database");

   // 检查连接是否成功
   if (!$conn) {
       die("连接失败: " . mysqli_connect_error());
   }

   // 使用mysqli_query()函数执行SQL语句
   $sql = "SELECT * FROM table_name";
   $result = mysqli_query($conn, $sql);

   // 获取查询结果集中的记录数
   $row_count = mysqli_num_rows($result);

   // 获取结果集中的一条记录作为枚举数组
   $row_enum = mysqli_fetch_row($result);

   // 获取结果集中的记录作为关联数组
   $row_assoc = mysqli_fetch_assoc($result);

   // 获取结果集中的记录作为对象
   $row_object = mysqli_fetch_object($result);

   // 使用mysqli_fetch_array()函数获取结果集记录
   while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
       // 处理每一行数据
   }

   // 使用mysqli_free_result()函数释放资源
   mysqli_free_result($result);

   // 使用mysqli_close()函数关闭MySQL连接
   mysqli_close($conn);
   ```
这个示例中，替换 `hostname`, `username`, `password`, `database`, 和 `table_name` 为你的实际值。