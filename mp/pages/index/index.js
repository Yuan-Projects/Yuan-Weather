//index.js
//获取应用实例
const app = getApp();
import { normalizeLocation, normalizeDailyDate, getLevel, getCurrentPage } from '../../utils/util';
import { getWeatherDataByLocation } from '../../utils/heweather';

Page({
  data: {
    city: '',
    currentWeatherImgSrc: '',
    currentWeatherImgAlt: '',
    currentTemp: '',
    currentWeather: '',
    observationTime: '',
    temperatureRange: '',
    airQualityLevel: '',
    airQualityValue: '',
    airQualityPM25Value: '',
    forecast: [],
    aqi: []
  },
  bindViewCities: function() {
    wx.navigateTo({
      url: '../cities/cities'
    });
  },
  onLoad: function () {
    getWeatherDataByLocation(getCurrentPage().options.cid || 'auto_ip', (data) => {
      const { location, current_observation, forecast, aqi } = data;
      const { icon_url, weather, temperature, observation_time, pm25 } = current_observation;
      this.setData({
        city: normalizeLocation(location.state, location.city),
        currentTemp: `${temperature}${isNaN(temperature) ? '' : '℃'}`,
        currentWeather: weather,
        observationTime: observation_time,
        temperatureRange: `${forecast[0].low_temperature} ~ ${forecast[0].high_temperature}℃`,
        airQualityValue: current_observation.aqi,
        airQualityLevel: `air_quality_${getLevel(current_observation.aqi)}`,
        airQualityPM25Value: pm25,
        forecast: forecast.map(item => {
          item.date = normalizeDailyDate(item.date);
          return item;
        }),
        aqi: aqi.map(item => {
          item.aqiLevel = getLevel(item.aqi);
          return item;
        })
      })
    });
  }
})
