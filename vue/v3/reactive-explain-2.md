Vue3 Reactivity 内部实现详解 - 第二部分

## 10. 依赖收集的详细过程

### 10.1 Track 函数的完整实现
```javascript
function track(target, type, key) {
  // 如果不需要追踪或没有激活的 effect，直接返回
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }

  // 获取目标对象的依赖映射
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  // 获取特定 key 的依赖集合
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  // 如果依赖集合中没有当前 effect，添加它
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    
    // 开发环境的跟踪
    if (activeEffect.onTrack) {
      activeEffect.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
```

### 10.2 Trigger 函数的详细实现
```javascript
function trigger(target, type, key, newValue, oldValue) {
  // 获取依赖映射
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }

  // 创建 effects 集合
  const effects = new Set();
  const computedRunners = new Set();

  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        // 避免自身引起的循环更新
        if (effect !== activeEffect) {
          if (effect.computed) {
            computedRunners.add(effect);
          } else {
            effects.add(effect);
          }
        }
      });
    }
  };

  // 处理数组长度变化
  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newValue) {
        add(dep);
      }
    });
  } else {
    add(depsMap.get(key));
    
    // 处理对象属性的添加/删除
    if (type === TriggerOpTypes.ADD) {
      if (!isArray(target)) {
        add(depsMap.get(ITERATE_KEY));
      } else if (isIntegerKey(key)) {
        add(depsMap.get('length'));
      }
    }
  }

  // 执行 effects
  const run = (effect) => {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  };

  // 先运行计算属性
  computedRunners.forEach(run);
  effects.forEach(run);
}
```

## 11. 响应式代理的完整实现

### 11.1 代理处理程序的详细实现
```javascript
const mutableHandlers = {
  get(target, key, receiver) {
    // 处理特殊 key
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    } else if (key === ReactiveFlags.RAW) {
      return target;
    }

    const targetIsArray = Array.isArray(target);
    
    // 处理数组方法
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    const res = Reflect.get(target, key, receiver);

    // 依赖收集
    track(target, TrackOpTypes.GET, key);

    if (isObject(res)) {
      // 深层响应式
      return reactive(res);
    }

    return res;
  },

  set(target, key, value, receiver) {
    const oldValue = target[key];
    const hadKey = hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);

    // 只有当实际设置了值时才触发更新
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue);
      }
    }

    return result;
  },

  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);

    if (result && hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue);
    }

    return result;
  },

  has(target, key) {
    const result = Reflect.has(target, key);
    track(target, TrackOpTypes.HAS, key);
    return result;
  },

  ownKeys(target) {
    track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
};
```

## 12. 计算属性的完整实现

### 12.1 computed 的内部机制
```javascript
function computed(getterOrOptions) {
  const getter = isFunction(getterOrOptions) 
    ? getterOrOptions 
    : getterOrOptions.get;
  const setter = getterOrOptions.set;

  let dirty = true;
  let value;
  let computed;
```