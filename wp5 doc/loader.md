- 查看某loader处理后的内容方法

```js
// 添加一个自定义的loader，然后通过自定义 loader 的调试或者输出查看效果

function testLoader(content, sourceMap) {
  const result = { css: content };
  if (sourceMap) {
    result.map = sourceMap;
  }

  return `module.exports = ${JSON.stringify(result)}`;
}

module.exports = testLoader;

```

