var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

var XMLHttpRequest = require('xhr2');

router.route("/").get(function (req, res) {
  res.send("Hello-React")
})

router.route("/get_articles").get(function (req, res) {
  //Fetch all rows from table - articles
  /*
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 1,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    res.json(JSON.parse(body))
  });
*/

  var body = {
    "type": "select",
    "args": {
        "table": "article",
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
          res.status(200).json(JSON.parse(body));
        }
        else if(request.status === 500)
        {
          res.status(500).send('Sorry, Server Error !');
        }
      }
    };

    request.open('POST','https://data.artfully11.hasura-app.io/v1/query',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify(body));

});

module.exports = router;
