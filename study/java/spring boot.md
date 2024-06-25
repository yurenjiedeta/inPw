在 VS Code 中创建并运行一个 Spring Boot 项目可以通过以下步骤完成。确保你已经安装了 Java 和 Maven（或 Gradle）以及 VS Code 和相应的扩展。

### 前提条件
1. **安装 Java Development Kit (JDK)**：确保你已经安装了 JDK 8 或以上版本。
2. **安装 Maven 或 Gradle**：可以从官方网站下载安装。
3. **安装 Visual Studio Code**：从[官方网站](https://code.visualstudio.com/)下载安装 VS Code。
4. **安装 VS Code 扩展**：安装以下扩展：
   - **Spring Boot Extension Pack**
   - **Java Extension Pack**
   - **Debugger for Java**
   - **Maven for Java**（如果你选择使用 Maven）

### 步骤 1：创建 Spring Boot 项目
你可以使用 Spring Initializr 创建一个 Spring Boot 项目：

1. 打开 VS Code。
2. 打开命令面板（按 `Ctrl+Shift+P`）。
3. 输入并选择 "Spring Initializr: Generate a Maven Project" 或 "Spring Initializr: Generate a Gradle Project"，具体取决于你选择的构建工具。
4. 按提示填写项目信息，比如 Group、Artifact、包装类型、Java 版本等。
5. 选择所需的依赖项，比如 Spring Web、Spring Data JPA 等。很重要，下面的依赖保证项目能够启动：（DevTools（代码修改热更新，无需重启）、Web（集成tomcat、SpringMVC）、Lombok（智能生成setter、getter、toString等接口，无需手动生成，代码更简介）、Thymeleaf （模板引擎））
6. 生成项目后，将项目导入到 VS Code 中。

### 步骤 2：导入项目
1. 在 VS Code 中，打开刚刚生成的项目文件夹。
2. VS Code 会自动检测到这是一个 Java 项目，并建议你安装所需的扩展（如果还没有安装的话）。
3. 如果项目使用 Maven，确保你安装了 Maven for Java 扩展。

### 步骤 3：运行 Spring Boot 项目
1. 找到 `src/main/java` 目录下的主类（通常是包含 `@SpringBootApplication` 注解的类）。
2. 打开该类文件。
3. 在类文件中，找到包含 `public static void main(String[] args)` 方法的部分。
4. 在方法上方会有一个运行按钮（通常是一个绿色的三角形）。点击该按钮运行项目。
5. 或者，你也可以使用终端运行项目。打开终端（按 `Ctrl+``）并输入以下命令：
    ```sh
    ./mvnw spring-boot:run
    ```
    如果使用的是 Gradle，则输入：
    ```sh
    ./gradlew bootRun
    ```

### 步骤 4：调试 Spring Boot 项目
1. 打开主类文件。
2. 在需要设置断点的行点击左侧的灰色边栏设置断点。
3. 打开运行和调试视图（按 `Ctrl+Shift+D`）。
4. 点击 "Run and Debug" 按钮，选择 "Java"。
5. 选择主类文件并启动调试。

### 示例代码
以下是一个简单的 Spring Boot 应用示例代码：

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```

保存文件后，运行项目，然后打开浏览器并访问 `http://localhost:8080/hello`，应该会看到 "Hello, World!" 的输出。

通过以上步骤，你就可以在 VS Code 中创建并运行一个 Spring Boot 项目了。