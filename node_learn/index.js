var server = require("./server6");
var router = require("./router4");
var requestHandlers = require("./requestHandlers5");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

/**
 * handle的值： 得到路由和函數對應關係
 * {    '/' : [Function:start],
 *      '/start':[Fcuntion:start],
 *      '/upload'[Function:upload]  }
 */
//console.log(handle);

server.start(router.route,handle);