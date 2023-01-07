interface LocationInterface {
  country_name: string;
  state: string;
  city: string;
}

interface CurrentWeatherDataInterface {
  temperature: number;
  weather: string;
  icon_url: string;
  wind: string;
  observation_time: string;
  aqi?: string | number;
  pm25?: string | number;
  qlty?: string | number;
}

export interface DailyForecastDateInterface {
  year: string | number;
  month: string | number;
  day: string | number;
  weekday: string;
}

interface DailyForecastDataInterface {
  date: DailyForecastDateInterface;
  high_temperature: number | string;
  low_temperature: number | string;
  condition: string;
  icon_url: string;
}

interface AQIDataInterface {
  station: string;
  pm25: string | number;
  aqi: string | number;
}

export interface WeatherDataInterface {
  status: string;
  location: LocationInterface;
  current_observation: CurrentWeatherDataInterface;
  forecast: Array<DailyForecastDataInterface>;
  aqi: Array<AQIDataInterface>;
  GA_TRACKING_ID: string;
}
