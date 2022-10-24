// index.js
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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




// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, flyOvers) => {
//     if (error) {
//       console.log("It failed: " , error);
//       return;
//     }
//     console.log('Returned fly overs:' , flyOvers);
//   });



// fetchCoordsByIP('65.110.215.128', (error, coordinates) => {
//   if (error) {
//     console.log("It failed: " , error);
//     return;
//   }
//   console.log('Returned coordinates:' , coordinates);
// });


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

