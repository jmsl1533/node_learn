const fs = require('fs');
const path = require('path');


fs.readFile('C:\\Users\\weijn\\Desktop\\test\\README.html',(err,data)=>{
    if(err){
        throw err;
    }

    fs.writeFile('C:\\Users\\weijn\\Desktop\\test\\3.html',data,err=>{
        if(err){
            throw err;
        }

    });
});