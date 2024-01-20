// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isValidDate = (dateStr) => {
  return !isNaN(new Date(dateStr));
}

app.get("/api/:date?", function (req, res) {
  const dateString = req.params?.date;
  if (!dateString){
    const utcDate = new Date().toUTCString();
    const unixDate = new Date().getTime();
    res.json({
      unix: unixDate,
      utc: utcDate
    });
    return ;
  }
  const isTimestamp = /^\d+$/.test(dateString);
  if (isTimestamp){
    const timestamp = parseInt(dateString, 10);
    const inputDate = new Date(timestamp);
    const utcDate = inputDate.toUTCString();
    const unixDate = inputDate.getTime();
    res.json({
      unix: unixDate,
      utc: utcDate
    })
  } else if (isNaN(new Date(dateString))){
    res.json({
      error: "Invalid Date"
    })
  } else {
    const inputDate = new Date(dateString);
    const utcDate = inputDate.toUTCString();
    const unixDate = inputDate.getTime();
    res.json({
      unix: unixDate,
      utc: utcDate
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
