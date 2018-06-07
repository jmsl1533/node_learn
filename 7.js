/// <reference path="./NodeSnippet/typings/index.d.ts" />

const ProgressBar = require('progress');

var  bar = new ProgressBar(':bar',{total:100,height:10,complete:'v'}) ;

var timer = setInterval(function(){
    bar.tick();
    if(bar.complete){
        console.log('\ncomplete\n');
        clearInterval(timer);
    }
},100);