import React from 'react';
import {FlatList, ActivityIndicator, View, Text,StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/components/Login/Login';
import RegisterScreen from './src/components/Register/Register';
import DrawerNavigator from './navigation/DrawerNavigator';






const RootStack = createStackNavigator(
  {
    goLogin: {
      screen:LoginScreen,
      navigationOptions:{
        header:null
       }      
      },
    goRegister:{
       screen:RegisterScreen,
       navigationOptions:{
         header:null
       }
      },
      goHome:{
        screen:DrawerNavigator,
        navigationOptions:{
          header:null
        }
       }
  },
  {
    initialRouteName: 'goLogin',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App1 extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
export  class App extends React.Component {
  render() {
    return (
      <View style={styles.container}  source={background} >
        <DrawerNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bg: {
    paddingTop: 20,
    width: null,
    height: null
  }
});


