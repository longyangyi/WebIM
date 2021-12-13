var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select uid from user where token = ?';
    let para = [reqData.token];
    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 201,
                msg: 'token does not exists',
            });
        } else {

            sql = 'select * from groupuser where uid = ?';
            para = [result[0].uid];
            connection.query(sql, para, function (err, result2) {
                if (err) {
                    res.send(err.message);
                    return;
                }
                var list = new Array();
                for (x in result2) {
                    list.push(result2[x].groupid);
                }
                console.log(list);
                res.send({
                    code: 200,
                    msg: 'get group list success',
                    data: list
                });
            });
        }
    });

});

module.exports = router;
