const express = require('express');
const fs = require('fs');
const app = express();
const d = new Date();


app.use((req, res, next) => {
// write your logging code here
const agent = req.header('User-Agent');
const method = req.method;
const time = d.toISOString();
const resource = req.path;
const version = ('HTTP/' + req.httpVersion);
const status = 200;
let data = agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status + '\n';
//console.log(req)
console.log(data);


fs.appendFile('./server/log.csv', data , 'utf8',
 function(err) {
    if (err) throw err;
    next()
  });

//next();
// write your code to respond "ok" here
res.send('ok');
});

app.get('/', (req, res) => {
// write your code to return a json object containing the log data here
//const json
});

module.exports = app;
