import defaultExport from './config';
const { API_SERVER, API_SERVER_AUTH_KEY, ICON_SERVER } = defaultExport;
import { ajax } from './util';

function getWeatherDataByLocation(location, successFunction) {
  const weatherUrl = `${API_SERVER}/weather?location=${encodeURIComponent(location)}&key=${encodeURIComponent(API_SERVER_AUTH_KEY)}`;
  const airUrl = `${API_SERVER}/air/now?location=${encodeURIComponent(location)}&key=${encodeURIComponent(API_SERVER_AUTH_KEY)}`;
  ajax({
    url: weatherUrl,
    success(weatherRes) {
      ajax({
        url: airUrl,
        success(airRes) {
          const resultData = {
            status: 'unknown error'
          };
          Object.assign(resultData, weatherRes.data.HeWeather6[0], {
            status: 'ok'
          });

          if (airRes.data.HeWeather6 && airRes.data.HeWeather6[0] && airRes.data.HeWeather6[0].status === 'ok') {
            const airData = airRes.data.HeWeather6[0];
            Object.assign(resultData, {
              air_now_city: airData.air_now_city,
              air_now_station: airData.air_now_station
            });
          }
          if (successFunction) {
            successFunction(adaptAPIResponse(resultData));
          }
        }
      })
    },
    fail(e) {
      //debugger
    },
    complete() {
      console.log('completed');
    }
  });
}

function adaptAPIResponse(data) {
  if (data.status !== 'ok') {
    return data;
  }
  const result = {
    status: data.status,
    location: {
      country_name: data.basic.cnty,
      state: data.basic.admin_area,
      city: data.basic.parent_city || data.basic.location
    },
    current_observation: {
      temperature: data.now.tmp,
      weather: data.now.cond_txt,
      icon_url: `${ICON_SERVER}${data.now.cond_code}.png`,
      wind: data.daily_forecast[0].wind_dir + data.daily_forecast[0].wind_sc,
      observation_time: data.update.loc.split(' ')[1]
    },
    forecast: [],
    aqi: []
  };

  if (data.daily_forecast) {
    result.forecast = data.daily_forecast.map(item => {
      const dateArr = item.date.split('-'),
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
        "icon_url": `${ICON_SERVER}${item.cond_code_d}.png`
      };
    });
  }

  if (data.air_now_city) {
    result.current_observation.aqi = data.air_now_city.aqi;
    result.current_observation.pm25 = data.air_now_city.pm25;
    result.current_observation.qlty = data.air_now_city.qlty;
  }

  if (data.air_now_station) {
    result.aqi = data.air_now_station.map(item => {
      return {
        "station": item.air_sta,
        "pm25": item.pm25,
        "aqi": item.aqi
      };
    });
  }

  return result;
}

function getTopCities(callback) {
  const topCitiesUrl = `https://search.heweather.net/top?group=cn&key=${encodeURIComponent(API_SERVER_AUTH_KEY)}`;
  ajax({
    url: topCitiesUrl,
    success(cities) {
      if (cities.statusCode === 200) {
        var citiesArr = cities.data.HeWeather6[0].basic;
        if (Array.isArray(citiesArr)) {
          if (callback) {
            callback(citiesArr);
          }
        }
      }
    },
    fail(e) {
      //debugger
    },
    complete() {
      console.log('completed');
    }
  });
}

function getCitiesByKeyword(keyword, callback) {
  const url = `https://search.heweather.net/find?mode=equal&location=${keyword}&key=${encodeURIComponent(API_SERVER_AUTH_KEY)}`;
  ajax({
    url: url,
    success(cities) {
      if (cities.statusCode === 200) {
        var citiesArr = cities.data.HeWeather6[0].basic;
        if (Array.isArray(citiesArr)) {
          if (callback) {
            callback(citiesArr);
          }
        }
      }
    },
    fail(e) {
      //debugger
    },
    complete() {
      console.log('completed');
    }
  });
}

export {
  getCitiesByKeyword,
  getWeatherDataByLocation,
  adaptAPIResponse,
  getTopCities
};