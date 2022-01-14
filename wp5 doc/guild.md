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

