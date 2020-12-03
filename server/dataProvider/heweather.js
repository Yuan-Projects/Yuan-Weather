// documentation: https://dev.qweather.com/docs/legacy/api/s6
const axios = require('axios');
const config = require('../config.js');

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || config.GA_TRACKING_ID;
const API_SERVER_AUTH_KEY = process.env.API_SERVER_AUTH_KEY || config.API_SERVER_AUTH_KEY;
const API_SERVER = 'https://free-api.heweather.com/s6';

function getWeatherDataByLocation(location, key = '', lang = 'zh', unit = 'm') {
  let resultObj = null;
  const weatherUrl = `${API_SERVER}/weather?location=${location}&key=${API_SERVER_AUTH_KEY}`;
  const airUrl = `${API_SERVER}/air/now?location=${location}&key=${API_SERVER_AUTH_KEY}`;

  return axios.all([axios.get(weatherUrl), axios.get(airUrl)])
  .then(axios.spread(function (weatherRes, airRes) {
    // Both requests are now complete
    //console.log('weather', weatherRes.data.HeWeather6);
    //console.log('air', airRes.data.HeWeather6);
    let resultData = {
      status: 'unknown error'
    };
    if (!weatherRes || !airRes || !weatherRes.data || !airRes.data || !weatherRes.data.HeWeather6 || !weatherRes.data.HeWeather6[0] || weatherRes.data.HeWeather6[0].status !== 'ok' || !airRes.data.HeWeather6[0] || airRes.data.HeWeather6[0].status !== 'ok') {
      return resultData;
    }
    Object.assign(resultData, weatherRes.data.HeWeather6[0], {
      status: 'ok'
    });

    if (airRes.data.HeWeather6 && airRes.data.HeWeather6[0] && airRes.data.HeWeather6[0].status === 'ok') {
      let airData = airRes.data.HeWeather6[0];
      Object.assign(resultData, {
        air_now_city: airData.air_now_city,
        air_now_station: airData.air_now_station
      });
    }
    return adaptAPIResponse(resultData);
  }));
}

function adaptAPIResponse(data) {
  if (data.status !== 'ok') {
    return data;
  }
  var result = {
    status: data.status,
    location: {
      country_name: data.basic.cnty,
      state: data.basic.admin_area,
      city: data.basic.parent_city || data.basic.location
    },
    current_observation: {
      temperature: data.now.tmp,
      weather: data.now.cond_txt,
      icon_url: '/images/cond_icon/' + data.now.cond_code + '.png',
      wind: data.daily_forecast[0].wind_dir + data.daily_forecast[0].wind_sc,
      observation_time: data.update.loc.split(' ')[1]
    },
    forecast: [],
    aqi: [],
    GA_TRACKING_ID: GA_TRACKING_ID
  };

  if (data.daily_forecast) {
    result.forecast = data.daily_forecast.map((item) => {
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
        "high_temperature": item.tmp_max,
        "low_temperature": item.tmp_min,
        "condition": item.cond_txt_d,
        "icon_url": '/images/cond_icon/' + item.cond_code_d + '.png'
      };
    });
  }

  if (data.air_now_city) {
    result.current_observation.aqi = data.air_now_city.aqi;
    result.current_observation.pm25 = data.air_now_city.pm25;
    result.current_observation.qlty = data.air_now_city.qlty; // TODO
  }

  if (data.air_now_station) {
    result.aqi = data.air_now_station.map((item) => {
      return {
        "station": item.air_sta,
        "pm25": item.pm25,
        "aqi": item.aqi
      };
    });
  }

  return result;
}

module.exports = {
  getWeatherDataByLocation,
  adaptAPIResponse
};