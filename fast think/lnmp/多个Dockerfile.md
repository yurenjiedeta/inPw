如果你需要使用 Dockerfile 修改多个镜像，可以为每个服务创建单独的 Dockerfile，然后在 `docker-compose.yml` 中为每个服务指定对应的 Dockerfile。以下是一个示例配置，假设你要修改 `php` 和 `nginx` 服务的镜像。

### 目录结构

```
php-nginx-mysql/
├── docker-compose.yml
├── php/
│   ├── Dockerfile
│   ├── php.ini
├── nginx/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── conf.d/
│   │   └── default.conf
└── php-app/
    └── index.php
```

### 1. 创建 PHP 的 Dockerfile

在 `php/` 目录下创建 `Dockerfile` 文件：

```Dockerfile
# php/Dockerfile
FROM php:8.0-fpm

# Install mysqli extension
RUN docker-php-ext-install mysqli

# Copy custom php.ini
COPY php.ini /usr/local/etc/php/
```

### 2. 创建 Nginx 的 Dockerfile

在 `nginx/` 目录下创建 `Dockerfile` 文件：

```Dockerfile
# nginx/Dockerfile
FROM nginx:latest

# Copy custom nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
```

### 3. 修改 docker-compose.yml

在项目根目录下修改 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile
    container_name: nginx
    ports:
      - "8080:80"
    volumes:
      - ./php-app:/var/www/html
    depends_on:
      - php
      - mysql

  php:
    build:
      context: ./php
      dockerfile: Dockerfile
    container_name: php
    volumes:
      - ./php-app:/var/www/html
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: testdb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 4. 重新构建并启动容器

使用以下命令重新构建并启动容器：

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

### 5. 检查构建的镜像

使用以下命令查看构建的镜像：

```bash
docker images
```

你应该会看到两个新的镜像：

- `php-nginx-mysql_php`
- `php-nginx-mysql_nginx`

### 总结

通过为每个服务创建单独的 Dockerfile，并在 `docker-compose.yml` 中指定相应的 Dockerfile 和构建上下文，可以灵活地为多个服务构建自定义镜像。这种方法使得你可以为每个服务应用不同的构建配置和依赖项。