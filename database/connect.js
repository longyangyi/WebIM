const connect = require('mysql');
const connection = connect.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webim'
});
connection.connect();

module.exports = connection;

/*

mysql -u root -p

show databases;

create database webim;

use webim;

show tables;

create table user
(
uid varchar(20) not null primary key,
pwd varchar(20) not null,
uname varchar(20) not null,
ustate varchar(20) not null,
token varchar(64),
tokenend varchar(10)
);

desc user;

select * from user;

insert into user values('louis', '123456', 'myname', '0', '987891341234', '2021-11-11 20:00:00');

create table friend
(
uid1 varchar(20) not null references user(uid),
uid2 varchar(20) not null references user(uid),
uname1 varchar(20) not null references user(uname),
uname2 varchar(20) not null references user(uname)
);


create table message
(
uid1 varchar(20) not null references user(uid),
uid2 varchar(20),
message varchar(200) not null,
time varchar(10) not null,
..............
);

create table chatgroup
(
groupid varchar(20) not null primary key,
groupname varchar(20) not null
);

create table groupuser
(
groupid varchar(20) not null references chatgroup(groupid),
uid varchar(20) not null references user(uid)
);


 */
