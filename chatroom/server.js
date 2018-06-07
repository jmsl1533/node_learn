/// <reference path="../NodeSnippet/typings/index.d.ts" />

const net = require('net');

var port = 2080;

//用于存储用户的连接
var clients = [] ;

var server = net.createServer((socket)=>{
    // 获取已经连接的客户
    clients.push(socket);
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
        clients.forEach(client=>{
            client.write(JSON.stringify(send));
        });
    }

    console.log(`${socket.remoteAddress} 上線了,當前在線${clients.length}人`);
    //接收客户端发送过来的数据
    socket.on('data',(chunk)=>{
        try {
            console.log(chunk.toString().trim());
            var signal = JSON.parse(chunk.toString().trim());
            var protocol = signal.protocol;
            switch (protocol) {
                case 'boardcast':
                    boardcast(signal);
                    break;
                default:
                    socket.write('不知道你要干嘛呢！');
                    break;
            }
        } catch (error) {
            socket.write('弄啥呢！？');
        }
    }).on('error',(err)=>{
        clients.splice(clients.indexOf(socket),1);
        console.log(`${socket.remoteAddress} 下線了,當前在線${clients.length}人`);
    });
}).listen(port,(err) => {
    if(err){
        console.log('端口被占用');
        return false;
    }
    console.log(`服务器监听端口${port}成功`);
});
