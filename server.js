const express = require('express');
var unirest = require("unirest");
const PORT = process.env.PORT || 3000;

const app = express();

//serving the html page
app.use(express.static('public'));

app.get('/affected-countries', (req, res) => {
  setTimeout(() => {
    let req1 = unirest("GET", "https://covid-19-data.p.rapidapi.com/help/countries");
    operations(req, res, req1);
  }, 2000);
})

app.get('/total', (req, res) => {
  var req1 = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");
  operations(req, res, req1);
})

app.get('/country/:name', (req, res) => {
  var req1 = unirest("GET", "https://covid-19-data.p.rapidapi.com/report/country/name");
  req1.query({
    "date-format": "YYYY-MM-DD",
    "format": "json",
    "date": "2020-04-01",
    "name": req.params.name
  });

  req1.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "93d2b4fd5cmshdb35ec7d902d15ep160dddjsn38bb7dc65918",
    "useQueryString": true
  });

  req1.end(function (data) {
    if (data.error) {
      res.json({ status: false, message: data.error.message })
    }
    else {
      res.json({ status: true, data: data.body })
    }
  });
})

function operations(req, res, req1) {
  req1.query({
    "format": "json"
  });

  req1.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "93d2b4fd5cmshdb35ec7d902d15ep160dddjsn38bb7dc65918",
    "useQueryString": true
  });

  req1.end(function (data) {
    // if (data.error) throw new Error(data.error);
    if (data.error) {
      console.log(data.error);
    }
    res.json({
      status: true,
      data: data.body
    })
  });
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})


