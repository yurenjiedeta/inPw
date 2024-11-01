我来提供一些 mock 数据来演示 `normalizeScopedSlots` 函数的使用场景：

```javascript
// 模拟测试数据
const mockData = {
  // 1. 基本场景 - 空插槽
  case1: {
    slots: null,
    normalSlots: {},
    prevSlots: {}
  },

  // 2. 已规范化的插槽（测试 fast path 1）
  case2: {
    slots: {
      _normalized: {
        default: props => h('div', props.text),
        header: props => h('header', props.title)
      },
      $stable: true
    },
    normalSlots: {},
    prevSlots: {}
  },

  // 3. 稳定的作用域插槽（测试 fast path 2）
  case3: {
    slots: {
      default: props => h('div', props.text),
      $stable: true,
      $key: 'test-key'
    },
    normalSlots: {},
    prevSlots: {
      default: props => h('div', props.text),
      $stable: true,
      $key: 'test-key',
      $hasNormal: false
    }
  },

  // 4. 混合插槽场景
  case4: {
    slots: {
      default: props => h('div', props.text),
      header: props => h('header', props.title),
      footer: props => h('footer', props.copyright),
      $stable: false
    },
    normalSlots: {
      sidebar: () => h('div', 'sidebar content')
    },
    prevSlots: {}
  },

  // 5. 复杂场景
  case5: {
    slots: {
      default: {
        fn: props => h('div', props.text),
        proxy: true
      },
      'list-item': props => h('li', props.item),
      footer: props => h('footer', props.text),
      $stable: false,
      $key: 'complex-key'
    },
    normalSlots: {
      header: () => h('header', 'Fixed Header'),
      nav: () => h('nav', 'Navigation')
    },
    prevSlots: null
  }
};

// 测试函数调用
function testNormalization() {
  Object.keys(mockData).forEach(key => {
    const { slots, normalSlots, prevSlots } = mockData[key];
    console.log(`Testing ${key}:`);
    const result = normalizeScopedSlots(slots, normalSlots, prevSlots);
    console.log('Result:', result);
    console.log('-------------------');
  });
}

// 辅助函数 - 模拟 Vue 的 h 函数
function h(tag, props) {
  return { tag, props };
}

// 模拟 Vue 内部使用的 emptyObject
const emptyObject = Object.freeze({});

// 模拟 def 函数
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    value
  });
}

// 模拟 normalizeScopedSlot 函数
function normalizeScopedSlot(normalSlots, key, fn) {
  return typeof fn === 'function' 
    ? fn
    : fn.fn;
}

// 模拟 proxyNormalSlot 函数
function proxyNormalSlot(normalSlots, key) {
  return () => normalSlots[key]();
}
```

这些 mock 数据覆盖了几个主要场景：

1. **空插槽场景**：测试函数处理空值的情况
2. **已规范化场景**：测试快速路径1
3. **稳定插槽场景**：测试快速路径2
4. **混合插槽场景**：同时包含作用域插槽和普通插槽
5. **复杂场景**：包含多种类型的插槽和嵌套结构

使用方法：

```javascript
// 运行测试
testNormalization();
```

预期输出示例：
```javascript
// case1 的输出
{
  $stable: true,
  $key: undefined,
  $hasNormal: false
}

// case2 的输出（直接返回 _normalized）
{
  default: [Function],
  header: [Function],
  $stable: true
}

// case3 的输出（直接返回 prevSlots）
{
  default: [Function],
  $stable: true,
  $key: 'test-key',
  $hasNormal: false
}

// case4 的输出
{
  default: [Function],
  header: [Function],
  footer: [Function],
  sidebar: [Function],
  $stable: false,
  $key: undefined,
  $hasNormal: true
}

// case5 的输出
{
  default: [Function],
  'list-item': [Function],
  footer: [Function],
  header: [Function],
  nav: [Function],
  $stable: false,
  $key: 'complex-key',
  $hasNormal: true
}
```

这些测试数据涵盖了函数的主要用例和边界情况，可以用来验证函数的正确性和性能优化效果。每个案例都测试了不同的功能点：
- 空值处理
- 缓存命中
- 稳定性检查
- 混合插槽处理
- 复杂嵌套结构

你可以根据具体需求修改这些测试数据或添加更多的测试场景。