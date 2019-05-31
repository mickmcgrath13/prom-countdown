const helpers = require('./helpers');

// prometheus things
const promClient = require('prom-client');
const g = new promClient.Gauge({
  name: 'seconds',
  help: 'The Final Countdown!',
  labelNames: []
});



let timerId;
let remaining = 0;
let running = false;

let timer = {
  stop: () => {
    console.log("STOP");
    clearInterval(timerId);
    running = false;
  },
  getRemaining: () => {
    return remaining;
  },
  getMetrics: () => {
    return promClient.register.metrics();
  },
  getMetricsContentType: () => {
    return promClient.register.contentType;
  },
  setRemaining: (r) => {
    remaining = parseInt(r,10);
    g.set(remaining);
  }
};

timer.start = (numSeconds=0) => {
  if(running){
    console.log("ALREADY RUNNING");
    return false;
  }
  running = true;


  console.log("START: ", numSeconds);
  const startDate = new Date();
  timer.setRemaining(numSeconds);

  // Update the count down every 1 second
  timerId = setInterval(() => {
    const secondsSinceStart = helpers.date_diff_seconds(startDate, new Date);
    timer.setRemaining(numSeconds - secondsSinceStart);
    console.log("remaining: ", timer.getRemaining());
    if (timer.getRemaining() <= 0) {
      console.log("FINISHED", this);
      timer.setRemaining(0);
      timer.stop();
    }
  }, 1000);
}

module.exports = timer;