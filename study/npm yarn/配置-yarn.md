查看和管理Yarn配置有几种方法：

### 1. 查看当前Yarn配置
要查看当前的Yarn配置，可以使用以下命令：

```sh
yarn config list
```

这将显示当前的所有配置项及其值。

### 2. 设置Yarn配置
要设置Yarn配置，可以使用`yarn config set`命令。例如，要设置一个全局的Yarn镜像源，可以使用：

```sh
yarn config set registry https://registry.yarnpkg.com
```

### 3. 查看特定的配置项
要查看特定的配置项，可以使用`yarn config get`命令。例如，要查看当前的Yarn镜像源，可以使用：

```sh
yarn config get registry
```

### 4. 删除配置项
要删除配置项，可以使用`yarn config delete`命令。例如，要删除Yarn镜像源配置，可以使用：

```sh
yarn config delete registry
```

### 5. 使用`.yarnrc`文件
除了使用命令行配置Yarn，你也可以通过编辑`.yarnrc`文件来管理配置。这个文件通常位于用户的主目录中，路径为`~/.yarnrc`。你可以在这个文件中添加配置，例如：

```sh
registry "https://registry.yarnpkg.com"
```

通过以上方法，你可以方便地查看和管理Yarn的各种配置。