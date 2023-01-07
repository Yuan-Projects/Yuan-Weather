const assert = require("assert");
const config = require("../config.js");
const dataProvider = require("../dataProvider/index.js");

var sample = {
  location: {
    country_name: "",
    state: "",
    city: "",
  },
  current_observation: {
    temperature: "",
    weather: "",
    icon_url: "",
    wind: "",
    aqi: "",
    pm25: "",
    observation_time: "",
  },
  forecast: [
    {
      date: {
        year: "",
        month: "",
        day: "",
        weekday: "",
      },
      high_temperature: "",
      low_temperature: "",
      condition: "",
      icon_url: "",
    },
  ],
  aqi: [
    {
      station: "",
      pm25: "",
      aqi: "",
    },
  ],
};

describe("HeWeather API Tests", function () {
  it("[setup]This project is properly configured", () => {
    assert.ok(config.API_SERVER_AUTH_KEY, "HeWeather API key has been set up");
  });

  it("#1 Get weather infomation in Yantian District, Shenzhen, China", function (done) {
    dataProvider
      .getWeatherDataByLocation("yantian")
      .then(function (data) {
        console.log("sddddd:", data);
        assert.ok(
          data.current_observation.temperature,
          "current temperature returned."
        );
        assert.ok(
          data.current_observation.weather,
          "current weather returned."
        );
        assert.ok(
          data.current_observation.icon_url,
          "current icon_url returned."
        );
        assert.ok(data.current_observation.wind, "current wind returned.");
        assert.ok(
          data.current_observation.observation_time,
          "current observation_time returned."
        );

        assert.ok(data.forecast.length, "There are a few pieces of forecast.");
        done();
      })
      .catch(done);
  });

  let perthFunc = function (done, query) {
    dataProvider
      .getWeatherDataByLocation(query)
      .then(function (data) {
        console.log("sddddd 22:", data);
        /*
        assert.equal(data.location.country_name, "Australia");
        assert.equal(data.location.state, "WAS");
        assert.equal(data.location.city, "Perth");
        */

        assert.ok(
          data.current_observation.temperature,
          "current temperature returned."
        );
        assert.ok(
          data.current_observation.weather,
          "current weather returned."
        );
        assert.ok(
          data.current_observation.icon_url,
          "current icon_url returned."
        );
        assert.ok(data.current_observation.wind, "current wind returned.");
        assert.ok(
          data.current_observation.observation_time,
          "current observation_time returned."
        );

        assert.ok(data.forecast.length, "There are a few pieces of forecast.");
        done();
      })
      .catch(done);
  };

  it("#1 Get weather infomation in Perth, Western Australia by IP address", (done) => {
    perthFunc(done, "1.127.49.41");
  });

  it("#1 Get weather infomation in Perth, Western Australia by geolocation", (done) => {
    // Note when specifying a geolocation, the format should be `latitude,longitude` for wunderground API
    // But here longitude comes first because we'll revert the orders in wunderground.js
    perthFunc(done, "-31.953512,115.857048");
  });
});
