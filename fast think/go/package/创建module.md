在 Go 语言中，新建一个模块项目的步骤如下：

1. **安装 Go 语言**：确保你已经安装了 Go 语言。如果还没有安装，可以在 [Go 官方网站](https://golang.org/dl/) 下载并安装。

2. **设置 Go 环境**：配置 `GOPATH` 和 `GOROOT` 环境变量。如果你使用的是较新的 Go 版本，可以忽略这一步。

3. **创建项目目录**：在你的工作目录中创建一个新的项目文件夹。例如：

    ```bash
    mkdir myproject
    cd myproject
    ```

4. **初始化 Go 模块**：在项目目录中运行 `go mod init` 命令初始化一个新的 Go 模块。例如：

    ```bash
    go mod init myproject
    ```

    这将创建一个 `go.mod` 文件，其中包含模块路径和 Go 版本等信息。

5. **创建主程序文件**：创建一个 `main.go` 文件，并编写一个简单的 Go 程序。例如：

    ```go
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, World!")
    }
    ```

6. **运行程序**：使用 `go run` 命令运行你的 Go 程序。例如：

    ```bash
    go run main.go
    ```

    你应该会看到输出 `Hello, World!`。

下面是一个完整的示例：

```bash
# 创建项目目录并进入
mkdir myproject
cd myproject

# 初始化 Go 模块
go mod init myproject

# 创建主程序文件
echo 'package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}' > main.go

# 运行程序
go run main.go
```

执行上述步骤后，你的 Go 模块项目已经成功创建并运行了一个简单的程序。