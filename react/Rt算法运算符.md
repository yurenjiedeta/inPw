- `getHighestPriorityLane`: 分离出最高优先级

```js
function getHighestPriorityLane(lanes: Lanes) {
  return lanes & -lanes;
}
```

> 说明：
>
> 通过`lanes & -lanes`可以分离出所有比特位中最右边的 1, 具体来讲:
>
> - 假设 `lanes(InputDiscreteLanes) = 0b0000000000000000000000000011000`
> - 那么 `-lanes = 0b1111111111111111111111111101000`
> - 所以 `lanes & -lanes = 0b0000000000000000000000000001000`
> - 相比最初的 InputDiscreteLanes, 分离出来了`最右边的1`
> - 通过 lanes 的定义, 数字越小的优先级越高, 所以此方法可以获取`最高优先级的lane`

- `getLowestPriorityLane`: 分离出最低优先级

```js
function getLowestPriorityLane(lanes: Lanes): Lane {
  // This finds the most significant non-zero bit.
  const index = 31 - clz32(lanes);
  return index < 0 ? NoLanes : 1 << index;
}
```

> 说明：
>
> `clz32(lanes)`返回一个数字在转换成 32 无符号整形数字的二进制形式后, 前导 0 的个数([MDN 上的解释](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FMath%2Fclz32))
>
> - 假设 `lanes(InputDiscreteLanes) = 0b0000000000000000000000000011000`
> - 那么 `clz32(lanes) = 27`, 由于 `InputDiscreteLanes `在源码中被书写成了 31 位, 虽然在字面上前导 0 是 26 个, 但是转成标准 32 位后是 27 个
> - `index = 31 - clz32(lanes) = 4`
> - 最后 `1 << index = 0b0000000000000000000000000010000`
> - 相比最初的 `InputDiscreteLanes`, 分离出来了`最左边的1`
> - 通过 lanes 的定义, 数字越小的优先级越高, 所以此方法可以获取最低优先级的 lane