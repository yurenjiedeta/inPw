相关变量及属性说明

- container._reactRootContainer

> 标题对应类型是`ReactDOMBlockingRoot`，含有`render`、`_internalRoot`和`unmount`三个原型链的属性；
>
> `_internalRoot`是`FiberRootNode`类型，它的`tag`属性值为`LegacyRoot`，含有`containerInfo`属性，`hydrate`属性值为`false`；
>
> `_internalRoot.current`是`FiberNode`类型，它的`tag`属性为`HostRoot`（值为3），`mode`的属性值为`0`，`stateNode`属性指向`_internalRoot`，还含有`updateQueue`属性；



- allNativeEvents

> 是一个记录了一系列事件的`set`对象，Set实例是可以用来遍历的；
>
> `listenToAllSupportedEvents`函数会使用`allNativeEvents`做每个事件的监听；



- 内置监听对应的事件回调函数

> `discreteEventPairsForSimpleEventPlugin`、`otherDiscreteEvents`数组对应的是`dispatchDiscreteEvent`；
>
> `userBlockingPairsForSimpleEventPlugin`数组对应的是`dispatchUserBlockingUpdate`；
>
> `continuousPairsForSimpleEventPlugin`对应的是`dispatchEvent`



- 关于`FiblerNode`的`mode`值

> mode = ConcurrentMode | BlockingMode | StrictMode;(4、2、1)；// 那就是 7
>
> mode = BlockingMode | StrictMode;（2、1）；//  值为 3
>
> mode = NoMode;（0）。



- scheduleUpdateOnFiber(fiber, lane, eventTime)

> 该`fiber`是`current`，`lane`值为`syncLane`（值为1）；



- `workInProgressRoot`和`workInProgress`由`prepareFreshStack`函数生成

> 它们和`fiberRootNode`、`fiberNode`分别`stateNode`相互指向对方；



- `reconcileChildFibers`开始处理`element`组件列表

> 给`element`生成为对应的`fiber`对象；



