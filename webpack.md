- webpack的环境变量

```tex
web环境变量的值其实也是直接替换的作用的
```

- wepback对于 module.rules 的元素配置

```js
/*
module.rules.rule.oneOf
oneOf
webpack原本的loader是将每个文件都过一遍，比如有一个js文件 rules中有10个loader，第一个是处理js文件的loader，当第一个loader处理完成后webpack不会自动跳出，而是会继续拿着这个js文件去尝试匹配剩下的9个loader，相当于没有break。
而oneOf就相当于这个break。
用法：
*/
rules:[
    oneOf:[
        {
        test:/\.css$/,
        use:[...common_css_loader]
    },
        {
            test:/\.less$/,
                use:[...common_css_loader,'less-loader']
        },
            {
                test:/\.html/,
                    loader:'html-loader'
            }
    ]
]
// 在oneOf里面的loader一旦匹配成功则会跳出匹配，相当于break语句
```

```js
/**
enforce
loader的执行顺序是从下往上的，但是有时候我们想先执行某个loader 就要把它移到最后边这样非常的不方便。
enforce的作用是设置loader的优先级
enforce有以下几个配置项

pre 优先处理
normal 正常处理（默认）
inline 其次处理
post 最后处理
执行loader的时候会根据enforce的配置来安排顺序，如果设置了pre则会优先执行。
使用方法：
*/
{
    test:/\.js$/,
        exclude:/node_modules/,
            loader:'eslint-loader'，
            enforce:'pre'  
}
```

- webpack的loader的执行顺序

```js
// loader从右到左（或从下到上）的执行。
// 对于同一种类型，可以配置多个 loader 来同时进行执行
// module.rules的配置：
{
   test: /\.s[ac]ss$/i,
   use: ['style-loader', 'css-loader','sass-loader', 'postcss-loader'],
},
    
// 先执行loader在执行plugin。
```

- webpack简述

```tex
webpack 使用 webpack-dev-server 来进行开发调试，配置好了 server、loaders、plugins，就基本 OK了。
```

