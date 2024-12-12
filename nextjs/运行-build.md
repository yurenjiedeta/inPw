创建好 Next.js 项目后，您可以按照以下步骤来运行项目：

### 1. 安装项目依赖

在运行项目之前，确保已经安装了所有必要的依赖。打开终端，导航到您的项目目录，然后运行以下命令：

使用 **npm**：
```bash
npm install
```

或者使用 **yarn**：
```bash
yarn
```

### 2. 启动开发服务器

安装完依赖后，您可以启动开发服务器来运行项目。在项目目录下运行：

使用 **npm**：
```bash
npm run dev
```

或者使用 **yarn**：
```bash
yarn dev
```

启动成功后，您通常可以在浏览器中访问 [http://localhost:3000](http://localhost:3000) 来查看您的 Next.js 应用。

### 3. 构建和启动生产环境

当您准备好将应用部署到生产环境时，需要先进行构建，然后启动生产服务器。

**构建应用**：

使用 **npm**：
```bash
npm run build
```

或者使用 **yarn**：
```bash
yarn build
```

此命令会生成优化后的生产版本。

**启动生产服务器**：

使用 **npm**：
```bash
npm start
```

或者使用 **yarn**：
```bash
yarn start
```

默认情况下，生产服务器也会在 [http://localhost:3000](http://localhost:3000) 上运行。

### 4. 其他有用的命令

- **检查项目状态**：
  ```bash
  npm run lint
  ```
  或
  ```bash
  yarn lint
  ```
  这将运行 ESLint 来检查代码中的潜在问题。

- **运行测试**（如果您已经设置了测试）：
  ```bash
  npm run test
  ```
  或
  ```bash
  yarn test
  ```

### 5. 常见问题排查

- **端口被占用**：如果端口 3000 被其他应用占用，您可以通过设置环境变量来更改端口：
  ```bash
  PORT=3001 npm run dev
  ```
  或者在 `.env.local` 文件中添加：
  ```
  PORT=3001
  ```

- **确保 Node.js 版本兼容**：Next.js 通常需要较新的 Node.js 版本。请确保您使用的是 Node.js 14 或更高版本。可以使用以下命令检查 Node.js 版本：
  ```bash
  node -v
  ```

### 6. 部署建议

当您准备将应用部署到生产环境时，Next.js 支持多种部署方式，包括 Vercel、Netlify、AWS 等。根据您的需求选择合适的平台，并参考相应的部署文档进行操作。

### 总结

运行 Next.js 项目主要包括安装依赖、启动开发服务器以及构建和启动生产服务器。通过以上步骤，您应该能够顺利运行和部署您的 Next.js 应用。如有其他问题，欢迎进一步咨询！