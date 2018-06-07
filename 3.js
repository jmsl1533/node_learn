/// <reference path="./NodeSnippet/typings/index.d.ts" />

const fs = require('fs');
const path = require('path');
const marked = require('marked');

// 接收需要轉換的文件路徑
const target = path.join(__dirname,process.argv[2] || './README.md');

console.log(target);
// 監視文件變化
fs.watchFile(target,{interval:200},(curr,prev)=>{
    // console.log(`current:${curr.size};previous:${prev.size}`);
    // 判斷文件到底有沒有變化
    if(curr.mtime === prev.mtime){
        return false;
    }
    // 讀取文件，轉換為新的HTML
    fs.readFile(target,'utf-8',(err,connect)=>{
        if(err){ 
            throw err;
        }
    var html = marked(connect);
    fs.readFile(path.join(__dirname,'github.css'),'utf-8',(err,css)=>{
        html = template.replace('{{{connect}}}',html).replace('{{{styles}}}',css);
        fs.writeFile(target.replace(path.extname(target),'.html'),html,'utf-8',
            (err)=>{
                console.log('update@'+new Date);
            });
        });
    // console.log(html);
    
    });
});

var template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>{{{styles}}}</style>
</head>
<body>
    <div class="vs">
        {{{connect}}}
    </div>
</body>
</html>
`;


