在MySQL 8中，MyISAM引擎使用表级锁定机制，这意味着在对表进行读写操作时会对整个表进行锁定，而不是行级锁定。这会导致在并发操作中出现较大的争用情况。

MyISAM表级锁的锁模式是表级读锁（READ）和表级写锁（WRITE）。当一个线程获取了写锁时，其他线程无法对表进行读或写操作。而当一个线程获取了读锁时，其他线程只能获取读锁，不能获取写锁。

获取MyISAM表级锁的争用情况在高并发环境下会比较严重，因为所有对表的操作都需要获取表级锁，而一旦有一个线程获取了写锁，其他线程必须等待该线程释放锁才能继续操作。

MyISAM表级锁的加锁方法是通过`LOCK TABLES`语句来实现。例如：
```
LOCK TABLES table_name READ;
```
或
```
LOCK TABLES table_name WRITE;
```

MyISAM的Concurrent Insert特性允许在表的同时进行插入操作和读取操作，这意味着在插入数据时，可以同时进行查询操作，但不能同时进行其他写操作。

优化MyISAM表级锁的建议包括：
1. 尽量减少长事务的存在，长事务会长时间占用锁资源。
2. 尽量使用`INSERT DELAYED`语句，它会将插入操作放入缓冲区，减少锁竞争。
3. 合理使用`LOCK TABLES`语句，尽量避免不必要的锁定。
4. 考虑将表转换为InnoDB引擎，InnoDB引擎支持行级锁，对于并发处理更友好。