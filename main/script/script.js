var uid;
var friendUid;
var token;
var uname;
var friendUname;

var websocket;

var messageTextarea;
var allMessageContainer;
var noneMessageHint;
var friendListContainer;
var timer;
var timerId;


// 初始化界面
window.onload = function () {
    $('.loginPage').css({'display': 'inline-block', 'height': '0'});
    $('.loginPage').animate({'height': '600px'});

    $('.registerPage').css({'display': 'none'});
    $('.friendListPage').css({'display': 'none'});
    $('.chatPage').css({'display': 'none'});

    messageTextarea = document.getElementById('messageTextarea');
    allMessageContainer = document.getElementById('allMessageContainer');
    noneMessageHint = document.getElementById('noneMessageHint');
    friendListContainer = document.getElementById('friendListContainer');

    messageTextarea.addEventListener('keydown', function (e) {
        //console.log('key down');
        var e = e || window.event;
        if (e.keyCode == 13) {
            if (messageTextarea.value == '') {
                setTimeout(function () {
                    fadeIn(noneMessageHint);
                    clearTimeout(timerId)
                    timer = setTimeout(function () {
                        fadeOut(noneMessageHint)
                    }, 2000);
                }, 10);
                timerId = timer;
            } else {
                var msgObj = {
                    uid1: uid,
                    uid2: friendUid,
                    token: token,
                    message: messageTextarea.value,
                    isimg: 0,
                    isgroup: 0
                };

                var msgJson = JSON.stringify(msgObj);

                websocket.send(msgJson);
                appendMyMessage(messageTextarea.value);

                messageTextarea.value = '';
            }
        }
    });

    messageTextarea.addEventListener('keyup', function (e) {
        var e = e || window.event;
        if (e.keyCode == 13 && messageTextarea.value != '') {
            messageTextarea.value = '';
        }
    });

};






// 注册界面
function registerClick() {
    $.post('/register_post', {
        uid: $("#registerUid").val(),
        pwd: $("#registerPwd").val(),
        uname: $("#registerUname").val()
    }, function (data, status) {

        if (data.code == '200') {
            console.log('register success');
            alert('注册成功');
        } else {
            alert(data.msg);
        }
    });
}

function returnLoginPage() {
    $('.registerPage').css({'display': 'none'});
    $('.loginPage').css({'display': 'inline-block', 'height': '0'});
    $('.loginPage').animate({'height': '600px'});
}



// 登录界面
function goRegisterClick() {
    $('.loginPage').css({'display': 'none'});
    $('.registerPage').css({'display': 'inline-block', 'height': '0'});
    $('.registerPage').animate({'height': '600px'});
}

function loginClick() {
    //console.log($("#uid").val());
    $.post('/login_post', {uid: $("#loginUid").val(), pwd: $("#loginPwd").val()}, function (data, status) {
        if (data.code == '200') {
            console.log('login success');
            uid = data.data['uid'];
            uname = data.data['uname'];
            token = data.data['token'];

            document.getElementById('myInfo').innerHTML = "昵称：" + uname + "<br>账号：" + uid;

            $('.loginPage').css({'display': 'none'});

            $('.friendListPage').css({'display': 'inline-block', 'height': '0'});
            $('.friendListPage').animate({'height': '600px'});


            friendListContainer.innerHTML = ''; // 清空好友列表


            $.post('/getfriendlist', {token: token}, function (data, status) { // 读取好友列表
                for (x in data.data) {
                    appendFriend(data.data[x][0], data.data[x][1]);
                }
            });

        } else {
            alert('登陆失败：' + data.msg);
        }
    });
}


function appendFriend(_uid, _uname) { // 附加好友列表
    var nodeP = document.createElement("input");
    nodeP.type = "button";
    nodeP.classList.add('friendButton');
    nodeP.value = _uname;
    nodeP.addEventListener("click", function () {
        //alert('chat with ' + uid + uname);
        friendUid = _uid;
        friendUname = _uname;
        document.getElementById('friendUname').innerHTML = "好友：" + friendUname;
        $('.friendListPage').css({'display': 'none'});
        $('.chatPage').css({'display': 'inline-block', 'height': '0'});
        $('.chatPage').animate({'height': '600px'}); // 进入聊天界面
        readMessage(); // 读取历史消息

        //var socketuri = 'ws://localhost:3001';
        var socketuri = "ws://" + window.location.host.split(':')[0] + ':3001';
        websocket = new WebSocket(socketuri); // 建立websocket
        websocket.onopen = function (evt) {
            console.log('onopen');
            var msgObj = {uid1: uid};
            var msgJson = JSON.stringify(msgObj);
            websocket.send(msgJson);
        };
        websocket.onmessage = function (evt) { // 收到实时消息
            var msgJson = JSON.parse(evt.data);
            console.log(msgJson, msgJson.message);

            if (msgJson.isimg == "1") {
                appendFriendImg(msgJson.message); // 附加到消息列表
            } else {
                console.log('onmessage:' + evt.data);
                appendFriendMessage(msgJson.message);
            }


        };
        websocket.onclose = function (evt) {
            console.log('onclose');
        };
    });
    friendListContainer.appendChild(nodeP);

    var div = document.createElement("div");
    div.classList.add("blank10px");
    friendListContainer.appendChild(div);
    friendListContainer.scrollTop = friendListContainer.scrollHeight;
}

function logoutClick() { // 退出登录
    $.post('/logout_post', {token: token}, function (data, status) {
        if (data.code == '200') {
            console.log('logout success');
            $('.friendListPage').css({'display': 'none'});
            $('.loginPage').css({'display': 'inline-block', 'height': '0'});
            $('.loginPage').animate({'height': '600px'});
        } else {
            alert('登出失败：' + data.msg);
        }
    });
}

function addFriendClick() { // 添加好友
    if (document.getElementById('friendId').value == uid) {
        alert('别添加自己啊！');
        return;
    }

    $.post('/addfriend', {
        token: token,
        uid1: uid,
        uid2: document.getElementById('friendId').value
    }, function (data, status) {
        //console.log(data);
        if (data.code == '200') {
            //console.log('add friend data: ', data, data.data[0].uname);
            alert('添加好友成功：' + data.data[0].uname);
            appendFriend(document.getElementById('friendId').value, data.data[0].uname);
        } else {
            alert(data.msg);
        }
    });
}






function readMessage() {
    $.post('/readmessage', {uid1: uid, uid2: friendUid}, function (data, result) {
        //console.log(data);
        if (data.code == '200') {
            //console.log(data.data);
            allMessageContainer.innerHTML = '';
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

function appendMyMessage(message) {

    var nodeP = document.createElement('p'),
        nodeSpan = document.createElement('span');
    nodeP.classList.add('myMessageContainer');
    nodeSpan.classList.add('myMessageText');
    nodeSpan.innerHTML = message;
    nodeP.appendChild(nodeSpan);
    allMessageContainer.appendChild(nodeP);
    allMessageContainer.scrollTop = allMessageContainer.scrollHeight;
}

function appendMyImg(base64) {
    var nodeP = document.createElement('p'),
        nodeSpan = document.createElement('span');
    nodeP.classList.add('myMessageContainer');
    nodeSpan.classList.add('myMessageText');

    var img = document.createElement("img");
    img.classList.add("messageImage");
    img.src = base64;
    img.alt = "img";

    nodeSpan.appendChild(img);

    nodeP.appendChild(nodeSpan);
    allMessageContainer.appendChild(nodeP);
    allMessageContainer.scrollTop = allMessageContainer.scrollHeight;
}


function appendFriendMessage(message) {
    var nodeP = document.createElement('p'),
        nodeSpan = document.createElement('span');
    nodeP.classList.add('friendMessageContainer');
    nodeSpan.classList.add('friendMessageText');
    nodeSpan.innerHTML = message;
    nodeP.appendChild(nodeSpan);
    allMessageContainer.appendChild(nodeP);
    allMessageContainer.scrollTop = allMessageContainer.scrollHeight;
}

function appendFriendImg(base64) {
    var nodeP = document.createElement('p'),
        nodeSpan = document.createElement('span');
    nodeP.classList.add('friendMessageContainer');
    nodeSpan.classList.add('friendMessageText');

    var img = document.createElement("img");
    img.classList.add("messageImage");
    img.src = base64;
    img.alt = "img";

    nodeSpan.appendChild(img);

    nodeP.appendChild(nodeSpan);
    allMessageContainer.appendChild(nodeP);
    allMessageContainer.scrollTop = allMessageContainer.scrollHeight;
}

function returnFriendListPage() {
    $('.chatPage').css({'display': 'none'});
    $('.friendListPage').css({'display': 'inline-block', 'height': '0'});
    $('.friendListPage').animate({'height': '600px'});
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





function chooseImageClick() {
    //alert('choose img');
    var file = document.getElementById('chooseFile');
    file.click();
}

function miniImagePreview() {
    var preview = document.getElementById('miniImage');
    var file = document.querySelector('input[type=file]').files[0];
    //console.log(file);

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

function sendImageClick() {

    var reader = new FileReader();
    reader.onloadend = function () {
        var msgObj = {uid1: uid, uid2: friendUid, token: token, message: reader.result, isimg: 1, isgroup: 0};
        var msgJson = JSON.stringify(msgObj);
        websocket.send(msgJson);
        appendMyImg(reader.result);
        document.getElementById('miniImage').src = "./default.png";
    }
    var file = document.querySelector('input[type=file]').files[0];
    if (file) {
        reader.readAsDataURL(file);
    }
}

