- web缓存，为了提高性能

| 配置块   | **名称**          | **名称**                                                     |
| -------- | ----------------- | ------------------------------------------------------------ |
| http     | proxy_cache_path  | 指定缓冲区的路径                                             |
|          | levels            | 缓存目录级最高三层，每层1-2个字符表示，比如：1:1:2 三层      |
|          | keys_zone         | 缓存块名称及内存块大小，比如：cache_item:500m表示声明一个名为cache_item大小为500m，超出大小后最早的被清除 |
|          | max_size          | 缓存区硬盘的最大值，超出闲置数据将被清除                     |
|          | inactive          | 最长闲置时间，比如：10d ，表示一个数据被闲置10天则将被清除   |
| location | proxy_cache       | 指定缓冲区，对应keys_zone中的设定的值                        |
|          | proxy_cache_key   | 通过参数拼装参数key如：h o s t hosthosturii s a r g s is_argsisargsargs 则会已全部md5值作为key |
|          | proxy_cache_valid | 对不同的状态码设置缓存有效期                                 |

- 配置示例

```nginx
http {
  .
  .
  .
  proxy_cache_path /cache/nginx levels=1:2 keys_zone=imooc_cache:10m max_size=5g inactive=60m use_temp_path=off;

  .
  .
  .
  server {
    .
    .
    .
    location /api/ {
      proxy_cache imooc_cache;
      proxy_pass http://www.blogs-s.com:8080/api/;
      proxy_cache_valid 200 304 12h;
      proxy_cache_valid any 10m;
      proxy_cache_key $host$uri$is_args$args;
      include proxy_params;
    }
  }
}

# 实用参考地址：https://www.yiibai.com/nginx/content-caching.html
```

