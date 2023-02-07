- `ChangesAndRemovals`

```js
// 用于获取哪些文件的更改和删除
// 通过 webpack 传参生成的 compiler 后，在 某个钩子 上拿到 compiler 对象，
// 利用 compiler.modifiedFiles 获取改变的文件；
// 利用 compiler.removedFiles 获取被删除的文件。
    "testMatch": [
      "<rootDir>/test/*.test.js",
      "<rootDir>/test/*.basictest.js",
      "<rootDir>/test/*.longtest.js",
      "<rootDir>/test/*.unittest.js"
    ]
```

