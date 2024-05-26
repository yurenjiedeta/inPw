在MySQL 8中使用PDO（PHP Data Objects）进行操作的示例和配置示例如下：

**23.1 PDO概述：**
PDO是PHP的数据库抽象层，用于在不同的数据库中执行SQL操作，提供了更安全和更便捷的数据库访问方式。

**23.2 PDO的安装：**
```php
// 安装PDO扩展
sudo apt-get install php-pdo
```

**23.3 使用PDO操作MySQL：**

**23.3.1 连接MySQL数据库的方法：**
```php
$dsn = 'mysql:host=localhost;dbname=mydatabase';
$username = 'username';
$password = 'password';
$options = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
```

**23.3.2 使用PDO时的try catch错误处理结构：**
```php
try {
    // PDO操作
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
```

**23.3.3 使用PDO执行SQL的选择语句：**
```php
$sql = "SELECT * FROM table_name";
$stmt = $pdo->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

**23.3.4 使用PDO获取返回数据的类方法：**
```php
// fetch() 逐行获取结果集
// fetchAll() 获取所有行
// fetchColumn() 获取单个字段的值
```

**23.3.5 使用PDO执行SQL的添加、修改语句：**
```php
$sql = "INSERT INTO table_name (column1, column2) VALUES (:value1, :value2)";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(':value1' => $value1, ':value2' => $value2));
```

**23.3.6 使用PDO执行SQL的删除语句：**
```php
$sql = "DELETE FROM table_name WHERE condition";
$stmt = $pdo->prepare($sql);
$stmt->execute();
```

这些示例展示了如何使用PDO连接、查询、插入、更新和删除MySQL数据库中的数据。