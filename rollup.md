- rollup的input命令行

```bash
rollup --format es --input src/entry1.js --input src/entry2.js #指定多个入口
rollup src/entry1.js src/entry2.js --format es #和上面效果一样

#指定 name 选项的命令行
rollup main=src/entry1.js other=src/entry2.js --format es
rollup "main entry"="src/entry 1.js" "src/other entry.js" --format es #用双引号把 name 和 value 写在一起，key用空格隔开，value也用空格隔开
```

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

- rollup的loader示例

```js
function loader(modules) {
	modules = Object.assign(Object.create(null), modules);
	return {
		resolveId(id) {
			return id in modules ? id : null;
		},

		load(id) {
			return modules[id];
		}
	};
};
// 使用例子，通过 plugins 来配置
rollup({
		input: 'input',
		external: ['external'],
		plugins: [loader({ "input": 'export default {value: 42};' })]
	}).then(bundle =>
			bundle.generate({ format: 'iife', globals: { external: 'external' }, ...outputOptions })
		)
		.then(({ output }) => output[0].code);

```

- acornInjectPlugins选项

```tex
用于注入JavaScript语法解析器 `Acorn` 的一个插件，具体的需要去了解`Acorn`，见下面例子
```

```js
acornInjectPlugins: [
    function pluginA(Parser) {// 注入进去，第一个参数是它的 Parser类
        assert.equal(typeof Parser.parse, 'function');
        return class extends Parser {
            readToken(code) {
                pluginAInjected = true;
                super.readToken(code);
            }
        };
    },
    function pluginB(Parser) {
        assert.equal(typeof Parser.parse, 'function');
        return class extends Parser {
            readToken(code) {
                pluginBInjected = true;
                super.readToken(code);
            }
        };
    }
]
```

- external选项

```js
external: "./test1"// 不参与打包的选项，import test1 from "./test1" 与 from 后面的值保持一致
external: (id) => {
    console.log(id);
    console.log(111111111111);
    return false;
}
/* external函数打印的值分别为：
    ./test
    111111111111
    ./test1
    111111111111
    E:\my\bf\my-rollup\src\test.js
    111111111111
    E:\my\bf\my-rollup\src\test1.js
    111111111111
    */
```

- es6的动态导入（按需导入）

```js
//示例语法1
import('dynamic').then(({dynamic}) => console.log(dynamic));
```

- preserveModules选项

```tex
当为true的时候，使用原始模块名称作为文件名为所有模块创建单独的块。
多文件的时候，需要配置 output.dir 选项
```

- 代码规则。/* removed header */

```js
'/* removed header */ export { renderedFn, renderedClass, renderedConst } from "code"'// 含有注释  /* removed header */的时候，该引用行会被抹除
//输出的代码
'function renderedFn() {}\nclass renderedClass {}\nconst renderedConst = 1;\n\nexport { renderedClass, renderedConst, renderedFn };\n'

//当没有上面注释的时候，引用行会被保留
					loader({
						input: 'export { renderedFn, renderedClass, renderedConst } from "code"',
						code:
							'function renderedFn() {}\nfunction removedFn() {}\n' +
							'class renderedClass {}\nclass removedClass {}\n' +
							'const renderedConst = 1;\nconst removedConst = 1;\n' +
							'export { renderedFn, renderedClass, renderedConst, removedFn, removedClass, removedConst }'
					})
//输出代码
'function renderedFn() {}\nclass renderedClass {}\nconst renderedConst = 1;\n\nexport { renderedClass, renderedConst, renderedFn };\n'
```

- 当除去`CJS`，`ES`的 `format` 外， `umd`、`iife`模式下，如果未能寻找到依赖，则会有警告消息

```js
it('warns if node builtins are unresolved in a non-CJS, non-ES bundle (#1051)', () => {
    const warnings = [];

    return rollup
        .rollup({
        input: 'input',
        plugins: [
            loader({
                input: `import { format } from 'util';\nexport default format( 'this is a %s', 'formatted string' );`
            })
        ],
        onwarn: warning => warnings.push(warning)
    })
        .then(bundle =>
              bundle.generate({
        format: 'iife',
        name: 'myBundle'
    })
             )
        .then(() => {
        const relevantWarnings = warnings.filter(
            warning => warning.code === 'MISSING_NODE_BUILTINS'
        );
        assert.equal(relevantWarnings.length, 1);
        assert.equal(
            relevantWarnings[0].message,
            `Creating a browser bundle that depends on Node.js built-in modules ("util"). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`
        );
    });
});
```

- rollup的错误插件配置会被自动忽略

```js
it('ignores falsy plugins', () =>
   rollup.rollup({
    input: 'x',
    plugins: [loader({ x: `console.log( 42 );` }), null, false, undefined]// 含有错误插件
}));
```

- 输出的代码可以对`id`进行修改

```js
return rollup.rollup({
				input: 'x',
				external: ['the-answer'],
				plugins: [loader({ x: `import 'the-answer'` })]}).then(bundle =>{
    					bundle.generate({ format: 'es', paths: id => `//unpkg.com/${id}@?module` }).then(generated =>assert.equal(generated.output[0].code,"import '//unpkg.com/the-answer@?module';\n",'with render path'))
})
```

- 在rollup中，options作为入口选项和 `bundle.generate(options)`可以公用，例子：`rollup.rollup(options)`、`bundle.generate()`。

- rollup生成代码最后一个字符是一个换行符`\n`。

- `bundle.close()`后，`generate`、`write`方法调用会报错。

