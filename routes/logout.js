var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

/* GET logout listing. */
router.post('/', function(req, res, next) {
    let reqData = req.body;
    console.log(reqData);

    let sql = 'update user set ustate = ?, token = ?, tokenend = ? where token = ?';
    let para = ['0', null, null, reqData.token];
    connection.query(sql, para, function (err, result) {

        //console.log(result);
        if (err) {
            res.send(err.message);
            return;
        }

        if (result.changedRows == 1) {
            res.send({
                code: '200',
                msg: 'logout success'
            });
        } else {
            res.send({
                code: '201',
                msg: 'token does not exist'
            });
        }

    });

});

module.exports = router;
