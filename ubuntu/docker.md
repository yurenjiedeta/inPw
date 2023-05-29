- docker的更改用户

```bash
$ sudo groupadd docker
$ sudo usermod -aG docker $USER

$ newgrp docker
$ docker run hello-world
```

