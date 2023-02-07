- `Config.cache`

```js
// 在开发模式的时候，cache 的配置为
cache: { type: 'memory' }// 意思是用电脑内存进行缓存，与 cache: true 等效
```

```js
// 当 cache.type 设置为 'filesystem' 的时候，会开放更多的可配置项
cache: {
    type: "filesystem",
        cacheDirectory: path.resolve(__dirname, "../../js/buildDepsCache"),// 默认为 node_modules/.cache/webpack
            buildDependencies: {
                defaultWebpack: [],
                    config: [__filename]// __filename 是用来获取最新配置及所有依赖的，如果还有其他的，要重新构建成成一个数组来进行缓存  [__filename].concat([xxx]) 。
            }
}
```

