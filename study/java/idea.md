在 Ubuntu 系统中安装 `ideaIC-2024.1.4-aarch64.tar.gz` 包，可以按照以下步骤进行操作：

1. **下载文件**：确保已经下载 `ideaIC-2024.1.4-aarch64.tar.gz` 文件，并且知道它所在的目录。假设文件在 `/home/user/Downloads` 目录下。

2. **安装依赖**：确保系统安装了必要的依赖。可以运行以下命令安装一些常见的依赖：
   ```sh
   sudo apt update
   sudo apt install -y openjdk-11-jdk wget tar
   ```

3. **解压文件**：解压 `tar.gz` 文件到适当的目录。建议将其解压到 `/opt` 目录。
   ```sh
   sudo tar -xzf /home/user/Downloads/ideaIC-2024.1.4-aarch64.tar.gz -C /opt/
   ```

4. **创建符号链接（可选）**：为了方便运行 IntelliJ IDEA，可以创建一个符号链接到 `/usr/local/bin` 目录。
   ```sh
   sudo ln -s /opt/idea-IC-*/bin/idea.sh /usr/local/bin/idea
   ```

5. **启动 IntelliJ IDEA**：可以通过命令行运行以下命令启动 IntelliJ IDEA：
   ```sh
   idea
   ```

6. **创建桌面快捷方式（可选）**：如果希望从桌面环境启动 IntelliJ IDEA，可以创建一个桌面快捷方式文件。
   ```sh
   nano ~/.local/share/applications/idea.desktop
   ```

   在文件中添加以下内容：
   ```desktop
   [Desktop Entry]
   Version=1.0
   Type=Application
   Name=IntelliJ IDEA Community Edition
   Icon=/opt/idea-IC-*/bin/idea.png
   Exec="/opt/idea-IC-*/bin/idea.sh" %f
   Comment=Integrated Development Environment
   Categories=Development;IDE;
   Terminal=false
   ```

   保存并关闭文件。然后更新桌面数据库：
   ```sh
   update-desktop-database ~/.local/share/applications
   ```

7. **运行 IntelliJ IDEA**：现在，你可以通过桌面快捷方式或命令行 `idea` 来运行 IntelliJ IDEA。

这些步骤应该可以帮助你在 Ubuntu 系统中成功安装并运行 IntelliJ IDEA Community Edition。