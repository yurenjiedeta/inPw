我来提供一个从0开始构建 Monorepo 项目的详细教程。我们将使用 pnpm 作为包管理工具，因为它对 Monorepo 支持非常好且性能优秀。

从0开始构建Monorepo项目教程

## 1. 初始化项目结构

首先创建项目目录结构：

```bash
mkdir my-monorepo
cd my-monorepo
```

## 2. 初始化 pnpm

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 初始化项目
pnpm init
```

## 3. 配置 workspace

创建 `pnpm-workspace.yaml` 文件：

```yaml
packages:
  # 所有 packages/ 目录下的包
  - 'packages/*'
  # 所有 apps/ 目录下的应用
  - 'apps/*'
```

## 4. 创建示例项目结构

```bash
mkdir packages
mkdir apps

# 创建共享组件库
mkdir packages/ui
# 创建工具库
mkdir packages/utils
# 创建示例应用
mkdir apps/web
```

## 5. 初始化各个子项目

### 5.1 初始化共享组件库 (packages/ui)

```bash
cd packages/ui
pnpm init
```

ui/package.json:
```json
{
  "name": "@my-monorepo/ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### 5.2 初始化工具库 (packages/utils)

```bash
cd ../utils
pnpm init
```

utils/package.json:
```json
{
  "name": "@my-monorepo/utils",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### 5.3 初始化 Web 应用 (apps/web)

```bash
cd ../../apps/web
pnpm init
```

web/package.json:
```json
{
  "name": "@my-monorepo/web",
  "version": "1.0.0",
  "dependencies": {
    "@my-monorepo/ui": "workspace:*",
    "@my-monorepo/utils": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## 6. 配置 TypeScript

在根目录创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "es2019",
    "module": "esnext",
    "moduleResolution": "node",
    "declaration": true,
    "strict": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

在每个子项目中创建各自的 `tsconfig.json`，继承根配置：

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

## 7. 配置构建工具

在根目录的 package.json 添加脚本：

```json
{
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r dev"
  }
}
```

## 8. 配置 Git

创建 `.gitignore` 文件：

```
node_modules
dist
.DS_Store
```

## 9. 安装依赖并构建

```bash
# 在根目录执行
pnpm install
pnpm build
```

## 10. 配置开发工具（可选）

### 10.1 ESLint 配置

```bash
pnpm add -D -w eslint
```

创建 `.eslintrc.js`：

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']
};
```

### 10.2 Prettier 配置

```bash
pnpm add -D -w prettier
```

创建 `.prettierrc`：

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "semi": true
}
```

## 使用说明

### 添加依赖

1. 给特定包添加依赖：
```bash
pnpm add lodash --filter @my-monorepo/utils
```

2. 给所有包添加开发依赖：
```bash
pnpm add -D typescript -w
```

### 包之间的引用

在 package.json 中使用 workspace:* 引用内部包：

```json
{
  "dependencies": {
    "@my-monorepo/utils": "workspace:*"
  }
}
```

### 常用命令

```bash
# 安装所有依赖
pnpm install

# 构建所有包
pnpm build

# 运行特定包的脚本
pnpm --filter @my-monorepo/web dev

# 清理所有 node_modules
pnpm -r exec rm -rf node_modules
```


这个教程提供了一个基础但完整的 Monorepo 项目结构。一些补充说明：

1. 这个结构支持：
   - 共享依赖管理
   - TypeScript 支持
   - 包间引用
   - 统一构建流程

2. 可以根据需求扩展：
   - 添加测试框架（Jest）
   - 添加 CI/CD 配置
   - 添加 Changesets 管理版本
   - 添加 Turborepo 优化构建

需要针对某个具体部分深入了解吗？我可以为你详细解释任何感兴趣的部分。