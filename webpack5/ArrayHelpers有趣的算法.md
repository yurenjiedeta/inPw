- ArrayHelpers

```js
function groupBy = (arr = [], fn) => {
	return arr.reduce(
		/**
		 * @param {[Array<T>, Array<T>]} groups An accumulator storing already partitioned values returned from previous call.
		 * @param {T} value The value of the current element
		 * @returns {[Array<T>, Array<T>]} returns an array of partitioned groups accumulator resulting from calling a predicate on the current value.
		 */
		(groups, value) => {
			groups[fn(value) ? 0 : 1].push(value);
			return groups;// fn(value) 返回 true 的则放入 groups 的第一个数组元素里面
		},
		[[], []]/* reduce的初始值 */
	);
};
```

