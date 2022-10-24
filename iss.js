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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}
  `, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body); // parse
    if (flyOverTimes.message === false) {
      const msg = `The attempt to fetch the location data for the IP address: ${ip} failed. Server message says ${locationObj.message}`;
      callback(Error(msg), null);
      return;
    }
    
    // if (locationObj.success === false) {
    //   const msg = `The attempt to fetch the location data for the IP address: ${ip} failed. Server message says ${locationObj.message}`;
    //   callback(Error(msg), null);
    //   return;
    callback(null, flyOverTimes);
    //  console.log(flyOverTimes);
    
  });
};
  

const cb = function(error, flyOverTimes) {
  if (error) {
    console.log(error);
  } else if (flyOverTimes) {
    console.log(flyOverTimes);
  }
};

fetchISSFlyOverTimes({ latitude: 11143.653226, longitude: -79.3831843 }, cb);
// fetchCoordsByIP('65.110.215.128', cb);



module.exports = {
                   fetchMyIP,
                   fetchCoordsByIP,
                 };