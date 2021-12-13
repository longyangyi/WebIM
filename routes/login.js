var express = require('express');
var router = express.Router();
const stringRandom = require('string-random');

var connection = require('../database/connect');

/* GET login listing. */
router.post('/', function(req, res, next) {

    let reqData = req.body;
    console.log(reqData);
    let sql = 'select * from user where uid = ?';
    let para = [reqData.uid];

    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 201,
                msg: 'user does not exists',
            });
        } else {
            //console.log(result[0]);

            if (result[0].pwd == reqData.pwd) {

                sql = 'update user set ustate = ?, token = ?, tokenend = ? where uid = ?';
                para = ['1', stringRandom(64), Math.floor(Date.now() / 1000 + 3600 * 24).toString(), reqData.uid];
                connection.query(sql, para, function (err, result) {

                    sql = 'select * from user where uid = ?';
                    para = [reqData.uid];
                    connection.query(sql, para, function (err, result) {
                        res.send({
                            code: 200,
                            msg: 'login success',
                            data: result[0]
                        });

                    });

                })

            } else {
                res.send({
                    code: 201,
                    msg: 'pwd does not match'
                });
            }
        }

    });

});

module.exports = router;
