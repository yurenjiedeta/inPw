要使用 MySQL 客户端从宿主机登录到 Docker 容器中的 MySQL 数据库，首先确保 MySQL 容器正在运行。以下是详细步骤：

1. **启动 MySQL 容器**（如果还没有启动）：

   如果你还没有启动 MySQL 容器，可以使用以下命令启动一个：

   ```sh
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8
   ```

   这里 `mysql-container` 是容器的名称，`my-secret-pw` 是 MySQL `root` 用户的密码。你可以根据需要调整这些值。

2. **检查容器的 IP 地址**：

   使用以下命令获取 MySQL 容器的 IP 地址：

   ```sh
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql-container
   ```

   记下输出的 IP 地址。

3. **确保容器端口映射**：

   如果你希望从宿主机直接连接到 MySQL 容器，确保容器的 3306 端口已经映射到宿主机端口。启动容器时，可以使用 `-p` 参数来映射端口，例如：

   ```sh
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:8
   ```

   这样，容器的 3306 端口就映射到宿主机的 3306 端口。

4. **使用 MySQL 客户端连接**：

   你可以使用 MySQL 客户端从宿主机连接到容器中的 MySQL 数据库。假设你已经安装了 MySQL 客户端，可以使用以下命令连接到 MySQL 容器：

   ```sh
   mysql -u root -p -h 127.0.0.1
   ```

   这里，`-h 127.0.0.1` 是宿主机的 IP 地址，连接到容器时使用的是宿主机映射的端口。如果你的容器使用了不同的 IP 地址，可以用相应的 IP 地址替换 `127.0.0.1`。

5. **提供密码**：

   输入你在启动容器时设置的 MySQL `root` 用户密码（例如 `my-secret-pw`）。

通过这些步骤，你应该能够使用 MySQL 客户端从宿主机连接到 Docker 容器中的 MySQL 数据库。如果有其他问题或需要进一步帮助，请随时告诉我！