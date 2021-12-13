let express = require('express');
let fs = require('fs');
let router = express.Router();

var connection = require('../database/connect');

let WebSocket = require('ws');
let webSocketServer = new WebSocket.Server({port: 3001});

var clients = [];

webSocketServer.on('connection', function (webSocket) {
    //console.log(webSocket);

    webSocket.on('message', function (msg) {
        //webSocket.send('hello ' + msg);
        console.log('onmessage: ' + msg);

        let msgJson = JSON.parse(msg);
        //console.log(msgJson.uid1);

        if (msgJson.uid2 == undefined) { // new client
            for (x in clients) {
                if (clients[x].uid == msgJson.uid1) {
                    clients.splice(x, 1);
                    //console.log('pop: ' + x);
                    break;
                }
            }
            clients.push({uid: msgJson.uid1, socket: webSocket});
            console.log(clients.length);
            //console.log(clients);
            return;
        }

        let sql = 'insert into message values(?,?,?,?,?,?)';
        let timestamp = Math.floor(Date.now() / 1000).toString();
        let para = [msgJson.uid1, msgJson.uid2, msgJson.message, timestamp, msgJson.isimg, msgJson.isgroup];

        if (msgJson.isimg == "1") {

            let path = './chatimage/' + msgJson.uid1 + '_' + msgJson.uid2 + '_' + timestamp + '.png';
            para = [msgJson.uid1, msgJson.uid2, path, timestamp, msgJson.isimg, msgJson.isgroup];

            console.log("base64: " + msgJson.message);
            let dataBuffer = new Buffer(msgJson.message.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            fs.writeFile(path, dataBuffer, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log("base64 to img.png");
                }
            });
        }

        connection.query(sql, para, function (err, result) {
            if (err) {
                return;
            }
            for (x in clients) {
                if (clients[x].uid == msgJson.uid2) {
                    clients[x].socket.send(JSON.stringify(msgJson));
                    break;
                }
            }
        });
    });

});

module.exports = router;