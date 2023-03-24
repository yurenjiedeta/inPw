- 示例及说明

```nginx
split_clients "${remote_addr}AAA" $variant {
     #20.0% "backendv2";
     #* "backendv1";
    0.5%      .one
    0.2%      .two
    *		  ""
}

#IP地址加上AAA字符串会使用MurmurHash2转换成数字。得出的数字在前0.5%，那么$variant值为.one，相应的在0.5-2.0%区间的值为.two,其他的为空字符。

#split_clients指令
#语法：split_clients string $variable { ... }
#默认值:     —
#配置段:     http

#原始字符串的值经过MurmurHash2算法进行了哈希。 示例中，哈希值从0到21474835（0.5%）对应于变量$variant的".one"值， 哈希值从21474836到107374180（2%）对应于值".two"， 哈希值从107374181到4294967295对应于值""（一个空字符串）。


#特别说明
#原理是通过对"${http_user_agent}AAA" (这个是浏览器版本+字符串AAA的意思)使用MurmurHash2算法进行哈希.以值4294967295为界,如果"${http_user_agent}AAA"最终返回的哈希值位于4294967295的前75%,则该请求发给130，如果是后25%则发给133，可以参考http://www.ttlsa.com/nginx/nginx-ngx_http_split_clients_module/

```

