const { nextISSTimesForMyLocation } = require('./iss');

const printFlyOvers = function(flyOvers) {
  for (const fly of flyOvers) {
    const whenFly = new Date(0);
    whenFly.setUTCSeconds(fly.risetime);
    const flyDuration = fly.duration;
    console.log(`The ISS will next fly overhead at ${whenFly} and will be visible for ${flyDuration} seconds`);
  }
};

nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printFlyOvers(flyOvers);
});