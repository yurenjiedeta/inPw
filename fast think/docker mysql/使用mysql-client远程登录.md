在 Ubuntu 上安装 MySQL 客户端可以通过几个简单的步骤完成。以下是详细的步骤：

1. **更新包列表**：

   首先，确保你的包列表是最新的：

   ```sh
   sudo apt update
   ```

2. **安装 MySQL 客户端**：

   安装 MySQL 客户端包 `mysql-client`。这将安装用于与 MySQL 服务器交互的命令行工具：

   ```sh
   sudo apt install mysql-client
   ```

   这个命令会安装 `mysql` 命令行工具以及其他相关的客户端工具。

3. **检查安装**：

   安装完成后，你可以通过以下命令检查 MySQL 客户端的版本，确认安装成功：

   ```sh
   mysql --version
   ```

4. **连接到 MySQL 服务器**：

   使用 `mysql` 命令连接到 MySQL 服务器。替换 `<username>` 和 `<hostname>` 以及 `<database>` 为实际的用户名、主机名和数据库名：

   ```sh
   mysql -u <username> -p -h <hostname> -D <database>
   ```

   你会被提示输入密码。输入密码后，你将能够连接到 MySQL 服务器。

通过这些步骤，你应该能够在 Ubuntu 上成功安装 MySQL 客户端并开始使用它。如果有其他问题或需要进一步的帮助，随时告诉我！