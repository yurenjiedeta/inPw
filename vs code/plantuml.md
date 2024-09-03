`vscode-plantuml` 是一个 Visual Studio Code 插件，用于在编辑器中编写和预览 PlantUML 图表。PlantUML 是一种用于生成 UML 图的开源工具。以下是如何使用 `vscode-plantuml` 插件的基本步骤：

### 安装插件

1. 打开 Visual Studio Code (VS Code)。
2. 点击左侧活动栏中的“扩展”图标（通常是一个方块的图标）。
3. 在搜索框中输入 `PlantUML`，找到 `vscode-plantuml` 插件（由 `jebbs` 开发）。
4. 点击“安装”按钮。

### 使用 PlantUML 插件

1. **创建一个 PlantUML 文件**
   - 在 VS Code 中，创建一个新文件，通常使用 `.puml` 或 `.plantuml` 扩展名，例如 `diagram.puml`。
   - 输入 PlantUML 代码。例如：
     ```plantuml
     @startuml
     Alice -> Bob: Hello
     Bob -> Alice: Hi
     @enduml
     ```

2. **预览 UML 图**
   - 打开你编写的 `.puml` 文件。
   - 右键点击编辑器中的文件内容，选择 “Preview Current Diagram”。
   - 你也可以使用快捷键 `Alt+D` (Windows/Linux) 或 `Option+D` (Mac) 来查看图表预览。

3. **生成和导出图像**
   - 在预览窗口中，你可以使用“保存”按钮（通常在预览窗口的右上角）将图表导出为 PNG、SVG 等格式。
   - 你也可以通过命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）输入 “PlantUML: Export Current Diagram” 来导出图像。

### 配置 PlantUML

1. **安装 Java 环境**
   - PlantUML 需要 Java 环境支持。确保你已经安装了 Java（通常需要 JDK 8 或更高版本）。

2. **配置 PlantUML 扩展**
   - 你可以在 VS Code 的设置中配置 PlantUML 插件。例如，设置 PlantUML 的路径（如果你需要使用本地安装的 PlantUML JAR 文件）。

3. **安装 Graphviz**
   - 对于一些更复杂的图表，PlantUML 还可能需要 Graphviz 来生成图形。确保你安装了 Graphviz，并且将其路径添加到系统环境变量中。

### 其他功能

- **实时预览**：你可以使用 `PlantUML: Preview Diagram` 命令在侧边栏中查看实时更新的 UML 图。
- **文档生成**：`vscode-plantuml` 还支持从 PlantUML 文件生成 HTML 格式的文档。

如果你遇到问题，检查插件的文档和 GitHub 页面，那里通常有详细的配置说明和故障排除指南。