import React, {Component} from 'react';
import { Platform, Dimensions } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/HomeScreen';
import HesapScreen from '../screens/HesapScreen';
import SettingsScreen from '../screens/SettingsScreen';

import MenuDrawer from '../components/MenuDrawer';
import VirmanScreen from '../screens/VirmanScreen';
import HavaleScreen from '../screens/HavaleScreen';
import HgsSatınAlScreen from '../screens/HgsSatınAlScreen';
import HgsSorgulaScreen from '../screens/HgsSorgulaScreen';
import HgsYukleScreen from '../screens/HgsYukleScreen';


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.63,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Hesap: {
			screen: HesapScreen
		},
		Settings: {
			screen: SettingsScreen
		},
		Virman: {
			screen: VirmanScreen
		},
		Havale: {
			screen: HavaleScreen
		},
		HGSAl: {
			screen: HgsSatınAlScreen
		},
		HGSSorgula: {
			screen: HgsSorgulaScreen
		},
		HGSYukle: {
			screen: HgsYukleScreen
		},
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);