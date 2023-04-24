- nginx安装shell脚本

```sh
#!/bin/sh
# nginx install from source shell

echo "\033[32m-nginx-> cUrling nginx v1.10.3 into current directory.\033[0m"
curl -O http://nginx.org/download/nginx-1.10.3.tar.gz
echo "\033[32m-nginx-> nginx tar downloaded, unarchiving...\033[0m"
tar -zxf nginx-1.10.3.tar.gz
cd nginx-1.10.3
echo "\033[32m-nginx-> ./configure\033[0m"
./configure
echo "\033[32m-nginx-> make\033[0m"
make
echo "\033[32m-nginx-> {sudo} make install\033[0m"
sudo make install
```

