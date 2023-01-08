import type { DailyForecastDateInterface, WeatherDataInterface } from "./types";

export const getWeatherDataByLocation = (
  location: string,
  key: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      location.trim()
    )}?unitGroup=metric&include=events%2Cdays%2Chours%2Calerts%2Ccurrent&key=${key}&contentType=json`;
    //console.log("URL:", url);
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const parseDateStr2Obj = (dateString: string): DailyForecastDateInterface => {
  const arr = dateString.split("-");
  return {
    year: arr[0],
    month: arr[1],
    day: arr[2],
    weekday: "",
  };
};

const icon_url = "https://yuan-projects.github.io/WeatherIcons/PNG/1st%20Set%20-%20Color/<ICON>.png";

export const adaptAPIResponse = (weatherData: any): WeatherDataInterface => {
  const data: WeatherDataInterface = {
    status: "ok",
    location: {
      country_name: "",
      state: "",
      city: weatherData.address,
    },
    current_observation: {
      temperature: weatherData.currentConditions.temp,
      weather: weatherData.currentConditions.conditions,
      icon_url: icon_url.replace('<ICON>', weatherData.currentConditions.icon),
      wind: weatherData.currentConditions.windspeed, // todo: dir
      observation_time: weatherData.currentConditions.datetime,
    },
    forecast: weatherData.days.map((day: any) => {
      return {
        date: parseDateStr2Obj(day.datetime),
        high_temperature: day.tempmax,
        low_temperature: day.tempmin,
        condition: day.conditions,
        icon_url: icon_url.replace('<ICON>', day.icon)
      };
    }),
    aqi: [],
    GA_TRACKING_ID: "",
  };

  return data;
};
