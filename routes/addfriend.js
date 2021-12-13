var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

/* GET addfriend listing. */
router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select * from user where token = ?';
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
        sql = 'select * from user where uid=?';
        para = [reqData.uid2];
        connection.query(sql, para, function (err, result2) {
            if (err) {
                res.send(err.message);
                return;
            } else {
                if (result2 == "") {
                    res.send({
                        code: '201',
                        msg: 'frend uid does not exists'
                    });
                    return;
                } else {
                    sql = 'select * from friend where (uid1=? and uid2=?) or (uid1=? and uid2=?)';
                    para = [reqData.uid1, reqData.uid2, reqData.uid1, reqData.uid2];
                    connection.query(sql, para, function (err, result) {
                        if (err) {
                            res.send(err.message);
                            return;
                        }
                        if (result != '') {
                            res.send({
                                code: 201,
                                msg: 'friend exists'
                            });
                            return;
                        } else {
                            if (tokenResult[0].uid == reqData.uid1) {
                                sql = 'insert into friend values(?, ?)';
                                para = [reqData.uid1, reqData.uid2];
                                connection.query(sql, para, function (err, result3) {
                                    if (err) {
                                        res.send(err.message);
                                        return;
                                    } else {
                                        res.send({
                                            code: '200',
                                            msg: 'add friend success'
                                        });
                                        return;
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
