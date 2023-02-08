- plugins的执行顺序

```tex
插件执行顺序，从上至下
```

- 一些自定义写的plugins

```tex
位于 REACT/scripts/rollup/plugins 是一些自定义的插件
```

- `@rollup/plugin-node-resolve`

```js
// 比较

// 不配置 @rollup/plugin-node-resolve 插件引入方式
export foo from './foo/index.js'
import bar from './bar/index.js'

// 配置了 @rollup/plugin-node-resolve 插件引入方式
export foo from './foo'
import bar from './bar'

// 可以看出不配置的话引入路径必须是完整的。
```

