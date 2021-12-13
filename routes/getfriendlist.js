var express = require('express');
var router = express.Router();
const stringRandom = require('string-random');

var connection = require('../database/connect');

/* GET getfriendlist listing. */
router.post('/', function (req, res, next) {

    //let token = req.url.split('=')[1];
    //console.log(token);
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

            sql = 'select * from friend where uid1 = ? or uid2 = ?';
            para = [result[0].uid, result[0].uid];
            connection.query(sql, para, function (err, result2) {
                if (err) {
                    res.send(err.message);
                    return;
                }
                var list = new Array();
                for (x in result2) {
                    if (result2[x].uid1 == result[0].uid) {
                        list.push([result2[x].uid2, result2[x].uname2]);
                    } else {
                        list.push([result2[x].uid1, result2[x].uname1]);
                    }
                }
                console.log(list);
                res.send({
                    code: 200,
                    msg: 'get friend list success',
                    data: list
                });
            });
        }
    });

});

module.exports = router;
