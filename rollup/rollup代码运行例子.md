- 一个Api运行例子

```js
const rollup = require('rollup');
const rollupConfig = {
    "input": "F:\\\\codes\\\\github-in-pw\\\\react\\\\packages\\\\react\\\\index.experimental.js",
    "treeshake": {
        "pureExternalModules": [
            "prop-types/checkPropTypes",
            "react-native/Libraries/ReactPrivate/ReactNativePrivateInterface",
            "scheduler",
            "scheduler/tracing",
            "react-dom/server",
            "react/jsx-dev-runtime",
            "react-fetch/node",
            "react-dom"
        ]
    },
    "plugins": [
        {
            "name": "scripts/rollup/plugins/use-forks-plugin"
        },
        {
            "name": "forbidFBJSImports"
        },
        {
            "name": "node-resolve"
        },
        {},
        {
            "name": "babel"
        },
        {},
        {
            "name": "replace"
        },
        {
            "name": "scripts/rollup/plugins/closure-plugin"
        },
        {
            "name": "scripts/rollup/plugins/strip-unused-imports"
        },
        {},
        {
            "name": "scripts/rollup/plugins/sizes-plugin"
        }
    ],
    "output": {
        "externalLiveBindings": false,
        "freeze": false,
        "interop": false,
        "esModule": false
    }
};
const rollupOutputOptions = {
    "file": "build/node_modules/react/umd/react.production.min.js",
    "format": "umd",
    "globals": {},
    "freeze": false,
    "interop": false,
    "name": "React",
    "sourcemap": false,
    "esModule": false
}
const result = await rollup.rollup(rollupConfig);
await result.write(rollupOutputOptions);
```

- rollup插件开发

```js
// 一个 rollup 的插件应该是一个包，这个包导出一个函数，该函数能够设置选项，最后这个函数返回一个对象。
// 公约
/*
	1、rollup插件的文件名需要有如此前缀 `rollup-plugin-`；
	2、在 package.json 中包含 `rollup-plugin` 关键字；
	3、需要有测试用例，推荐使用 `mocha` 来进行测试；
	4、plugin 里面多使用 异步 的方法，如 用 `fs.readFile` 来代替 `fs.readFileSync`；
	5、用英文写好你 plugin 的文本；
	
*/
```

- 一个示例插件

```js
// rollup-plugin-my-example.js
export default function myExample () {
  return {
    name: 'my-example', // this name will show up in warnings and errors
    resolveId ( source ) {
      if (source === 'virtual-module') {
        // this signals that rollup should not ask other plugins or check
        // the file system to find this id
        return source;
      }
      return null; // other ids should be handled as usually
    },
    load ( id ) {
      if (id === 'virtual-module') {
        // the source code for "virtual-module"
        return 'export default "This is virtual!"';
      }
      return null; // other ids should be handled as usually
    }
  };
}

// rollup.config.js
import myExample from './rollup-plugin-my-example.js';
export default ({
  input: 'virtual-module', // resolved by our plugin
  plugins: [myExample()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});
```

