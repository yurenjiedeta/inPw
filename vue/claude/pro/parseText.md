```javascript
// 源文本
const text = "Message: {{ msg }} and {{ name }}"

// parseText 输出的数据结构
{
  expression: '"Message: "+_s(msg)+" and "+_s(name)',
  tokens: [
    'Message: ',
    {
      '@binding': 'msg'
    },
    ' and ',
    {
      '@binding': 'name'
    }
  ]
}

// 带过滤器的文本
const textWithFilter = "{{ message | capitalize }}"

// 输出结构
{
  expression: '_f("capitalize")(message)',
  tokens: [
    {
      '@binding': '_f("capitalize")(message)'
    }
  ]
}

```

关键点:
1. expression: 用于生成render函数的表达式
2. tokens: 解析后的文本片段数组，普通文本和绑定表达式交替出现
3. 绑定表达式用 @binding 标记