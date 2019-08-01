const net = require('net');
const axios = require('axios');
const config = require('../config.js');

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || config.GA_TRACKING_ID;
const API_SERVER_AUTH_KEY = process.env.WUNDERGROUND_API || config.WUNDERGROUND_API;
const API_SERVER = 'http://api.wunderground.com/api/' + API_SERVER_AUTH_KEY + '/geolookup/conditions/forecast/q/{location}';

function getWeatherDataByLocation(location) {
  isLogLat(location);
  let locationQueryStr = isLogLat(location) ? convertLogLat(location) + '.json' : isIPAddr(location) ? 'autoip.json?geo_ip=' + location : location + '.json';
  console.log(API_SERVER.replace('{location}', locationQueryStr));
  return axios.get(API_SERVER.replace('{location}', locationQueryStr)).then((res) => {
    let resultData = {
      status: 'unknown error'
    };
    //console.log('res', res.data);
    //console.log(res.data.response.results);
    if (Array.isArray(res.data.response.results)) {
      // TODO more than one location returned.
      Object.assign(resultData, {status: 'Ambiguous Results'});
    } else {
      //console.log('Found:', res.data.status);
      Object.assign(resultData, res.data, { status: 'ok' });
    }
    return adaptAPIResponse(resultData);
  });
}

function adaptAPIResponse(data) {
  if (data.status !== 'ok') {
    return data;
  }
  return {
    "status": data.status,
    "location": {
      "country_name": data.location.country_name,
      "state": data.location.state,
      "city": data.location.city
    },
    "current_observation": {
      "temperature": data.current_observation.temperature_string,
      "weather": data.current_observation.weather,
      "icon_url": data.current_observation.icon_url.replace('http://', '//'),
      "wind": data.current_observation.wind_string,
      //"aqi": "", // NA
      //"pm25": "", // NA
      "observation_time": data.current_observation.observation_time
    },
    "aqi": [],
    "GA_TRACKING_ID": GA_TRACKING_ID,
    "forecast": data.forecast.simpleforecast.forecastday.map((item) => {
      return {
        "date": {
          "year": item.date.year,
          "month": item.date.month,
          "day": item.date.day,
          "weekday": item.date.weekday_short
        },
        "high_temperature": item.high.celsius,
        "low_temperature": item.low.celsius,
        "condition": item.conditions,
        "icon_url": item.icon_url.replace('http://', '//')
      };
    })
  };
}

function isIPAddr(input) {
  return Boolean(net.isIP(input));
}

function isLogLat(input) {
  //console.log('input:', input);
  let arr = input.split(',');
  if (arr.length !== 2) return false;
  return isNumeric(arr[0]) && isNumeric(arr[1]);
}

function convertLogLat(input) {
  let arr = input.split(',');
  return arr[1] + ',' + arr[0];
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
  getWeatherDataByLocation,
  adaptAPIResponse
};