class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityId: null,
      cityName: null,
      now: {},
      daily_forecast: [],
      air_now_city: null,
      air_forecast: null,
      lastUpdate: null
    };
  }

  componentDidMount() {
    fetch('/api' + location.pathname).then((data) => {
      return data.json();
    }).then(data => {
      if (data.status !== "ok") {
        alert('error');
        return false;
      }
      this.setState({
        cityId: data.basic.cid,
        cityName: data.basic.location,
        now: data.now,
        daily_forecast: data.daily_forecast,
        air_now_city: data.air_now_city,
        air_forecast: data.air_forecast,
        lastUpdate: data.update.loc
      });
    });
  }

  render() {
    const {cityName, now, daily_forecast, air_now_city} = this.state;
    const todayForecast = Array.isArray(daily_forecast) && daily_forecast.length ? daily_forecast[0] : {};
    return (
      <div>
        <p>空气质量：{air_now_city ? air_now_city.aqi : 0} ({air_now_city ? air_now_city.qlty : ''}) PM2.5:{air_now_city ? air_now_city.pm25 : 0}</p>
        <h1>{cityName}</h1>
        <p>{now.cond_txt} {now.tmp}℃</p>
        <p>{todayForecast ? todayForecast.tmp_min : 0} - {todayForecast ? todayForecast.tmp_max : 0}℃</p>
        <p>{todayForecast ? (todayForecast.wind_dir + '' + todayForecast.wind_sc) : ''}</p>
      </div>
    );
  }
}
ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root')
);