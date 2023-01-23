// documentation: https://dev.qweather.com/docs/api/
const GA_TRACKING_ID = process.env.YUANWEATHER_GA_TRACKING_ID || "";
const API_SERVER = "https://devapi.qweather.com";

async function getWeatherDataByLocation(
  location,
  key = "",
  lang = "zh",
  unit = "m"
) {
  try {
    const geoUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}&lang=${lang}&number=1`;

    const geoRes = await fetch(geoUrl).then((data) => data.json());
    if (String(geoRes.code) !== "200") {
      throw new Error("Weather API Server Error");
    }
    if (!geoRes.location.length) {
      throw new Error(`Could not find the city: ${location}`);
    }
    location = geoRes.location[0].id;
    console.log("after lookup:", location);

    const weatherUrl = `${API_SERVER}/v7/weather/now?location=${location}&key=${key}&lang=${lang}&unit=${unit}`;
    const airUrl = `${API_SERVER}/v7/air/now?location=${location}&key=${key}&lang=${lang}&unit=${unit}`;
    const forecast7Days = `${API_SERVER}/v7/weather/3d?location=${location}&key=${key}&lang=${lang}&unit=${unit}`;

    const [weatherRes, forecastRes, airRes] = await Promise.all([
      fetch(weatherUrl).then((data) => data.json()),
      fetch(forecast7Days).then((data) => data.json()),
      fetch(airUrl).then((data) => data.json()),
    ]);

    if (weatherRes.code != "200" || forecastRes.code != "200") {
      throw new Error("Weather API Server Error");
    }

    return {
      geoLocation: {
        ...geoRes.location[0],
      },
      now: {
        ...weatherRes.now,
      },
      forecast: [...forecastRes.daily],
      air: {
        ...(airRes.now || {}),
      },
      aqiStations: [...(airRes.station ? airRes.station : [])],
    };
  } catch (e) {
    throw e;
  }
}

function adaptAPIResponse(data) {
  var result = {
    status: "ok",
    location: {
      country_name: data.geoLocation.country,
      state: data.geoLocation.adm1,
      city: data.geoLocation.name,
    },
    current_observation: {
      temperature: data.now.temp,
      weather: data.now.text,
      icon_url: "/images/cond_icon/" + data.now.icon + ".png",
      wind: data.now.windDir + data.now.windScale,
      observation_time: data.now.obsTime,
    },
    forecast: [],
    aqi: [],
    GA_TRACKING_ID: GA_TRACKING_ID,
  };

  if (data.forecast) {
    result.forecast = data.forecast.map((item) => {
      var dateArr = item.fxDate.split("-"),
        origYear = parseInt(dateArr[0]),
        origMonth = parseInt(dateArr[1]),
        origDay = parseInt(dateArr[2]);

      return {
        date: {
          year: origYear,
          month: dateArr[1],
          day: origDay,
          weekday: new Date(origYear, origMonth - 1, origDay).getDay(),
        },
        high_temperature: item.tempMax,
        low_temperature: item.tempMin,
        condition: item.textDay,
        icon_url: "/images/cond_icon/" + item.iconDay + ".png",
      };
    });
  }

  if (data.air) {
    result.current_observation.aqi = data.air.aqi;
    result.current_observation.pm25 = data.air.pm2p5;
    result.current_observation.qlty = data.air.category;
  }

  if (data.aqiStations) {
    result.aqi = data.aqiStations.map((item) => {
      return {
        station: item.name,
        pm25: item.pm2p5,
        aqi: item.aqi,
      };
    });
  }

  return result;
}

module.exports = {
  getWeatherDataByLocation,
  adaptAPIResponse,
};
