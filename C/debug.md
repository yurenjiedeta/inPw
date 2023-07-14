- ubuntu

```shell
$ cc -g hello.c
$ gdb a.out
$ b 8
$ run 
$ break 666 if testsize==100 #条件断点
```

- 多个文件的情况

```sh
# 相同目录
# 有三个文件，分别为main.cpp、test1.cpp、test2.cpp文件
$ g++ main.cpp test1.cpp test2.cpp -o test -g
$ gdb test
$ b test1.cpp:4
$ run
```

```shell
# 不通目录情况
# GDB/test1:test1.cpp
# GDB/test2:test2.cpp
# GDB/ManyFiles:main.cpp
$ g++ main.cpp ../test1/test1.cpp ../test2/test2.cpp -o test -g
$ gdb test 
$ directory ../test1/ # 切换目录
$ b test1.cpp:2
```

- 编译的问题

```bash
# 需要把 #include <head1.h>  改为 #include "head1.h"
```

