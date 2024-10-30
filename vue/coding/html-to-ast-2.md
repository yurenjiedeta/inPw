在 Vue 2.6.14 中，`slot` 用于在组件中分发内容。Vue 在解析模板时使用 `parse` 函数生成详细的抽象语法树（AST）。与之前简化的 AST 不同，实际的 AST 包含更多属性，如指令（directives）、属性映射（attrsMap）、插槽信息（slotName、slotScope）等。以下是不同 `slot` 使用情况下，通过源代码中的 `parse` 函数生成的详细 AST 示例。

> **注意**：以下 AST 示例基于 Vue 2.6.14 的 `vue-template-compiler`，展示了模板解析后的详细结构。实际的 AST 可能包含更多内部属性，此处为主要结构示例。

---

## 1. 默认插槽（Default Slot）

### HTML 模板

```html
<my-component>
  <div>默认插槽内容</div>
</my-component>
```

### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "div",
      "attrsList": [],
      "attrsMap": {},
      "plain": true,
      "children": [
        {
          "type": 3,
          "text": "默认插槽内容"
        }
      ]
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- `type: 1` 表示元素节点，`type: 3` 表示文本节点。
- `attrsList` 和 `attrsMap` 包含元素的属性信息。
- `children` 包含子节点。
- `slotName: "default"` 表示这是默认插槽内容。
- `slotTarget` 和 `slotScope` 为 `null`，因为这是默认插槽且无作用域。

---

## 2. 具名插槽（Named Slot）

### HTML 模板

```html
<my-component>
  <template slot="header">
    <h1>头部内容</h1>
  </template>
  <div>主要内容</div>
</my-component>
```

### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "slot", "value": "header" }
      ],
      "attrsMap": {
        "slot": "header"
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "h1",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 3,
              "text": "头部内容"
            }
          ]
        }
      ],
      "parent": { /* 指向 my-component 节点 */ },
      "slotName": "header",
      "slotTarget": null,
      "slotScope": null
    },
    {
      "type": 1,
      "tag": "div",
      "attrsList": [],
      "attrsMap": {},
      "plain": true,
      "children": [
        {
          "type": 3,
          "text": "主要内容"
        }
      ],
      "parent": { /* 指向 my-component 节点 */ },
      "slotName": "default",
      "slotTarget": null,
      "slotScope": null
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- `template` 标签用于定义具名插槽，通过 `slot="header"` 指定插槽名称。
- AST 中，`slotName: "header"` 表示该 `template` 内容对应 `header` 插槽。
- 主要内容 `<div>` 作为默认插槽内容，`slotName: "default"`。

---

## 3. 作用域插槽（Scoped Slot）

### HTML 模板

```html
<my-component>
  <template slot-scope="props">
    <div>{{ props.text }}</div>
  </template>
</my-component>
```

### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "slot-scope", "value": "props" }
      ],
      "attrsMap": {
        "slot-scope": "props"
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 2,
              "expression": "_s(props.text)",
              "text": "{{ props.text }}"
            }
          ]
        }
      ],
      "parent": { /* 指向 my-component 节点 */ },
      "slotName": "default",
      "slotTarget": null,
      "slotScope": "props"
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- 使用 `slot-scope="props"` 定义作用域插槽，`props` 为插槽传递的数据。
- AST 中，`slotScope: "props"` 表示插槽作用域的变量。
- 表达式节点 `type: 2` 包含编译后的 JavaScript 表达式。

---

## 4. 具名作用域插槽（Scoped Named Slot）

### HTML 模板

```html
<my-component>
  <template slot="footer" slot-scope="props">
    <div>{{ props.footerText }}</div>
  </template>
</my-component>
```

### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "slot", "value": "footer" },
        { "name": "slot-scope", "value": "props" }
      ],
      "attrsMap": {
        "slot": "footer",
        "slot-scope": "props"
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 2,
              "expression": "_s(props.footerText)",
              "text": "{{ props.footerText }}"
            }
          ]
        }
      ],
      "parent": { /* 指向 my-component 节点 */ },
      "slotName": "footer",
      "slotTarget": null,
      "slotScope": "props"
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- 结合具名插槽和作用域插槽，通过 `slot="footer"` 和 `slot-scope="props"` 定义。
- AST 中，`slotName: "footer"` 和 `slotScope: "props"` 同时存在，表示这是一个具名且具作用域的插槽。

---

## 5. 使用 `v-slot` 指令的插槽

在 Vue 2.6 中，引入了 `v-slot` 指令，提供了更简洁的插槽语法。`v-slot` 代替了旧的 `slot` 和 `slot-scope` 属性。

### 5.1. 具名插槽使用 `v-slot`

#### HTML 模板

```html
<my-component>
  <template v-slot:header>
    <h1>头部内容</h1>
  </template>
  <div>主要内容</div>
</my-component>
```

#### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "v-slot:header", "value": "" }
      ],
      "attrsMap": {
        "v-slot:header": ""
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "h1",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 3,
              "text": "头部内容"
            }
          ]
        }
      ],
      "directives": [
        {
          "name": "slot",
          "rawName": "v-slot:header",
          "arg": "header",
          "value": null,
          "modifiers": {}
        }
      ],
      "slotName": "header",
      "slotTarget": "header",
      "slotScope": null
    },
    {
      "type": 1,
      "tag": "div",
      "attrsList": [],
      "attrsMap": {},
      "plain": true,
      "children": [
        {
          "type": 3,
          "text": "主要内容"
        }
      ],
      "slotName": "default",
      "slotTarget": null,
      "slotScope": null
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- 使用 `v-slot:header` 指令定义具名插槽。
- AST 中，`directives` 数组包含 `v-slot` 指令的详细信息。
- `slotName: "header"` 和 `slotTarget: "header"` 表示这是一个具名插槽。

### 5.2. 作用域插槽使用 `v-slot`

#### HTML 模板

```html
<my-component>
  <template v-slot:default="props">
    <div>{{ props.text }}</div>
  </template>
</my-component>
```

#### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "v-slot:default", "value": "props" }
      ],
      "attrsMap": {
        "v-slot:default": "props"
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 2,
              "expression": "_s(props.text)",
              "text": "{{ props.text }}"
            }
          ]
        }
      ],
      "directives": [
        {
          "name": "slot",
          "rawName": "v-slot:default",
          "arg": "default",
          "value": "props",
          "modifiers": {}
        }
      ],
      "slotName": "default",
      "slotTarget": "default",
      "slotScope": "props"
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- 使用 `v-slot:default="props"` 定义作用域插槽，`props` 为插槽传递的数据。
- AST 中，`directives` 数组包含 `v-slot` 指令的详细信息。
- `slotScope: "props"` 表示插槽的作用域变量。

### 5.3. 使用 `v-slot` 简写语法

#### HTML 模板

```html
<my-component>
  <template #header>
    <h1>头部内容</h1>
  </template>
</my-component>
```

#### AST 表示

```json
{
  "type": 1,
  "tag": "my-component",
  "attrsList": [],
  "attrsMap": {},
  "plain": false,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "attrsList": [
        { "name": "#header", "value": "" }
      ],
      "attrsMap": {
        "v-slot:header": ""
      },
      "plain": false,
      "children": [
        {
          "type": 1,
          "tag": "h1",
          "attrsList": [],
          "attrsMap": {},
          "plain": true,
          "children": [
            {
              "type": 3,
              "text": "头部内容"
            }
          ]
        }
      ],
      "directives": [
        {
          "name": "slot",
          "rawName": "#header",
          "arg": "header",
          "value": null,
          "modifiers": {}
        }
      ],
      "slotName": "header",
      "slotTarget": "header",
      "slotScope": null
    }
  ],
  "parent": null,
  "slotName": "default",
  "slotTarget": null,
  "slotScope": null
}
```

**说明**：
- 使用 `#header` 作为 `v-slot:header` 的简写形式。
- AST 中，`attrsMap` 将简写形式解析为 `v-slot:header`。
- `directives` 数组包含 `v-slot` 指令的详细信息。
- 其他属性与具名插槽使用 `v-slot` 相同。

---

## 总结

通过上述示例，可以看出 Vue 在解析模板时生成的 AST 结构包含丰富的节点信息，包括元素类型、标签名、属性、指令、插槽名称及作用域等。这些详细的 AST 结构有助于理解 Vue 模板的内部工作机制，尤其是在开发自定义工具、插件或进行高级优化时。

如果需要更深入地了解 Vue 的 AST 结构，建议参考 [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler) 的源码，或使用工具将模板转换为 AST 以进行实际查看。例如，可以使用以下代码片段生成并查看 AST：

```javascript
const compiler = require('vue-template-compiler');

const template = `
<my-component>
  <template v-slot:header="props">
    <h1>{{ props.title }}</h1>
  </template>
</my-component>
`;

const ast = compiler.parseComponent(template).ast;
console.log(JSON.stringify(ast, null, 2));
```

通过这种方式，可以获取更为详细和准确的 AST 结构，便于进一步分析和理解。