在Ubuntu上卸载OpenJDK 8及其所有组件，可以通过以下步骤进行：

### 步骤1：列出已安装的OpenJDK 8包
首先，列出与OpenJDK 8相关的已安装包：
```sh
dpkg --list | grep openjdk-8
```

### 步骤2：卸载OpenJDK 8
使用`apt`命令卸载OpenJDK 8及其相关组件：
```sh
sudo apt remove --purge openjdk-8-jdk openjdk-8-jre
```

### 步骤3：自动删除不需要的依赖包
在卸载过程中可能会有一些依赖包可以删除，使用以下命令自动清理不需要的依赖包：
```sh
sudo apt autoremove
```

### 步骤4：删除剩余的配置文件和数据
在某些情况下，可能会有一些残留的配置文件和数据。你可以使用以下命令来清理：
```sh
sudo apt clean
sudo apt autoclean
```

### 步骤5：验证卸载是否成功
再次检查是否还有与OpenJDK 8相关的包：
```sh
dpkg --list | grep openjdk-8
```
如果没有输出，说明OpenJDK 8及其相关组件已经成功卸载。

通过这些步骤，你应该能够在Ubuntu上成功卸载OpenJDK 8及其所有组件。如果你还安装了其他版本的JDK，可以使用相同的方法来卸载它们。