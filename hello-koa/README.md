# README

## mysql 基本操作命令

1. show databases;
2. use <dbName>;
3. show tables;
4. select <...fields> from <tableName> where <expression>;
5. delete from <tableName> where <expression>;
6. drop table <tableName>;
7. source <sqlScript>;


## 数据库模型对象的基本操作命令

>> 大小代表一张表，小写代表一条记录

1. Mod.create
2. mod.destroy
3. Mod.findOne
4. mod.increment
5. mod.decrement
6. Mod.scope(scopeKey)


## 严谨的数据库 ACID
1. 原子性
2. 一致性
3. 隔离性
4. 持久性
