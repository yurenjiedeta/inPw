- 项目对应于 bf 的 my-rollup

- rollup的input命令行

```bash
rollup --format es --input src/entry1.js --input src/entry2.js #指定多个入口
rollup src/entry1.js src/entry2.js --format es #和上面效果一样

#指定 name 选项的命令行
rollup main=src/entry1.js other=src/entry2.js --format es
rollup "main entry"="src/entry 1.js" "src/other entry.js" --format es #用双引号把 name 和 value 写在一起，key用空格隔开，value也用空格隔开
```

- input选项

```tex
1、input 值为一个绝对路径的字符串，这个是单入口的例子；
```


- es6的动态导入（按需导入）

```js
//示例语法1
import('dynamic').then(({dynamic}) => console.log(dynamic));
```

- preserveModules选项

```tex
当为true的时候，使用原始模块名称作为文件名为所有模块创建单独的块。
多文件的时候，需要配置 output.dir 选项
```

