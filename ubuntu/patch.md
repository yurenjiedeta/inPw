- patch命令

```bash
# patch 命令是通过 diff 对比的文件来进行类似于补丁升级来升级文件的，下面是示例
$ diff /tmp/file2.txt /tmp/file3.txt > /tmp/file.patch #生成补丁文件
$ patch /tmp/file2.txt /tmp/file.patch
```

