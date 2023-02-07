- bannerPlugin的使用

```js
// 默认是顶部添加注释
plugins: [new webpack.BannerPlugin("banner is a string")]
```

```js
// 变成底部添加注释
plugins: [
    new webpack.BannerPlugin({
        banner: "banner is a string",
        footer: true
    })
]
```

