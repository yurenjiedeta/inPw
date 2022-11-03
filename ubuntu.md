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

- 安装nvm

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

#再设置文件(~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- ubuntu设置网络代理

```bash
clash --> General --> Allow LAN
ubuntu --> Setting --> 网络 --> 网络代理 --> 手动 --> HTTP 代理（HTTPS代理、Socks主机） --> 分别填写安装clash机器的 ip 地址 和 clash 的端口号
```

- ubuntu卸载软件

```bash
sudo apt-get --purge remove <programname>
```

- ubuntu安装GitHub Desktop

```bash
## Follow this link for further updates to Github Desktop for Ubuntu https://github.com/shiftkey/desktop/releases/latest
# UPDATE (2021-10-18): Thanks to Amin Yahyaabadi's message, the updated code is as follows

sudo wget https://github.com/shiftkey/desktop/releases/download/release-2.9.3-linux3/GitHubDesktop-linux-2.9.3-linux3.deb
### Uncomment below line if you have not installed gdebi-core before
# sudo apt-get install gdebi-core 
sudo gdebi GitHubDesktop-linux-2.9.3-linux3.deb

# UPDATE (2021-03-05): Thanks to PaoloRanzi81's comment, the updated code is as follows https://gist.github.com/PaoloRanzi81

#sudo wget https://github.com/shiftkey/desktop/releases/download/release-2.6.3-linux1/GitHubDesktop-linux-2.6.3-linux1.deb
### Uncomment below line if you have not installed gdebi-core before
# sudo apt-get install gdebi-core 
#sudo gdebi GitHubDesktop-linux-2.6.3-linux1.deb

## Initial post
#sudo wget https://github.com/shiftkey/desktop/releases/download/release-2.1.0-linux1/GitHubDesktop-linux-2.1.0-linux1.deb
#sudo gdebi GitHubDesktop-linux-2.1.0-linux1.deb
```