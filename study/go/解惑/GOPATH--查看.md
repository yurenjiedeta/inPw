在Windows系统中，你可以通过以下几种方式查看和设置GOPATH：

### 方式一：通过命令行查看GOPATH

1. 打开命令提示符（Command Prompt）或PowerShell。
2. 输入以下命令并按回车键：
   ```shell
   go env GOPATH
   ```
   这将输出当前配置的GOPATH路径。

### 方式二：检查环境变量

1. 右键点击“此电脑”或“我的电脑”，选择“属性”。
2. 在系统属性窗口中，选择“高级系统设置”。
3. 在“系统属性”窗口中，点击“环境变量”按钮。
4. 在“环境变量”窗口中，查找名为`GOPATH`的用户变量或系统变量。你可以在这里查看或设置GOPATH的值。

### 方式三：通过Go代码查看GOPATH

你还可以编写一段简单的Go代码来获取和打印GOPATH：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	gopath := os.Getenv("GOPATH")
	fmt.Println("GOPATH:", gopath)
}
```

将以上代码保存为`main.go`，然后在命令行中运行：

```shell
go run main.go
```

这将打印当前的GOPATH值。

### 设置GOPATH

如果你需要设置或更改GOPATH，可以按照以下步骤操作：

1. 打开“环境变量”窗口（步骤如上）。
2. 在用户变量或系统变量部分，点击“新建”按钮，输入变量名为`GOPATH`，变量值为你想要设置的路径。例如：`C:\Users\YourUsername\go`。
3. 点击“确定”保存设置。

完成这些步骤后，你可以重新打开命令提示符，并使用`go env GOPATH`命令确认GOPATH是否已成功更改。