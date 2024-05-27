在 Ubuntu 上安装 NVM（Node Version Manager）非常简单。以下是详细的步骤：

### 步骤一：更新系统

首先，确保你的系统包是最新的。打开终端并运行以下命令：

```bash
sudo apt update
sudo apt upgrade
```

### 步骤二：安装 cURL

cURL 是一个命令行工具，用于下载文件。如果你的系统没有安装 cURL，你需要先安装它：

```bash
sudo apt install curl
```

### 步骤三：安装 NVM

使用 cURL 下载并安装 NVM。运行以下命令：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

这个命令会下载并执行 NVM 的安装脚本。你也可以使用 wget 来下载和安装 NVM：

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### 步骤四：配置环境

安装完成后，你需要重新加载 shell 配置文件以使 NVM 可用。运行以下命令：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

你也可以将这些行添加到你的 shell 配置文件（如 `~/.bashrc`, `~/.zshrc`, `~/.profile`）的末尾，以确保每次启动终端时 NVM 都会自动加载。

例如，编辑 `~/.bashrc` 文件：

```bash
nano ~/.bashrc
```

在文件末尾添加：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

保存并关闭文件，然后运行以下命令以使更改生效：

```bash
source ~/.bashrc
```

### 步骤五：验证安装

要验证 NVM 是否安装成功，运行以下命令：

```bash
nvm --version
```

你应该会看到 NVM 的版本号，这表明 NVM 已经成功安装。

### 步骤六：安装 Node.js

现在你可以使用 NVM 安装 Node.js 了。例如，安装最新的 LTS（长期支持）版本：

```bash
nvm install --lts
```

要安装特定版本的 Node.js，例如 14.17.0：

```bash
nvm install 14.17.0
```

你可以使用以下命令列出所有可用的 Node.js 版本：

```bash
nvm ls-remote
```

### 步骤七：使用 Node.js

安装完成后，你可以使用以下命令切换 Node.js 版本：

```bash
nvm use 14.17.0
```

要查看当前使用的 Node.js 版本：

```bash
node -v
```
