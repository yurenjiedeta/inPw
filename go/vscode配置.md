- 步骤

```tex
1、安装 Go 扩展；
2、Ctrl + Shift + P，输入 go:install/Update Tools ，把相应的都选择进行安装；
3、安装好依赖之后，Run --> Start Debugging 可以进行调试；
```
- vscode如果安装失败，则手动安装


```bash
$  go install -v golang.org/x/tools/gopls@latest
$  go install -v github.com/cweill/gotests/gotests@v1.6.0
$  go install -v github.com/fatih/gomodifytags@v1.16.0
$  go install -v github.com/josharian/impl@v1.1.0
$  go install -v github.com/haya14busa/goplay/cmd/goplay@v1.0.0
$  go install -v github.com/go-delve/delve/cmd/dlv@latest
$  go install -v honnef.co/go/tools/cmd/staticcheck@latest
```

