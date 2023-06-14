- bash调试

```bash
# -x 选项
$ bash -x example_script.sh
# 格式化输出
$ export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}'
```

- 使用专用的bashdb

```
# https://bashdb.sourceforge.net
```

- 使用例子图

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-launch-autoconfig.gif)

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-hello-world.gif)

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-stdin-usage.gif)

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-pause-support.gif)

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-watch-advanced.gif)

![bash-debug-samp-launch-autoconfig](./img/bash-debug-samp-conditional-breakpoints.gif)