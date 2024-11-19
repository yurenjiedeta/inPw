完整的branch0 AST数据结构示例：

```javascript
{
  type: 1, // 表示元素节点
  tag: 'input',
  attrsList: [], // 原始属性列表
  attrsMap: {
    'v-model': 'inputValue',
    ':type': 'inputType',
    'v-if': 'showInput'
  },
  if: "(inputType)==='checkbox' && showInput", // 条件表达式
  ifConditions: [
    {
      exp: "(inputType)==='checkbox' && showInput",
      block: /* branch0自身引用 */
    },
    {
      exp: "(inputType)==='radio' && showInput",
      block: /* branch1引用 */
    },
    {
      exp: 'showInput',
      block: /* branch2引用 */
    }
  ],
  parent: /* 父节点引用 */,
  children: [],
  events: {
    input: /* v-model生成的input事件处理器 */,
    change: /* v-model生成的change事件处理器 */
  },
  directives: [
    {
      name: 'model',
      rawName: 'v-model',
      value: 'inputValue',
      arg: null,
      modifiers: {}
    }
  ],
  hasBindings: true,
  static: false,
  staticRoot: false,
  processed: true // 标记已处理
}
```