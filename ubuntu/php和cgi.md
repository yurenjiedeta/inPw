- php和cgi

```bash
$ apt-get install nginx -y
```

- php

```bash
$ apt-get install php7.4 -y
```

- PHP7.4-FPM 和其他 扩展

```bash
$ apt-get install php7.4-fpm php7.4-cli php7.4-mysql php7.4-curl php7.4-json -y
$ systemctl start php7.4-fpm
$ systemctl enable php7.4-fpm
```

- 配置站点

```nginx
server {
        listen 80;
        server_name test.example.com;
        root /var/www/html;
        index info.php;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    }
}
```

