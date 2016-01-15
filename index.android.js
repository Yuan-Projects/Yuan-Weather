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

var REQUEST_URL = 'https://rawgit.com/facebook/react-native/master/docs/MoviesExample.json';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class YuanWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies,
        });
      })
      .done();
  }
  
  render() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this.renderMovie(movie);
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
  
  renderMovie(movie) {
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
});

AppRegistry.registerComponent('YuanWeather', () => YuanWeather);
