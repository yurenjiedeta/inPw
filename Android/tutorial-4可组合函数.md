- 可组合函数的本质

```tex
1、本质上，可组合函数将数据转换为用户界面元素。可组合项不会返回传统意义上的 Kotlin 函数的值，而是将用户界面元素发送到 Compose 运行时系统进行渲染。
```

- 有状态与无状态可组合项

```tex
1、可组合函数被分类为有状态或无状态。在 Compose 的上下文中，状态被定义为在应用程序执行期间可以更改的任何值。例如，滑块位置值、输入到文本字段中的字符串或复选框的当前设置都是状态的形式。
```

- 与`Compose`捆绑在一起的组合项

```tex
1、与 Compose 捆绑在一起的可组合项分为三类，称为Layout、Foundation和Material Design组件。

\Layout 的可组合项 Box  BoxWithConstraints  Column  ConstraintLayout  Row

\Foundatio 的可组合项 BaseTextField  Canvas  Image  LazyColumn  LazyRow  Shape  Text

\Material \Design Material Design 组件的设计使其符合 Google 的 Material 主题指南并包括以下可组合项：
AlertDialog
Button
Card
CircularProgressIndicator
DropdownMenu
Checkbox
FloatingActionButton
LinearProgressIndicator
ModalDrawer
RadioButton
Scaffold
Slider
Snackbar
Switch
TextField
TopAppBar
BottomNavigation
```

- 注意点

```tex
1、\Composable 可组合函数不返回值，可组合函数可以是有状态的或无状态的取决于函数是否存储状态值。
```

