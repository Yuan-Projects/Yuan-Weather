/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Image,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class YuanWeather extends Component {
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    console.log('Movie:', movie);
    return (
      <View style={styles.container}>
        <Image 
          style={styles.thumbnail} 
          source={{uri: movie.posters.thumbnail}} 
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    webkitBoxFlex: 1,
    webkitFlex: 1,
    flex: 1,
    
    webkitBoxDirection: 'row',
    webkitBoxOrient: 'horizontal',
    webkitFlexDirection: 'row',
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
    webkitBoxFlex: 1,
    webkitFlex: 1,
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
});

AppRegistry.registerComponent('YuanWeather', () => YuanWeather);
