### 18.1 MySQL Workbench简介

#### 18.1.1 MySQL Workbench的概述
MySQL Workbench是一个集成的数据库设计和管理工具，提供图形化用户界面，便于数据库开发、管理和设计。

#### 18.1.2 MySQL Workbench的优势
- 直观的图形用户界面
- 支持数据库设计、SQL开发、服务器管理
- 提供数据建模和可视化工具
- 多平台支持

#### 18.1.3 MySQL Workbench的安装
1. 访问MySQL官方网站下载页面。
2. 下载适合您操作系统的MySQL Workbench安装包。
3. 按照安装向导完成安装。

### 18.2 SQL Development的基本操作

#### 18.2.1 创建数据库连接
```sql
-- 打开MySQL Workbench，点击"Database" -> "Manage Connections" -> "New"
-- 输入连接名称、主机名、用户名、密码，点击"Test Connection"测试连接
```

#### 18.2.2 创建新的数据库
```sql
CREATE DATABASE example_db;
```

#### 18.2.3 创建和删除新的数据表
```sql
CREATE TABLE example_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

DROP TABLE example_table;
```

#### 18.2.4 添加、修改表记录
```sql
-- 添加记录
INSERT INTO example_table (name, age) VALUES ('John Doe', 30);

-- 修改记录
UPDATE example_table SET age = 31 WHERE name = 'John Doe';
```

#### 18.2.5 查询表记录
```sql
SELECT * FROM example_table;
```

#### 18.2.6 修改表结构
```sql
ALTER TABLE example_table ADD COLUMN email VARCHAR(50);
```

### 18.3 Data Modeling的基本操作

#### 18.3.1 建立ER模型
1. 打开MySQL Workbench，点击"File" -> "New Model"。
2. 使用"Add Diagram"按钮添加ER图，拖放表对象以创建ER模型。

#### 18.3.2 导入ER模型
1. 打开MySQL Workbench，点击"File" -> "Import" -> "Reverse Engineer MySQL Create Script"。
2. 选择SQL脚本文件，导入现有的ER模型。

### 18.4 Server Administration的基本操作

#### 18.4.1 管理MySQL用户
```sql
-- 创建新用户
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';

-- 授予权限
GRANT ALL PRIVILEGES ON example_db.* TO 'new_user'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;
```

#### 18.4.2 备份MySQL数据库
1. 打开MySQL Workbench，点击"Server" -> "Data Export"。
2. 选择要备份的数据库，设置导出选项，点击"Start Export"。

#### 18.4.3 恢复MySQL数据库
1. 打开MySQL Workbench，点击"Server" -> "Data Import".
2. 选择要导入的备份文件，设置导入选项，点击"Start Import"。