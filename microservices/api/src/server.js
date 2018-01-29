var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var crypto = require('crypto');

var XMLHttpRequest = require('xhr2');

var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

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
      else if(request.status === 401)
      {
        res.status(500).send(request.responseText);
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

app.post('/check-credentials',function(req,res){

  var id = req.body.serial;

    var body = {
      "type": "select",
      "args": {
          "table": "usertable",
          "columns": [
              "*"
          ],
          "where": {
              "hasura_id": {
                  "$eq": id
              }
          }
      }
  };

  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200)
      {

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function isEmpty(obj) {

            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        }

        if(isEmpty(JSON.parse(request.responseText)))
        {
          res.status(200).send("1");
        }
        else
        {
          res.status(200).send("0");
        }
      }
      else if(request.status === 400)
      {
        res.status(400).send(request.responseText);
      }
      else if(request.status === 500)
      {
        res.status(500).send(request.responseText);
      }
    }
  };

  request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
  request.setRequestHeader('Content-Type','application/json');
  request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
  request.send(JSON.stringify(body));

});

app.post('/get-credentials',function(req,res){

  var id = req.body.serial;
  var nm = req.body.name;
  var g = req.body.gender;
  var dt = req.body.date;
  var State = req.body.state;
  var voter_id = req.body.voterId;
  var mail = req.body.email;
  var number = req.body.phone;

  var credentials = crypto.randomBytes(8).toString('hex');

    var body = {
      "type": "insert",
      "args": {
          "table": "usertable",
          "objects": [
              {
                  "hasura_id": id,
                  "name": nm,
                  "gender": g,
                  "dob": dt,
                  "state": State,
                  "voter_id": voter_id,
                  "email": mail,
                  "phone": number,
                  "credentials": credentials
              }
          ]
      }
  };

  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200)
      {
        res.status(200).send(credentials);
      }
      else if(request.status === 400)
      {
        res.status(400).send(request.responseText);
      }
      else if(request.status === 500)
      {
        res.status(500).send(request.responseText);
      }
    }
  };

  request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
  request.setRequestHeader('Content-Type','application/json');
  request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
  request.send(JSON.stringify(body));

});

app.get('/get-elections',function(req,res){

    var body = {
      "type": "select",
      "args": {
          "table": "election",
          "columns": [
              "*"
          ]
      }
  };

  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200)
      {
        res.status(200).send(request.responseText);
      }
      else if(request.status === 400)
      {
        res.status(400).send(request.responseText);
      }
      else if(request.status === 500)
      {
        res.status(500).send(request.responseText);
      }
    }
  };

  request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
  request.setRequestHeader('Content-Type','application/json');
  request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
  request.send(JSON.stringify(body));

});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
