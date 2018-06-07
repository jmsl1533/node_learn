const http = require("http");

function start(){
function onRequest(req,res){
        console.log("Request received.");
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write("hello World!!");
        res.end();
    }

    http.createServer(onRequest).listen(3000);
    console.log("Server has started!");
}

exports.start = start;