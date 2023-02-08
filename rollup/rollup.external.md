
- external选项

```js
external: "./test1"// 不参与打包的选项，import test1 from "./test1" 与 from 后面的值保持一致。创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项来提供全局变量名称，以替换外部引入。
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
// 正确使用示例
import $ from 'jquery';

// rollup.config.js
export default {
  ...,
  external: ['jquery'],// 把 jquery 排除了
  output: {
    format: 'iife',
    name: 'MyBundle',
    globals: {
      jquery: '$'// 又添加了 globals 的属性，主要针对 iife 和 umd 两种模式
    }
  }
};
```
