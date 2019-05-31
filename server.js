'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const timer = require('./timer');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ROOT
app.get('/', (req, res) => {
  res.send({up: true});
});

// METRICS
app.get('/metrics', (req, res) => {
  res
  .set('Content-Type', timer.getMetricsContentType())
  .send(timer.getMetrics());
});

// HANDLE ALERT WEBHOOK
app.post('/alert', (req, res) => {
  console.log("Got an alert!");
  console.log(req.body);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


//START THE TIMER
const NUM_SECONDS = process.env.NUM_SECONDS;
timer.start(NUM_SECONDS);