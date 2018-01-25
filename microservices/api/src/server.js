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

app.get('/username',function(req,res){

  const authToken = config.getSavedToken();;
  console.log(authtoken);
  axios({
  method:'get',
  url:'https://auth.cheep56.hasura-app.io/v1/user/info',
  headers: {
        'Authorization': authtoken,
        'Content-Type': 'application/json'
    }
})
  .then(function(response) {
    res.send(response.data.username);
});


});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
