/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Image,
  ListView,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

let dataProvider = require('./js/dataProvider/dataProvider.js');

class YuanWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: '', // City Id
      city: '', // City Name
      cnty: '', // Country
      updateLoc: '', // Updated date in locale time.
      aqi: '', // AQI value
      qlty: '', // Air quality.
      tmp: '', // in C
      fl: '', // Feels like 
      windSpd: '', // Wind speed
      windDeg: '', // Wind direction
      hum: '', // Humidity
      condCode: '', // Weather Code
      condTxt: '', // Weather description
      pres: '', // Barometer
      vis: '', // Visiility
      maxTmp: '', // Max temperature
      minTmp: '', // Min temperature,
      today: '', // The weather condition in daytime
      tonight: '', // The weather condition in tonight
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    dataProvider.fetchDataByCityId('CN101010100', (data) => {
      console.log("City data:", data);
      let rawData = data["HeWeather data service 3.0"];
      if (rawData && rawData[0] && rawData[0].status === "ok") {
        this.parseCityData(rawData[0]);
      }
    }, (err) => {
      debugger;
    });
  }
  
  parseCityData(data) {
    this.setState({
      loaded: true,
      id: data.basic.id, // City Id
      city: data.basic.city, // City Name
      cnty: data.basic.cnty, // Country
      updateLoc: data.basic.update.loc, // Updated date in locale time.
      aqi: data.aqi.city.aqi, // AQI value
      qlty: data.aqi.city.qlty, // Air quality.
      tmp: data.now.tmp, // in C
      fl: data.now.fl, // Feels like 
      windSpd: data.now.wind.spd, // Wind speed
      windDir: data.now.wind.dir, // Wind direction
      hum: data.now.hum, // Humidity
      condCode: data.now.cond.code, // Weather Code
      condTxt: data.now.cond.txt, // Weather description
      pres: data.now.pres, // Barometer
      vis: data.now.vis, // Visiility
      maxTmp: data.daily_forecast[0].tmp.max, // Max temperature
      minTmp: data.daily_forecast[0].tmp.min, // Min temperature,
      today: data.daily_forecast[0].cond.txt_d, // The weather condition in daytime
      tonight: data.daily_forecast[0].cond.txt_n, // The weather condition in tonight
    });
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderCityToday();
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
  
  renderCityToday() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.thumbnail} 
          source={{uri: 'http://files.heweather.com/cond_icon/' + this.state.condCode + '.png'}} 
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.state.tmp}</Text>
          <Text style={styles.year}>{this.state.condTxt}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
});

AppRegistry.registerComponent('YuanWeather', () => YuanWeather);
