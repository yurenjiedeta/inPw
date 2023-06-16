- 多个文件编译生成一个文件

```bash
$ gcc -o outfile name1.c name2.c ....
```

- 复杂情况下

```bash
# name1.c 用到了数学计算库 math 中的函数，我们得手动添加参数 -lm；
# name4.c 用到了小型数据库 SQLite 中的函数，我们得手动添加参数 -lsqlite3;
# nae5 使用到了线程，我们需要手动添加参数 -lpthread。
```

