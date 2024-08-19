在Go语言中，`GOPATH`和`GOROOT`是两个非常重要的环境变量。`GOPATH`指定的是你的工作空间，包含了你的代码、依赖包以及可执行文件。`GOROOT`则指定的是Go语言的安装目录。

### 设置`GOPATH`和`GOROOT`

#### 1. 设置`GOPATH`
你可以通过编辑你的shell配置文件（例如`.bashrc`或`.zshrc`）来设置`GOPATH`。

打开终端并编辑配置文件：
```bash
nano ~/.bashrc  # 或 nano ~/.zshrc
```

在文件末尾添加以下内容：
```bash
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

保存并退出，然后使更改生效：
```bash
source ~/.bashrc  # 或 source ~/.zshrc
```

#### 2. 设置`GOROOT`
通常情况下，`GOROOT`是自动设置的，不需要手动修改。如果你需要手动设置`GOROOT`，可以按照以下步骤操作：

同样，打开你的shell配置文件：
```bash
nano ~/.bashrc  # 或 nano ~/.zshrc
```

添加以下内容（假设Go安装在`/usr/local/go`）：
```bash
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
```

保存并退出，然后使更改生效：
```bash
source ~/.bashrc  # 或 source ~/.zshrc
```

### 查看`GOPATH`和`GOROOT`

你可以在终端中使用以下命令查看当前的`GOPATH`和`GOROOT`值：

```bash
echo $GOPATH
echo $GOROOT
```

此外，Go语言提供了一个命令行工具`go env`，可以查看所有Go相关的环境变量：

```bash
go env
```

其中的`GOPATH`和`GOROOT`条目会显示当前的设置。

### 示例

以下是一个完整的示例，包括设置和查看`GOPATH`和`GOROOT`：

```bash
# 设置GOPATH
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# 设置GOROOT（如果需要）
echo 'export GOROOT=/usr/local/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOROOT/bin' >> ~/.bashrc
source ~/.bashrc

# 查看GOPATH和GOROOT
echo $GOPATH
echo $GOROOT

# 使用go env查看所有Go相关的环境变量
go env
```

这样，你就可以设置并查看Go语言的`GOPATH`和`GOROOT`了。