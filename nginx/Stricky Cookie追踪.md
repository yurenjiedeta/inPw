- 需要把下游的 cookie 传递给上游-----使用 Stricky cookie

```nginx
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    sticky cookie
        affinity
        expires=1h
        domain=.example.com
        httponly
        secure
        path=/;
}
# 在此⽰例中，cookie 名为affinity，为 example.com 设置，⼀⼩时后过期，不能在客⼾端使⽤，只能通过 HTTPS 发送，并且对所有路径都有效。

```

- 需要把下游的 cookie 传递给上游-----使用 Stricky learn

```nginx
upstream backend {
    server backend1.example.com:8080;
    server backend2.example.com:8081;
    sticky learn
        create=$upstream_cookie_cookiename
        lookup=$cookie_cookiename
        zone=client_sessions:2m;
}

# 此⽰例指⽰ NGINX 通过在响应标头中查找名为COOKIENAME的 cookie 来查找和跟踪会话，并通过在请求标头中查找相同的 cookie 来查找现有会话。此会话亲和性存储在 2 MB 的共享内存区域中，可以跟踪⼤约 16,000 个会话。常⽤的 cookie 名称，如jsessionid或phpsessionid，通常是在应⽤程序或应⽤程序服务器配置中设置的默认值。
```

- 精细把 cookie 送到上游------使用 Stricky 路由

```nginx
map $cookie_jsessionid $route_cookie {
 ~.+\.(?P<route>\w+)$ $route;
}
map $request_uri $route_uri {
 ~jsessionid=.+\.(?P<route>\w+)$ $route;
}
upstream backend {
 server backend1.example.com route=a;
 server backend2.example.com route=b;
 sticky route $route_cookie $route_uri;
}
```

