
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