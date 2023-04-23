- tr

```bash
# tr用来处理字符串很好的工具
$ echo "HELLO WORLD" | tr 'A-Z' 'a-z' # 大写转小写
$ echo "hello 123 world 456" | tr -d '0-9' # 清除数字
$ echo "thisssssss is       a text linnnnnnnne." | tr -s "s n" #去除 s 空格 n 三个的重复为一个
```

- cut

```bash
#在文件内容中，相当于以列的形式来进行内容的获取，必须指定 -d 参数，-f 参数用于指定 field
$ cut -d " " -f1 a.txt
$ cut -d " " -f2,3 a.txt
$ cut -d "." --complement a.txt
```

