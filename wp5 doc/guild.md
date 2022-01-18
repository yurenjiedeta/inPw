- # 起步--指南

```tex
1、目的：理解和掌握webpack提供的各种工具和特性；
2、tip提示：各个版本的输出内容不尽相同，bundle功能接近便好。
```

- ### 起步

```tex
1、diff块：含有修改记录的片段。（如面代码块）
```

```diff
+ this is a new line you shall copy into your code
- and this is a line to be removed from your code
  and this is a line not to touch.
```

- ### package.json文件说明

```tex
1、把private字段修改为true，并且移除main入口，可以防止意外发布代码；
2、测试库的使用 npm install --save-dev 命令
```

- 模块

```tex
1、模块，就是被模块化的；
2、模块支持很多种模块的写法，import、export；require、module.exports等等，详见API，打包后的转化兼容是webpack的独创精巧设计;
3、webpack不会更改import和export语句意外的部分。代码的转换需要使用到其他库。
```



- # 资源管理

```tex
了解如何通过webpack来管理资源，如images、fonts。
```

- 加载CSS

```tex
根据正则表达式来加载以来资源，并会寻找到指定的loader，最后会返回成js可以使用的。
```

- 加载images图像

```tex
1、使用wp5内容的 Asset modules，可以很轻松的实现混入到系统的目的。
2、看下面代码块的例子
```

webpack.config.js

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
+      {
+        test: /\.(png|svg|jpg|jpeg|gif)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

- loader的进一步说明

```
1.经过laoder处理后会变成什么，可以直接打印require 或者 import 后的变量。
2.只要输入和输出目录保持对其，那就比较完美了。
3.一个例子说明：在 import MyImage from './my-image.png' 时，此图像将被处理并添加到 output 目录，并且 MyImage 变量将包含该图像在处理后的最终 url。
```

- 加载 fonts 字体、加载数据

```tex
1.assets module 可以处理静态资源；
2.csv-loader、xml-loader分别可以处理 CSV、TSV和XML；
3.该类型的loader作用直接把对应文件的数据提取出来，最后成了可使用的json变量；
4.看下面例子。
```

webpack.config.js

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/i,
+         type: 'asset/resource',
+       },
+      {
+        test: /\.(csv|tsv)$/i,
+        use: ['csv-loader'],
+      },
+      {
+        test: /\.xml$/i,
+        use: ['xml-loader'],
+      },
     ],
   },
 };
```

- 其他数据资源

```bash
npm install toml yamljs json5 --save-dev
```

webpack.config.js

```diff
const path = require('path');
+const toml = require('toml');
+const yaml = require('yamljs');
+const json5 = require('json5');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(csv|tsv)$/i,
         use: ['csv-loader'],
       },
       {
         test: /\.xml$/i,
         use: ['xml-loader'],
       },
+      {
+        test: /\.toml$/i,
+        type: 'json',
+        parser: {
+          parse: toml.parse,
+        },
+      },
+      {
+        test: /\.yaml$/i,
+        type: 'json',
+        parser: {
+          parse: yaml.parse,
+        },
+      },
+      {
+        test: /\.json5$/i,
+        type: 'json',
+        parser: {
+          parse: json5.parse,
+        },
+      },
     ],
   },
 };
```



- # 管理输出

```tex
index.html中的输出，随着bundle的文件名使用 hash 输出的时候，index.html的资源管理就会变得困难起来。
```

- 设置HtmlWebpackPlugin

```tex
HtmlWebpackPlugin用于管理输出的 index.html 对于bundle包体的引用。
```

清理 /dist 文件夹

```tex
output.clean 配置项实现新的bundle在写入前把目录内的旧文件清除。
```



- # 开发环境

```diff
//webpack.config.js
+ devtool: "inline-source-map"
```

- 使用scource-map

发生错误的时候，source-map可以根据源码映射，很容易定位到错误点，如下图：

```bash
Uncaught ReferenceError: cosnole is not defined
   at HTMLButtonElement.printMe (print.js:2)
```

- 使用 watch mode(观察模式)

```diff
package.json
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "watch": "webpack --watch",
     "build": "webpack"
   },
```

- 使用 webpack-dev-server

```tex
webpack-dev-server 为你提供了一个基本的web server，并且具有 live reloading（实时重新加载）功能。
```

- webpack.config.js

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
+  devServer: {
+    static: './dist',
+  },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
 //以上配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下。
```

- package.json

```diff
"scripts":{
+  "start":"webpack serve --open"
}
```

- 使用 webpack-dev-middleware

```tex
1.他是一个封装器（wrapper），它可以把webpack处理过的文件发送到一个server。
2.output.publicPath的值会影响 server 的文件引用前缀。
```



- # 代码分离

```tex
1.代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。

2.常用的代码分离方法有三种：
·入口起点：使用 entry 配置手动地分离代码；
·防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk；
·动态导入：通过模块的内联函数调用来分离代码。
```

- 入口起点

```tex
通过调整入口配置为对象属性，但是这种情况下会比较容易导致模块的重复引用、且不够灵活。
```

- 防止重复（prevent duplication)--配置 dependOn option选项

```diff
 const path = require('path');

 module.exports = {
   mode: 'development',
   entry: {
-    index: './src/index.js',
-    another: './src/another-module.js',
+    index: {
+      import: './src/index.js',
+      dependOn: 'shared',
+    },
+    another: {
+      import: './src/another-module.js',
+      dependOn: 'shared',
+    },
+    shared: 'lodash',
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

- SplitChunksPlugin

```tex
SplitChunksPlugin插件可以将公共的以来模块提取到已有的入口 chunk 中，或者提取到一个新生成的chunk。
```

