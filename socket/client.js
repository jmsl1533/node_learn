/// <reference path="../NodeSnippet/typings/index.d.ts" />

const net = require('net');

const socket = net.connect(2080,()=>{
    console.log('connected to server!');
    // client.write('world!\r\n');

    // process.stdin.on('data',(chunk)=>{
    //     console.log(chunk.toString().tr);
    // });
    process.stdout.write('\nclient > ');
    process.stdin.on('data',(chunk)=>{
        socket.write(chunk.toString().trim());
    });
    process.stdout.write('\nclient > ');

    socket.on('data',(data)=>{
        console.log('\n'+data.toString());
        // client.end();
    });
});
// client.on('data',(data)=>{
//     console.log(data.toString());
//     client.end();
// });

// client.on('end',()=>{
//     console.log('distconnect from server!');
// });

