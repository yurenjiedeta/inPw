查看和管理npm配置有几种方法：

### 1. 查看当前npm配置
要查看当前的npm配置，可以使用以下命令：

```sh
npm config list
```

### 2. 设置npm配置
要设置npm配置，可以使用`npm config set`命令。例如，要设置一个全局的npm镜像源，可以使用：

```sh
npm config set registry https://registry.npm.taobao.org
```

### 3. 查看特定的配置项
要查看特定的配置项，可以使用`npm config get`命令。例如，要查看当前的npm镜像源，可以使用：

```sh
npm config get registry
```

### 4. 删除配置项
要删除配置项，可以使用`npm config delete`命令。例如，要删除npm镜像源配置，可以使用：

```sh
npm config delete registry
```

### 5. 使用`.npmrc`文件
除了使用命令行配置npm，你也可以通过编辑`.npmrc`文件来管理配置。这个文件通常位于用户的主目录中，路径为`~/.npmrc`。你可以在这个文件中添加配置，例如：

```sh
registry=https://registry.npm.taobao.org
```

通过以上方法，你可以方便地查看和管理npm的各种配置。