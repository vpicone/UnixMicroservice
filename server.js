// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

app.get("/:time", function (req, res) {
  //Test for unix time
  const unix = moment.unix(req.params.time);
  if(unix.isValid()) {
    res.send({'unix':unix.format('X'), 'natural':unix.format('MMMM D, YYYY')})
  }
  
  //test for standard time
  const time = moment(req.params.time);
  if (time.isValid()) {
    res.send({'unix':time.format('X'), 'natural':time.format('MMMM D, YYYY')})
  }
  
  //send null if neither are true
  res.send({'unix':null, 'natural':null});
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
