document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('progress').classList.remove('hidden');

  function $(str) {
    return document.querySelector(str);
  }
  function getLevel(aqi) {
    return aqi > 200 ? 'level_5' : aqi > 150 ? 'level_4' : aqi > 100 ? 'level_3' : aqi > 50 ? 'level_2' : 'level_1';
  }
  function getWeek(day) {
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day];
  }

  function urlArgs() {
    const args = new Map();
    const pairs = location.search.substring(1).split("&");
    for (const entry of pairs) {
      const params = entry.split('=');
      if (params.length === 2 && params[0] && params[1]) {
        const [key, value] = params;
        args.set(decodeURIComponent(key), decodeURIComponent(value));
      }
    }
    return args;
  }

  function getUrlArg(name) {
    return urlArgs().get(name);
  }

  function normalizeLocation(state, city) {
    if (!state) return city;
    if (state === city) return state;
    return state + city;
  }

  function normalizeDailyDate(date) {
    if (isNaN(date.weekday)) return date.weekday;
    return `${getWeek(date.weekday)} ${date.month}-${date.day > 9 ? date.day : "0" + date.day}`;
  }

  getWeatherDataByLocation(getUrlArg('city') || 'auto_ip').then(data => {
    const { location, current_observation, forecast, aqi } = data;
    const { icon_url, weather, temperature, observation_time, pm25} = current_observation;

    $(".location").textContent = normalizeLocation(location.state, location.city);
    $(".currentWeatherImg").src = `.${icon_url}`;
    $(".currentWeatherImg").alt = `.${weather}`;
    $(".current_temp").textContent = `${temperature}${isNaN(temperature) ? '' : '℃'}`;
    $(".current_weather").textContent = weather;
    $(".observation_time").textContent = observation_time;
    $(".temperature_range").textContent = `${forecast[0].low_temperature} ~ ${forecast[0].high_temperature}℃`;

    if (current_observation.aqi && pm25) {
      $(".air_quality").classList.remove('hidden');
      $(".air_quality_level").classList.add(`air_quality_${getLevel(current_observation.aqi)}`);
      $(".air_quality_level").textContent = current_observation.aqi;
      $(".air_quality_pm25").textContent = pm25;
    }

    $("#forcast-list").innerHTML = forecast.map(dailyData => {
      const { date, icon_url, condition, high_temperature, low_temperature } = dailyData;
      return `<div class="flex-item-auto">
        <p>${normalizeDailyDate(date)}</p>
        <p><img src=".${icon_url}" alt="${condition}" /></p>
        <p>${condition}</p>
        <p><span class="high-temp">${high_temperature}°</span><span class="low-temp">${low_temperature}°</span></p>
        </div>`;
    }).join('');

    if (aqi.length) {
      $("#aqi-site-list").classList.remove('hidden');
      $("#aqi-site-list tbody").innerHTML = aqi.map( station_data => {
        const { station, pm25, aqi } = station_data;
        return `<tr>
          <td>${station}</td>
          <td>${pm25}</td>
          <td><span class="air_quality_${getLevel(aqi)}">${aqi}</span></td>
        </tr>`;
      }).join('');
    }

    $('progress').classList.add('hidden');
  }).catch(err => {
    alert(err.message);
  });
});