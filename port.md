- 按照端口来查找程序

```bash
#具体查看被占用的端口进程
 netstat -aon|findstr 5037
 
#查看进程的具体描述(假设找到进程的id 为 5008)
tasklist /fi "PID eq 5008"

#强制退出进程
taskkill /pid 5008 /f
```

