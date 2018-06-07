/// <reference path="../NodeSnippet/typings/index.d.ts" />

const net = require('net');

// 創建一個Socket服務器
var server = net.createServer(function socketConnect(socket){
    // 當有客戶端與我連接時出發
    // var client = socket.address();
    // console.log(client.address + ' connection.....');

    // console.log(`${socket.remoteAddress}:${socket.remotePort} 进来了`);
    // socket.write(`欢迎 ${socket.remoteAddress}:${socket.remotePort} 到来！`);

    // 监听socket有数据进来
    socket.on('data',(chunk)=>{
        console.log(chunk.toString());
        socket.write('server > 你说啥？');
    });
}).listen(2080,(err)=>{
    if(err){
        console.log('端口被佔用');
        return false;
    }

    console.log('服務器正常啟動監聽端口');
});

