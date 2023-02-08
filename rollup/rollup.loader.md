
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
