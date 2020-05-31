import React, { Component } from 'react';
import MenuButton from '../components/MenuButton';
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
  Keyboard
   
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


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

export default class SettingsScreen extends Component {
    state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
  onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("Lutfen sadece sayi giriniz.");
        }
    }
    this.setState({ musteriTCKN: newText });
};
numberAndLetter(numberletter){
    let newText1 = '';
    let letters = 'qwertyuıopğüişlkjhgfdsazxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ';

    for (var i=0; i < numberletter.length; i++) {
        if(letters.indexOf(numberletter[i]) > -1 ) {
            newText1 = newText1 + numberletter[i];
        }
        else {
        }
    }
    this.setState({ musteriAd: newText1 });
};
numberAndLetter1(numberletter){
    let newText1 = '';
    let letters = 'qwertyuıopğüişlkjhgfdsazxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ';

    for (var i=0; i < numberletter.length; i++) {
        if(letters.indexOf(numberletter[i]) > -1 ) {
            newText1 = newText1 + numberletter[i];
        }
        else {
        }
    }
    this.setState({ musteriSoyAd: newText1 });
};
email(email){
    let newText1 = '';
    let letters = 'qwertyuıopilkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM@-.0123456789';

    for (var i=0; i < email.length; i++) {
        if(letters.indexOf(email[i]) > -1 ) {
            newText1 = newText1 + email[i];
        }
        else {
        }
    }
    this.setState({ musteriMail: newText1 });
};
pass(pass){
    let newText1 = '';
    let letters = 'qwertyuıopğüişlkjhgfdsazxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ0123456789';

    for (var i=0; i < pass.length; i++) {
        if(letters.indexOf(pass[i]) > -1 ) {
            newText1 = newText1 + pass[i];
        }
        else {
        }
    }
    this.setState({ musteriSifre: newText1 });
};
repass(repass){
    let newText1 = '';
    let letters = '0123456789';

    for (var i=0; i < repass.length; i++) {
        if(letters.indexOf(repass[i]) > -1 ) {
            newText1 = newText1 + repass[i];
        }
        else {
        }
    }
    this.setState({ musteriTelefon: newText1 });
};
getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
constructor(props) {
 
  super(props)

  this.state = {
    dataSource:[],
    loading: false,
    musteriTCKN:'',
    musteriAd: '',
    musteriSoyAd:'',
    musteriMail: '',
    musteriSifre: '',
    musteriTelefon:''

  }

}
componentDidMount() {
  fetch("http://192.168.43.180/php/accountupdateget.php")
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson
      })
    })
    .catch(error => console.log(error)) //to catch the errors if any
}
UserUpdateFunction = () =>{
 
 
  const { musteriAd }  = this.state ;
  const { musteriSoyAd }  = this.state ;
  const { musteriMail }  = this.state ;
  const { musteriSifre }  = this.state ;
  const { musteriTCKN }  = this.state ;
  const { musteriTelefon }  = this.state ;
  if(musteriAd==""){
    alert("Ad bos bırakılamaz");
  }
  else if(musteriSoyAd==""){
    alert("Soyad bos bırakılamaz");
   
  }
  else if(musteriMail==""){
    alert("Mail bos bırakılamaz");
   
  }
  else if(musteriSifre==""){
    alert("Sifre bos bırakılamaz");
   
  }
  else if(musteriTelefon==""){
    alert("Telefon bos bırakılamaz");
   
  }
  else{

  
  
  
  
fetch('http://192.168.43.180/php/accountupdate.php', {
   method: 'PUT',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
  
    musteriAd:musteriAd,

    musteriSoyAd:musteriSoyAd,
  
    musteriMail: musteriMail,
  
    musteriSifre:musteriSifre,

    musteriTCKN: musteriTCKN,
    
    musteriTelefon: musteriTelefon,



    
  
   })
  
 })
 .then((response) => response.json())
 .then((responseJson)=>{
   if(responseJson == "ok")
   {
     alert("Güncelleme Başarılı");
   }
   else
     alert("Güncelleme Başarısız");
 })
 .catch((error)=>{
 console.error(error);
 });
  
}
Keyboard.dismiss();
}

  render() {
    const { navigate } = this.props.navigation;
    const scrollEnabled = this.state.screenHeight > height;
    
    return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <MenuButton navigation={this.props.navigation} />
           <View style={styles.markWrap}>
            <ImageBackground  source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.headerContainer}>

          

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Bilgilerimi Güncelle</Text>
            </View>

          </View>
          
          <FlatList 
            data={this.state.dataSource}
            renderItem={({item}) => 
          <View 
          style={styles.inputsContainer}>
    
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput

                placeholder={item.musteriAd}
                style={[styles.input, styles.whiteFont]}
                onChangeText={(numberletter)=> this.numberAndLetter(numberletter)}
                value={this.state.musteriAd}
                placeholderTextColor="#FFF"
                keyboardType={'ascii-capable'}
                underlineColorAndroid='transparent'
                returnKeyType='next'
                autoCorrect={false}
                maxLength={20}
                onSubmitEditing={()=> this.refs.txtSurname.focus()} 
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(numberletter)=> this.numberAndLetter1(numberletter)}
                value={this.state.musteriSoyAd}
                placeholder={item.musteriSoyAd}
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtEmail.focus()} 
                ref={"txtSurname"} 
                maxLength={20}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={emailIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(email)=> this.email(email)}
                value={this.state.musteriMail}
                placeholder={item.musteriMail}
                placeholderTextColor="#FFF" 
                keyboardType={'email-address'}
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtPassword.focus()} 
                ref={"txtEmail"}
                maxLength={25}
                
              />
            </View>
            

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={lockIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                onChangeText={(pass)=> this.pass(pass)}
                value={this.state.musteriSifre}
                placeholder={item.musteriSifre}
                keyboardType='default'
                visible-password
                placeholderTextColor="#FFF"
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtUserRePassword.focus()} 
                ref={"txtPassword"}
                maxLength={16}  
              />
            </View>
             <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={phoneIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
               
                style={[styles.input, styles.whiteFont]}
                onChangeText={(repass)=> this.repass(repass)}
                value={this.state.musteriTelefon}
                placeholder={item.musteriTelefon}
                keyboardType='numeric'
                placeholderTextColor="#FFF"
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtUpdate.focus()} 
                ref={"txtUserRePassword"}
                maxLength={10} 
              />
            </View>

          

          </View>
            }
          />
         
 
          <View style={styles.footerContainer}>

            <TouchableOpacity 
            onPress={this.UserUpdateFunction}
            ref={"txtUpdate"}>
              <View style={styles.signup}>
                <Text   style={styles.whiteFont}>Güncelle</Text>
              </View>
            </TouchableOpacity>

          
          </View>
        </ImageBackground>
      </View>
   </ScrollView>
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
    marginTop: 55,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
    marginTop:1,
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
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
});
