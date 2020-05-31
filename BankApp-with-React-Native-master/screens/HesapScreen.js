
import MenuButton from '../components/MenuButton';
import React, { useState, Component } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  Keyboard,
  FlatList

} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';


const phoneIcon = require("../assets/phone.jpg");
const tcIcon = require("../assets/tc.jpg");
const background = require("../assets/signup_bg.png");
const backIcon = require("../assets/back.png");
const personIcon = require("../assets/profile.jpg");
const mark = require("../assets/saysoft.png");
const lockIcon = require("../assets/password.jpg");
const emailIcon = require("../assets/signup_email.png");
const birthdayIcon = require("../assets/signup_birthday.png");
const { height } = Dimensions.get('window');

export default class HesapScreen extends Component {
  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
  };
  constructor(props) {
    super(props);

    this.state = {
      dataSource:[],
      loading: false,
      accs: [],
      allAccs: []
    };
  };
  _refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); this.refreshProps(); }, 1000)
    });
  }
  componentDidMount() {
    fetch("http://192.168.43.180/php/getaccount.php")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }
  static navigationOptions = {
    title: 'Hesaplarım',
    headerLeft: <Icon name="menu" size={35} onPress={() => drawer.current.open()} />
  };


  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  GetActiveAccount = () => {


    fetch('http://192.168.43.180/php/getaccount.php',
      {
        method: 'GET',
        headers: {
          'Accept-Charset': 'UTF-8',
          'Content-Type': 'application/json'
        }
      })

      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error))
  }

  refreshProps = () => {
    this.GetActiveAccount();
   
  } 
  UserUpdateFunction = () => {


    fetch('http://192.168.43.180/php/createaccount.php', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({






      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "ok") {
          alert("Hesap Oluşturuldu");
        }
        else
          alert("Hesap oluşturulamadı");
      })
      .catch((error) => {
        console.error(error);
      });


    Keyboard.dismiss();
  }

  render() {
    const { navigate } = this.props.navigation;
    const scrollEnabled = this.state.screenHeight > height;

    return (


      <PTRView onRefresh={this._refresh}
      loading={this.state.loading}>
        <View style={styles.container}>
          <ImageBackground
            source={background}
            style={[styles.container, styles.bg]}
            resizeMode="cover"
          >
            <MenuButton navigation={this.props.navigation} />
            <View style={styles.markWrap}>
              <ImageBackground source={mark} style={styles.mark} resizeMode="contain" />
            </View>

            <View style={styles.headerContainer}>



              <View style={styles.headerTitleView}>
                <Text style={styles.titleViewText}>        Hesaplarım</Text>
              </View>
              <View style={{padding:1}}>
      <FlatList
      padding ={30}
         data={this.state.dataSource}
         renderItem={({item}) => 
       
            <View style={styles.account}>
                  <Text style={styles.whiteFont}>Hesap Numarası:{item.hesapNumarasi} {item.hesapEkNumarasi}    Bakiye:{item.hesapBakiye}</Text>
            </View>
        
        
        }
       />
      
     </View>

            </View>




            <View style={styles.footerContainer}>

              <TouchableOpacity
                onPress={this.UserUpdateFunction}
                onRefresh={this._refresh}>
                <View style={styles.signup}>
                  <Text style={styles.whiteFont}>Hesap Oluştur</Text>
                </View>
              </TouchableOpacity>


            </View>
          </ImageBackground>
        </View>
      </PTRView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 20,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 4,
    marginTop: 1,
  },
  footerContainer: {
    flex: 1
  },
  markWrap: {
    flex: 1,
    paddingVertical: 50,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 0,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
    marginTop: 0,
  },
  inputs: {
    paddingVertical: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  account: {
    backgroundColor: '#0000FF',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  },
  purpleFont: {
    color: '#FF3366'
  },
});
