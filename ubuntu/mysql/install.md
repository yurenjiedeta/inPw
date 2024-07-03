- 卸载

```bash
$ sudo apt purge mysql-*
$ sudo rm -rf /etc/mysql/  /var/lib/mysql
$ sudo apt autoremove
$ sudo apt autoclean
# purge 完全删除
# remove 仅删除包，不会删除配置文件
```

- 安装

```bash
$ sudo apt-get install mysql-server -y  #mysql 服务器
# $ sudo apt-get install mysql-client -y  #mysql 客户端
# $ sudo apt-get install libmysqlclient-dev -y  #mysql 开发包
```

- 检查mysql服务是否成功启动

```bash
$ sudo netstat -tap | grep mysql
$ sudo service mysql status # ubuntu专用
```

- 启动

```bash
$ sudo service mysql start

# 若是出现问题，则执行下列命令
$ sudo servic mysql stop #先停止服务
$ sudo usermod -d /var/lib/mysql/ mysql #为 mysql 用户创建一个主目录
$ sudo service mysql start #然后启动
```

- 连接

```bash
$ mysql -uroot -pxxx #没空格，注意
```

- 首次安装问题

```bash
$ sudo cat /etc/mysql/debian.cnf # 找到 user 和 password ，使用它来进行登录

$ sudo mysql -udebian-sys-maint -pxxxxx
mysql>use mysql;
mysql>flush privileges;
mysql>Alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码'
mysql>flush privileges;
```

- 查看已有用户

```bash
$ use mysql;

select user,host from user; #查看user列表
create user '用户名'@'主机名' IDENTIFIED BY '密码';
```

- 开启远程访问

```bash
#方法一：
$ update user set host='%' where user='用户名' #该方法就是直接修改 mysql 数据库里的 user 表的 host 项，从 localhost 改为了 %
#方法二：
$ grant all privileges on *.* TO '用户名'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
#方法三：赋予某主机
$ grant all privileges on *.* TO '用户名'172.16.16.10'%' IDENTIFIED BY '密码' WITH GRANT OPTION;

#最后
$ FLUSH PRIVILEGES; # 刷新权限表使上述更改生效
```

- 可能遇到的问题

```bash
# 打开 mysqld.cnf
$ sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf

# 找到 bind-address=127.0.0.1这行，并注释掉
#bind-address=127.0.0.1

#最后重新mysql服务
$ sudo service mysql restart
```

