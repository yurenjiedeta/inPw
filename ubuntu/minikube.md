- minikube的过程

```bash
# https://minikube.sigs.k8s.io/docs/start/
$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
$ sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

- 其他的安装

```bash
# docker安装.md
```

- 其他运行

```bash
$ sudo usermod -aG docker $USER && newgrp docker
```

- kubectl

```bash
$ curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
$ curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
$ echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
$ sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
$ kubectl version --client
```

- minikube启动

```bash
$ minikube start --driver=docker # 运行的时候设置容器
$ minikube config set dirver docker #设置默认的容器
```

