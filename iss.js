const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


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

//  const cb = function(error, IP) {
//   if (error) {
//    console.log(error);
//   } else if (IP) {
//    console.log(IP);
//   }
// };

// fetchMyIP(cb);



module.exports = { fetchMyIP };