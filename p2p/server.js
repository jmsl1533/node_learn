/// <reference path="../NodeSnippet/typings/index.d.ts" />

const net = require('net');

var port = 2080;

//用于存储用户的连接
var clients = {} ;

var server = net.createServer((socket)=>{

    function signin(signal){
        var username = signal.username;

        clients[username] = socket;
        console.log(`Welcome ${username} to 2080 chatroom 當前在線${Object.keys(clients).length}`);
    }

    // 获取已经连接的客户
    function boardcast(signal){
        //获取用户名和信息
        var username = signal.from;
        var message = signal.message;
        //要发送给客户的信息
        var send = {
            protocol:signal.protocol,
            from:username,
            message:message
        };
        // 广播消息:把消息转换成字符串发送给每个客户
       for(var username in clients){
        if(clients.hasOwnProperty(username)){
            client.write(JSON.stringify(send));
        }
       }
    }

    // 点对点
    function p2p(signal) {
        // 肯定有用户名和消息
        var username = signal.from;
        var target = signal.to;
        var message = signal.message;
        // 我们要发给客户端的东西
        var send = {
            protocol: signal.protocol,
            from: username,
            message: message
        };
        // 发送消息
        clients[target].write(JSON.stringify(send));
    }

    function  receiveClientDate(chunk){
        try {
            
            var signal = JSON.parse(chunk.toString().trim());
            var protocol = signal.protocol;
            switch (protocol) {
                case 'signin':
                    signin(signal);
                    break;
                case 'boardcast':
                    boardcast(signal);
                    break;
                case 'p2p':
                    p2p(signal);
                    break;
                default:
                    socket.write('不知道你要干嘛呢！');
                    break;
            }
        } catch (error) {
            socket.write('弄啥呢！？');
        }
    }
    //接收客户端发送过来的数据
    socket
        .on('data',receiveClientDate)
        .on('error',(err)=>{
            var deleteKey;
            for(var username in clients){
                if(clients.hasOwnProperty(username)){
                    var client = clients[username];
                    if(socket === client){
                        deleteKey = username;
                    }
                }
            }
            delete clients[deleteKey];
            console.log(`${socket.remoteAddress} 下線了,當前在線${clients.length}人`);
    });
}).listen(port,(err) => {
    if(err){
        console.log('端口被占用');
        return false;
    }
    console.log(`服务器监听端口${port}成功`);
});
