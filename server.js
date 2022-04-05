// server.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// returns object with unix and utc keys
app.get("/api/:date?", function (req, res) {
  let paramDate = req.params?.date || new Date();

  let convertedDate = String(paramDate).includes('-') ? paramDate : parseInt(paramDate);
  convertedDate = new Date(convertedDate);

  console.log('convertedDate', convertedDate);
  console.log('isnan', isNaN(convertedDate));
  if(isNaN(convertedDate)){
    res.status(500).send({ error: "Invalid Date" });
  }

  res.json({
    unix: convertedDate.getTime(),
    utc:  convertedDate.toUTCString()
  });

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
