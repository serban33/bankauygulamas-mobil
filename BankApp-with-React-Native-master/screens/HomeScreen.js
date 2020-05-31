import React, {Component} from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';

import MenuButton from '../components/MenuButton';
const background = require("../assets/signup_bg.png");

export default class HomeScreen extends Component {
  render() {

    
    return (
      <ImageBackground 
      source={background} 
      style={[styles.container, styles.bg]}
      resizeMode="cover"
    >
      <Text style={styles.text}>Home</Text>
      <MenuButton navigation={this.props.navigation} />
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop:1,
    fontSize: 30,
  },
  bg: {
    paddingTop: 1,
    width: null,
    height: null
  },
});
