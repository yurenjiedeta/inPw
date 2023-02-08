
- **treeshake**选项

```js
// 该选项值可以是 true 或者 false，默认为 false，也可以是一个数组
// 1、treeshake.moduleSideEffects
// output with treeshake.moduleSideEffects === true
import 'external-a';
import 'external-b';
console.log(42);

// output with treeshake.moduleSideEffects === false
console.log(42);

/*
treeshake: {// 当该条件的时候， external-a 模块会一并打包生成进来
	moduleSideEffects: ["external-a"],
},
*/
import 'external-a';
console.log(42);
```

