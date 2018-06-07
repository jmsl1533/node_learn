var http = require("http");
var fs = require("fs");

var server = http.createServer(
    function(req,res){
        if(req.url == "/fang"){
            fs.readFile('./test/xixi.html',function(err,data){
                //req表示请求，request;  res表示响应，response
			    //设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
                res.end(data);
            });
        }else if(req.url == "/yuan"){
            fs.readFile('./test/haha.html',function(err,data){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
                res.end(data);
            });    
        }else if(req.url == "/0.jpg"){
            fs.readFile('./test/0.jpg',function(err,data){
                res.writeHead(200,{"Content-type":"image/jpg"});
                res.end(data);
            });
        }else if(req.url == "/bb.css"){
            fs.readFile("./test/aaaaaa.css",function(err,data){
                res.writeHead(200,{"Content-type":"text/css"});
                res.end(data);
            });
        }else{
            res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
            res.end("哈哈哈，沒有這個頁面啊！");
        }
    }
).listen(3000,'127.0.0.1');