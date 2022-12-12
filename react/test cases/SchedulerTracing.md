- SchedulerTracing

```tex
unstable_trace:
 1、返回 追踪函数 的返回值；
 2、执行 追踪函数；
 3、追踪函数 执行期间，SchedulerTracing.unstable_getCurrent 会记录名称和时间；（未执行则没有值）；

unstable_clear：
 1、返回 清除函数 的返回值；

unstable_wrap：
 1、执行包装函数时，返回 包装函数 的返回值；
 2、会通过 包装函数 的参数传入对应的参数；
 3、生成 包装函数 的过程中，会把 interactionsRef.current 再缓存一次，待下次执行 包装函数 的时候，会能拿到对应的 interaction

SchedulerTracing的真正使用法是通过套嵌组合来使用。

添加、获取、清除----钩子

SchedulerTracing：是一个 套嵌 来使用的类，并包含钩子；
钩子可以实现注册和反注册；
unstable_trace、unstable_wrap 可以用来添加 interactionsRef；
unstable_clear 可以用来重新开始一个新的 interaction，但 旧的 interaction则会保持不变。
```

