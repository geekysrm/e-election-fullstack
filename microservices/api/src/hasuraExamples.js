var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

router.route("/").get(function (req, res) {
  res.send("Hello-React")
})

router.route("/get_articles").get(function (req, res) {
  //Fetch all rows from table - articles
  var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var body = {
        "type": "select",
        "args": {
            "table": "article",
            "columns": [
                "content",
                "id",
                "author_id",
                "title"
            ]
        }
    };
    requestOptions["body"] = JSON.stringify(body);
    return fetch(projectConfig.url.data, requestOptions)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.log('Request Failed:' + error);
    });
});

module.exports = router;
