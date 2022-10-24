// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');



fetchCoordsByIP('65.110.215.128', (error, coordinates) => {
  if (error) {
    console.log("It failed: " , error);
    return;
  }
  console.log('Returned coordinates:' , coordinates);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

