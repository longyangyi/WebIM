var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

/* GET register listing. */
router.post('/', function(req, res, next) {
    let reqData = req.body;
    console.log("register: ", reqData);
    let sql = 'insert into user values(?,?,?,?,?,?)';
    let para = [reqData.uid, reqData.pwd, reqData.uname, '0', null, null];

    connection.query(sql, para, function (err, result) {
        console.log("register result: " + result);
        if (err) {
            res.send({
                code: 201,
                msg: 'register failed'
            });
            return;
        }
        res.send({
                code: '200',
                msg: 'register success'
        });
    });

});

module.exports = router;
