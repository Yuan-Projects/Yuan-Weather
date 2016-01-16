let config = require('./config.js');

function fetchDataByCityId(cityId, successCallback, errorCallback) {
  let url = config.cityAPIUrl.replace("{cityId}", window.encodeURIComponent(cityId));
  return fetch(url).then(res => {
    if(res.headers.get("content-type") && res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
      return res.json();
    } else {
      throw new TypeError();
    }
  }).then(successCallback, errorCallback).done();
}

module.exports = {
  fetchDataByCityId
};