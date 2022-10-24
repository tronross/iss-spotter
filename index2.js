const { nextISSTimesForMyLocation } = require('./iss-promised');

const printFlyOvers = function(flyOvers) {
  for (const fly of flyOvers) {
    const whenFly = new Date(0);
    whenFly.setUTCSeconds(fly.risetime);
    const flyDuration = fly.duration;
    console.log(`The ISS will next fly overhead at ${whenFly} and will be visible for ${flyDuration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then((flyOvers) => {
    printFlyOvers(flyOvers);
  });
 