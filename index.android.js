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

//let dataProvider = require('./js/dataProvider/dataProvider.js');
let Today = require('./js/components/today.js');

class YuanWeather extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appName}>
          <Text style={styles.appNameText}>Yuan Weather</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.place}>
            <Text>Beijing, CHINA</Text>
          </View>
          <Today />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  appName: {
    height: 20,
    alignSelf: 'stretch',
    backgroundColor: '#45ABF6',
  },
  appNameText: {
    color: 'white',
  },
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  place: {
    height: 25,
    alignSelf: 'stretch',
  }
});

AppRegistry.registerComponent('YuanWeather', () => YuanWeather);
