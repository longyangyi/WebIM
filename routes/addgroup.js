var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select * from user where uid = ? and token = ?';
    let para = [reqData.uid, reqData.token];

    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 201,
                msg: 'token or uid fault',
            });
            return;
        }
        sql = 'select * from chatgroup where groupid=?';
        para = [reqData.groupid];
        connection.query(sql, para, function (err, result2) {
            if (err) {
                res.send(err.message);
                return;
            } else {
                if (result2 == "") {
                    sql = 'insert into chatgroup values(?,?)';
                    para = [reqData.groupid, reqData.groupname];
                    connection.query(sql, para, function (err, result3) {
                        if (err) {
                            res.send({
                                code: '202',
                                msg: 'add group failed'
                            });
                        } else {
                            res.send({
                                code: '200',
                                msg: 'add group success'
                            });
                            sql = 'insert into groupuser values(?,?)';
                            para = [reqData.groupid, reqData.uid];
                            connection.query(sql, para);
                        }
                    })
                } else {
                    res.send({
                        code: '201',
                        msg: 'add group failed'
                    });
                }
            }
        });
    });
});

module.exports = router;
