- 使用vm pro15安装win10

```js
/*
个性化 --> 主题 --> 桌面显示
*/
```

- win10去除搜索栏

```js
/*
任务栏右键 --> 搜索 --> 隐藏 --> 显示搜索图标
*/
```

- 设置共享

```js
/*
虚拟机 --> 重新安装 VMware Tools(如果没有出现，则进入到虚拟机内部的驱动器安装) --> 虚拟机 --> 设置 --> 选项 --> 共享文件夹 --> 总是启动&&在 Windows 客户机中映射为网络驱动器&&添加 --> 选择好对应的路径
*/
```

- nodejs全局设置---nvm切换版本后，相应的都会被删除，所以要重新设置

```js
/*
npm config set prefix ""
npm config set cache ""
生成的配置文件位于用户文件夹下的: .npmrc 文件
*/
```

- 导入导出

```tex
导出：选择虚拟机，文件--》导出为 OVF(E)；
导入：文件--》打开，选择 .ovf 文件类型。
```

- Windows11和VM 15的冲突设置

```tex
#Device Guard或Credential Guard与Workstation不兼容
第一步：
“win+ R“打开运行，输入gpedit.msc，确定打开 本地组策略编辑器 转到 本地计算机策略➡计算机配置➡管理模板➡系统➡Device Guard 打开 基于虚拟化的安全设置 为 “已禁用”；
第二步：
“win+ R“打开运行，输入services.msc，确定打开 本地服务➡找到HV主机服务➡启动类型设置 为 “禁用”；
第三步：
“ 控制面板” ➡ “ 卸载程序” ➡ “ 打开或关闭Windows功能” 以关闭 Hyper-V，选择不重启；
第四步：
通过命令关闭Hyper-V（控制面板关闭Hyper-V起不到决定性作用）“win+ x”,然后运行以管理员身份运行Windows Powershell (管理员)也可以选择“cmd” 以管理员身份运行
命令：bcdedit /set hypervisorlaunchtype off(auto)
```



