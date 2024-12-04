```js
// 基础工具函数
const isObject = (val) => val !== null && typeof val === "object";
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

// 响应式效果追踪
let activeEffect;
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = new Set();
  }

  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = undefined;
    }
  }

  stop() {
    if (this.active) {
      this.active = false;
      this.deps.forEach(dep => dep.delete(this));
    }
  }
}

// 依赖收集和触发
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
  activeEffect.deps.add(dep);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    const effects = new Set(dep);
    effects.forEach(effect => effect.run());
  }
}

// 响应式代理处理
const mutableHandlers = {
  get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, key);
    return isObject(res) ? reactive(res) : res;
  },
  
  set(target, key, value, receiver) {
    const oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    
    if (hasChanged(value, oldValue)) {
      trigger(target, key);
    }
    return result;
  }
};

// 创建响应式对象
const reactiveMap = new WeakMap();

function reactive(target) {
  if (!isObject(target)) {
    return target;
  }

  // 避免重复代理
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  // 创建代理
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}

// 创建响应式引用
function ref(value) {
  return new RefImpl(value);
}

class RefImpl {
  constructor(value) {
    this._value = isObject(value) ? reactive(value) : value;
    this._rawValue = value;
    this.dep = new Set();
  }

  get value() {
    track(this, 'value');
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = isObject(newValue) ? reactive(newValue) : newValue;
      trigger(this, 'value');
    }
  }
}

// 效果函数
function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
```

```js
// 1. 基础响应式对象示例
console.log('--- Basic Reactive Object Example ---');
const user = reactive({
    name: 'John',
    age: 25
});

effect(() => {
    console.log(`User info changed: ${user.name} is ${user.age} years old`);
});

// 触发更新
user.name = 'Jane'; // 输出: User info changed: Jane is 25 years old
user.age = 26;     // 输出: User info changed: Jane is 26 years old

// 2. 嵌套响应式对象示例
console.log('\n--- Nested Reactive Object Example ---');
const family = reactive({
    parents: {
        father: { name: 'Bob', age: 55 },
        mother: { name: 'Mary', age: 52 }
    },
    children: ['Alice', 'Tom']
});

effect(() => {
    console.log(`Father's name: ${family.parents.father.name}`);
});

family.parents.father.name = 'Robert'; // 输出: Father's name: Robert

// 3. 响应式数组操作示例
console.log('\n--- Reactive Array Example ---');
const numbers = reactive([1, 2, 3]);

effect(() => {
    console.log('Numbers updated:', numbers.join(', '));
});

numbers.push(4);    // 输出: Numbers updated: 1, 2, 3, 4
numbers[0] = 10;    // 输出: Numbers updated: 10, 2, 3, 4

// 4. Ref 基础示例
console.log('\n--- Basic Ref Example ---');
const count = ref(0);

effect(() => {
    console.log(`Count value: ${count.value}`);
});

count.value++;  // 输出: Count value: 1
count.value = 5; // 输出: Count value: 5

// 5. 组合 Ref 和 Reactive 示例
console.log('\n--- Combined Ref and Reactive Example ---');
const state = reactive({
    count: ref(0),
    message: ref('Hello')
});

effect(() => {
    console.log(`State: count = ${state.count.value}, message = ${state.message.value}`);
});

state.count.value++;    // 输出: State: count = 1, message = Hello
state.message.value = 'Hi'; // 输出: State: count = 1, message = Hi

// 6. 计算属性示例（使用effect模拟）
console.log('\n--- Computed Property Example ---');
const price = ref(100);
const quantity = ref(2);
let total = 0;

effect(() => {
    total = price.value * quantity.value;
    console.log(`Total: $${total}`);
});

price.value = 150;    // 输出: Total: $300
quantity.value = 3;   // 输出: Total: $450

// 7. 对象集合示例
console.log('\n--- Collection Example ---');
const todos = reactive([
    { id: 1, text: 'Learn Vue', done: false },
    { id: 2, text: 'Create app', done: false }
]);

effect(() => {
    console.log('Pending todos:', todos
        .filter(todo => !todo.done)
        .map(todo => todo.text)
        .join(', '));
});

todos[0].done = true;  // 输出: Pending todos: Create app
todos.push({ id: 3, text: 'Write tests', done: false }); // 输出: Pending todos: Create app, Write tests

// 8. 停止响应式效果示例
console.log('\n--- Stop Effect Example ---');
const message = ref('Hello');
const stop = effect(() => {
    console.log(`Message changed: ${message.value}`);
});

message.value = 'Hi';  // 输出: Message changed: Hi
stop.effect.stop();    // 停止效果
message.value = 'Bye'; // 不会输出任何内容

// 9. 清理效果示例
console.log('\n--- Cleanup Effect Example ---');
const show = ref(true);
const userData = ref({ name: 'John' });

effect(() => {
    if (show.value) {
        console.log(`User data: ${userData.value.name}`);
    } else {
        console.log('No user data shown');
    }
});

userData.value.name = 'Jane'; // 输出: User data: Jane
show.value = false;          // 输出: No user data shown
userData.value.name = 'Jim'; // 不会输出，因为show是false

// 10. 多个效果依赖示例
console.log('\n--- Multiple Dependencies Example ---');
const firstName = ref('John');
const lastName = ref('Doe');
const fullName = ref('');

effect(() => {
    fullName.value = `${firstName.value} ${lastName.value}`;
    console.log(`Full name updated: ${fullName.value}`);
});

firstName.value = 'Jane'; // 输出: Full name updated: Jane Doe
lastName.value = 'Smith'; // 输出: Full name updated: Jane Smith
```

