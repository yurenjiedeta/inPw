为了允许远程连接到MySQL容器中的root用户，你需要进行以下步骤：

1. **修改MySQL配置**以允许外部连接。
2. **更新`docker-compose.yml`文件**，开放MySQL端口。
3. **配置MySQL用户权限**以允许从远程主机连接。

### 1. 修改MySQL配置

首先，确保MySQL容器允许外部连接。你可以通过设置环境变量`MYSQL_ROOT_HOST`为`%`来实现这一点。这将允许来自任何主机的连接。

### 2. 更新`docker-compose.yml`文件

更新`docker-compose.yml`文件，确保开放MySQL端口并设置`MYSQL_ROOT_HOST`环境变量。

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx:/etc/nginx/conf.d
      - ./nginx/snippets:/etc/nginx/snippets
      - ./public:/var/www/html
    depends_on:
      - php
    networks:
      - my_network

  php:
    image: php:8.0-fpm
    container_name: php
    volumes:
      - ./public:/var/www/html
    networks:
      - my_network

  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: my_database
      MYSQL_USER: user
      MYSQL_PASSWORD: user_password
      MYSQL_ROOT_HOST: '%'
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - my_network

networks:
  my_network:

volumes:
  db_data:
```

### 3. 启动容器

运行以下命令以构建和启动容器：

```bash
sudo docker-compose down
sudo docker-compose up --build -d
```

### 4. 配置MySQL用户权限

现在需要登录到MySQL容器并配置root用户的权限以允许远程连接。

#### 登录到MySQL容器

使用以下命令登录到MySQL容器：

```bash
sudo docker exec -it mysql mysql -uroot -p
```

#### 配置MySQL用户权限

在MySQL命令行中执行以下SQL语句：

```sql
-- 切换到mysql数据库
USE mysql;

-- 允许root用户从任意主机连接
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root_password' WITH GRANT OPTION;

-- 刷新权限
FLUSH PRIVILEGES;
```

### 5. 配置防火墙（如果需要）

确保你的主机防火墙允许从外部访问3306端口。以下是一个简单的UFW（Uncomplicated Firewall）配置示例：

```bash
sudo ufw allow 3306/tcp
```

### 6. 连接到MySQL

现在，你应该能够从远程主机连接到MySQL。使用MySQL客户端连接到MySQL服务器：

```bash
mysql -h <your-server-ip> -P 3306 -u root -p
```

确保将`<your-server-ip>`替换为你的服务器IP地址。

通过以上步骤，你应该能够成功配置MySQL容器以允许root用户的远程连接。如果有任何问题或需要进一步帮助，请告诉我。

---

为了让`user`用户能够从任何主机访问MySQL，你需要在MySQL容器中对该用户的权限进行配置。虽然`MYSQL_ROOT_HOST`环境变量可以用来允许root用户从任何主机访问，但你还需要额外的SQL命令来为`user`用户配置权限。

以下是设置`user`用户可以从任何主机连接到MySQL的步骤：

### 1. 修改`docker-compose.yml`文件（如有必要）

虽然在MySQL配置中并没有直接的环境变量用于配置用户的远程访问，你需要确保你的MySQL容器可以启动并正确运行。使用如下的`docker-compose.yml`文件：

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: my_database
      MYSQL_USER: user
      MYSQL_PASSWORD: user_password
      MYSQL_ROOT_HOST: '%'
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - my_network

networks:
  my_network:

volumes:
  db_data:
```

### 2. 登录到MySQL容器

你需要进入MySQL容器并配置`user`用户的权限。首先，启动容器：

```bash
sudo docker-compose up -d
```

然后，登录到MySQL容器：

```bash
sudo docker exec -it mysql mysql -uroot -p
```

输入`root`用户的密码（在这里是`root_password`）。

### 3. 配置`user`用户的权限

在MySQL命令行中执行以下SQL语句：

```sql
-- 切换到mysql数据库
USE mysql;

-- 创建用户并授予所有权限
CREATE USER 'user'@'%' IDENTIFIED BY 'user_password';

-- 授予所有权限给用户
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;

-- 刷新权限
FLUSH PRIVILEGES;
```

### 4. 验证配置

要验证配置是否成功，你可以从远程主机尝试连接到MySQL服务。使用MySQL客户端工具（如`mysql`命令行工具或图形化客户端），连接到MySQL服务器：

```bash
mysql -h <your-server-ip> -P 3306 -u user -p
```

在这里，将`<your-server-ip>`替换为MySQL服务器的IP地址，`user`是你刚刚创建的用户名，`user_password`是该用户的密码。

### 总结

上述步骤设置了`user`用户以允许从任何主机连接到MySQL实例。通过在MySQL命令行中执行适当的SQL命令，你可以为用户配置所需的访问权限。配置完成后，你可以通过主机的IP地址从远程客户端访问MySQL服务。

---

“Public Key Retrieval is not allowed” 是一个常见的错误提示，通常在尝试连接到MySQL数据库时出现，特别是在使用MySQL 8.0时。这个错误发生是因为MySQL 8.0引入了新的身份验证插件（`caching_sha2_password`），默认情况下，MySQL客户端不能从MySQL服务器检索公共密钥以进行身份验证。

### 解决方法

有几种方法可以解决这个问题：

#### 1. **修改MySQL用户的认证插件**

将MySQL用户的认证插件更改为`mysql_native_password`，这是较旧的认证方法，它不需要公共密钥检索。

在MySQL命令行中执行以下命令：

```sql
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'user_password';
FLUSH PRIVILEGES;
```

这将把`user`用户的认证插件更改为`mysql_native_password`，并刷新权限使更改生效。

#### 2. **在连接字符串中启用公共密钥检索**

在连接到MySQL时，你可以在连接字符串中启用公共密钥检索。在MySQL客户端工具中，通常可以通过在连接字符串中添加`allowPublicKeyRetrieval=true`来实现。例如：

```bash
mysql -h <your-server-ip> -P 3306 -u user -p --default-auth=mysql_native_password --allow-public-key-retrieval
```

在JDBC中，你可以在连接URL中添加`allowPublicKeyRetrieval=true`参数。例如：

```java
jdbc:mysql://<your-server-ip>:3306/my_database?allowPublicKeyRetrieval=true&useSSL=false
```

#### 3. **检查客户端配置**

确保你的MySQL客户端和驱动程序都是最新的版本。一些较旧的客户端和驱动程序可能不支持`caching_sha2_password`插件或需要额外的配置才能与MySQL 8.0兼容。

#### 4. **修改MySQL服务器配置**

虽然不常见，但你也可以在MySQL服务器端禁用`caching_sha2_password`插件并使用旧的认证插件作为默认。修改MySQL配置文件（`my.cnf`）并重新启动MySQL服务：

```ini
[mysqld]
default_authentication_plugin=mysql_native_password
```

然后重新启动MySQL服务：

```bash
sudo service mysql restart
```

### 总结

“Public Key Retrieval is not allowed”错误通常发生在使用MySQL 8.0及其新的认证插件时。解决方法包括更改MySQL用户的认证插件、在连接字符串中启用公共密钥检索、更新客户端工具或修改MySQL服务器配置。选择适合你的环境和需求的方法进行修复。

- JDBC的连接地址，很重要

```tex
127.0.0.1:3306/my_database?allowPublicKeyRetrieval=true&useSSL=false
```

---

要在MySQL 8容器中创建一个新的用户（例如`user1`）并允许其从远程主机进行连接，可以按照以下步骤操作：

### 1. 登录到MySQL容器

首先，确保MySQL容器正在运行。如果尚未运行，请使用以下命令启动容器：

```bash
sudo docker-compose up -d
```

然后，使用以下命令登录到MySQL容器：

```bash
sudo docker exec -it mysql mysql -uroot -p
```

输入`root`用户的密码（在你的配置中是`root_password`）。

### 2. 创建新的用户并授权

在MySQL命令行界面中执行以下SQL命令来创建一个新的用户`user1`并设置其密码：

```sql
-- 创建 user1 用户并允许从任何主机连接
CREATE USER 'user1'@'%' IDENTIFIED BY 'user1_password';

-- 授予 user1 用户所有数据库的所有权限
GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%' WITH GRANT OPTION;

-- 刷新权限使更改生效
FLUSH PRIVILEGES;
```

在这里：
- `'user1'@'%'`表示用户名为`user1`，`%`表示允许从任何主机连接。
- `'user1_password'`是`user1`用户的密码。
- `GRANT ALL PRIVILEGES ON *.*`表示授予`user1`用户对所有数据库的所有权限。

### 3. 验证配置

要验证`user1`用户的远程连接是否成功，可以从远程主机尝试连接到MySQL实例。使用MySQL客户端工具（如`mysql`命令行工具）进行连接：

```bash
mysql -h <your-server-ip> -P 3306 -u user1 -p
```

在这里，将`<your-server-ip>`替换为MySQL服务器的IP地址，并输入`user1`用户的密码（`user1_password`）。

### 4. 确保防火墙设置

确保服务器的防火墙允许外部主机通过3306端口访问MySQL服务。如果使用UFW（Uncomplicated Firewall），可以用以下命令打开3306端口：

```bash
sudo ufw allow 3306/tcp
```

### 总结

通过以上步骤，你可以在MySQL 8容器中创建一个新的用户`user1`，允许其从任何主机进行远程连接，并授予适当的权限。这样，你就可以通过远程主机访问MySQL实例。

