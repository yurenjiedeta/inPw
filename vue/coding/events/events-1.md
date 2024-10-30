在 Vue 2 中，`genHandlers` 函数会根据不同的事件绑定写法生成相应的代码字符串。下面结合各种事件写法，给出对应的 `genHandlers` 生成结果的示例。

### 1. 基本事件绑定

#### 模板写法

```html
<button @click="handleClick">Click Me</button>
```

#### `genHandlers` 生成结果

```javascript
on:{"click":handleClick}
```

---

### 2. 事件修饰符

#### 模板写法

```html
<button @click.stop="handleClick">Click Me</button>
<button @submit.prevent="handleSubmit">Submit</button>
<button @click.self="handleSelfClick">Only fires on exact element click</button>
```

#### `genHandlers` 生成结果

```javascript
on:{
  "click": function($event){$event.stopPropagation(); return handleClick},
  "submit": function($event){$event.preventDefault(); return handleSubmit},
  "click": function($event){if($event.target !== $event.currentTarget)return null; return handleSelfClick}
}
```

---

### 3. 按键修饰符

#### 模板写法

```html
<input @keyup.enter="submitForm">
<input @keyup.ctrl.enter="submitForm">
```

#### `genHandlers` 生成结果

```javascript
on:{
  "keyup": function($event){if(!$event.type.indexOf('key')&&$event.keyCode!==13)return null; return submitForm},
  "keyup": function($event){if(!$event.ctrlKey)return null;if(!$event.type.indexOf('key')&&$event.keyCode!==13)return null; return submitForm}
}
```

---

### 4. 系统修饰符

#### 模板写法

```html
<button @click.ctrl="handleCtrlClick">Ctrl + Click</button>
<button @click.ctrl.shift="handleCtrlShiftClick">Ctrl + Shift + Click</button>
```

#### `genHandlers` 生成结果

```javascript
on:{
  "click": function($event){if(!$event.ctrlKey)return null; return handleCtrlClick},
  "click": function($event){if(!$event.ctrlKey)return null;if(!$event.shiftKey)return null; return handleCtrlShiftClick}
}
```

---

### 5. 鼠标按钮修饰符

#### 模板写法

```html
<button @click.left="handleLeftClick">Left Click Only</button>
<button @click.right="handleRightClick">Right Click Only</button>
```

#### `genHandlers` 生成结果

```javascript
on:{
  "click": function($event){if('button' in $event && $event.button !== 0)return null; return handleLeftClick},
  "click": function($event){if('button' in $event && $event.button !== 2)return null; return handleRightClick}
}
```

---

### 6. `.exact` 修饰符

#### 模板写法

```html
<button @click.exact="handleExactClick">Exact Click</button>
<button @click.ctrl.exact="handleCtrlExactClick">Ctrl Only Click</button>
```

#### `genHandlers` 生成结果

```javascript
on:{
  "click": function($event){if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey)return null; return handleExactClick},
  "click": function($event){if(!$event.ctrlKey)return null;if($event.shiftKey||$event.altKey||$event.metaKey)return null; return handleCtrlExactClick}
}
```

---

### 7. 动态事件名

#### 模板写法

```html
<button v-on:[eventName]="handleClick">Dynamic Event</button>
```

#### `genHandlers` 生成结果

由于动态事件名，`genHandlers` 会处理为 `dynamicHandlers`：

```javascript
on:_d({"click":handleClick},[eventName,"handleClick"])
```

---

### 8. 事件数组（多个处理器）

#### 模板写法

```html
<button @click="[handler1, handler2]">Click with Multiple Handlers</button>
```

#### `genHandlers` 生成结果

```javascript
on:{"click":[handler1, handler2]}
```

---

### 9. 带参数的事件绑定

#### 模板写法

```html
<button @click="handleClick($event)">Click with Event</button>
<button @click="handleClick('customParam')">Click with Param</button>
```

#### `genHandlers` 生成结果

```javascript
on:{
  "click": function($event){return handleClick($event)},
  "click": function($event){return handleClick('customParam')}
}
```

---

### 10. `.once` 修饰符

#### 模板写法

```html
<button @click.once="handleClickOnce">Click Only Once</button>
```

#### `genHandlers` 生成结果

```javascript
on:{"~click":handleClickOnce}
```

这些生成结果示例演示了不同事件绑定写法在 Vue 2 中的代码生成情况，这也是 `genHandlers` 为不同事件配置所处理的逻辑输出。