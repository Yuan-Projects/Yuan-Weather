const axios = require("axios");
const net = require("net");
const utils = require("./helper");

const key = process.env.WEATHER_API_APP_KEY;
const ipGeoKey = process.env.YUANWEATHER_IP_GEO_API_KEY;

const provider = require("./heweather");

async function getWeatherDataByLocation(location) {
  try {
    if (net.isIP(location)) {
      location = await getCityByIpAddress(location);
    } else if (utils.isLongLat(location)) {
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
    //fetch(`https://ipapi.co/${IPAddress}/json/`)
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeoKey}&ip=${IPAddress}`;
    fetch(url)
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
