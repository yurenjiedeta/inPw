让我从 Vue 2.6.14 版本源码中分析 transition 组件应用 CSS 动画的具体流程。



```javascript
// src/platforms/web/runtime/modules/transition.js

// 在 enter/leave 钩子中处理过渡效果
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode)
  }
}

export function enter(vnode: VNodeWithData, toggleDisplay?: Function) {
  const el: any = vnode.elm

  // 调用 leave 的回调函数
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true
    el._leaveCb()
  }

  // 获取过渡相关的数据
  const data = resolveTransition(vnode.data.transition)
  if (isUndef(data)) {
    return
  }

  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  const {
    css,
    type,
    enterClass,
    enterToClass,
    enterActiveClass,
    appearClass,
    appearToClass,
    appearActiveClass,
    beforeEnter,
    enter,
    afterEnter,
    enterCancelled,
    beforeAppear,
    appear,
    afterAppear,
    appearCancelled,
    duration
  } = data

  // 处理首次渲染的过渡
  let context = activeInstance
  let transitionNode = activeInstance.$vnode
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context
    transitionNode = transitionNode.parent
  }

  const isAppear = !context._isMounted || !vnode.isRootInsert

  if (isAppear && !appear && appear !== '') {
    return
  }

  const startClass = isAppear && appearClass ? appearClass : enterClass
  const activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass
  const toClass = isAppear && appearToClass ? appearToClass : enterToClass

  const beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter
  const enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter
  const afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter
  const enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled

  // 获取过渡持续时间
  const explicitEnterDuration: any = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  )

  const expectsCSS = css !== false && !isIE9
  const userWantsControl = getHookArgumentsLength(enterHook)

  const cb = el._enterCb = once(() => {
    if (expectsCSS) {
      removeTransitionClass(el, toClass)
      removeTransitionClass(el, activeClass)
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass)
      }
      enterCancelledHook && enterCancelledHook(el)
    } else {
      afterEnterHook && afterEnterHook(el)
    }
    el._enterCb = null
  })

  // 开始执行进入过渡
  if (!vnode.data.show) {
    // 合并过渡到 insert 钩子
    mergeVNodeHook(vnode, 'insert', () => {
      const parent = el.parentNode
      const pendingNode = parent && parent._pending && parent._pending[vnode.key]
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb()
      }
      enterHook && enterHook(el, cb)
    })
  }

  // 执行进入前钩子
  beforeEnterHook && beforeEnterHook(el)
  
  // 应用 CSS 过渡类
  if (expectsCSS) {
    addTransitionClass(el, startClass)
    addTransitionClass(el, activeClass)
    nextFrame(() => {
      removeTransitionClass(el, startClass)
      if (!cb.cancelled) {
        addTransitionClass(el, toClass)
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration)
          } else {
            whenTransitionEnds(el, type, cb)
          }
        }
      }
    })
  }
}

// 添加过渡类
export function addTransitionClass (el: any, cls: string) {
  const transitionClasses = el._transitionClasses || (el._transitionClasses = [])
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls)
    addClass(el, cls)
  }
}

// 移除过渡类
export function removeTransitionClass (el: any, cls: string) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls)
  }
  removeClass(el, cls)
}

// 判断过渡是否结束
export function whenTransitionEnds (
  el: Element,
  expectedType: ?string,
  cb: Function
) {
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType)
  if (!type) return cb()
  const event: string = type === TRANSITION ? transitionEndEvent : animationEndEvent
  let ended = 0
  const end = () => {
    el.removeEventListener(event, onEnd)
    cb()
  }
  const onEnd = e => {
    if (e.target === el) {
      if (++ended >= propCount) {
        end()
      }
    }
  }
  setTimeout(() => {
    if (ended < propCount) {
      end()
    }
  }, timeout + 1)
  el.addEventListener(event, onEnd)
}

```

让我详细解释一下这段源码中 transition 组件应用 CSS 动画的关键流程：

1. 触发时机：
- 当一个带有 transition 组件的元素被插入或移除时，Vue 会触发 enter/leave 钩子函数
- enter 钩子主要处理元素的进入动画
- 整个过程由 enter 函数控制

2. 准备阶段：
- 首先通过 resolveTransition 解析出过渡相关的配置数据
- 获取各类 CSS 类名:
  - enterClass: 进入开始时的类名
  - enterActiveClass: 进入过程中的类名
  - enterToClass: 进入结束时的类名
- 确定是否需要 CSS 过渡(expectsCSS)

3. CSS 类的应用过程：
```javascript
if (expectsCSS) {
    // 1. 添加开始状态和激活状态的类
    addTransitionClass(el, startClass)
    addTransitionClass(el, activeClass)
    
    // 2. 下一帧移除开始状态,添加结束状态
    nextFrame(() => {
        removeTransitionClass(el, startClass)
        addTransitionClass(el, toClass)
    })
}
```

4. 动画时长控制：
- 可以通过 duration 属性显式指定持续时间
- 如果没有指定，则监听 transitionend/animationend 事件来判断动画结束
- whenTransitionEnds 函数负责监听动画结束事件

5. 类名管理：
- addTransitionClass: 添加过渡类名并记录到 el._transitionClasses
- removeTransitionClass: 移除过渡类名
- 通过这种方式维护元素在过渡过程中的类名状态

6. 回调处理：
- 通过 cb 回调函数处理动画结束后的清理工作
- 移除所有过渡相关的类名
- 触发 afterEnter 等后续钩子

这个过程确保了 CSS 动画能够按照预期顺序执行：
1. 添加初始状态类
2. 添加激活态类
3. 下一帧移除初始状态类，添加结束状态类
4. 等待动画完成
5. 清理所有过渡相关类名

这样的设计让开发者可以通过简单的类名定义来控制复杂的过渡动画效果。要使用这个机制，你只需要定义相应的 CSS 类：

```css
.v-enter { /* 初始状态 */ }
.v-enter-active { /* 过渡过程 */ }
.v-enter-to { /* 结束状态 */ }
```

这些类会在恰当的时机被添加和移除，从而触发 CSS 动画效果。