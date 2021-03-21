## 数据库

1. show databases; // 展示数据库
2. use [database]; // 使用某一个数据库
3. show tables; // 查看该数据库的表
4. select * from [tabel]; // 查看该表的全部数据
4. select count(*) from [tabel]; // 查看该表的全部数据数量
5. sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf // mysql 的配置文件


## 项目需求说明
1. 查询任务列表（状态/页码）;
2. 新增一个任务（名称/截止日期/内容）；
3. 编辑一个任务 根据客户端传递的任务对象进行编辑（名称/截止日期/内容/ID）；
4. 删除一个任务 （ID);
5. 修改一个任务的状态 （ID/状态-待办/完成）；
