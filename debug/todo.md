在 VS Code 中，快速添加 `TODO` 注释有几种方法。以下是一些常见的做法：

### 1. 使用快捷键手动添加 `TODO`
你可以直接在代码中添加 `TODO` 注释，常见的格式是：

```js
// TODO: 这里是待办事项
```

你可以在代码的任何位置插入类似的注释。

### 2. 使用内置的 TODO 高亮功能
VS Code 内置了一些功能，会自动识别代码中的 `TODO` 注释，并在**问题面板**中列出这些注释，帮助你跟踪待办事项。你只需要在代码中写上 `TODO`，VS Code 会在侧边栏中自动显示相关信息。比如：

```js
// TODO: 改进算法性能
```

### 3. 使用 `TODO` Snippet 快速插入
你可以为 `TODO` 注释创建自定义的代码片段 (Snippet)，通过设置一个快捷键快速插入。这可以通过 VS Code 的设置来完成：

1. 打开命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`)，然后输入并选择 `Snippets`。
2. 选择你想编辑的语言（如 `JavaScript` 或 `Python`）。
3. 在打开的 JSON 文件中添加如下代码：

```json
"Add TODO comment": {
  "prefix": "todo", // 触发代码片段的前缀
  "body": [
    "// TODO: $1"
  ],
  "description": "Add a TODO comment"
}
```

现在，你只需要在代码中输入 `todo`，然后按 `Tab` 键，`TODO` 注释就会自动插入。

### 4. 安装插件支持
你还可以安装一些插件来增强 `TODO` 注释的管理。例如：

- **TODO Highlight**：这个插件可以高亮显示 `TODO`、`FIXME` 等注释，帮助你更容易地找到这些待办事项。
- **Better Comments**：这个插件不仅可以高亮 `TODO` 注释，还能通过不同的标签（如 `TODO`、`FIXME`、`NOTE`）进行分类。

你可以通过 VS Code 的插件商店安装这些插件。

### 5. 使用任务（Task）管理
如果你希望将 `TODO` 注释与 VS Code 的任务系统集成，你可以创建自定义任务来跟踪待办事项，虽然这相对复杂，但它能够将 `TODO` 管理变得更加系统化。

### 总结：
最简单的方式是直接在代码中插入 `TODO` 注释，VS Code 会自动高亮显示它。你也可以使用 Snippet 来加速这一过程，或者安装插件来帮助你更好地管理和跟踪 `TODO` 注释。