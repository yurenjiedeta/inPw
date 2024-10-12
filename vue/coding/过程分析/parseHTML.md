- parseHTML

```tex
1、获取正则表达式的捕获组：
var startTagMatch = parseStartTag();

2、通过捕获组，把它转为对象元素：
handleStartTag(startTagMatch);

3、生成ast树，attrList = attrs;  attrsMap--->一个 key value 的对象
option.start  --->  createASTElement

4、生成rawAttrsMap属性：
key --> obj   obj是attrlist的元素
```

