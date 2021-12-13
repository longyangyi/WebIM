var express = require('express');
var router = express.Router();

var connection = require('../database/connect');


router.post('/', function(req, res, next) {

    let reqData = req.body;
    console.log(reqData);
    let sql = 'insert into message values(?,?,?,?)';
    let para = [reqData.uid1, reqData.uid2, reqData.message, Math.floor(Date.now() / 1000).toString()];


    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        res.send({
            code: 200,
            msg: 'message stored in db'
        });

    });

});

module.exports = router;
