var express = require('express');
var fs = require('fs');
var router = express.Router();

var connection = require('../database/connect');


router.post('/', function(req, res, next) {

    let reqData = req.body;
    //console.log(reqData);
    let sql = 'select * from message where (uid1=? and uid2=?) or (uid1=? and uid2=?)';
    let para = [reqData.uid1, reqData.uid2, reqData.uid2, reqData.uid1];


    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        //result[0].uid1='hh';
        for (var i=0;i<result.length;i++) {
            if (result[i].isimg == '1') {
                let bitmap = fs.readFileSync(result[i].message);
                let base64str = Buffer.from(bitmap, 'binary').toString('base64');
                result[i].message = base64str;
            }
        }

        res.send({
            code: 200,
            msg: 'read message success',
            data: result
        });

    });

});

module.exports = router;
