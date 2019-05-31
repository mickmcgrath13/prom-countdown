'use strict';

const express = require('express');
const timer = require('./timer');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


//START THE TIMER
const NUM_SECONDS = process.env.NUM_SECONDS;
timer.start(NUM_SECONDS);