/// <reference path="./NodeSnippet/typings/index.d.ts" />

const fs = require('fs');
const path = require('path');

const file = 'C:\\Users\\weijn\\Desktop\\test\\README.html';
const dest = 'C:\\Users\\weijn\\Desktop\\test\\3.html';

var reader = fs.createReadStream(file);
var writer = fs.createWriteStream(dest);


writer.on('pipe',(src)=>{
    console.log(src);
});


reader.pipe(writer);


