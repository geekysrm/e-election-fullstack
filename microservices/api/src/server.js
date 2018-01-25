var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var XMLHttpRequest = require('xhr2');

var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var server = require('http').Server(app);

var config = require('./config');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/indexjs', function(req, res) {
  res.sendFile(path.join(__dirname,'index.js'));
});

/*
app.post('get-credentials',function(req,res){

});
*/
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
