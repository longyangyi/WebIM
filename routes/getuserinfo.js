var express = require('express');
var router = express.Router();

var connection = require('../database/connect');


router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select uid, uname, ustate from user where uid = ?';
    let para = [reqData.uid];
    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 201,
                msg: 'uid does not exists',
            });
        } else {
            res.send({
                code: 200,
                msg: 'get user info succes',
                data: result
            });
        }
    });

});

module.exports = router;
