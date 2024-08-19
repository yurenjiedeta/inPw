在Ubuntu中使用Docker来部署PHP、Nginx和MySQL 8环境，可以通过创建一个Docker Compose文件来简化这一过程。Docker Compose允许你定义和运行多容器Docker应用。以下是一个示例步骤：

### 1. 安装Docker和Docker Compose

首先，确保你的系统已经安装了Docker和Docker Compose。如果没有安装，可以使用以下命令来安装：

```bash
sudo apt update
sudo apt install docker.io
sudo apt install docker-compose
```

确保Docker服务正在运行：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. 创建项目目录

创建一个新的项目目录，并在其中创建一个`docker-compose.yml`文件：

```bash
mkdir my_project
cd my_project
nano docker-compose.yml
```

### 3. 编写docker-compose.yml文件

在`docker-compose.yml`文件中定义PHP、Nginx和MySQL服务：

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

### 4. 创建Nginx配置文件

在项目目录中创建一个`nginx`文件夹，并在其中创建一个配置文件，例如`default.conf`：

```bash
mkdir nginx
nano nginx/default.conf
```

在`default.conf`文件中添加以下内容：

```nginx
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

```

### 5. 创建PHP文件夹

创建一个`public`文件夹，并在其中放置一个简单的`index.php`文件来测试PHP配置：

```bash
mkdir public
nano public/index.php
```

在`index.php`文件中添加以下内容：

```php
<?php
phpinfo();
?>
```

Nginx日志中提到的错误是因为`/etc/nginx/snippets/fastcgi-php.conf`文件不存在。这可能是因为在默认的Nginx镜像中没有这个文件。我们可以解决这个问题，方法是手动创建这个文件，或者修改Nginx配置文件以适应我们的需求。

---

如果Nginx容器没有启动，可能是配置文件有问题或者端口冲突等原因。我们可以检查和解决这些问题。

### 1. 检查容器状态

首先检查Nginx容器的状态，查看它为什么没有启动：

```bash
sudo docker-compose ps
```

### 2. 查看日志

查看Nginx容器的日志，了解更多信息：

```bash
sudo docker-compose logs nginx
```

### 3. 常见问题和解决方案

#### a. 配置文件问题

确保`nginx/default.conf`配置文件格式正确，特别是路径和语法。

#### b. 端口冲突

确保端口`80`没有被其他服务占用。可以使用以下命令查看端口占用情况：

```bash
sudo lsof -i :80
```

如果有其他服务在占用端口，可以停止它们：

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### 4. 更新docker-compose.yml

确保你的`docker-compose.yml`文件内容如下：

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

确保在项目目录中存在`nginx/default.conf`文件，并且内容如下：

```nginx
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 5. 重新启动容器

重新构建和启动容器：

```bash
sudo docker-compose down
sudo docker-compose up --build -d
```

### 6. 检查Nginx容器

再次检查Nginx容器的状态和日志：

```bash
sudo docker-compose ps
sudo docker-compose logs nginx
```

### 7. 测试应用

打开浏览器，访问`http://localhost`，查看是否能看到PHP的info页面。

如果仍然有问题，请分享Nginx容器的日志输出，以便进一步诊断。

---

### 1. 创建fastcgi-php.conf文件

我们可以在项目目录中创建一个`snippets`文件夹，并在其中创建`fastcgi-php.conf`文件。

#### 创建snippets文件夹和配置文件

在项目目录中执行以下命令：

```bash
mkdir -p nginx/snippets
nano nginx/snippets/fastcgi-php.conf
```

#### 在fastcgi-php.conf中添加以下内容

```nginx
fastcgi_split_path_info ^(.+\.php)(/.+)$;
fastcgi_param PATH_INFO $fastcgi_path_info;
fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
include fastcgi_params;
```

#### 更新docker-compose.yml文件

确保Nginx服务的卷挂载包含新创建的snippets文件夹：

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
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - my_network

networks:
  - my_network

volumes:
  - db_data:/var/lib/mysql
  
```

### 2. 重新启动容器

重新构建和启动容器：

```bash
sudo docker-compose down
sudo docker-compose up --build -d
```

### 3. 检查Nginx容器

再次检查Nginx容器的状态和日志：

```bash
sudo docker-compose ps
sudo docker-compose logs nginx
```

### 4. 测试应用

打开浏览器，访问`http://localhost`，查看是否能看到PHP的info页面。

通过这些步骤，Nginx应该可以成功启动，并且PHP页面也应该可以正常显示。如果仍然有问题，请分享最新的Nginx容器日志。

### 6. 启动容器

在项目目录中运行以下命令来启动容器：

```bash
sudo docker-compose up -d
```

### 7. 访问应用

打开浏览器，访问`http://localhost`，你应该会看到PHP的info页面，说明Nginx和PHP-FPM配置正确。

### 8. 连接MySQL

你可以使用MySQL客户端连接到MySQL容器，使用`localhost`作为主机，端口`3306`，用户名和密码使用你在`docker-compose.yml`文件中设置的值。

```bash
mysql -h localhost -P 3306 -u user -p
```

以上步骤完成后，你应该在Ubuntu系统上成功部署了一个使用Docker的PHP、Nginx和MySQL 8环境。如果有任何问题或需要进一步的自定义配置，请随时告诉我。