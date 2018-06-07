/// <reference path="../NodeSnippet/typings/index.d.ts" />

const mssql = require('mssql');
const db = {};
const config = {
 user: 'sa',
 password: 'sa_2268',
 server: 'upsql2.unitedpeak.com',
 database: 'uppas',
 port:1433,
 options: {
  encrypt:false // Use this if you're on Windows Azure
 },
 pool: {
  min: 0,
  max: 10,
  idleTimeoutMillis: 3000
 }
};

// mssql.connect(config).then(() => {
//     return mssql.query`select * from ps_ms_department`
// }).then(result => {
//     //请求成功
//     console.log(result);
// }).catch(err => {
//     //err 处理
// });

// mssql.on('error', err => {
//     //error 处理
// });

mssql.connect(config,err=>{
    const request = new mssql.Request();
    request.stream = true;
    request.query(`select * from ps_ms_department`);
    
    request.on('recordset',columns=>{
        console.log(columns);
    });

    request.on('row',row=>{
        // console.log(row);
    });

    request.on('error',err=>{

    });
});

mssql.on('error',err=>{

});