const request = require('request');

// FUNCTION
// fetchMyIP:
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body); // parse
    const ip = IP.ip;
    callback(null, ip);
  });

};

// FUNCTION
// fetchCoordsByIP:
const fetchCoordsByIP = function(ip, callback) {
 
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    const locationObj = JSON.parse(body); // parse
    if (locationObj.success === false) {
      const msg = `The attempt to fetch the location data for the IP address: ${ip} failed. Server message says ${locationObj.message}`;
      callback(Error(msg), null);
      return;
    }
    const location = {};
    location.latitude = locationObj.latitude;
    location.longitude = locationObj.longitude;
    callback(null, location);
  });

};

// FUNCTION
// fetchISSFlyOverTimes:
  const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}
  `, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times.`;
      callback(msg, null);
      return;
    }

    const flyOverTimes = JSON.parse(body); // parse
    const flyOvers = flyOverTimes.response;
    callback(null, flyOvers);
    
  });
};
  

// const cb = function(error, flyOvers) {
//   if (error) {
//     console.log(error);
//   } else if (flyOvers) {
//     console.log(flyOvers);
//   }
// };

// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, cb);
// // fetchCoordsByIP('65.110.215.128', cb);



module.exports = {
                   fetchMyIP,
                   fetchCoordsByIP,
                   fetchISSFlyOverTimes,
                 };