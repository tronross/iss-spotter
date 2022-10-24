const request = require('request-promise-native');

// FUNCTION
// fetchMyIP: retrieves IP address for WAN
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

// FUNCTION
// fetchCoordsByIP: retrieves location data using IP address
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip; // parse
  return request(`https://ipwho.is/${ip}`);
};

// FUNCTION
// fetchISSFlyOverTimes: retrieves (theoretical) ISS fly-over times from a deprecated API using location data
const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body);
  const { latitude, longitude } = coords;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
};

// FUNCTION
// nextISSTimesForMyLocation: chains functions to retrieve (theoretical) ISS fly-over times
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log("It did not work: ", error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };
