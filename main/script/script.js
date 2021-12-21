var uid;
var frienduid;
var token;
var uname;
var frienduname;

var websocket;

var doc;
var dialogueInput;
var dialogueContain;
var dialogueHint;
var dialogueFriendList;
var timer;
var timerId;
var shiftKeyOn;

window.onload = function () {
    $('.dialogue-main').css({'display': 'inline-block', 'height': '0'});
    $('.dialogue-main').animate({'height': '600px'});
    $('.dialogue-main').css({'display': 'none'});
    $('.dialogue-register').css({'display': 'none'});
    $('.dialogue-friend-list').css({'display': 'none'});

    doc = document;

    dialogueInput = doc.getElementById('dialogue_input');
    dialogueContain = doc.getElementById('dialogue_contain');
    dialogueHint = doc.getElementById('dialogue_hint');
    dialogueFriendList = doc.getElementById('dialogue-friend-list');
    shiftKeyOn = false;

    dialogueInput.addEventListener('keydown', function (e) {
        var e = e || window.event;
        if (e.keyCode == 16) {
            shiftKeyOn = true;
        }
        if (shiftKeyOn) {
            return true;
        } else if (e.keyCode == 13 && dialogueInput.value == '') {
            // console.log('发送内容不能为空');
            // 多次触发只执行最后一次渐隐
            setTimeout(function () {
                fadeIn(dialogueHint);
                clearTimeout(timerId)
                timer = setTimeout(function () {
                    fadeOut(dialogueHint)
                }, 2000);
            }, 10);
            timerId = timer;
            return true;
        } else if (e.keyCode == 13) {
            appendMyMessage(dialogueInput.value);
        }
    });

    dialogueInput.addEventListener('keyup', function (e) {
        var e = e || window.event;
        if (e.keyCode == 16) {
            shiftKeyOn = false;
            return true;
        }
        if (!shiftKeyOn && e.keyCode == 13) {

            var msgObj = {
                uid1: uid,
                uid2: frienduid,
                token: token,
                message: dialogueInput.value,
                isimg: 0,
                isgroup: 0
            };

            var msgJson = JSON.stringify(msgObj);

            websocket.send(msgJson);

            dialogueInput.value = null;
        }
    });

};


function appendMyMessage(message) {

    var nodeP = doc.createElement('p'),
        nodeSpan = doc.createElement('span');
    nodeP.classList.add('dialogue-customer-contain');
    nodeSpan.classList.add('dialogue-text', 'dialogue-customer-text');
    nodeSpan.innerHTML = message;
    nodeP.appendChild(nodeSpan);
    dialogueContain.appendChild(nodeP);
    dialogueContain.scrollTop = dialogueContain.scrollHeight;
}

function appendMyImg(base64) {
    var nodeP = doc.createElement('p'),
        nodeSpan = doc.createElement('span');
    nodeP.classList.add('dialogue-customer-contain');
    nodeSpan.classList.add('dialogue-text', 'dialogue-customer-text');

    var img = doc.createElement("img");
    img.classList.add("pic");
    img.src = base64;
    img.alt = "img";

    nodeSpan.appendChild(img);

    nodeP.appendChild(nodeSpan);
    dialogueContain.appendChild(nodeP);
    dialogueContain.scrollTop = dialogueContain.scrollHeight;
}


function appendFriendMessage(message) {
    var nodeP = doc.createElement('p'),
        nodeSpan = doc.createElement('span');
    nodeP.classList.add('dialogue-service-contain');
    nodeSpan.classList.add('dialogue-text', 'dialogue-service-text');
    nodeSpan.innerHTML = message;
    nodeP.appendChild(nodeSpan);
    dialogueContain.appendChild(nodeP);
    dialogueContain.scrollTop = dialogueContain.scrollHeight;
}

function appendFriendImg(base64) {
    var nodeP = doc.createElement('p'),
        nodeSpan = doc.createElement('span');
    nodeP.classList.add('dialogue-service-contain');
    nodeSpan.classList.add('dialogue-text', 'dialogue-service-text');

    var img = doc.createElement("img");
    img.classList.add("pic");
    img.src = base64;
    img.alt = "img";

    nodeSpan.appendChild(img);

    nodeP.appendChild(nodeSpan);
    dialogueContain.appendChild(nodeP);
    dialogueContain.scrollTop = dialogueContain.scrollHeight;
}


// 渐隐
function fadeOut(obj) {
    var n = 100;
    var time = setInterval(function () {
        if (n > 0) {
            n -= 10;
            obj.style.opacity = '0.' + n;
        } else if (n <= 30) {
            obj.style.opacity = '0';
            clearInterval(time);
        }
    }, 10);
    return true;
}

// 渐显
function fadeIn(obj) {
    var n = 30;
    var time = setInterval(function () {
        if (n < 90) {
            n += 10;
            obj.style.opacity = '0.' + n;
        } else if (n >= 80) {

            obj.style.opacity = '1';
            clearInterval(time);
        }
    }, 100);
    return true;
}

function readMessage() {
    $.post('/readmessage', {uid1: uid, uid2: frienduid}, function (data, result) {
        //console.log(data);
        if (data.code == '200') {
            //console.log(data.data);
            dialogueContain.innerHTML = '';
            for (x in data.data) {

                if (data.data[x].isimg == "1") {
                    if (data.data[x].uid1 == uid) {
                        appendMyImg("data:image/png;base64," + data.data[x].message);
                    } else {
                        appendFriendImg("data:image/png;base64," + data.data[x].message);
                    }

                } else {
                    if (data.data[x].uid1 == uid && data.data[x].isgroup == '0') {
                        appendMyMessage(data.data[x].message);
                    } else {
                        appendFriendMessage(data.data[x].message);
                    }
                }

            }

        } else {
            alert(data.msg)
        }
    });
}

function loginClick() {
    //console.log($("#uid").val());
    $.post('/login_post', {uid: $("#uid").val(), pwd: $("#pwd").val()}, function (data, status) {
        if (data.code == '200') {
            console.log('login success');
            uid = data.data['uid'];
            uname = data.data['uname'];
            token = data.data['token'];

            doc.getElementById('myInfo').innerHTML = "昵称：" + uname + "<br>ID：" + uid;

            $('.dialogue-login').css({'display': 'none'});

            $('.dialogue-friend-list').css({'display': 'inline-block', 'height': '0'});
            $('.dialogue-friend-list').animate({'height': '600px'});


            dialogueFriendList.innerHTML = '';


            $.post('/getfriendlist', {token: token}, function (data, status) {
                for (x in data.data) {
                    appendFriend(data.data[x][0], data.data[x][1]);
                }
            });

        } else {
            alert('登陆失败：' + data.msg);
        }
    });
}


function goRegisterClick() {
    $('.dialogue-login').css({'display': 'none'});
    $('.dialogue-register').css({'display': 'inline-block', 'height': '0'});
    $('.dialogue-register').animate({'height': '600px'});
}

function registerClick() {
    $.post('/register_post', {
        uid: $("#register_uid").val(),
        pwd: $("#register_pwd").val(),
        uname: $("#register_uname").val()
    }, function (data, status) {

        if (data.code == '200') {
            console.log('register success');
            alert('注册成功');
        } else {
            alert(data.msg);
        }
    });
}

function returnLogin() {
    $('.dialogue-register').css({'display': 'none'});
    $('.dialogue-login').css({'display': 'inline-block', 'height': '0'});
    $('.dialogue-login').animate({'height': '600px'});
}


function appendFriend(_uid, _uname) {
    var nodeP = doc.createElement("input");
    nodeP.type = "button";
    nodeP.classList.add('friendButtonClass');
    nodeP.value = _uname;
    nodeP.addEventListener("click", function () {
        //alert('chat with ' + uid + uname);
        frienduid = _uid;
        frienduname = _uname;
        doc.getElementById('friendUname').innerHTML = "好友：" + frienduname;
        $('.dialogue-friend-list').css({'display': 'none'});
        $('.dialogue-main').css({'display': 'inline-block', 'height': '0'});
        $('.dialogue-main').animate({'height': '600px'});
        readMessage();
        //var socketuri = 'ws://localhost:3001';
        var socketuri = "ws://" + window.location.host.split(':')[0] + ':3001';
        websocket = new WebSocket(socketuri);
        websocket.onopen = function (evt) {
            console.log('onopen');
            var msgObj = {uid1: uid};
            var msgJson = JSON.stringify(msgObj);
            websocket.send(msgJson);
        };
        websocket.onmessage = function (evt) {
            console.log(evt);
            console.log('onmessage:' + evt.data);
            var msgJson = JSON.parse(evt.data);

            console.log(msgJson, msgJson.message);


            if (msgJson.isimg == "1") {
                appendFriendImg(msgJson.message);
            } else {
                appendFriendMessage(msgJson.message);
            }


        };
        websocket.onclose = function (evt) {
            console.log('onclose');
        };
    });
    dialogueFriendList.appendChild(nodeP);

    var div = doc.createElement("div");
    div.classList.add("blank10px");
    dialogueFriendList.appendChild(div);
    dialogueFriendList.scrollTop = dialogueFriendList.scrollHeight;
}

function logout() {
    $.post('/logout_post', {token: token}, function (data, status) {
        if (data.code == '200') {
            console.log('logout success');
            $('.dialogue-friend-list').css({'display': 'none'});
            $('.dialogue-login').css({'display': 'inline-block', 'height': '0'});
            $('.dialogue-login').animate({'height': '600px'});
        } else {
            alert('登出失败：' + data.msg);
        }
    });
}

function returnFriendList() {
    $('.dialogue-main').css({'display': 'none'});
    $('.dialogue-friend-list').css({'display': 'inline-block', 'height': '0'});
    $('.dialogue-friend-list').animate({'height': '600px'});
}

function chooseImg() {
    //alert('choose img');
    var file = doc.getElementById('fileInput');
    file.click();
}

function previewFile() {
    var preview = document.getElementById('showImg');
    var file = document.querySelector('input[type=file]').files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }

}

function socketSendImg() {

    var reader = new FileReader();
    reader.onloadend = function () {
        var msgObj = {uid1: uid, uid2: frienduid, token: token, message: reader.result, isimg: 1, isgroup: 0};
        var msgJson = JSON.stringify(msgObj);
        websocket.send(msgJson);
        appendMyImg(reader.result);
        document.getElementById('showImg').src = "./default.png";
    }
    var file = document.querySelector('input[type=file]').files[0];
    if (file) {
        reader.readAsDataURL(file);
    }
}

function addFriendClick() {
    $.post('/addfriend', {
        token: token,
        uid1: uid,
        uid2: document.getElementById('friendid').value
    }, function (data, status) {
        console.log(data);
        if (data.code == '200') {
            dialogueFriendList.innerHTML = '';


            $.post('/getfriendlist', {token: token}, function (data, status) {
                for (x in data.data) {
                    appendFriend(data.data[x][0], data.data[x][1]);
                }
            });
        } else {
            alert(data.msg);
        }
    });
}
