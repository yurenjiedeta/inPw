```js
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};
```

```javascript
// 1. value 属性 (type !== 'button')
const valueProps = [
  { tag: 'input', type: 'text', attr: 'value' },      // true
  { tag: 'input', type: 'checkbox', attr: 'value' },  // true
  { tag: 'input', type: 'radio', attr: 'value' },     // true
  { tag: 'input', type: 'number', attr: 'value' },    // true
  { tag: 'input', type: 'password', attr: 'value' },  // true
  { tag: 'input', type: 'email', attr: 'value' },     // true
  { tag: 'input', type: 'url', attr: 'value' },       // true
  { tag: 'input', type: 'tel', attr: 'value' },       // true
  { tag: 'input', type: 'search', attr: 'value' },    // true
  { tag: 'textarea', type: '', attr: 'value' },       // true
  { tag: 'select', type: '', attr: 'value' },         // true
  { tag: 'option', type: '', attr: 'value' },         // true
  { tag: 'progress', type: '', attr: 'value' },       // true
];

// 2. selected 属性
const selectedProps = [
  { tag: 'option', type: '', attr: 'selected' }       // true
];

// 3. checked 属性
const checkedProps = [
  { tag: 'input', type: 'checkbox', attr: 'checked' }, // true
  { tag: 'input', type: 'radio', attr: 'checked' }     // true
];

// 4. muted 属性
const mutedProps = [
  { tag: 'video', type: '', attr: 'muted' }           // true
];

// 测试所有组合
function testAllTrueCases() {
  const allCases = [...valueProps, ...selectedProps, ...checkedProps, ...mutedProps];
  
  console.log('所有返回 true 的组合：\n');
  allCases.forEach(({tag, type, attr}) => {
    if (mustUseProp(tag, type, attr)) {
      console.log(`标签: <${tag}${type ? ` type="${type}"` : ''}> 属性: ${attr}`);
    }
  });
}

// 执行测试
testAllTrueCases();

/* 输出结果：
所有返回 true 的组合：

标签: <input type="text"> 属性: value
标签: <input type="checkbox"> 属性: value
标签: <input type="radio"> 属性: value
标签: <input type="number"> 属性: value
标签: <input type="password"> 属性: value
标签: <input type="email"> 属性: value
标签: <input type="url"> 属性: value
标签: <input type="tel"> 属性: value
标签: <input type="search"> 属性: value
标签: <textarea> 属性: value
标签: <select> 属性: value
标签: <option> 属性: value
标签: <progress> 属性: value
标签: <option> 属性: selected
标签: <input type="checkbox"> 属性: checked
标签: <input type="radio"> 属性: checked
标签: <video> 属性: muted
*/

```

总结一下必须使用 prop 的四类情况：

1. **value 属性**：
   - `<input>` (除了 type="button" 外的所有类型)
   - `<textarea>`
   - `<select>`
   - `<option>`
   - `<progress>`

2. **selected 属性**：
   - `<option>`

3. **checked 属性**：
   - `<input type="checkbox">`
   - `<input type="radio">`

4. **muted 属性**：
   - `<video>`

这些组合在 Vue 中会使用 DOM properties 而不是 attributes 来设置值，比如：
```javascript
// 会使用这种方式
element.value = value
element.selected = true
element.checked = true
element.muted = true

// 而不是这种方式
element.setAttribute('value', value)
element.setAttribute('selected', 'selected')
element.setAttribute('checked', 'checked')
element.setAttribute('muted', 'muted')
```

这样做的原因是为了确保这些表单控件和特殊元素能够正确地工作，因为某些 DOM properties 和 attributes 的行为是不一样的。使用正确的方式可以避免一些常见的问题，比如表单控件的值无法更新等。