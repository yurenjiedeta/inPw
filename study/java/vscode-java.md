在 Visual Studio Code (VS Code) 中配置 Java 开发环境和调试功能，您需要执行以下步骤：

### 1. 安装必要的扩展

首先，您需要安装一些 VS Code 扩展，以支持 Java 开发和调试。打开 VS Code 后，按下 `Ctrl+Shift+X` 打开扩展市场，然后搜索并安装以下扩展：

- **Java Extension Pack**：由 Microsoft 提供的扩展包，包含了所有必要的工具，包括：
  - Language Support for Java(TM) by Red Hat
  - Debugger for Java
  - Java Test Runner
  - Maven for Java
  - Visual Studio IntelliCode

### 2. 配置 Java 开发环境

#### 安装 JDK
确保您已安装 Java Development Kit (JDK)。您可以从 [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) 或 [AdoptOpenJDK](https://adoptopenjdk.net/) 下载和安装适合您操作系统的 JDK。

安装完成后，配置环境变量：

- **Windows**：将 JDK 安装路径（如 `C:\Program Files\Java\jdk-15.0.1`）添加到 `PATH` 环境变量中。
- **macOS**：通过 Homebrew 安装 JDK，命令如下：
  ```bash
  brew install openjdk
  ```
  安装完成后，添加 JDK 路径到 `.bash_profile` 或 `.zshrc`：
  ```bash
  export PATH="/usr/local/opt/openjdk/bin:$PATH"
  ```

#### 配置 VS Code 设置
在 VS Code 中，按 `Ctrl+,` 打开设置，然后搜索并配置以下设置：

- `java.home`：设置为您的 JDK 安装路径，例如：
  ```json
  "java.home": "/Library/Java/JavaVirtualMachines/jdk-15.0.1.jdk/Contents/Home"
  ```

### 3. 创建和运行 Java 项目

#### 创建 Java 项目
在 VS Code 中按下 `Ctrl+Shift+P` 打开命令面板，输入并选择 `Java: Create Java Project`。按照提示选择项目模板和项目位置。

#### 编写和运行 Java 程序
创建项目后，您可以在 `src` 文件夹中创建新的 Java 类文件，例如 `HelloWorld.java`。然后编写代码：
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
保存文件后，您可以右键单击编辑器窗口中的文件，然后选择 `Run Java` 运行程序。

### 4. 配置调试环境

VS Code 支持 Java 程序的调试。为了调试您的 Java 程序，您需要创建一个调试配置文件。

#### 创建调试配置
按下 `F5`，VS Code 会提示选择环境，请选择 `Java`。这会生成一个 `.vscode` 文件夹，里面有一个 `launch.json` 文件。这个文件包含调试配置，默认配置类似如下：
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Debug (Launch) - Current File",
            "request": "launch",
            "mainClass": "${file}"
        }
    ]
}
```

#### 设置断点并调试
打开您的 Java 文件，点击行号左侧的空白处设置断点。然后按下 `F5` 开始调试，VS Code 会在断点处暂停执行，您可以查看变量、调用堆栈等信息。

### 5. 使用 Maven 或 Gradle 管理项目

如果您的项目使用 Maven 或 Gradle，您可以使用 VS Code 的相应扩展来管理依赖和构建任务。

#### Maven
安装 `Maven for Java` 扩展。您可以通过命令面板 (`Ctrl+Shift+P`) 输入 `Maven` 来访问 Maven 命令，如 `Maven: Add a Dependency`。

#### Gradle
安装 `Gradle for Java` 扩展。您可以通过命令面板输入 `Gradle` 来访问 Gradle 命令。

### 总结

以上步骤将帮助您在 VS Code 中配置 Java 开发环境和调试功能。通过安装必要的扩展、配置 JDK、创建和运行 Java 项目以及配置调试环境，您可以高效地在 VS Code 中进行 Java 开发。