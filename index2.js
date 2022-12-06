const { nextISSTimesForMyLocation } = require('./iss-promised');

// FUNCTION
// printFlyOvers: translates theoretical ISS fly-over times into user-friendly format and prints them to the console
const printFlyOvers = function(flyOvers) {
  for (const fly of flyOvers) {
    const whenFly = new Date(0);
    whenFly.setUTCSeconds(fly.risetime);
    const flyDuration = fly.duration;
    console.log(`The ISS will next fly overhead at ${whenFly} and will be visible for ${flyDuration} seconds`);
  }
};

// FUNCTION
// nextISSTimesForMyLocation: coordinates the retrieval and relaying of theoretical ISS fly-over times
nextISSTimesForMyLocation()
  .then((ISSTimes) => {
    printFlyOvers(ISSTimes);
  });
 