在Ubuntu中，有几种方法可以查看已经安装的软件。以下是一些常用的方法：

### 使用命令行工具

1. **dpkg -l**
   
   使用 `dpkg` 工具列出所有已安装的软件包：
   ```bash
   dpkg -l
   ```

   这将显示所有已安装的软件包及其版本信息。

2. **apt list --installed**

   使用 `apt` 工具列出所有已安装的软件包：
   ```bash
   apt list --installed
   ```

   这将列出所有通过 `apt` 安装的软件包。

3. **dpkg-query**

   使用 `dpkg-query` 命令列出已安装的软件包：
   ```bash
   dpkg-query -l
   ```

### 使用图形界面工具

1. **Ubuntu Software Center（Ubuntu软件中心）**

   如果你喜欢使用图形界面，可以打开Ubuntu Software Center（软件中心）查看已安装的软件。

2. **Synaptic Package Manager（Synaptic软件包管理器）**

   Synaptic 是一个功能强大的软件包管理器，它可以通过图形界面来管理已安装的软件包。你可以通过以下命令安装Synaptic：
   ```bash
   sudo apt install synaptic
   ```

   安装后，你可以通过搜索“Synaptic”来打开它并查看已安装的软件包。

### 总结

- 使用 `dpkg -l` 或 `dpkg-query -l` 可以查看所有已安装的软件包。
- 使用 `apt list --installed` 可以查看通过 `apt` 安装的软件包。
- 使用图形界面的工具如 Ubuntu Software Center 或 Synaptic Package Manager 也可以查看已安装的软件包。

这些方法都可以帮助你查看Ubuntu系统中已安装的软件。根据你的需求选择适合的方法即可。