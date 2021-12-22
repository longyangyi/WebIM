var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

/* GET addfriend listing. */
router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select * from user where token = ?'; // 验证token
    let para = [reqData.token];

    connection.query(sql, para, function (err, tokenResult) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (tokenResult == '') {
            res.send({
                code: 201,
                msg: 'token does not exists',
            });
            return;
        }

        sql = 'select uname from user where uid = ?'; // 查询自己的昵称
        para = [reqData.uid1];
        connection.query(sql, para, function (err, result2) {
            if (err) {
                res.send(err.message);
                return;
            } else {
                if (result2 == "") {
                    res.send({
                        code: '201',
                        msg: 'uid does not exists'
                    });
                    return;
                } else {
                    sql = 'select uname from user where uid = ?'; // 查询好友的昵称
                    para = [reqData.uid2];
                    connection.query(sql, para, function (err, result3) {
                        if (err) {
                            res.send(err.message);
                            return;
                        }
                        if (result3 == '') {
                            res.send({
                                code: 201,
                                msg: '好友账号不存在'
                            });
                            return;
                        } else {
                            if (tokenResult[0].uid == reqData.uid1) {

                                sql = 'select * from friend where (uid1=? and uid2=?) or (uid1=? and uid2=?)';
                                para = [reqData.uid1, reqData.uid2, reqData.uid2, reqData.uid2];

                                connection.query(sql, para, function (err, result4) {
                                    if (result4 != '') {
                                        res.send({
                                            code: '201',
                                            msg: '好友已存在'
                                        });
                                    } else {
                                        sql = 'insert into friend values(?, ?, ?, ?)'; // 添加到数据库
                                        para = [reqData.uid1, reqData.uid2, result2[0].uname, result3[0].uname];
                                        connection.query(sql, para, function (err, result5) {
                                            if (err) {
                                                res.send(err.message);
                                                return;
                                            } else {
                                                res.send({
                                                    code: '200',
                                                    msg: 'add friend success',
                                                    data: result3 // uname
                                                });
                                                return;
                                            }
                                        });
                                    }
                                });
                            } else {
                                res.send({
                                    code: '201',
                                    msg: 'token does not match uid1'
                                });
                            }
                        }
                    });
                }
            }
        });
    });
});

module.exports = router;
