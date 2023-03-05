- roo 和 alias

```nginx
location /i/ {
	root /data/w3
}
```

```nginx
location /i/ {
    alias /data/w3/  # alias 的配置后面需要带 / ， 查找路径时，会替换掉 uri 中的 /i/ 来进行目录查找
}
```

- http下的 upstream 配置，也是 http 的负载均衡

```nginx
upstream backend {
    server 10.10.12.45:80 weight=1;
    server app.example.com:80 weight=2;
    server spare.example.com:80 backup;
}
server {
    location / {
        proxy_pass http://backend;  # 把请求去到 backend 的 upstream 中
    }
}
```

```nginx
proxy_connect_timeout 3s; # 连接超时时间，如果连接不到就会报错了
proxy_next_upstream_timeout 60s; # upstream反向代理的故障等待时间
proxy_next_upstream_tries 3;# proxy_next_upstream_tries是一个upstream反向代理的重试次数

upstream default {# max_fails是最多出错数量
    server  tflinux_php-fpm-tfphp_1:9000 max_fails=5 fail_timeout=100;# fail_timeout是故障等待超时时间
    server  tflinux_php-fpm-tfphp_2:9000 max_fails=3 fail_timeout=60;
    server  tflinux_php-fpm-tfphp_3:9000 backup;
}
```

