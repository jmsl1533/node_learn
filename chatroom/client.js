/// <reference path="../NodeSnippet/typings/index.d.ts" />

const net = require('net');
const readline = require('readline');

var port = 2080;

const rl = readline.createInterface(process.stdin,process.stdout);

rl.question('你叫啥名？',(name)=>{
    name = name.toString().trim();

    if(!name){
        throw new Error('名字不能為空哦！');
    }

    // 創建服務端的連接
    const server = net.connect({port:port,host:'192.168.108.84'},()=>{
         // 监听服务器并接收socket数据,socket只能传输字符串
        server.on('data',(chunk)=>{
            try {
                console.log(chunk.toString().trim());
                var signal = JSON.parse(chunk.toString().trim());
                var protocol = signal.protocol;
                switch (protocol) {
                    case 'boardcast':
                        if(name === signal.from){
                            return;
                        }
                        console.log('\nboardcast ['+signal.from+'] > '+signal.message+'\n');
                        // console.log(signal.from);
                        // console.log(signal.message);
                        rl.prompt();
                        break;
                    default:
                        server.write('弄啥了？');  
                        break;
                }
            } catch (error) {
                throw new Error('服務器傳輸數據有誤！');
            }
            
        }); 
        rl.setPrompt(name + ' >'); // 此時沒有寫到控制台
        rl.prompt(); // 寫入到控制台

        // 获取自己录入的当前行的数据，并传给服务器
        rl.on('line',(line)=>{
            var send = {
                protocol:'boardcast',
                from:name,
                message:line.toString().toString()
            };
            server.write(JSON.stringify(send));
            rl.prompt();
        }).on('close',(close)=>{
            console.log('have a good day!');
            process.exit(0);
        });
    });

       
        

});






