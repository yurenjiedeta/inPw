- TCP均衡

```nginx
stream {
    upstream mysql_read {
        server read1.example.com:3306 weight=5;
        server read2.example.com:3306;
        server 10.10.12.34:3306 backup;
    }
    server {
        listen 3306;
        proxy_pass mysql_read;
    }
}
```

```tex
1、需要将上述的内容放入 stream.conf.d 文件夹中；
2、在 /etc/nginx/nginx.conf 文件中，添加如下配置
```

```nginx
user nginx;
worker_processes auto;
pid /run/nginx.pid;
stream {
	include /etc/nginx/stream.conf.d/*.conf;
}
```

- 最后在 `stream.conf.d`文件夹中创建文件 `mysql_read.conf`

```nginx
upstream mysql_read { # 用来定义 TCP 的上有服务器
    server read1.example.com:3306 weight=5;
    server read2.example.com:3306;
    server 10.10.12.34:3306 backup;
}
server {
    listen 3306;
    proxy_pass mysql_read;
}
```

