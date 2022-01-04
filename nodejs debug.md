- nodejs 全局库安装的调试

```bash
#去全局安装目录找到 xxx.cmd
"%_prog%"  "%dp0%\node_modules\yarn\bin\yarn.js" %*
改成 
"%_prog%" --inspect-brk "%dp0%\node_modules\yarn\bin\yarn.js" %*
```

