## 何为SplitChunks

SplitChunks是webpack4提出的为了改进CommonsChunkPlugin而重新设计和实现的代码分片特性。它可以将多个chunk中的公共代码抽离出来

## SplitChunk的重要属性

#### 默认配置

```dts
optimization:{  
    splitChunks: {
      // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
      chunks: "async",
      // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
      minSize: 30000
      // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
      minChunks: 1,
      // 表示按需加载文件时，并行请求的最大数目。默认为30。
      maxAsyncRequests: 30,
      // 表示加载入口文件时，并行请求的最大数目。默认为30。
      maxInitialRequests: 30,
      // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
      automaticNameDelimiter: '~',
      // boolean = false  string function (module, chunks, cacheGroupKey) => string,也可用于每个cacheGroup： splitChunks.cacheGroups.{cacheGroup}.name。
      //拆分块的名称。提供false将保持块的相同名称，因此不会不必要地更改名称。这是生产构建的建议值。
      //提供字符串或函数使您可以使用自定义名称。指定字符串或始终返回相同字符串的函数会将所有通用模块和供应商合并为一个块。这可能会导致更大的初始下载量并减慢页面加载速度。
      name: false,
      // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          },
          // 
      default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
    }
  },
```

#### chunks

表示选择哪些 chunks 进行分割
initial: 对于匹配文件，非动态模块打包进该vendor,动态模块优化打包
async: 对于匹配文件，动态模块打包进该vendor,非动态模块不进行优化打包
all: 匹配文件无论是否动态模块，都打包进该vendor
注：import()可动态加载模块，返回一个Promise。

#### maxAsyncRequests

当整个项目打包完之后，一个按需加载包最终被拆分成 n 个包，maxAsyncRequests 就是用来限制 n 的最大值，按需加载是指动态插入script标签的样式引入

#### maxInitialRequests

它表示允许入口并行加载的最大请求数，
入口并行数量初始时插入html文件的script个数，而不是动态插入的

#### cacheGroups

splitChunks就是根据cacheGroups去拆分模块的,之前配置的所有属性都是为它服务的，它自己也可以在内部重新定义，这样会覆盖外面的属性。webpack默认就存在两个group-vendors和default,你也可以通过重新定义这两个group中的属性，也可以增加group

###### 组内有个独特的属性-priority

数字越大表示优先级越高。一个 module 可能会满足多个 cacheGroups 的正则匹配，到底将哪个缓存组应用于这个 module，取决于优先级；