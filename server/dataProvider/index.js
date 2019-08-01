const axios = require('axios');
const heweather = require('./heweather.js');
const wunderground = require('./wunderground.js');

function getWeatherDataByLocation(location) {
  return new Promise((resolve, reject) => {
    heweather.getWeatherDataByLocation(location).then((res) => {
      //console.log('ok 1', res)
      if (res.status === 'ok' && res.location.country_name === '中国') {
        resolve(res);
      } else {
        throw new Error(res.status);
      }
    }).catch((err) => {
      console.log('erro 1', err)
      wunderground.getWeatherDataByLocation(location).then((res) => {
        console.log('ok 2')
        resolve(res);
      }).catch((e) => {
        console.log('error 2', e)
        reject(e);
      });
    });
  });
}

module.exports = {
  getWeatherDataByLocation
};