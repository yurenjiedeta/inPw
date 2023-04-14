- nginx从源代码编译的说明

```tex
1、如果从源码进行编译，./configure 可以配置生成包的一系列参数和包等，定制更多的 nginx 功能。
```

- nginx的基本配置格式

```nginx
<section> {
    <directive> <parameters>;
}
# 大括号包含的是一个配置的上下文
```

- nginx检查配置文件的语法问题

```bash
$ nginx -t -c <path-to-nginx.conf>
```

