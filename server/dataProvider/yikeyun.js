/**
 * Yikeyun Weather API
 * Live weather: http://www.tianqiapi.com/index/doc?version=v6
 * Weather forecast: http://www.tianqiapi.com/index/doc?version=v1
 */
const axios = require('axios');
const config = require('../config.js');

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || config.GA_TRACKING_ID;
const API_SERVER = 'https://tianqiapi.com/api';

function getWeatherDataByLocation(location, key = '', lang = 'zh', unit = 'm') {
  let resultObj = null;
  const weatherUrl = `${API_SERVER}?version=v6&appid=${config.YIKEYUN.appid}&appsecret=${config.YIKEYUN.appsecret}`;
  const sevenDaysForecastUrl = `${API_SERVER}?version=v1&&appid=${config.YIKEYUN.appid}&appsecret=${config.YIKEYUN.appsecret}`;

  return axios.all([axios.get(weatherUrl), axios.get(sevenDaysForecastUrl)])
  .then(axios.spread(function (weatherRes, forecastRes) {
    let resultData = {
      status: 'unknown error'
    };
    Object.assign(resultData, weatherRes.data, { forecast: forecastRes.data.data }, {
      status: 'ok'
    });
    console.log('ok:');
    return adaptAPIResponse(resultData);
  }));
}

function adaptAPIResponse(data) {
  if (data.status !== 'ok') return data;
  return {
    status: data.status,
    location: {
      country_name: data.country,
      state: '',
      city: data.city
    },
    current_observation: {
      aqi: data.air,
      pm25: data.air_pm25,
      qlty: data.air_level,
      temperature: data.tem,
      weather: data.wea,
      icon_url: getWeatherIconURL(data.wea_img),
      wind: data.win + data.win_speed,
      observation_time: data.update_time
    },
    forecast: data.forecast.map(item => {
      var dateArr = item.date.split('-'),
          origYear = parseInt(dateArr[0]),
          origMonth = parseInt(dateArr[1]),
          origDay = parseInt(dateArr[2]);

      return {
        "date": {
          "year": origYear,
          "month": dateArr[1],
          "day": origDay,
          "weekday": (new Date(origYear, origMonth - 1, origDay)).getDay()
        },
        "high_temperature": item.tem1,
        "low_temperature": item.tem2,
        "condition": item.wea,
        "icon_url": getWeatherIconURL(item.wea_img)
      };
    }),
    aqi: [], // This free API service does not support AQI data of each station.
    GA_TRACKING_ID: GA_TRACKING_ID
  };
}

function getWeatherIconURL(text) {
  const map = {
    'qing': 100,
    'xue': 499,
    'lei': 302,
    'shachen': 507,
    'wu': 501,
    'bingbao': 304,
    'yun': 101,
    'yu': 399,
    'yin': 104
  };
  return '/images/cond_icon/' + map[text] + '.png';
}

module.exports = {
  getWeatherDataByLocation,
  adaptAPIResponse
};