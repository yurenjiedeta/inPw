
- onwarn

```js
// 用于拦截警告信息的函数，warning 含有两个属性， code 和 message
function handleRollupWarning(warning) {
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
    const match = warning.message.match(/external module '([^']+)'/);
    if (!match || typeof match[1] !== 'string') {
      throw new Error(
        'Could not parse a Rollup warning. ' + 'Fix this method.'
      );
    }
    const importSideEffects = Modules.getImportSideEffects();
    const externalModule = match[1];
    if (typeof importSideEffects[externalModule] !== 'boolean') {
      throw new Error(
        'An external module "' +
          externalModule +
          '" is used in a DEV-only code path ' +
          'but we do not know if it is safe to omit an unused require() to it in production. ' +
          'Please add it to the `importSideEffects` list in `scripts/rollup/modules.js`.'
      );
    }
    // Don't warn. We will remove side effectless require() in a later pass.
    return;
  }

  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    // Ignored
  } else if (typeof warning.code === 'string') {
    // This is a warning coming from Rollup itself.
    // These tend to be important (e.g. clashes in namespaced exports)
    // so we'll fail the build on any of them.
    console.error();
    console.error(warning.message || warning);
    console.error();
    process.exit(1);
  } else {
    // The warning is from one of the plugins.
    // Maybe it's not important, so just print it.
    console.warn(warning.message || warning);
  }
}
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