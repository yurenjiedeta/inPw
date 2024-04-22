- ARG例子

```bash
# 设置一个名为 VERSION 的参数，并且指定默认值为 "latest"
ARG VERSION=latest

# 使用这个参数来指定基础镜像
FROM ubuntu:$VERSION

# 在容器中创建一个工作目录
WORKDIR /app

# 将参数值写入一个文件中
RUN echo "Version: $VERSION" > version.txt

docker build --build-arg VERSION=20.04 -t myapp .
```

