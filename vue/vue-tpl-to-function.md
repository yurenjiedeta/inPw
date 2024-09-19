- vue-tpl-to-function

```js
var tt = compileToFunctions("<div>sfdgw</div>",{
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: undefined,
        comments: undefined
      }, new Vue())
console.log(tt.render.toString())
tt.render.call(new Vue());
```

