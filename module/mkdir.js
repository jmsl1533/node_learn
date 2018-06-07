const fs = require('fs');
const path = require('path');

function mkdirs(pathname,callback){
    
    var root;

    root = path.dirname(module.parent.filename);
    // __dirname : C:\Users\weijn\Desktop\test
    pathname = path.isAbsolute(pathname)?pathname:path.join(root,pathname);

    console.log(pathname);
    // pathname = pathname.repalce(__dirname,'');
    // console.log(pathname);
    var relativepath = path.relative(root,pathname);
    console.log(relativepath);

    var folders = relativepath.split(path.sep);
    
    console.log(folders);

    try {
        var pre = '';
        folders.forEach(folder => {  
            try {
                // 如果不存在，則報錯
                fs.statSync(path.join(root,pre,folder));    
            } catch (error) {
                fs.mkdirSync(path.join(root,pre,folder));    
            }
            pre = path.join(pre,folder);
            } );
        console.log(pre);
        callback && callback(null);
    } catch (error) {
        callback && callback(error);
    }


}
module.exports = mkdirs;