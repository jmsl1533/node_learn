/// <reference path="./NodeSnippet/typings/index.d.ts" />

const fs = require('fs');
const path = require('path');

var mkdirs = require('./module/mkdir.js');

// mkdirs('demo2/demo3',(err)=>{console.log(err)});



 mkdirs(path.join(__dirname,'demo2/demo3/demo4/demo5'),(err)=>{console.log(err)});

//  c:\Users\weijn\Desktop\test\demo2\demo3
// ..\demo2\demo3
// [ '..', 'demo2', 'demo3' ]