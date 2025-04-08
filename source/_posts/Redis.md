---
title: Redis
categories:
  - 技术栈
tags:
  - java
description: Redis
swiper_index: 2
abbrlink: bae4ff13
date: 2025-03-12 16:47:00
---

# Redis

[黑马点评1](https://www.notion.so/1-133d2775339a8027b65cf4a2fa4776a6?pvs=21)

[黑马点评2](https://www.notion.so/2-137d2775339a807eaf12c3684a75bee5?pvs=21)

[黑马点评3](https://www.notion.so/3-13dd2775339a80db9b7bfe8444b8a975?pvs=21)

[黑马点评4](https://www.notion.so/4-13dd2775339a80078852e9fb3d26d39a?pvs=21)

[https://redis.io/](https://redis.io/)

# NoSQL

Redis是一种键值型的NoSQL数据库

`NoSql`可以翻译做Not Only Sql（不仅仅是SQL），或者是No Sql（非Sql的）数据库。是相对于传统关系型数据库而言，有很大差异的一种特殊的数据库，因此也称之为`非关系型数据库`。

- **结构化与非结构化**

    传统关系型数据库是结构化数据，每张表在创建的时候都有严格的约束信息，如字段名、字段数据类型、字段约束等，插入的数据必须遵循这些约束。而NoSQL则对数据库格式没有约束，可以是键值型，也可以是文档型，甚至是图格式

- **关联与非关联**

    传统数据库的表与表之间往往存在关联，例如外键约束

    而非关系型数据库不存在关联关系，要维护关系要么靠代码中的业务逻辑，要么靠数据之间的耦合

    ![image.png](images/images/image.png)

- 事务

    传统关系型数据库能满足事务的ACID原则(原子性、一致性、独立性及持久性)，而非关系型数据库无法全部满足


常见的NoSQL数据库有：`Redis`、`MemCache`、`MongoDB`等

## SQL VS NoSQL

|  | SQL | NoSQL |
| --- | --- | --- |
| 数据结构 | 结构化 | 非结构化 |
| 数据关联 | 关联的 | 无关联的 |
| 查询方式 | SQL查询 | 非SQL |
| 事务特性 | ACID | BASE |
| 存储方式 | 磁盘 | 内存 |
| 扩展性 | 垂直 | 水平 |
| 使用场景 | 1）数据结构固定2）相关业务对数据安全性、一致性要求较高 | 1）数据结构不固定2）对一致性、安全性要求不高3）对性能要求高 |
- 存储方式
    - 关系型数据库基于磁盘进行存储，会有大量的磁盘IO，对性能有一定影响
    - 非关系型数据库，他们的操作更多的是依赖于内存来操作，内存的读写速度会非常快，性能自然会好一些
- 扩展性
    - 关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展。
    - 非关系型数据库可以将数据拆分，存储在不同机器上，可以保存海量数据，解决内存大小有限的问题。称为水平扩展。
    - 关系型数据库因为表之间存在关联关系，如果做水平扩展会给数据查询带来很多麻烦

# Redis VS MySQL

**Redis：**Remote Dictionary Server远程词典服务器

- **内存存储**：Redis 是一个基于**内存**的 **Key-Value** 数据库，主要将数据存储在内存中，读写速度非常快。其性能优势在于数据能够在几微秒内完成读写操作，因此适合对响应时间要求较高的场景。
- 单线程，每个命令具有原子性
- 低延迟，速度快(基于内存、IO多路复用、良好的编码)
- **持久化**：虽然 Redis 是内存数据库，但它支持将数据持久化到磁盘中以避免数据丢失。常见的持久化机制有 RDB 和 AOF。
- **数据类型丰富**：除了简单的字符串类型，Redis 还支持哈希、列表、集合、有序集合等数据结构，适合不同业务场景的数据操作。
- 支持主从集群、分片集群
- 支持多语言客户端
- **应用场景**：
    - **缓存**：用于存储热点数据，如热点商品、新闻、排行榜等，减少对数据库的压力。
    - **会话管理**：在分布式应用中，Redis 常用来存储用户会话信息。
    - **计数器和限流器**：由于 Redis 的高性能，常用来实现各类实时计数操作，如商品点击量统计。
    - **消息队列**：Redis 还可以用于实现简单的消息队列功能。

**MySQL：**

- **磁盘存储**：MySQL 是一个基于**磁盘**的关系型数据库，数据存储在磁盘中，并使用索引等机制来优化查询性能。
- **结构化数据**：MySQL 适合处理结构化的**二维表**数据，支持复杂的 SQL 查询，事务处理能力强，保证数据一致性。
- **持久化和事务性**：MySQL 的数据持久存储在磁盘上，即使服务器宕机，数据也能安全保存。同时，MySQL 支持 ACID 事务，确保数据操作的原子性和一致性。
- **应用场景**：
    - **结构化数据存储**：如用户信息、订单数据等需要通过关系表存储和查询的数据。
    - **事务处理**：MySQL 在复杂的事务处理中表现良好，适合需要高数据一致性的场景，如银行、财务等系统。

## 结合应用场景

- **缓存**：Redis 通常作为 MySQL 的缓存层，用于加速查询。MySQL 负责持久存储，而 Redis 则存储热点数据，减轻 MySQL 压力，提升系统的整体性能。
- **高并发场景**：对于短时间内大量访问的热点数据（如电商秒杀、新闻排行榜），将其存储在 Redis 中以提供更高效的读写性能。
- **企业广泛应用**：Redis 和 MySQL 的结合在现代互联网公司中非常常见，既保障了数据的持久性和一致性（通过 MySQL），又提供了高速缓存和高并发处理能力（通过 Redis）。

这种组合能够很好地满足企业级应用中对高并发处理和数据持久化的不同需求。

中文文档：[Redis 教程_redis教程](https://www.redis.net.cn/tutorial/3501.html)

# 使用

## windows安装

![image.png](images/image%201.png)

在redis安装目录下打开cmd

启动：输入redis-server.exe redis.windows.conf

停止：Ctrl+C

客户端连接：再次在redis安装目录下打开cmd，输入redis-cli.exe

默认连接6379

![image.png](images/images/image%202.png)

更改连接地址

![image.png](images/images/image%203.png)

设置密码：删除注释，requirepass顶格，修改foobared为密码

![image.png](images/images/image%204.png)

redis-cli.exe -h localhost -p 6379 -a 123456

可视化界面连接

![image.png](images/image%205.png)

## Linux安装

sudo apt update
sudo apt install -y gcc tcl

下载redis-6.2.6.tar.gz

**`cd`到`/usr/local/src`目录执行以下命令进行解压操作**

```
tar -xzf redis-6.2.6.tar.gz
```

**解压成功后依次执行以下命令**

```
cd redis-6.2.6
make
make install
```

![image.png](images/image%206.png)

### 启动redis

- 前台启动【不推荐】：会阻塞整个会话窗口，窗口关闭或者按下`CTRL + C`则Redis停止。不推荐使用。

    **安装完成后，在任意目录输入`redis-server`命令即可启动Redis**

- 后台启动【不推荐】：必须修改Redis配置文件，配置文件所在目录就是之前我们解压的安装包下
    - 因为我们要修改配置文件，因此我们需要先将原文件备份一份

        ```bash
        cd /usr/local/src/redis-6.2.6
        ```

        ```bash
        cp redis.conf redis.conf.bck
        ```

    - 然后修改`redis.conf`文件中的一些配置

        ```bash
        # 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0bind 0.0.0.0
        # 守护进程，修改为yes后即可后台运行
        daemonize yes
        # 密码，设置后访问Redis必须输入密码
        requirepass 123456
        ```

    - Redis其他常用配置

        ```bash
        # 监听的端口
        port 6379
        # 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
        dir .
        # 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
        databases 1
        # 设置redis能够使用的最大内存
        maxmemory 512mb
        # 日志文件，默认为空，不记录日志，可以指定日志文件名
        logfile "redis.log"
        ```

    - **启动Redis**

        ```bash
        # 进入redis安装目录cd /usr/local/src/redis-6.2.6
        # 启动
        redis-server redis.conf
        ```

    - **停止Redis服务**

        ```bash
        通过 ps -ef | grep redis查询pid
        # 通过kill命令直接杀死进程kill -9 redis进程ids
        ```

        ```bash
        # 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，# 因为之前配置了密码，因此需要通过 -a 来指定密码
        redis-cli -a 132537 shutdown
        ```

- **开机自启【推荐】**

    通过配置来实现开机自启

    - 首先，新建一个系统服务文件

        ```bash
        vi /etc/systemd/system/redis.service
        ```

    - 将以下命令粘贴进去

        ```bash
        [Unit]
        Description=redis-server
        After=network.target

        [Service]
        // Type=forking 不知道为什么这行不删掉启动超时
        ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
        PrivateTmp=true

        [Install]
        WantedBy=multi-user.target
        ```

    - 然后重载系统服务

        ```bash
        systemctl daemon-reload
        ```

    - 现在，我们可以用下面这组命令来操作redis了

        ```bash
        # 启动
        systemctl start redis
        # 停止
        systemctl stop redis
        # 重启
        systemctl restart redis
        # 查看状态
        systemctl status redis
        ```

    - 执行下面的命令，可以让redis开机自启

        ```bash
        systemctl enable redis
        ```


# 数据类型

**Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样**

![image-20220524205926164.png](images/image-20220524205926164.png)

![701cbe108e6e43bebf491be26887bf55.png](701cbe108e6e43bebf491be26887bf55.png)

![image.png](images/image%207.png)

- hash 适合存储对象
- list 按照插入顺序排序，可以有重复元素 eg.朋友圈点赞列表
- set 无序集合，没有重复元素 eg.qq共同好友
- sorted set 有序集合，没有重复元素eg.排行榜

### **Key结构**

- Redis没有类似MySQL中Table的概念，那么我们该如何区分不同类型的Key呢？
- 例如：需要存储用户、商品信息到Redis，有一个用户的id是1，有一个商品的id恰好也是1，如果此时使用id作为key，那么就回冲突，该怎么办？
- 我们可以通过给key添加前缀加以区分，不过这个前缀不是随便加的，有一定的规范
    - Redis的key允许有多个单词形成层级结构，多个单词之间用`:`隔开，格式如下`项目名:业务名:类型:id`
    - 这个格式也并非是固定的，可以根据自己的需求来删除/添加词条，这样我们就可以把不同数据类型的数据区分开了，从而避免了key的冲突问题
    - 例如我们的项目名叫reggie，有user和dish两种不同类型的数据，我们可以这样定义key
        - user相关的key：`reggie:user:1`
        - dish相关的key：`reggie:dish:1`
- 如果value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储


    | KEY | VALUE |
    | --- | --- |
    | reggie:user:1 | {“id”:1, “name”: “Jack”, “age”: 21} |
    | reggie:dish:1 | {“id”:1, “name”: “鲟鱼火锅”, “price”: 4999} |
- 并且在Redis的桌面客户端中，也会以相同前缀作为层次结构，让数据看起来层次分明，关系清晰

### 1. **String（字符串）**

- **描述**：Redis 中最基本的数据类型，每个键都对应一个字符串类型的值。可以是文本或二进制数据（如图片、视频等）。

    value是字符串，不过根据字符串的格式不同，又可以分为3类

    - `string`：普通字符串
    - `int`：整数类型，可以做自增、自减操作
    - `float`：浮点类型，可以做自增、自减操作不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同，字符串类型的最大空间不能超过512M

    | 命令 | 描述 |
    | --- | --- |
    | SET | 添加或者修改一个已经存在的String类型的键值对 |
    | GET | 根据key获取String类型的value |
    | MEST | 批量添加多个String类型的键值对 |
    | MGET | 根据多个key获取多个String类型的value |
    | INCR | 让一个整型的key自增1，适用于计数器 |
    | INCRBY | 让一个整形的key自增并指定步长值，例如：incrby num 2，让num值自增2 |
    | INCRBYFLOAT | 让一个浮点类型的数字自增并指定步长值 |
    | `SET key seconds value` | 设置键 `key` 对应的值为 `value` ，并将key的过期时间设为seconds秒。eg.验证码过期 |
    | `SETNX key value` | 添加一个String类型的键值对，前提是这个key不存在，否则不执行，可以理解为真正的新增。eg.分布式锁 |
    | `SETEX key seconds value` | 添加一个String类型的键值对，并指定有效期（s），一旦时间到了，Redis 会自动删除该键。 |
    | APPEND | 在键 `key` 的值后追加内容 |
- **应用场景**：
    - **缓存对象的简单属性**：如用户的登录状态、验证码、单个配置项。
    - **计数器**：用户浏览次数、点赞数等。

更多命令：[Redis 字符串(String)_redis教程](https://www.redis.net.cn/tutorial/3508.html)

```java
127.0.0.1:6379> set name xiaoming
OK
127.0.0.1:6379> get name
"xiaoming"
127.0.0.1:6379> get age
(nil)
127.0.0.1:6379> set age 20
OK
127.0.0.1:6379> get age
"20"
127.0.0.1:6379> set age 30
OK
127.0.0.1:6379> get age
"30"
127.0.0.1:6379> setex city 10 beijing
OK
127.0.0.1:6379> get city
"beijing"
127.0.0.1:6379> get city
(nil)
127.0.0.1:6379> setnx k1 v1
(integer) 1
127.0.0.1:6379> setnx k1 v2
(integer) 0
127.0.0.1:6379> get k1
"v1"
```

set命令会转成字符串存储

### 2. **Hash（哈希）**

- **描述**：也叫散列，其中value是一个无序字典，类似于Java中的HashMap结构。适用于存储对象，类似于一个小型的键值对集合。一个键对应一个哈希表，可以存储多个字段和字段值

    ![image.png](images/image%208.png)

    String结构是将对象序列化为JSON字符串后存储，当我们要修改对象的某个属性值的时候很不方便

    Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD

    ![image.png](images/image%209.png)

    | 命令 | 描述 |
    | --- | --- |
    | HSET key field value | 添加或者修改hash类型key的field的值 |
    | HGET key field | 获取一个hash类型key的field的值 |
    | HDEL key field | 删除指定字段 |
    | HMSET | 批量添加多个hash类型key的field的值 |
    | HMGET | 批量获取多个hash类型key的field的值 |
    | HGETALL | 获取一个hash类型的key中的所有的field和value |
    | HKEYS key | 获取一个hash类型的key中的所有的字段 |
    | HVALS key | 获取一个hash类型的key中的所有的值 |
    | HINCRBY | 让一个hash类型key的字段值自增并指定步长 |
    | HSETNX | 添加一个hash类型的key的field值，前提是这个field不存在，否则不执行 |
    | HGETALL key | 获取一个hash类型的key中的所有的字段和值 |
- **应用场景**：
    - **存储用户信息**：如用户的基本资料（姓名、年龄、地址等），将用户的各个属性存储为哈希表的字段。

```java
127.0.0.1:6379> hset 001 name xiaoming
(integer) 1
127.0.0.1:6379> hset 001 age 20
(integer) 1
127.0.0.1:6379> hget 001 name
"xiaoming"
127.0.0.1:6379> hget 001 age
"20"
127.0.0.1:6379> hdel 001 age
(integer) 1
127.0.0.1:6379> hget 001 age
(nil)
127.0.0.1:6379> hkeys 001
1) "name"
127.0.0.1:6379> hset 001 age 30
(integer) 1
127.0.0.1:6379> hkeys 001
1) "name"
2) "age"
127.0.0.1:6379> hvals 001
1) "xiaoming"
2) "30"
127.0.0.1:6379> hgetall 001
1) "name"
2) "xiaoming"
3) "age"
4) "30"
```

### 3. **List（列表）**

- **描述**：列表类型是**有序**的字符串集合，可以包含**重复**元素。列表中的元素按照插入顺序排序。支持从两端插入或删除元素。与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

    ![image.png](images/image%2010.png)

    - 特征也与LinkedList类似：
        - 有序
        - 元素可以重复
        - 插入和删除快
        - 查询速度一般

    常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。

    | 命令 | 描述 |
    | --- | --- |
    | LPUSH key value1 … | 向列表左侧插入一个或多个元素 |
    | RPUSH key value1 … | 向列表右侧插入一个或多个元素 |
    | LPOP key | 移除并返回列表左侧的第一个元素，没有则返回nil |
    | RPOP key | 移除并返回列表右侧的第一个元素 |
    | LLEN key | 获取列表长度 |
    | LRANGE key star end | 返回一段角标范围内的所有元素。 lrange list 0 -1返回所有元素 |
    | BLPOP和BRPOP | 与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil |
    | BRPOP key1 [key2] timeout | 移出并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止 |

    如何利用List结构模拟一个栈?
    入口和出口在同一边

    如何利用List结构模拟一个队列?
    入口和出口在不同边

    如何利用List结构模拟一个阻塞队列?
    入口和出口在不同边
    出队时采用BLPOP或BRPOP

- **应用场景**：适合存储按时间顺序排列的数据
    - **消息队列**：利用 `LPUSH` 和 `RPOP` 可以实现先进先出的消息队列。
    - **朋友圈点赞列表**：按时间顺序存储点赞用户的列表。
    - **评论区**

```java
127.0.0.1:6379> lpush list a b c
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> lpush list zhang
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "zhang"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> lpush list a
(integer) 5
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "zhang"
3) "c"
4) "b"
5) "a"
127.0.0.1:6379> rpop list
"a"
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "zhang"
3) "c"
4) "b"
127.0.0.1:6379> llen list
(integer) 4
127.0.0.1:6379> brpop list 10
1) "list"
2) "b"
127.0.0.1:6379> brpop list 10
1) "list"
2) "c"
127.0.0.1:6379> brpop list 10
1) "list"
2) "zhang"
127.0.0.1:6379> brpop list 10
1) "list"
2) "a"
127.0.0.1:6379> lrange list 0 -1
(empty list or set)
127.0.0.1:6379> brpop list 10
(nil)
(10.04s)
```

`0 -1`：这些参数指定了要检索的元素的范围，从索引 0 开始到索引 `-1` 结束（`-1` 在 Redis 中表示列表的最后一个元素）

`lpush` 命令会将元素添加到列表的头部，所以最后插入的元素 `c` 会成为列表的第一个元素（索引 0），而 `a` 会成为最后一个元素。

brpop*移除并获取列表 "list" 的最后一个元素，如果列表为空，则等待 10 秒，*如果操作成功，`BRPOP` 返回一个包含两个元素的数组：第一个元素是被移除的元素，第二个元素是它所属的列表的键名。

### 4. **Set（集合）**

- **描述**：**无序**集合，集合中的元素是**唯一**的，不能重复。通过**哈希表**实现，所以查找、插入、删除操作的时间复杂度都是 O(1)。

    ![image.png](images/image%2011.png)

    与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征：

    - 无序
    - 元素不可重复
    - 查找快
    - 支持交集、并集、差集等功能

    | 命令 | 描述 |
    | --- | --- |
    | SADD key member … | 向set中添加一个或多个元素 |
    | SREM key member … | 移除set中的指定元素 |
    | SCARD key | 返回set中元素的个数 |
    | SISMEMBER key member | 判断一个元素是否存在于set中 |
    | SMEMBERS key | 获取key中的所有元素 |
    | SINTER key1 key2 … | 求key1与key2的交集 |
    | SUNION key1 key2 … | 求key1与key2的并集 |
    | SDIFF key1 key2 … | 求key1与key2的差集 |
- **应用场景**：
    - **共同好友**：存储用户的好友列表，可以很方便地取两个用户的共同好友。
    - **标签系统**：存储用户的兴趣标签，方便进行交集和并集的操作。

```java
127.0.0.1:6379> sadd set a b c d
(integer) 4
127.0.0.1:6379> smembers set
1) "c"
2) "b"
3) "a"
4) "d"
127.0.0.1:6379> sadd set a d
(integer) 0
127.0.0.1:6379> smembers set
1) "a"
2) "d"
3) "b"
4) "c"
127.0.0.1:6379> scard set
(integer) 4
127.0.0.1:6379> sadd s a d s o
(integer) 4
127.0.0.1:6379> smembers s
1) "a"
2) "o"
3) "s"
4) "d"
127.0.0.1:6379> sinter set s
1) "a"
2) "d"
127.0.0.1:6379> sunion set s
1) "b"
2) "c"
3) "a"
4) "d"
5) "s"
6) "o"
127.0.0.1:6379> sdiff set s
1) "c"
2) "b"
127.0.0.1:6379> sdiff s set
1) "s"
2) "o"
127.0.0.1:6379> srem s a b c d
(integer) 2
127.0.0.1:6379> smembers s
1) "o"
2) "s"
```

### 5. **Sorted Set（有序集合）**

- **描述**：是一个可排序的set集合，与集合类似，元素也是**唯一**的，但每个元素都会关联一个double类型的分数（score），Redis 会根据分数从小到大自动排序。元素不能重复，但分数可以相同。与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。

    ![image.png](images/image%2012.png)

    - 可排序
    - 元素不重复
    - 查询速度快

    | 命令 | 描述 |
    | --- | --- |
    | ZADD key score member1… | 添加一个或多个元素到sorted set ，如果已经存在则更新其score值 |
    | ZREM key member | 删除sorted set中的一个指定元素 |
    | ZSCORE key member | 获取sorted set中的指定元素的score值 |
    | ZRANK key member | 获取sorted set 中的指定元素的排名 |
    | ZCARD key | 获取sorted set中的元素个数 |
    | ZCOUNT key min max | 统计score值在给定范围内的所有元素的个数 |
    | ZINCRBY key increment member | 让sorted set中的指定元素自增，步长为指定的increment值 |
    | ZRANGE key min max | 按照score排序后，获取指定排名范围内的元素 |
    | ZRANGEBYSCORE key min max | 按照score排序后，获取指定score范围内的元素 |
    | ZDIFF、ZINTER、ZUNION | 求差集、交集、并集 |

    注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可，例如：

    - `升序`获取sorted set 中的指定元素的排名：ZRANK key member
    - `降序`获取sorted set 中的指定元素的排名：ZREVRANK key memeber
- **应用场景**：
    - **排行榜**：如游戏中的积分排行榜，用户的分数决定排名。
    - **延时队列**：通过分数来表示任务的执行时间，按时间顺序执行任务。

按value排序

```java
127.0.0.1:6379> zadd sset 10.0 a 9.0 b
(integer) 2
127.0.0.1:6379> zrange sset 0 -1
1) "b"
2) "a"
127.0.0.1:6379> zadd sset 9.5 c
(integer) 1
127.0.0.1:6379> zrange sset 0 -1
1) "b"
2) "c"
3) "a"
127.0.0.1:6379> zrange sset 0 -1 withscores
1) "b"
2) "9"
3) "c"
4) "9.5"
5) "a"
6) "10"
127.0.0.1:6379> zincrby sset 20 b
"29"
127.0.0.1:6379> zrange sset 0 -1
1) "c"
2) "a"
3) "b"
127.0.0.1:6379> zrem sset b
(integer) 1
127.0.0.1:6379> zrange sset 0 -1
1) "c"
2) "a"
```

### **通用命令**

| **指令** | **描述** |
| --- | --- |
| KEYS | 查看符合模板的所有key，不建议在生产环境设备上使用，因为Redis是单线程的，执行查询的时候会阻塞其他命令，当数据量很大的时候，使用KEYS进行模糊查询，效率很差 |
| DEL | 删除一个或多个指定的key |
| EXISTS | 判断key是否存在，1在0不在 |
| EXPIRE | 给一个key设置有效期，有效期到期时该key会被自动删除，s单位 |
| TTL | 查看一个KEY的剩余有效期，s单位，若未设置有效期返回-1 |
| TYPE | 返回key所存储的值的类型 |

可以通过`help [command]` 可以查看一个命令的具体用法！

```java
127.0.0.1:6379> keys *
1) "001"
2) "sset"
3) "name"
4) "k1"
5) "set"
6) "age"
7) "s"
127.0.0.1:6379> exists name
(integer) 1
127.0.0.1:6379> exists aaa
(integer) 0
127.0.0.1:6379> type name
string
127.0.0.1:6379> type set
set
127.0.0.1:6379> type sset
zset
127.0.0.1:6379> ttl name
(integer) -1
127.0.0.1:6379> setex test 100 zhang
OK
127.0.0.1:6379> ttl test
(integer) 97
127.0.0.1:6379> del test
(integer) 1
```

### Redis 应用广泛的原因：

1. **高性能**：Redis 基于内存存储，具有极高的读写性能，适合存储和访问热点数据。
2. **多种数据结构**：支持丰富的数据类型，能够处理多种业务场景。
3. **简单易用**：Redis 提供的命令十分直观，可以快速上手。
4. **持久化**：虽然 Redis 是内存数据库，但它提供了多种持久化选项以保证数据的安全性。
5. **企业应用场景**：
    - 高并发情况下的数据缓存（如商品、新闻、排行榜等）。
    - 实时统计和计数功能。
    - 用户会话管理和社交功能中的好友关系处理等。

# **在 Java 中操作 Redis**

目前主流的Redis的Java客户端有三种

- Jedis和Lettuce：这两个主要是提供了Redis命令对应的API，方便我们操作Redis，而SpringDataRedis又对这两种做了抽象和封装，因此我们后期会直接以SpringDataRedis来学习。
- Redisson：是在Redis基础上实现了分布式的可伸缩的java数据结构，例如Map、Queue等，而且支持跨进程的同步机制：Lock、Semaphore等待，比较适合用来实现特殊的功能需求。

Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在Spring Boot项目中还提供了对应的Starter，即
spring-boot-starter-data-redis

在 Java 中操作 Redis 时，**Jedis** 和 **Spring Data Redis** 是两种常用的库，它们各有优缺点。以下是它们的比较和使用场景：

- **选择**：
    - 如果你需要一个简单的、直接的 Redis 客户端，Jedis 是一个不错的选择。
    - 如果你的应用程序已经使用 Spring，或者你需要更多的功能和集成，Spring Data Redis 将是更好的选择。

## [**Jedis**](https://so.csdn.net/so/search?q=Jedis&spm=1001.2101.3001.7020)

- **概述**：
    - Jedis 是一个简单的、直观的 Redis 客户端库，提供了基本的 Redis 操作API。
    - 它是一个轻量级的库，适合直接与 Redis 交互。
- **优点**：
    - **简单易用**：Jedis 的 API 设计简单，容易上手。
    - **直接控制**：开发者可以直接使用 Redis 命令，提供了较高的灵活性。
- **缺点**：
    - **管理连接**：需要手动管理 Redis 连接，可能会导致连接池管理和性能问题。
    - **缺少集成**：与 Spring 的集成不如 Spring Data Redis 方便。

Maven 坐标：

```
<!--jedis-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.7.0</version>
</dependency>
<!--单元测试-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```

注意，运行前要先启动 Redis

使用：

```java

public class JedisTest {
	private Jedis jedis;

	@BeforeEach
	void setUp() {
		// 1. 建立连接
		jedis = new Jedis("192.168.40.128", 6379);
		// 2. 设置密码
		// jedis.auth("123456");
		// 3. 选择库
		jedis.select(0);
	}

	@Test
	void testString() {
		String res = jedis.set("name", "lr");
		System.out.println(res);

		String name = jedis.get("name");
		System.out.println(name);
	}

	@AfterEach
	void testDowm() {
		if (jedis != null) {
			jedis.close();
		}
	}

	@Test
	void testHash() {
		jedis.hset("user:1", "name", "Jack");
		jedis.hset("user:1", "age", "17");
		jedis.hset("user:2", "name", "Rose");
		Map<String, String> map = jedis.hgetAll("user:1");
		System.out.println(map);
	}
}
```

- `Jedis`本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们推荐大家使用Jedis连接池代替Jedis的直连方式。
- 新建一个`util`，用于存放我们编写的工具类

    ```java
    public class JedisConnectionFactory {
    	private static final JedisPool jedisPool;

    	static {
    		// 配置连接池
    		JedisPoolConfig poolConfig = new JedisPoolConfig();
    		// 最大连接
    		poolConfig.setMaxTotal(8);
    		// 最大空闲连接
    		poolConfig.setMaxIdle(8);
    		// 最小空闲连接
    		poolConfig.setMinIdle(0);
    		// 设置最长等待时间，ms
    		poolConfig.setMaxWaitMillis(200);
    		// 创建连接池对象
    		jedisPool = new JedisPool(poolConfig, "192.168.40.128", 6379, 1000); // host,port,timeout,[password]
    	}

    	public static Jedis getJedis() {
    		return jedisPool.getResource();
    	}
    }

    		jedis = JedisConnectionFactory.getJedis();
    ```

- 但后面我们使用`SpringDataRedis`的时候，可以直接在`yml`配置文件里配置这些内容

## **Spring Data Redis**

[https://spring.io/projects/spring-data-redis](https://spring.io/projects/spring-data-redis)

- **概述**：
    - Spring Data Redis 是一个用于 Spring 应用程序的 Redis 数据访问库，提供了更高级别的抽象和 Spring 生态系统的集成。
- **优点**：
    - **易于集成**：与 Spring 框架无缝集成，支持 Spring 的注解和依赖注入。
    - **自动化管理**：提供了对连接池的管理，简化了 Redis 连接的创建和管理。
    - **高级特性**：支持 Redis 的许多高级特性，如事务、发布/订阅、消息队列、哨兵、集群等
    - 提供了对不同Redis客户端的整合（Lettuce和Jedis）
    - 提供了RedisTemplate统一API来操作Redis
    - 支持基于Lettuce的响应式编程
    - 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
    - 支持基于Redis的JDKCollection实现

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

| API | 返回值类型 | 说明 |
| --- | --- | --- |
| redisTemplate.opsForValue() | ValueOperations | 操作String类型数据 |
| redisTemplate.opsForHash() | HashOperations | 操作Hash类型数据 |
| redisTemplate.opsForList() | ListOperations | 操作List类型数据 |
| redisTemplate.opsForSet() | SetOperations | 操作Set类型数据 |
| redisTemplate.opsForzSet() | ZSetOperations | 操作SortedSet类型数据 |
| redisTemplate |  | 通用的命令 |

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void setValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
```

### 操作步骤：

- 导入Spring Data Redis 的maven坐标
- 配置Redis数据源
- 编写配置类，创建RedisTemplate对象
- 通过RedisTemplate对象操作Redis

### **1. 导入依赖**

Maven 坐标：

```xml
<!--redis依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--common-pool-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
<!--Jackson依赖-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
<!--lombok-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### **2. application.yml**

```java
spring:
  data:
    redis:
      host: 192.168.40.128
      port: 6379
      #      password: '123456'
      database: 1
      jedis:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
          max-wait: 100ms
```

### 3. 编写配置类，创建RedisTemplate对象

```java
package com.sky.config;
@Configuration
@Slf4j
public class RedisConfiguration {
	@Bean
	public RedisTemplate redisTemplate (RedisConnectionFactory redisConnectionFactory) {
		log.info("开始创建redis模板对象");
		// 是 Spring Data Redis 提供的核心类，用于对 Redis 进行各种操作
		RedisTemplate redisTemplate = new RedisTemplate();
		// 设置 Redis 的连接工厂，用来与 Redis 服务器建立连接
		redisTemplate.setConnectionFactory(redisConnectionFactory);
		// 将 Redis 的 key 设置为字符串序列化，这样所有 key 会以可读的字符串形式存储。
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		return redisTemplate;
	}
}
```

### **RedisTemplate 的序列化器设置**

RedisTemplate可以接收任意Object作为值写入Redis

只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果\xAC\xED\x00\x05t\x00\x06\xE5\xBC\xA0\xE4\xB8\x89

缺点：

- 可读性差
- 内存占用较大

在Spring Data Redis中，`RedisTemplate` 是一个核心组件，用于操作Redis数据库。默认情况下，`RedisTemplate` 使用 `JdkSerializationRedisSerializer` 作为其键（Key）的序列化器，这意味着键将使用Java标准序列化机制进行序列化。

当您执行如下操作：

```java
redisTemplate.opsForValue().set("city123", "beijing");
```

键 `"city123"` 将被序列化为一个二进制形式，如在Redis命令行中通过 `keys *` 命令看到的那样。

为了避免使用Java标准序列化，您可以通过自定义 `RedisTemplate` 的序列化器来更改这一行为。通常，对于值（Value），不需要更改序列化器，因为从Redis中获取时将自动进行反序列化。

1. 默认行为

    `RedisTemplate` 默认使用 `JdkSerializationRedisSerializer` 来序列化键。这意味着键会被序列化为二进制格式，可能不利于可读性和调试。

2. 自定义序列化器

    通过将键序列化器设置为 `StringRedisSerializer`，你可以确保所有的键都以字符串形式存储和读取。这提高了可读性，并且使得在使用 Redis CLI 或其他工具时，更容易查看和管理数据。

    ```java
    @Configuration
    public class RedisConfig extends CachingConfigurerSupport {
        @Bean
        public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
            RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

            // 设置键的序列化器
            redisTemplate.setKeySerializer(new StringRedisSerializer());
            redisTemplate.setHashKeySerializer(new StringRedisSerializer());

            // 设置连接工厂
            redisTemplate.setConnectionFactory(connectionFactory);

            return redisTemplate;
        }
    }
    ```

3. 值的序列化器

    对于值的序列化，通常你可以保持默认设置，因为当你从 Redis 中获取值时，它会自动反序列化为 Java 对象。你可以根据需求更改值的序列化器，例如使用 `Jackson2JsonRedisSerializer` 以便将对象序列化为 JSON 格式：

    ```java
    @Configuration
    @Slf4j
    public class RedisConfiguration {
    	@Bean
    	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
    		RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

    		// 键的序列化器
    		redisTemplate.setKeySerializer(new StringRedisSerializer());
    		redisTemplate.setHashKeySerializer(new StringRedisSerializer());

    		// 值的序列化器
    		GenericJackson2JsonRedisSerializer jsonRedisSerializer =
    				new GenericJackson2JsonRedisSerializer();
    		redisTemplate.setValueSerializer(jsonRedisSerializer);
    		redisTemplate.setHashValueSerializer(jsonRedisSerializer);

    		redisTemplate.setConnectionFactory(connectionFactory);

    		return redisTemplate;
    	}
    }
    ```


### 4. 通过RedisTemplate对象操作Redis

Spring Data Redis中提供了一个高度封装的类：RedisTemplate，针对jedis客户端中大量api进行了归类封装，将同一类型操作封装为operation接口，具体分类如下:

- **ValueOperations**：用于操作字符串类型的数据。
- **HashOperations**：用于操作哈希类型的数据（键值对）。
- **ListOperations**：用于操作列表类型的数据。
- **SetOperations**：用于操作集合类型的数据。
- **ZSetOperations**：用于操作有序集合类型的数据。

```java
package com.sky.test;
@SpringBootTest
// 启动整个 Spring 应用上下文，模拟一个真实的 Spring 环境，用于集成测试
public class SpringDataRedisTest {
	@Autowired
	private RedisTemplate redisTemplate;

	@Test
	public void testRedisTemplate() {
		System.out.println(redisTemplate); // 非null证明连接成功
	}

	// 操作字符串类型的数据
	@Test
	public void testString() {
		ValueOperations valueOperations = redisTemplate.opsForValue();
		// set
		valueOperations.set("username", "lr");
		// get
		String username = (String) valueOperations.get("username");
		System.out.println(username);
		// del
		redisTemplate.delete("username");
		// setex
		valueOperations.set("code", "1234", 3, TimeUnit.MINUTES);
		// setnx
		valueOperations.setIfAbsent("lock", "1");
		valueOperations.setIfAbsent("lock", "2"); // fale
	}

	// 操作哈希类型的数据
	@Test
	public void testHash() {
		HashOperations hashOperations = redisTemplate.opsForHash();
		// hset
		hashOperations.put("k1", "name", "lr");
		hashOperations.put("k2", "age", "20");
		// hget
		String age = (String) hashOperations.get("k1", "name");
		System.out.println(age); // lr
		// hkeys 用set集合
		Set keys = hashOperations.keys("k1");
		System.out.println(keys); // [name]
		// hvals 用list集合
		List values = hashOperations.values("k1");
		System.out.println(values); // [lr]
		// hdel
		hashOperations.delete("k1", "name");
	}

	// 操作列表类型的数据
	@Test
	public void testList() {
		ListOperations listOperations = redisTemplate.opsForList();
		// lpush
		listOperations.leftPushAll("mylist", "a", "b", "c");
		listOperations.leftPush("mylist", "d");
		// lrange
		List mylist = listOperations.range("mylist", 0, -1);
		System.out.println(mylist);
		// rpop
		listOperations.rightPop("mylist");
		// llen
		Long size = listOperations.size("mylist");
		System.out.println(size);
	}

	// 操作列表类型的数据
	@Test
	public void testSet() {
		SetOperations setOperations = redisTemplate.opsForSet();
		// sadd
		setOperations.add("set1", "a", "b", "c", "d");
		setOperations.add("set2", "a", "b", "x", "y");
		// smembers
		Set set1 = setOperations.members("set1");
		System.out.println(set1);
		// scard
		Long size = setOperations.size("set1");
		System.out.println(size);
		// sinter
		Set intersect = setOperations.intersect("set1", "set2");
		System.out.println(intersect);
		// sunion
		Set union = setOperations.union("set1", "set2");
		System.out.println(union);
		// srem
		setOperations.remove("set1", "b", "c");
	}

	// 操作有序集合类型的数据
	@Test
	public void testZset() {
		ZSetOperations zSetOperations = redisTemplate.opsForZSet();
		// zadd
		zSetOperations.add("zset1", "a", 10);
		zSetOperations.add("zset1", "b", 12);
		zSetOperations.add("zset1", "c", 9);
		// zrange
		Set zset = zSetOperations.range("zset1", 0, -1);
		System.out.println(zset);
		// zincrby
		zSetOperations.incrementScore("zset1", "c", 10);
		// zrem
		zSetOperations.remove("zset1", "a", "b");
	}

	@Test
	public void testUser() { // 定义一个User类，name，age
		redisTemplate.opsForValue().set("user:10", new User("lr", 45));
		User o = (User) redisTemplate.opsForValue().get("user:10");
		System.out.println(o);
	}

	// 通用命令操作
	@Test
	public void testCommon() {
		// keys
		Set keys = redisTemplate.keys("*");
		System.out.println(keys);
		// exists
		Boolean name = redisTemplate.hasKey("name");
		Boolean set1 = redisTemplate.hasKey("set1");
		// type
		for (Object key : keys) {
			DataType type = redisTemplate.type(key);
			System.out.println(type.name());
		}
		// del
		redisTemplate.delete("mylist");
	}
}
```

## **StringRedisTemplate**

![image.png](images/image%2013.png)

- 为了节省内存空间，我们可以不使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

    ![image.png](images/image%2014.png)

- 因为存入和读取时的序列化及反序列化都是我们自己实现的，SpringDataRedis就不会将class信息写入Redis了
- 这种用法比较普遍，因此SpringDataRedis就提供了RedisTemplate的子类：StringRedisTemplate，它的key和value的序列化方式默认就是String方式。

    ```java
    StringRedisTemplate源码：
    public class StringRedisTemplate extends RedisTemplate<String, String> {
      public StringRedisTemplate() {
          this.setKeySerializer(RedisSerializer.string());
          this.setValueSerializer(RedisSerializer.string());
          this.setHashKeySerializer(RedisSerializer.string());
          this.setHashValueSerializer(RedisSerializer.string());
      }
    ```

- 不需要自己定义RedisConfiguration，直接使用：

    ```java
    // 创建对象
    User user = new User("张三", 18);
    // 手动序列化
    String json = mapper.writeValueAsString(user);
    // 写入数据
    stringRedisTemplate.opsForValue().set("userdata", json);
    // 获取数据
    String userdata = stringRedisTemplate.opsForValue().get("userdata");
    // 手动反序列化
    User readValue = mapper.readValue(userdata, User.class);
    System.out.println(readValue);
    ```

    ```
    {
      "name": "张三",
      "age": 18
    }
    ```


[高级篇](https://www.notion.so/147d2775339a80fba43fcec357283b64?pvs=21)