以下是一个适用于 Vue 2.6 项目的 Webpack 配置，它包括了入口文件、Less 样式支持以及 `.vue` 组件文件的处理：

1. 创建一个新项目目录并进入该目录：
   ```bash
   mkdir vue-webpack-project
   cd vue-webpack-project
   ```

2. 初始化一个新的 npm 项目：
   ```bash
   npm init -y
   ```

3. 安装必要的依赖：
   ```bash
   npm install vue vue-loader vue-template-compiler webpack webpack-cli webpack-dev-server css-loader less less-loader style-loader --save-dev
   ```

4. 创建项目目录结构：
   ```bash
   mkdir src
   touch src/index.js src/App.vue src/main.less
   ```

5. 在 `src/index.js` 中，添加以下内容：
   ```javascript
   import Vue from 'vue';
   import App from './App.vue';
   import './main.less';

   new Vue({
     render: h => h(App),
   }).$mount('#app');
   ```

6. 在 `src/App.vue` 中，添加以下内容：
   ```html
   <template>
     <div id="app">
       <h1>Hello, Vue 2.6 with Webpack!</h1>
     </div>
   </template>

   <script>
   export default {
     name: 'App',
   };
   </script>

   <style lang="less">
   #app {
     text-align: center;
     color: #42b983;
   }
   </style>
   ```

7. 在 `src/main.less` 中，添加以下内容：
   ```less
   body {
     font-family: Arial, sans-serif;
     margin: 0;
     padding: 0;
   }
   ```

8. 创建一个 `webpack.config.js` 文件，并添加以下配置：
   ```javascript
   const path = require('path');
   const VueLoaderPlugin = require('vue-loader/lib/plugin');

   module.exports = {
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     module: {
       rules: [
         {
           test: /\.vue$/,
           loader: 'vue-loader',
         },
         {
           test: /\.js$/,
           loader: 'babel-loader',
           exclude: /node_modules/,
         },
         {
           test: /\.less$/,
           use: [
             'style-loader',
             'css-loader',
             'less-loader'
           ],
         },
         {
           test: /\.css$/,
           use: [
             'style-loader',
             'css-loader',
           ],
         },
       ],
     },
     resolve: {
       alias: {
         'vue$': 'vue/dist/vue.esm.js'
       },
       extensions: ['*', '.js', '.vue', '.json']
     },
     plugins: [
       new VueLoaderPlugin(),
     ],
     devServer: {
       contentBase: path.join(__dirname, 'dist'),
       compress: true,
       port: 9000,
     },
   };
   ```

9. 在项目根目录下创建一个 `index.html` 文件，添加以下内容：
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Vue Webpack Project</title>
   </head>
   <body>
     <div id="app"></div>
     <script src="bundle.js"></script>
   </body>
   </html>
   ```

10. 修改 `package.json`，添加一个 `scripts` 部分：
    ```json
    "scripts": {
      "build": "webpack --mode production",
      "dev": "webpack serve --mode development"
    }
    ```

11. 运行开发服务器：
    ```bash
    npm run dev
    ```

这样，你就有了一个带有入口文件、支持 Less 样式和 `.vue` 组件文件的 Vue 2.6 项目的 Webpack 配置。