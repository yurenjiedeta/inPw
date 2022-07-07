- nodejs 全局库安装的调试

```bash
#去全局安装目录找到 xxx.cmd
"%_prog%"  "%dp0%\node_modules\yarn\bin\yarn.js" %*
改成 
"%_prog%" --inspect-brk "%dp0%\node_modules\yarn\bin\yarn.js" %*
```

- nodejs设置端口

```bash
指定端口调试：--inspect-brk=[host:port]
node --inspect-brk ../../bin/webpack.js --verbose --min example.js js/output.js

//jest-debug:使用chrome调试jest
//node --inspect node_modules/.bin/jest   或者node --inspect-brk node_modules/.bin/jest
//这条命令可以调试成功：node --inspect-brk ./node_modules/jest/bin/jest --runInBand --no-cache --no-watchman


//gulp-debug:使用chrome调试gulp
//node --inspect-brk ./node_modules/gulp/bin/gulp loc --runInBand --no-cache --no-watchman  
```

- mocha的调试命令

```bash
node --inspect-brk .\node_modules\mocha\bin\mocha -b test\test.js
```

