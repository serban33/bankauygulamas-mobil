import React, { Component } from 'react';

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
import {
  emailValidator
} from '../Utils/utils';

const phoneIcon = require("./phone.jpg");
const tcIcon = require("./tc.jpg");
const background = require("./signup_bg.png");
const backIcon = require("./back.png");
const personIcon = require("./profile.jpg");
const lockIcon = require("./password.jpg");
const emailIcon = require("./signup_email.png");
const birthdayIcon = require("./signup_birthday.png");
const { height } = Dimensions.get('window');

export default class RegisterScreen extends Component {
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

    musteriAd: '',
    musteriSoyAd:'',
    musteriMail: '',
    musteriSifre: '',
    musteriTCKN:'',
    musteriTelefon:''

  }

}
UserRegistrationFunction = () =>{
 
 
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
  else if(musteriTCKN==""){
    alert("TCKN bos bırakılamaz");
   
  }
  else if(musteriTelefon==""){
    alert("Telefon bos bırakılamaz");
   
  }
  else{

  
  
  
  
fetch('http://192.168.43.180/php/register.php', {
   method: 'POST',
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
     alert("Kayıt Başarılı");
     this.props.navigation.navigate("goLogin");
   }
   else
     alert("Bu TCKN zaten kayıtlı");
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
          <View style={styles.headerContainer}>

            <View style={styles.headerIconView}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('goLogin')}} style={styles.headerBackButtonView}>
                <ImageBackground 
                  source={backIcon} 
                  style={styles.backButtonIcon} 
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Kayıt Ol</Text>
            </View>

          </View>
      
          <View style={styles.inputsContainer}>

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
                onChangeText={(numberletter)=> this.numberAndLetter(numberletter)}
                value={this.state.musteriAd}
                placeholder="İsim"
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
                placeholder="Soyisim"
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
                placeholder="E-Mail"
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
                placeholder="Şifre"
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
                placeholder="(555)-555-55-55"
                keyboardType='numeric'
                placeholderTextColor="#FFF"
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtTcNo.focus()} 
                ref={"txtUserRePassword"}
                maxLength={10} 
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={tcIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(text)=> this.onChanged(text)}
                value={this.state.musteriTCKN}
                placeholder="TC Kimlik Numarası"
                placeholderTextColor="#FFF"
                keyboardType={'numeric'}
                maxLength={11}
                returnKeyType='go'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtRegister.focus()} 
                ref={"txtTcNo"} 
                maxLength={11}
                minLength={10}
              />
            </View>

          </View>
 
          <View style={styles.footerContainer}>

            <TouchableOpacity 
            onPress={this.UserRegistrationFunction} 
            >
              <View style={styles.signup}>
                <Text   style={styles.whiteFont}  ref={"txtRegister"}>Kayıt Ol</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.props.navigation.navigate('goLogin')}}>
              <View style={styles.signin}>
                <Text  >Zaten Hesabım Var.<Text style={styles.whiteFont}>Giriş Yap</Text></Text>
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
    marginBottom: 15,
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
