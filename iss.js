const request = require('request');

// FUNCTION
// fetchMyIP: retrieves IP address for WAN
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
// fetchCoordsByIP: retrieves location data using IP address
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
// fetchISSFlyOverTimes: retrieves (theoretical) ISS fly-over times from a deprecated API using location data
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

    const flyOvers = JSON.parse(body).response; // parse
    callback(null, flyOvers);
    
  });
};
  
// FUNCTION
// nextISSTimesForMyLocation: chains functions to retrieve (theoretical) ISS fly-over times
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOvers) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOvers);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation, };