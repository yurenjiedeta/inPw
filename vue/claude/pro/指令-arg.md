```javascript
// 注册指令
Vue.directive('my-directive', {
  bind(el, binding, vnode) {
    // binding.arg: 参数
    // binding.value: 值
    // binding.modifiers: 修饰符对象
    
    console.log(binding.arg)        // 'foo'
    console.log(binding.value)      // 'hello'
    console.log(binding.modifiers)  // { bar: true }
  }
})

// 使用指令
<div v-my-directive:foo.bar="'hello'"></div>

// 多个参数示例
Vue.directive('transform', {
  bind(el, binding) {
    const { arg, value } = binding
    
    switch(arg) {
      case 'scale':
        el.style.transform = `scale(${value})`
        break
      case 'rotate':
        el.style.transform = `rotate(${value}deg)`
        break
    }
  }
})

<div v-transform:scale="2"></div>
<div v-transform:rotate="45"></div>

```

指令参数使用冒号(:)传递，可以搭配修饰符(.)和值一起使用。参数可以通过binding.arg在钩子函数中访问。