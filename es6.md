- es6语法

```tex
这个本不应该写上来的，只是今天看了个别人做的项目，有了一点小小的感悟而已。
```

- 关于require("xxx")

```tex
问题纠结点：在 flux-chat 示例项目中，看到顶部 app 导入了一个 方法类，并执行；该被导入的方法类并没有被直接导入的初始化。

感悟：经过排查，是项目的其他组件也有做导入上面引用的类，以至于让他初始化了；这样就达到了闭包的公用。哎，累人。 
```

- es6的get

```js
let test = {
    get abc(){
        console.log("abc")
    }
}
test.abc  //此处会自动运行上面方法
```

- Symbol.iterator

```js
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
var iterator = myIterable[Symbol.iterator]();

// 获取 value
var step = iterator.next();
console.log(step);//  {value: 1, done: false}
```

- Object.seal

```js
// Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
const object1 = {
  property1: 42
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// expected output: 33

delete object1.property1; // cannot delete when sealed
console.log(object1.property1);
// expected output: 33

```

