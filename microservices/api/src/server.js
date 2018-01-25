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

app.post('/data',function(req,res){

  var authtoken = 'Bearer '+req.body.auth;

  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200)
      {
        res.status(200).send(request.responseText);
      }
      else if(request.status === 500)
      {
        res.status(500).send(request.responseText);
      }
    }
  };

  request.open('GET','https://auth.artfully11.hasura-app.io/v1/user/info',true);
  request.setRequestHeader('Content-Type','application/json');
  request.setRequestHeader('Authorization',authtoken);
  request.send(null);

});
/*
app.post('get-credentials',function(req,res){

});
*/
app.listen(8000, function () {
  console.log('Example app listening on port 8080!');
});
