"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptAPIResponse = exports.getWeatherDataByLocation = void 0;
const getWeatherDataByLocation = (location, key) => {
    return new Promise((resolve, reject) => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location.trim())}?unitGroup=metric&include=events%2Cdays%2Chours%2Calerts%2Ccurrent&key=${key}&contentType=json`;
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
exports.getWeatherDataByLocation = getWeatherDataByLocation;
const parseDateStr2Obj = (dateString) => {
    const arr = dateString.split("-");
    return {
        year: arr[0],
        month: arr[1],
        day: arr[2],
        weekday: "",
    };
};
const adaptAPIResponse = (weatherData) => {
    const data = {
        status: "ok",
        location: {
            country_name: "",
            state: "",
            city: weatherData.address,
        },
        current_observation: {
            temperature: weatherData.currentConditions.temp,
            weather: weatherData.currentConditions.conditions,
            icon_url: weatherData.currentConditions.icon,
            wind: weatherData.currentConditions.windspeed,
            observation_time: weatherData.currentConditions.datetime,
        },
        forecast: weatherData.days.map((day) => {
            return {
                date: parseDateStr2Obj(day.datetime),
                high_temperature: day.tempmax,
                low_temperature: day.tempmin,
                condition: day.conditions,
                icon_url: day.icon,
            };
        }),
        aqi: [],
        GA_TRACKING_ID: "",
    };
    return data;
};
exports.adaptAPIResponse = adaptAPIResponse;
