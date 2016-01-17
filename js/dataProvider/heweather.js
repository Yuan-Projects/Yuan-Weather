let config = require('../../config.js');

class HeWeather {
  constructor(key) {
    this.cityAPIUrl = HeWeather.cityAPIUrl.replace("{key}", key);
  }
  
  fetchDataByCityId(cityId, successCallback, errorCallback) {
    let url = this.cityAPIUrl.replace("{cityId}", window.encodeURIComponent(cityId));
    return fetch(url).then(res => {
      if(res.headers.get("content-type") && res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
        return res.json();
      } else {
        throw new TypeError();
      }
    }).then(this.parseCityData).then(successCallback, errorCallback).done();
  }
  
  parseCityData(jsonData) {
    
    let result = {};
    let rawData = jsonData["HeWeather data service 3.0"];
    if (rawData && rawData[0] && rawData[0].status === "ok") {
      let data = rawData[0];
      result.lastBuildDate = data.basic.update.loc;
      result.location = {
        "cityId": data.basic.id,
        "cityName": data.basic.city,
        "country": data.basic.cnty
      };
      result.units = {
        "pressure": "pa", // TODO
        "speed": "Kmph",
        "temperature": "C"
      };
      result.weather = {};
      result.weather.today = {
        "temperature": data.now.tmp,
        "conditionText": data.now.cond.txt,
        "conditionCode": data.now.cond.code,
        "lowTemperature": data.daily_forecast[0].tmp.min,
        "highTemperature": data.daily_forecast[0].tmp.max,
        "daylightCondition": data.daily_forecast[0].cond.txt_d,
        "tonightCondition": data.daily_forecast[0].cond.txt_n,
        "temperatureFeel": data.now.fl,
        "humidity": data.now.hum,
        "visibility": data.now.vis,
        "pressure": data.now.pres,
        "windSpeed": data.now.wind.spd,
        "windDirection": data.now.wind.dir,
        "uvIndex": data.suggestion.uv.brf,
        "aqi": data.aqi.city.aqi,
        "aqiLevel": data.aqi.city.qlty
      };
      return result;
    } else {
      throw new TypeError();
    }
  }
}

HeWeather.cityAPIUrl = "https://api.heweather.com/x3/weather?cityid={cityId}&key={key}";

module.exports = new HeWeather(config.vendorOptions.key);