```bash
$ wget http://cdn01.foxitsoftware.com/pub/foxit/reader/desktop/linux/2.x/2.4/en_us/FoxitReader.enu.setup.2.4.4.0911.x64.run.tar.gz  # x64

$ wget http://cdn01.foxitsoftware.com/pub/foxit/reader/desktop/linux/2.x/2.4/en_us/FoxitReader.enu.setup.2.4.4.0910.x86.run.tar.gz  # x32

$ cd ~/Downloads

$ tar xzvf FoxitReader*.tar.gz

$ sudo chmod a+x FoxitReader*.run

$ sudo ./FoxitReader*.run
```

- foxit reader

- VMware Tools

```bash
# 卸载
$ sudo apt-get autoremove open-vm-tools

# 安装
$ sudo apt-get autoremove open-vm-tools

# 如果出错
$ sudo apt-get update
$ sudo apt-get install open-vm-tools-desktop fuse

# 最后重启
```

