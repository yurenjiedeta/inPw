
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
- `context`，设置上下文变量(this等)；

- strictDeprecations选项

```tex
# 如果启用该选项(true)，`rollup`将以抛出错误代替`警告信息`
```
