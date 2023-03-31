- mysql的安装与配置

```bash
$ sudo apt-get install mysql-server mysql-client;
$ sudo apt install libmysqlclient-dev
# 由于首次安装完毕后，没有设置 root 的密码，因此，需要做下面的一些动作；
```

```bash
$ sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
# 打开该文件，并在最后添加一行数据
skip-grant-tables  # 免密码登录
# 重启 mysqy 
$ service mysql restart
$ mysql -u root -p
# 最后重置密码
$ mysql> use mysql;
$ mysql> flush privileges;
$ mysql> UPDATE user SET authentication_string='' WHERE user='root';
$ mysql> flush privileges;
$ mysql> Alter user 'root'@'localhost' IDENTIFIED BY '123456';
$ mysql> quit;

# 重启服务并登录 root
$ service mysql restart
$ mysql -u root -p
```

- 设置完毕后，show databases处问题处理

```bash
$ mysql> create user 'mysql.infoschema'@'%' identified by "密码";
$ mysql> grant all privileges on *.* to 'mysql.infoschema'@'%';
$ mysql> flush privileges;
$ mysql> show databases; # 最后就可以查看数据库了
```

