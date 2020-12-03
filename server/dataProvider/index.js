const axios = require('axios');
const config = require('../config.js');
let provider = null;
if (config.PROVIDER === 'heweather') {
  provider = require('./heweather.js')
} else {
  provider = require('./yikeyun.js');
}

function getWeatherDataByLocation(location) {
  return new Promise((resolve, reject) => {
    provider.getWeatherDataByLocation(location).then((res) => {
      if (res.status === 'ok' && res.location.country_name === '中国') {
        resolve(res);
      } else {
        throw new Error(res.status);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  getWeatherDataByLocation
};