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
        // 登入操作
        var user = {
            protocol:'signin',
            username:name
        }
        server.write(JSON.stringify(user));

        console.log(`Welcome ${name} to ${port} chatroom`);

         // 监听服务器并接收socket数据,socket只能传输字符串
        server.on('data',(chunk)=>{
            try {
                //console.log(chunk.toString().trim());
                var signal = JSON.parse(chunk.toString().trim());
                var protocol = signal.protocol;
                switch (protocol) {
                    case 'boardcast':
                        if(name === signal.from){
                            return;
                        }
                        console.log('\nboardcast ['+signal.from+'] > '+signal.message+'\n');
                        rl.prompt();
                        break;
                    case 'p2p':
                        if(name === signal.from){
                            return;
                        }
                        console.log('\np2p ['+signal.from+'] > '+signal.message+'\n');
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
        rl.setPrompt(name + ' >');// 此時沒有寫入控制台
        rl.prompt(); // 寫入控制台

        // 获取自己录入的当前行的数据，并传给服务器
        rl.on('line',(line)=>{
            line = line.toString().trim();
            var temp = line.split(':');
            var send;
            if(temp.length === 2){
                send = {
                    protocol:'p2p',
                    from:name,
                    to:temp[0],
                    message:temp[1]
                };
            }else{
                send = {
                    protocol:'boardcast',
                    from:name,
                    message:line
                };
            }
            server.write(JSON.stringify(send));
            rl.prompt();
        }).on('close',(close)=>{
            console.log('have a good day!');
            process.exit(0);
        });
    });

       
        

});






