在 Vue 2.6.14 的源码中，`processSlotContent` 函数的主要作用是处理组件中的插槽（slot）相关内容，特别是处理插槽的作用域（scoped slots）以及不同插槽语法的兼容和转换。该函数在模板编译阶段被调用，用于解析和转换插槽相关的属性，使得 Vue 能够正确识别和渲染插槽内容。

### 函数的主要职责

1. **处理 `scope` 和 `slot-scope` 属性**：
   - 兼容旧版本中使用的 `scope` 属性，并提示开发者该属性已被废弃，推荐使用 `slot-scope`。
   - 提取并设置插槽的作用域信息。

2. **处理 `slot` 属性**：
   - 解析 `slot` 属性以确定插槽的名称（`slotTarget`）。
   - 处理动态插槽（如使用 `:slot` 或 `v-bind:slot` 绑定的插槽）。

3. **处理 `v-slot` 语法**（Vue 2.6 引入的新语法）：
   - 支持在 `<template>` 标签上使用 `v-slot` 来定义具名插槽和作用域插槽。
   - 支持在组件上使用 `v-slot` 来定义默认插槽。
   - 提供对不同插槽语法混用的警告，确保插槽语法的一致性和清晰性。

### 代码段说明

1. **处理 `<template>` 标签上的 `scope` 和 `slot-scope` 属性**：
   ```javascript
   if (el.tag === 'template') {
     slotScope = getAndRemoveAttr(el, 'scope');
     if (slotScope) {
       warn$2(
         "the \"scope\" attribute for scoped slots have been deprecated and " +
         "replaced by \"slot-scope\" since 2.5...",
         el.rawAttrsMap['scope'],
         true
       );
     }
     el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
   }
   ```
   - 检查 `<template>` 标签是否使用了 `scope` 属性，如果有则发出警告并转换为 `slot-scope`。

2. **处理普通元素上的 `slot-scope` 属性**：
   ```javascript
   else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
     if (el.attrsMap['v-for']) {
       warn$2(
         "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + ">...",
         el.rawAttrsMap['slot-scope'],
         true
       );
     }
     el.slotScope = slotScope;
   }
   ```
   - 如果元素上存在 `slot-scope` 属性，并且同时使用了 `v-for`，则发出警告，因为这会导致作用域不明确。

3. **处理 `slot` 属性**：
   ```javascript
   var slotTarget = getBindingAttr(el, 'slot');
   if (slotTarget) {
     el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
     el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
     if (el.tag !== 'template' && !el.slotScope) {
       addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
     }
   }
   ```
   - 解析 `slot` 属性，确定插槽的名称，并处理动态插槽。

4. **处理 `v-slot` 语法**：
   ```javascript
   if (el.tag === 'template') {
     var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
     if (slotBinding) {
       // 处理 <template v-slot>
       var ref = getSlotName(slotBinding);
       var name = ref.name;
       var dynamic = ref.dynamic;
       el.slotTarget = name;
       el.slotTargetDynamic = dynamic;
       el.slotScope = slotBinding.value || emptySlotScopeToken;
     }
   } else {
     var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
     if (slotBinding$1) {
       // 处理组件上的 v-slot
       var slots = el.scopedSlots || (el.scopedSlots = {});
       var ref$1 = getSlotName(slotBinding$1);
       var name$1 = ref$1.name;
       var dynamic$1 = ref$1.dynamic;
       var slotContainer = slots[name$1] = createASTElement('template', [], el);
       slotContainer.slotTarget = name$1;
       slotContainer.slotTargetDynamic = dynamic$1;
       slotContainer.children = el.children.filter(function (c) {
         if (!c.slotScope) {
           c.parent = slotContainer;
           return true
         }
       });
       slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
       el.children = [];
       el.plain = false;
     }
   }
   ```
   - 在 `<template>` 标签上使用 `v-slot` 定义具名插槽或作用域插槽。
   - 在组件上使用 `v-slot` 定义默认插槽，并处理插槽内容。

### 示例说明

#### 1. 使用 `slot-scope` 定义作用域插槽

**模板代码**：
```html
<child-component>
  <template slot="header" slot-scope="props">
    <h1>{{ props.title }}</h1>
  </template>
</child-component>
```

**说明**：
- `processSlotContent` 函数会解析 `slot="header"` 和 `slot-scope="props"`，将其转换为内部表示，并设置插槽的作用域为 `props`。
- 如果同时使用了 `scope` 属性，则会发出弃用警告。

#### 2. 使用 `v-slot` 定义具名插槽

**模板代码**：
```html
<child-component>
  <template v-slot:header="props">
    <h1>{{ props.title }}</h1>
  </template>
</child-component>
```

**说明**：
- `processSlotContent` 函数会识别 `v-slot:header="props"`，并将其转换为具名插槽 `header`，同时设置作用域为 `props`。
- 如果在 `<template>` 外部或与其他插槽语法混用，函数会发出相应的警告。

#### 3. 在组件上使用 `v-slot` 定义默认插槽

**模板代码**：
```html
<child-component v-slot="props">
  <p>{{ props.message }}</p>
</child-component>
```

**说明**：
- `processSlotContent` 函数会处理组件上的 `v-slot`，将其作为默认插槽，并设置作用域为 `props`。
- 如果在组件上同时使用了其他插槽语法或不符合使用规则，函数会发出警告。

### 总结

`processSlotContent` 函数在 Vue 2.6.14 中负责解析和处理插槽相关的属性和语法，确保不同版本和不同语法的插槽能够正确解析和渲染。通过处理 `scope`、`slot-scope` 和 `v-slot` 等属性，该函数实现了插槽的灵活性和向后兼容性，同时引导开发者使用最新的插槽语法，提升代码的可维护性和清晰度。