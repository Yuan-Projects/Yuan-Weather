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
    }).then(successCallback, errorCallback).done();
  }
}

HeWeather.cityAPIUrl = "https://api.heweather.com/x3/weather?cityid={cityId}&key={key}";

module.exports = new HeWeather(config.vendorOptions.key);