- vue的历史模式

```bash
location / {
  try_files $uri $uri/ /index.html;
}
```

- 查看版本及查看是否运行

```bash
nginx -v
ps -ef | grep nginx
```

- nginx 和 apache2

```bash
# 启动 apache 服务
sudo /etc/init.d/apache2 start

# 重启 apache 服务
sudo /etc/init.d/apache2 restart

#停止 apache 服务
sudo /etc/init.d/apache stop


# nginx 启动不了命令
# 去到 nginx 的目录
sudo nginx -c /etc/nginx/nginx.conf
sudo nginx -s reload

# 访问域名后，最后在 /var/log/nginx/access.log 就可以看到日志了。
```

