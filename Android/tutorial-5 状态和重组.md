- 状态和重组

```tex
\state 状态和标准的 Kotlin 变量不同；
1、状态在初始化的时候，它需要记住上次的值，每次都会在声明它的函数调用都会被初始化。

2、对任何状态变量的更改都会对构成用户界面的可组合函数的整个层次结构树产生深远的影响。

3、在大多数情况下，从一个可组合函数传递到另一个可组合函数的数据将在父函数中声明为状态变量。

4、只要状态值在可组合函数的层次结构中发生变化，就会发生重组。
```

- `MutableState`

```kotlin
// MutableState 实例是通过调用mutableStateOf()运行时函数创建的，传递初始状态值。
var textState = { mutableStateOf("") }// 此处有个问题，必须通过重组来记住状态。

var myState = remember { mutableStateOf("") }// 添加 remember 关键字来进行状态记住。

var (textValue, setText) = remember { mutableStateOf("") }// 或者可以改成如此
```

