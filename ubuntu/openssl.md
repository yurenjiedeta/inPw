- openssl

```bash
# 使用随机功能来生成随机字符串
$ openssl rand -base64 10  # 10 和生成的输出长度有关

# 用SHA1算法计算文件 file.txt 的哈希值
$ openssl dgst -sha1 file.txt
$ openssl sha1 -out digest.txt file.txt  # 用 SHA1 算法计算文件 file.txt 的哈希值，输出到文件 digest.txt


```

