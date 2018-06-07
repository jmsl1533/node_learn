/// <reference path="./NodeSnippet/typings/index.d.ts" />

const fs = require('fs');
const path = require('path');

const file = 'C:\\Users\\weijn\\Desktop\\test\\README.html';
const dest = 'C:\\Users\\weijn\\Desktop\\test\\3.html';

var reader = fs.createReadStream(file);

var writer = fs.createWriteStream(dest);


fs.stat(file,(err,stats)=>{
    if(stats){        
        console.time('start');
        var readTotal = 0;
        reader.on('data',(chunk)=>{
            writer.write(chunk,(err)=>{
                console.log('讀取進度：'+(readTotal += chunk.length)/stats.size * 100 + '%');    
            })
        });
    }   
    if(err){
        throw err;
    }
});

