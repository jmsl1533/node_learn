var http = require("http");

var server = http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("hello world!");
    res.end();
}).listen(8000);