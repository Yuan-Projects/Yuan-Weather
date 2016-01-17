'use strict';
import React, {
  Image,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

let dataProvider = require('../dataProvider/dataProvider.js');
class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    console.log("fetch.....");
    dataProvider.fetchDataByCityId('CN101010100', (data) => {
      console.log("City data:", data);
      this.setState({
        loaded: true,
        data: data,
      });
    }, (err) => {
      debugger;
    });
  }
  
  render() {
    if (!this.state.data) {
      return this.renderLoadingView();
    }
    return this.renderTodayView()
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading ...
        </Text>
      </View>
    );
  }
  
  renderTodayView() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Image 
              style={styles.thumbnail} 
              source={{uri: 'http://files.heweather.com/cond_icon/' + this.state.data.weather.today.conditionCode + '.png'}} 
            />
          </View>
          <View style={styles.shortCondition}>
            <Text>{this.state.data.weather.today.temperature}</Text>
            <Text>{this.state.data.weather.today.conditionText}</Text>
          </View>
          <View style={styles.tableView}>
            <View style={styles.leftColumn}>
              <View>
                <Text>{this.state.data.weather.today.highTemperature}</Text>
                <Text>{this.state.data.weather.today.lowTemperature}</Text>
              </View>
              <View>
                <Text>left</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View>
                <Text>Right</Text>
              </View>
              <View>
                <Text>Right</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomBar}>
          <Text>ffff</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "pink",
    alignSelf: 'stretch',
  },
  topContainer: {
    flex: 1,
  },
  shortCondition: {
    height: 40,
  },
  tableView: {
    height: 150,
    backgroundColor: 'blue',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: 100,
    backgroundColor: 'yellow',
  },
  rightColumn: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  bottomBar: {
    height: 30,
    backgroundColor: 'gray',
    alignSelf: 'stretch',
  }
});

//AppRegistry.registerComponent('YuanWeather', () => YuanWeather);

module.exports = Today;
