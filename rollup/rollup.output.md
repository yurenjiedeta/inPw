
- rollup选项部分解释-output选项

```tex
1、output.extend
标识导出的变量是否绑定到this，true的时候，会绑定到this;false的时候，会定义一个局部变量。

2、output.name
 2-1、用来标识文件名、以及上面的 1 中用来定义变量的名称或者 this 的属性名称；
 2-2、当name的值为 `@my.@nested/value.bundle` 时候，详见下面；
 2-3、output.name的一些规则，不能以 `数字` 开头，不能包含 `等于号` ，当 extend 为true的时候，则name可以以 `数字开头` 和 `包含等号`
 
3、output.compact
true的时候，去除多余的空格和换行符号。

4、output.format
 4-1、amd，像 RequireJS 的代码；
 4-2、cjs，给 nodejs 提供的 commonjs 类型模块；
 4-3、es，用 es 语法来保持输出，应该是其他语法也能转为 es 语法；
 4-4、iife，浏览器用的；
 4-5、umd，兼容 `amd`、`cjs`、`iife`三种模式;
 4-6、system，SystemJS 加载器的。
 
5、output.dir
输出的目录，如果有多个 `chunk` 要输出，则该配置必须要指定。

6、output.chunkFileNames
 6-1、用于命名共享的 chunk 文件；默认的 pattern 为："[name]-[hash].js"；
 6-2、可以使用的通配符都有：[format]、[hash]、[name]；
 6-3、如果含有斜杠 / ，则会生成子目录。

7、output.entryFileNames
 7-1、用于配置入口文件的属性；
 7-2、可以使用的通配符都有：[format]、[hash]、[name]；
 7-3、如果含有斜杠 / ，则会生成子目录。
 
8、output.globals
 8-1、当 format 为 umd 或者 iife 的时候，如果设置了 `external`选项，该选项需要配合设置 output.globals 属性，示例  output:{globals:{lodash:"_"}};

9、output.noConflict
 9-1、生成旧版本兼容，引用的属性为 `xxx.noConflict` ，是一个执行函数，返回值就是那个旧的版本;

10、output.banner/output.footer
 10-1、给生成的代码添加页头和页脚；
 10-2、示例：
 export default {
  ...,
  output: {...,banner: '/* my-library version ' + version + ' */',footer: '/* follow me     on Twitter! @rich_harris */'}
 };

11、output.generatedCode
 11-1、`output.generatedCode.symbols`：设置输出的代码是否保留 `Symbol`；
 
12、output.esModule
 12-1、__esModule 是用来兼容 ES 模块导入 CommonJS 模块默认导出方案。个人推荐向标准看齐，在以后写 CommonJS 模块的时候尽量不要用 module.exports 导出单对象，而是导出具体的属性名 exports.foo = bar。在 ES 模块中也尽量不要用 export default。
 
13、output.file
 13-1、用来输出的文件，该选项只能在只有一个入口文件时才能有效。
 
14、output.freeze
 14-1、设置为 ture 的时候，会使用 Object.freeze 来冻结 import 的动态数据。
 
15、output.globals
 15-1、用来标识全局引入的变量，在 external 之中的变量。
 
16、output.interop
 16-1、把 default 单独导出为一个变量，设置为 false 后，则可以为生成代码减少几个代码长度。
 
17、output.name
 17-1、在 iife/umd 模式下，生成的导出变量名称。
 17-2、示例看下面代码块。
 
18、output.sourcemap
 18-1、默认为 true ，不生成 sourcemap;
 18-2、true 的时候，一个分离的 sourcemap 就被创建了出来；
 18-3、inline 的时候，souremap 的代码会跟随在源代码的后面；
 18-4、hidden 的时候，sourcemap 会忽略注释。
 
19、output.externalLiveBindings
 19-1、不会为外部依赖生成支持动态绑定代码。
```

```js
// output.name 示例
// rollup.config.js
export default {
  ...,
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyBundle'// 全局变量名称 ，也可以设置为 a.b.c，也就是可以用 点号(.) 来进行多级设置
  }
};
```

- rollup选项output.name值为 `@my.@nested/value.bundle` 时候

```js
// 输入的 input 为：'export const x = 42;'
// 以下是输出代码：
this["@my"] = this["@my"] || {};
this["@my"]["@nested/value"] = this["@my"]["@nested/value"] || {};
this["@my"]["@nested/value"].bundle = (function (exports) {
	'use strict';

	const x = 42;

	exports.x = x;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
```

```js
// output.externalLiveBindings 的例子
// 输入
export {x} from 'external';

// 使用 externalLiveBindings: true 选项时 CJS 格式的输出
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var external = require('external');

Object.defineProperty(exports, 'x', {
    enumerable: true,
    get: function () {
        return external.x;
    }
});

// 使用 externalLiveBindings: false 选项时 CJS 格式的输出
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var external = require('external');

exports.x = external.x;
```
