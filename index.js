// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// response if the user doesn't enter a date parameter
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
});

app.get("/api/:date", function(req, res) {
  let date = req.params.date;

  //check to see if it's a number to determine whether or not the user entered the utc or unix format
  if (isNaN(Number(date)) && new Date(date).toUTCString() !== "Invalid Date") { //this means it's a valid utc format
    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString()
    })
  } else if (!isNaN(Number(date)) && date.length >= 13) { //this means it's a valid unix format
    return res.json({
      unix: Number(date),
      utc: new Date(Number(date)).toUTCString()
    })
  } else { //this means it's not valid for either format!
    return res.json({ error: "Invalid Date" })
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
