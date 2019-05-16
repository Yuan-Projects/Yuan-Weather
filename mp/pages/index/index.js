//index.js
//获取应用实例
const app = getApp();
import { normalizeLocation } from '../../utils/util';
import { getWeatherDataByLocation } from '../../utils/heweather';

Page({
  data: {
    city: ''
  },
  onLoad: function () {
    this.setData({
      city: app.globalData.currentCity
    });
    getWeatherDataByLocation('auto_ip', (data) => {
      const { location, current_observation, forecast, aqi } = data;
      const { icon_url, weather, temperature, observation_time, pm25 } = current_observation;

      this.setData({
        city: normalizeLocation(location.state, location.city)
      })
    });
  }
})
