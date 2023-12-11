- 基本使用技巧
```bash
$ npm install —save-dev @babel/core
@babel/cli @babel/preset-env
```

- 新建文件 .babelrc
```js
{
    “presets”: [“@babel/preset-env”]
}
```
- 新建文件 babel.config.js
```js
module.exports = {
    presets: [
        ‘@babel/preset-env’,
        ‘@babel/preset-react’
    ]
};
```
- 最后运行
```bash
$ babel src/index.js —out-file
dist/index.js
```

- babel react的依赖
```bash
$ npm install —save-dev @babel/core
@babel/cli @babel/preset-react
```