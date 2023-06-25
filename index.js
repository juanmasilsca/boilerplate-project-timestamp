// index.js
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

app.get('/api', (req, res) => {
  const date = new Date();
  res.json(prepareJson(date));
});

app.get('/api/:date', function (req, res) {
  const date = req.params.date;
  res.json(prepareJson(req.params.date));
});

const prepareJson = (date_string) => {
  let unix = Date.parse(date_string);
  let utc;
  if (isNaN(unix)) { // case '1451001600000'
    unix = Number(date_string); //1451001600000
    utc = new Date(unix).toUTCString();// 'Fri, 25 Dec 2015 00:00:00 GMT'
    if (isNaN(unix)) { // like 'dfdfgfg' or '2022-31-12'
      return {error: "Invalid Date"};
    }
    return {unix: unix, utc: utc};
  } 
  utc = new Date(date_string).toUTCString();
  return {unix: unix, utc: utc};
}

const PORT = process.env.PORT || 3000;

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
