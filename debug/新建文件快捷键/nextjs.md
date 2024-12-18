在 Next.js 中，文件系统路由是通过在 `pages` 目录下创建相应的文件和文件夹来自动生成路由的。你可以通过以下几种方法快速批量创建文件夹和文件：

### 1. **使用 VS Code 的代码片段（Snippets）**
   你可以在 VS Code 中设置代码片段，来快速创建一组文件和文件夹。

   1. 打开 VS Code。
   2. 按 `Ctrl+Shift+P`（Windows/Linux）或者 `Cmd+Shift+P`（Mac）打开命令面板。
   3. 输入 `Preferences: Configure User Snippets` 并选择它。
   4. 选择 `New Global Snippets file`，创建一个新的片段文件。
   5. 在新文件中定义一个代码片段，类似这样：
      ```json
      {
        "Create Route Structure": {
          "prefix": "newRoute",
          "body": [
            "pages/${1:route}/index.js",
            "pages/${1:route}/subfolder/${2:subroute}.js"
          ],
          "description": "Create a new route with subfolder"
        }
      }
      ```
   6. 以后在代码中输入 `newRoute`，按 Tab 键，VS Code 就会创建你定义好的文件结构。

### 2. **使用命令行脚本自动创建文件夹和文件**
   你可以编写一个简单的 Node.js 脚本，或者使用 shell 脚本来批量创建路由文件夹和文件。

   例如，使用 `bash` 脚本：
   ```bash
   mkdir -p pages/$1/$2 && touch pages/$1/$2/index.js
   ```

   保存为 `createRoute.sh`，在终端中运行时传递路由名称作为参数：
   ```bash
   ./createRoute.sh /posts /firstPost
   ```

   这会创建 `pages/posts/firstPost/index.js`。

   或者使用 `Node.js` 脚本：
   ```js
   const fs = require('fs');
   const path = require('path');

   function createRoute(route) {
     const fullPath = path.join(__dirname, 'pages', route);
     fs.mkdirSync(fullPath, { recursive: true });
     fs.writeFileSync(path.join(fullPath, 'index.js'), "// Your route code here");
     console.log(`Route ${route} created successfully!`);
   }

   createRoute(process.argv[2]);
   ```

   然后在终端中运行：
   ```bash
   node createRoute.js posts/firstPost
   ```

### 3. **使用 Next.js 模板（如 Next.js App Router）**
   如果你使用的是 `app` 目录（Next.js 13+ 的新特性），你可以直接通过模板或应用结构生成路由文件。例如：
   ```bash
   mkdir -p app/posts/[slug]/page.js
   ```

   这将创建动态路由 `[slug]`，并自动识别为参数。

### 4. **使用 VS Code 插件**
   有一些 VS Code 插件可以帮助你快速创建文件和文件夹结构，例如：
   - **File Templates** 插件：允许你定义模板，快速生成文件结构。
   - **Project Manager** 插件：可以帮助管理和快速创建项目结构。

### 5. **使用 CLI 工具**
   你还可以使用一些社区提供的工具来生成路由文件结构。例如，`nextjs-router-generator` 可以帮助你快速生成文件系统路由结构。

通过这些方法，你可以更高效地创建 Next.js 路由文件和文件夹结构，节省了手动创建每个文件的时间。