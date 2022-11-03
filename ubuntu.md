- ubuntu设置分辨率

```tex
1、运行：xrandr,显示出所有分辨率列表；
2、xrandr --size 1440x900，选择其中一个分辨率进行设置。
```

- 安装git

```bash
sudo apt-get install git-all
```

- 安装chrome

```bash
#open https://www.google.com/chrome/thank-you.html?installdataindex=empty&statcb=0&defaultbrowser=0&brand=YTUH
#下载 .deb 文件
#安装
sudo dpkg -i 包名
#打开
活动--》搜索chrome
```

- 打开终端快捷键

```
Ctrl + Alt + T
```

- 挂载vmware tools

```bash
虚拟机工具--》安装 VMWARE TOOLS
1、打开 CD 镜像，并解压到桌面；
2、到达解压目录，并运行：sudo ./vmware-install.pl;
3、安装 open-vm-tools:sudo apt install open-vm-tools*；
4、vmware-hgfsclient 可以出现挂载对应的文件夹；
5、创建目录并挂载：sudo mkdir /mnt/hgfs；
6、手动挂载：sudo vmhgfs-fuse .host:/VMshare /mnt/hgfs -o allow_other;
6-1、我的机器：sudo vmhgfs-fuse .host:/lf /home/lue/lf -o subtype=vmhgfs-fuse,allow_other;
7、自动挂载的方法：
打开 /etc/fstab，添加
.host:/ /mnt/hgfs fuse.vmhgfs-fuse auto,allow_other 0 0
```

