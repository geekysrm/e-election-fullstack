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

app.post('/get-elections',function(req,res){

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

app.post('/view-credentials',function(req,res){

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

app.post('/nominate',function(req,res){

  var hasura_id = req.body.id;
  var election_id = req.body.eid;
  var manifesto1 = req.body.manifesto;
  var indi_flag = req.body.individual;
  var party_name = req.body.party;
  var party_ticket_id = req.body.party_ticket;


  if(indi_flag)
  {
        var body = {
        "type": "insert",
        "args": {
            "table": "nomination",
            "objects": [
                {
                    "hasura_id": hasura_id,
                    "election_id": election_id,
                    "manifesto": manifesto1,
                    "individual": indi_flag
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
          var body1 = {
            "type": "update",
            "args": {
                "table": "usertable",
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                },
                "$set": {
                    "nomination": "true"
                }
            }
          };

          var request1 = new XMLHttpRequest();

          request1.onreadystatechange = function(){
            if(request1.readyState === XMLHttpRequest.DONE)
            {
              if(request1.status === 200)
              {
                res.status(200).send(request1.responseText);
              }
              else if(request1.status === 400)
              {
                res.status(400).send(request1.responseText);
              }
              else if(request1.status === 500)
              {
                res.status(500).send(request1.responseText);
              }
            }
          }

          request1.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
          request1.setRequestHeader('Content-Type','application/json');
          request1.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
          request1.send(JSON.stringify(body1));
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
    }

    request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
    request.setRequestHeader('Content-Type','application/json');
    request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
    request.send(JSON.stringify(body));

  }
  else
  {
        var body = {
        "type": "insert",
        "args": {
            "table": "nomination",
            "objects": [
                {
                    "election_id": election_id,
                    "manifesto": manifesto1,
                    "individual": indi_flag,
                    "party": party_name,
                    "party_ticket_id": party_ticket_id,
                    "hasura_id": hasura_id
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
          var body1 = {
            "type": "update",
            "args": {
                "table": "usertable",
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                },
                "$set": {
                    "nomination": "true"
                }
            }
          };

          var request1 = new XMLHttpRequest();

          request1.onreadystatechange = function(){
            if(request1.readyState === XMLHttpRequest.DONE)
            {
              if(request1.status === 200)
              {
                res.status(200).send(request1.responseText);
              }
              else if(request1.status === 400)
              {
                res.status(400).send(request1.responseText);
              }
              else if(request1.status === 500)
              {
                res.status(500).send(request1.responseText);
              }
            }
          }

          request1.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
          request1.setRequestHeader('Content-Type','application/json');
          request1.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
          request1.send(JSON.stringify(body1));
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
    }

    request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
    request.setRequestHeader('Content-Type','application/json');
    request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
    request.send(JSON.stringify(body));

  }

});

app.post('/get-nominations',function(req,res){

  var election_id = req.body.eid;

    var body = {
      "type": "select",
      "args": {
          "table": "nomination",
          "columns": [
              "*"
          ],
          "where": {
              "election_id": {
                  "$eq": election_id
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
  }

  request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
  request.setRequestHeader('Content-Type','application/json');
  request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
  request.send(JSON.stringify(body));

});

app.post('/vote',function(req,res){

  var hasura_id_candidate = req.body.id_of_candidate;
  var hasura_id_voter = req.body.id_of_voter;
  var election_id = req.body.eid;
  var cred = req.body.credentials;

  var body3 = {
      "type": "select",
      "args": {
          "table": "usertable",
          "columns": [
              "hasura_id",
              "credentials"
          ],
          "where": {
              "$and": [
                  {
                      "hasura_id": {
                          "$eq": hasura_id_voter
                      }
                  },
                  {
                    "credentials": {
                        "$eq": cred
                    }
                  }
              ]
          }
      }
  };

  var request3 = new XMLHttpRequest();

  request3.onreadystatechange = function(){
    if(request3.readyState === XMLHttpRequest.DONE)
    {
      if(request3.status === 200)
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

        if(isEmpty(JSON.parse(request3.responseText)))
        {
          res.status(200).send("Credentials Incorrect");
        }
        else
        {
          var body = {
            "type": "update",
            "args": {
                "table": "nomination",
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id_candidate
                    }
                },
                "$inc": {
                    "votes": "1"
                }
            }
        };

        var request = new XMLHttpRequest();

        request.onreadystatechange = function(){
          if(request.readyState === XMLHttpRequest.DONE)
          {
            if(request.status === 200)
            {
                var body1 = {
                  "type": "update",
                  "args": {
                      "table": "election",
                      "where": {
                          "election_id": {
                              "$eq": election_id
                          }
                      },
                      "$inc": {
                          "total_votes": "1"
                      }
                  }
              };

              var request1 = new XMLHttpRequest();

              request1.onreadystatechange = function(){
                if(request1.readyState === XMLHttpRequest.DONE)
                {
                  if(request1.status === 200)
                  {
                    var body2 = {
                        "type": "insert",
                        "args": {
                            "table": "votes",
                            "objects": [
                                {
                                    "hasura_id": hasura_id_voter,
                                    "election_id": election_id
                                }
                            ]
                        }
                    };

                    var request2 = new XMLHttpRequest();

                    request2.onreadystatechange = function(){
                      if(request2.readyState === XMLHttpRequest.DONE)
                      {
                        if(request2.status === 200)
                        {
                          res.status(200).send(request2.responseText);
                        }
                        else if(request2.status === 400)
                        {
                          res.status(400).send(request2.responseText);
                        }
                        else if(request2.status === 500)
                        {
                          res.status(500).send(request2.responseText);
                        }
                      }
                    }

                    request2.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
                    request2.setRequestHeader('Content-Type','application/json');
                    request2.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
                    request2.send(JSON.stringify(body2));

                  }
                  else if(request1.status === 400)
                  {
                    res.status(400).send(request1.responseText);
                  }
                  else if(request1.status === 500)
                  {
                    res.status(500).send(request1.responseText);
                  }
                }
              }

              request1.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
              request1.setRequestHeader('Content-Type','application/json');
              request1.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
              request1.send(JSON.stringify(body1));
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
        }

        request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
        request.setRequestHeader('Content-Type','application/json');
        request.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
        request.send(JSON.stringify(body));
        }
      }
      else if(request3.status === 400)
      {
        res.status(400).send(request3.responseText);
      }
      else if(request3.status === 500)
      {
        res.status(500).send(request3.responseText);
      }
    }
  }

  request3.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
  request3.setRequestHeader('Content-Type','application/json');
  request3.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
  request3.send(JSON.stringify(body3));

});

app.post('/can-vote',function(req,res){

  var hasura_id = req.body.id;
  var election_id = req.body.eid;

  var body = {
      "type": "select",
      "args": {
          "table": "votes",
          "columns": [
              "*"
          ],
          "where": {
              "$and": [
                  {
                      "hasura_id": {
                          "$eq": hasura_id
                      }
                  },
                  {
                      "election_id": {
                          "$eq": election_id
                      }
                  }
              ]
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

app.post('/can-nominate',function(req,res){

  var hasura_id = req.body.id;

  var body = {
      "type": "select",
      "args": {
          "table": "usertable",
          "columns": [
              "nomination"
          ],
          "where": {
              "hasura_id": {
                  "$eq": hasura_id
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
        if(JSON.parse(request.responseText)[0].nomination === false)
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

app.post('/results',function(req,res){

  var election_id = req.body.eid;

  var body = {
      "type": "select",
      "args": {
          "table": "election",
          "columns": [
              "total_votes"
          ],
          "where": {
              "election_id": {
                  "$eq": "1"
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

        var total = JSON.parse(request.responseText)[0].total_votes.toString();

        var body1 = {
            "type": "select",
            "args": {
                "table": "nomination",
                "columns": [
                    "votes",
                    "hasura_id"
                ],
                "where": {
                    "election_id": {
                        "$eq": "1"
                    }
                }
            }
        };

        var request1 = new XMLHttpRequest();

        request1.onreadystatechange = function(){
          if(request1.readyState === XMLHttpRequest.DONE)
          {
            if(request1.status === 200)
            {

              var max_votes=0,winner_id="";
              var votes=0,id="";
              var percent = 0;
              var data = JSON.parse(request1.responseText);
              for(var i=0;i<data.length;i++)
              {
                id = data[i].hasura_id.toString();
                votes = Number(data[i].votes);
                if(votes > max_votes)
                {
                  max_votes = votes;
                  winner_id = id;
                }
              }

              percent = (((Number(max_votes)/Number(total))*100).toString()).substring(0,5)+"%";;

              var result = {
                "winner":winner_id,
                "total_votes":total,
                "votes_of_winner":max_votes,
                "win_percent":percent
              }

              res.status(200).send(JSON.stringify(result));
            }
            else if(request1.status === 400)
            {
              res.status(400).send(request1.responseText);
            }
            else if(request1.status === 500)
            {
              res.status(500).send(request1.responseText);
            }
          }
        }

        request1.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
        request1.setRequestHeader('Content-Type','application/json');
        request1.setRequestHeader('Authorization','Bearer 9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f');
        request1.send(JSON.stringify(body1));

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

app.listen(8000, function () {
  console.log('Example app listening on port 8080!');
});
