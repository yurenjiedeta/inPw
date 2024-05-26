### 17.1 MySQL Replication概述

MySQL复制是将数据从一个数据库服务器（主服务器）复制到一个或多个数据库服务器（从服务器）的过程，确保数据的一致性和冗余，提高数据的可用性和容错能力。

### 17.2 Windows环境下的MySQL主从复制

#### 17.2.1 复制前的准备工作
1. 安装MySQL
2. 确认主服务器和从服务器的MySQL版本一致
3. 确保网络连通性

#### 17.2.2 Windows环境下实现主从复制
1. 在主服务器的 `my.ini` 文件中配置：
    ```ini
    [mysqld]
    server-id=1
    log-bin=mysql-bin
    ```
2. 创建复制用户：
    ```sql
    CREATE USER 'repl'@'%' IDENTIFIED BY 'password';
    GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
    FLUSH PRIVILEGES;
    ```
3. 在从服务器的 `my.ini` 文件中配置：
    ```ini
    [mysqld]
    server-id=2
    ```
4. 设置从服务器复制：
    ```sql
    CHANGE MASTER TO MASTER_HOST='主服务器IP', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=0;
    START SLAVE;
    ```

#### 17.2.3 Windows环境下主从复制测试
1. 在主服务器上创建测试表并插入数据：
    ```sql
    CREATE DATABASE testdb;
    USE testdb;
    CREATE TABLE test (id INT PRIMARY KEY, value VARCHAR(100));
    INSERT INTO test VALUES (1, 'data1');
    ```
2. 在从服务器上验证数据复制：
    ```sql
    SELECT * FROM testdb.test;
    ```

### 17.3 Linux环境下的MySQL复制

#### 17.3.1 下载并安装MySQL8.0
1. 下载MySQL：
    ```sh
    wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
    ```
2. 安装MySQL：
    ```sh
    sudo rpm -ivh mysql80-community-release-el7-3.noarch.rpm
    sudo yum install mysql-server
    ```

#### 17.3.2 单机主从复制前的准备工作
1. 配置主从服务器 `my.cnf`：
    ```ini
    [mysqld]
    server-id=1
    log-bin=mysql-bin
    ```

#### 17.3.3 MySQLd_multi实现单机主从复制
1. 编辑配置文件 `/etc/my.cnf`：
    ```ini
    [mysqld1]
    server-id=1
    log-bin=mysql-bin

    [mysqld2]
    server-id=2
    datadir=/var/lib/mysql2
    socket=/var/lib/mysql2/mysql.sock
    log-bin=mysql-bin
    ```
2. 启动多实例：
    ```sh
    mysqld_multi start
    ```

#### 17.3.4 不同服务器之间实现主从复制
1. 在主服务器上配置：
    ```ini
    [mysqld]
    server-id=1
    log-bin=mysql-bin
    ```
2. 在从服务器上配置：
    ```ini
    [mysqld]
    server-id=2
    ```

#### 17.3.5 MySQL主要复制启动选项
- `server-id`: 唯一服务器ID
- `log-bin`: 启用二进制日志
- `relay-log`: 从服务器中继日志
- `replicate-do-db`: 指定要复制的数据库

#### 17.3.6 指定复制的数据库或者表
1. 配置复制选项：
    ```ini
    [mysqld]
    replicate-do-db=database_name
    replicate-do-table=database_name.table_name
    ```

### 17.4 查看Slave的复制进度
```sql
SHOW SLAVE STATUS\G;
```

### 17.5 日常管理和维护

#### 17.5.1 了解服务器的状态
```sql
SHOW MASTER STATUS;
SHOW SLAVE STATUS\G;
```

#### 17.5.2 服务器复制出错的原因
1. 网络问题
2. 权限问题
3. 配置错误
4. 数据库不一致

### 17.6 切换主从服务器
1. 停止主服务器：
    ```sql
    FLUSH TABLES WITH READ LOCK;
    SHOW MASTER STATUS;
    ```
2. 在从服务器上执行：
    ```sql
    STOP SLAVE;
    CHANGE MASTER TO MASTER_HOST='新主服务器IP', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=位置;
    START SLAVE;
    ```

### 17.7 多源复制的改进
1. 在从服务器上配置多个主服务器：
    ```sql
    CHANGE MASTER TO MASTER_HOST='主服务器1', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=0 FOR CHANNEL 'source1';
    CHANGE MASTER TO MASTER_HOST='主服务器2', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=0 FOR CHANNEL 'source2';
    START SLAVE;
    ```