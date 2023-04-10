const express = require('express');
const fs = require('fs');
const app = express();
const d = new Date();
const csv=require('csvtojson')

app.use((req, res, next) => {
const Agent = req.headers['user-agent'].replace(/,/,'');
const Method = req.method;
const Time = d.toISOString();
const Resource = req.path;
const Version = ('HTTP/' + req.httpVersion);
const Status = 200;
let data = Agent + ',' +Time + ',' + Method + ',' + Resource + ',' + Version + ',' + Status + '\n';
console.log(data);


fs.appendFile('./server/log.csv', data , 'utf8',
 function(err) {
    if (err) throw err;
    next()
  });
app.get('/',(req, res)=>{
res.send('ok');
})

app.get('/logs', (req, res) => {
fs.readFile( './server/log.csv', 'utf8' , function(err, data){
    
    if(err){
        throw err;
    }
    let obj = '['
    let lines = data.split('\n')
    console.log('lines', lines)
    let items = undefined
    for(let i = 1; i < lines.length; i++){
        if(lines[i].length > 2){
            items = lines[i].split(",");
            obj += '{' +
             '"Agent":"' + items[0] + '",'+
             '"Time":"' + items[1] +  '",' + 
             '"Method":"' + items[2] + '",' + 
             '"Resource":"' + items[3] +'",' + 
             '"Version":"' + items[4] +'",' + 
             '"Status":"' + items[5] +'"' +
        '}'
        }
       
    if (i < lines.length - 2){
        obj += ','
    }
    }
    obj +=']'
    res.json(JSON.parse(obj))
    
})
})
 });

module.exports = app;
