<?php
$servername = "localhost"; // 使用容器的服务名称或IP地址
$username = "user";
$password = "user_password";
$database = "my_database";

// 创建连接
$conn = new MySQLi($servername, $username, $password, $database);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
echo "连接成功";
?>

<?php
// 上面的数据库连接代码

// 创建表格
$sql = "CREATE TABLE IF NOT EXISTS test (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "表格 'test' 创建成功";
} else {
    echo "创建表格错误: " . $conn->error;
}

$conn->close();
?>
<?php
// 上面的数据库连接和表格创建代码

// 插入数据
$sql = "INSERT INTO test (name, email) VALUES ('John Doe', 'john@example.com')";

if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "插入记录错误: " . $conn->error;
}

$conn->close();
?>