const axios = require("axios");
const net = require("net");

const key = process.env.WEATHER_API_APP_KEY;
let provider = require("./visualcrossing");

async function getWeatherDataByLocation(location) {
  try {
    if (net.isIP(location)) {
      location = await getCityByIpAddress(location).then();
    } else if (isLatLon(location)) {
      location = await getCityByGeocode(location);
    }
    const data = await provider
      .getWeatherDataByLocation(location, key)
      .then((res) => {
        const converted = provider.adaptAPIResponse(res);
        return converted;
      });
    return data;
  } catch (error) {
    throw error;
  }
}

function isLatLon(str) {
  return str.indexOf(",") > 0;
}

const geocodeURL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={latitude}&longitude={longitude}&localityLanguage=en";
function getCityByGeocode(latlon) {
  const [latitude, longitude] = latlon.split(",");
  var url = geocodeURL
    .replace("{latitude}", latitude)
    .replace("{longitude}", longitude);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(response.data.city);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getCityByIpAddress(IPAddress) {
  return new Promise((resolve, reject) => {
    fetch(`https://ipapi.co/${IPAddress}/json/`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.city);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

module.exports = {
  getWeatherDataByLocation,
  getCityByGeocode,
  getCityByIpAddress,
};
