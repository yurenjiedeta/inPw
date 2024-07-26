要将 `Dockerfile` 与 `docker-compose` 一起使用，你需要在你的项目目录中创建一个 `docker-compose.yml` 文件，并在其中定义服务和镜像的构建规则。以下是一个步骤指南来结合 `Dockerfile` 和 `docker-compose`：

1. **准备 `Dockerfile`**：在你的项目目录中创建一个 `Dockerfile`，定义你的自定义镜像。例如：

   ```Dockerfile
   # 使用官方 PHP 镜像
   FROM php:7.4-apache

   # 复制自定义的 php.ini 配置到容器中
   COPY php.ini /usr/local/etc/php/

   # 如果你有额外的依赖或扩展需要安装，可以在这里添加
   # RUN docker-php-ext-install mysqli
   ```

2. **创建 `docker-compose.yml` 文件**：在你的项目目录中创建一个 `docker-compose.yml` 文件，配置服务和构建设置。以下是一个基本的示例：

   ```yaml
   version: '3.8'

   services:
     web:
       build:
         context: . # 上下文目录，Dockerfile 和 php.ini 应该在这个目录中
         dockerfile: Dockerfile # Dockerfile 的名称
       ports:
         - "80:80" # 将容器的 80 端口映射到宿主机的 80 端口
       volumes:
         - .:/var/www/html # 将当前目录挂载到容器的 /var/www/html
   ```

   - `build.context` 指定了构建上下文目录，通常是当前目录。
   - `dockerfile` 是 Dockerfile 的文件名（如果你的 Dockerfile 文件名不是 `Dockerfile`，需要在这里指定）。
   - `ports` 将容器的端口映射到宿主机的端口。
   - `volumes` 将宿主机的目录挂载到容器内的目录，用于共享文件。

3. **构建和启动服务**：在项目目录下运行以下命令来构建镜像并启动容器：

   ```bash
   docker-compose up --build
   ```

   - `--build` 选项会在启动容器之前构建镜像。

4. **查看运行中的容器**：你可以使用以下命令查看运行中的容器：

   ```bash
   docker-compose ps
   ```

5. **停止和删除容器**：要停止并删除容器，可以运行：

   ```bash
   docker-compose down
   ```

这个配置文件和命令会自动构建自定义的 PHP 镜像，并启动容器，同时应用你在 `php.ini` 中定义的配置。根据需要，你可以进一步定制 `docker-compose.yml` 文件来添加更多的服务或配置选项。