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

const geocodeURL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={latitude}&longitude={longitude}&localityLanguage=en';
function getCityByGeocode(latlon) {
  const [latitude, longitude] = latlon.split(',');
  var url = geocodeURL.replace('{latitude}', latitude).replace('{longitude}', longitude);
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    });
  });
}

module.exports = {
  getWeatherDataByLocation,
  getCityByGeocode
};