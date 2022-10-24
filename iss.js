const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // let IP = null;
    // let err = null;
    
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
  

//  const cb = function(error, location) {
//   if (error) {
//    console.log(error);
//   } else if (location) {
//    console.log(location);
//   }
// };

// fetchCoordsByIP('65.110.215.128', cb);



module.exports = {
                   fetchMyIP,
                   fetchCoordsByIP,
                 };