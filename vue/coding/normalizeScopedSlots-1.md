为了全面覆盖 `normalizeScopedSlots` 函数的逻辑，我们需要设计不同的情况，包括以下几种场景：

1. **插槽为空**（`slots` 为 `null` 或 `undefined`）。
2. **已标准化插槽**（`slots._normalized` 已存在）。
3. **稳定插槽的快速路径**（`$stable` 为 `true`，并且 `prevSlots` 存在且可以复用）。
4. **不稳定插槽**（`$stable` 为 `false`，需要重新标准化）。
5. **普通插槽与作用域插槽混合**（需要分别处理）。

下面我们提供相应的 `mock` 数据和函数调用，确保覆盖所有这些逻辑路径：

### Mock 数据与调用场景

#### 1. **插槽为空**
当 `slots` 为 `null` 或 `undefined` 时，函数应该返回一个空的标准化结果。

```js
const slotsNull = null;
const normalSlotsNull = {};
const prevSlotsNull = {};

const resultNull = normalizeScopedSlots(slotsNull, normalSlotsNull, prevSlotsNull);
console.log(resultNull); // 输出：{} 空对象
```

#### 2. **已标准化插槽**
如果插槽已经标准化了（`slots._normalized` 存在），应该直接返回 `_normalized`，不再进行标准化。

```js
const slotsNormalized = {
  _normalized: {
    slotA: (props) => `Scoped Slot A: ${props.value}`,
    $stable: true,
    $key: 'stable-key'
  }
};
const normalSlotsNormalized = {};
const prevSlotsNormalized = {};

const resultNormalized = normalizeScopedSlots(slotsNormalized, normalSlotsNormalized, prevSlotsNormalized);
console.log(resultNormalized); // 直接返回已标准化的 slots._normalized
```

#### 3. **稳定插槽快速路径**
如果 `slots` 是稳定的 (`$stable` 为 `true`)，并且 `prevSlots` 存在且 `$key` 一致，应该复用 `prevSlots`，而不是重新标准化。

```js
const slotsStable = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  $stable: true,
  $key: 'stable-key'
};
const normalSlotsStable = {};
const prevSlotsStable = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  $stable: true,
  $key: 'stable-key'
};

const resultStable = normalizeScopedSlots(slotsStable, normalSlotsStable, prevSlotsStable);
console.log(resultStable); // 复用 prevSlotsStable
```

#### 4. **不稳定插槽**
当 `slots` 不稳定 (`$stable` 为 `false`)，即使 `prevSlots` 存在，也需要重新进行标准化。

```js
const slotsUnstable = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  slotB: (props) => `Scoped Slot B: ${props.value}`,
  $stable: false,
  $key: 'unstable-key'
};
const normalSlotsUnstable = {};
const prevSlotsUnstable = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  $stable: true,
  $key: 'unstable-key'
};

const resultUnstable = normalizeScopedSlots(slotsUnstable, normalSlotsUnstable, prevSlotsUnstable);
console.log(resultUnstable); // 重新标准化 slotsUnstable
```

#### 5. **普通插槽与作用域插槽混合**
在这种情况下，函数需要分别处理普通插槽和作用域插槽，并确保标准化后的结果包含两者。

```js
const slotsMixed = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  slotB: (props) => `Scoped Slot B: ${props.value}`,
  $stable: true,
  $key: 'mixed-key'
};
const normalSlotsMixed = {
  slotC: () => `Normal Slot C`
};
const prevSlotsMixed = {};

const resultMixed = normalizeScopedSlots(slotsMixed, normalSlotsMixed, prevSlotsMixed);
console.log(resultMixed);
/* 输出：
{
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  slotB: (props) => `Scoped Slot B: ${props.value}`,
  slotC: () => `Normal Slot C`,  // 普通插槽也包含
  $stable: true,
  $key: 'mixed-key',
  $hasNormal: true
}
*/
```

### 说明：
- **插槽为空时**：函数直接返回一个空对象。
- **已标准化插槽**：如果 `slots._normalized` 存在，直接返回该值，避免重复标准化操作。
- **稳定插槽快速路径**：当 `slots` 是稳定的并且 `prevSlots` 可复用时，函数会返回 `prevSlots`，不进行新的标准化。
- **不稳定插槽**：如果插槽不稳定或 `prevSlots` 不可复用，函数会对插槽重新进行标准化。
- **普通插槽与作用域插槽混合**：函数会分别处理普通插槽和作用域插槽，确保返回的结果中包含这两类插槽。

通过这些 `mock` 数据的运行，可以全面覆盖 `normalizeScopedSlots` 函数的所有逻辑路径。