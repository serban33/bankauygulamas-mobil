import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard
  
  
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./saysoft.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class LoginScreen extends Component {
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
pass(pass){
    let newText1 = '';
    let letters = 'qwertyuıopğüişlkjhgfdsazxcvbnmöçQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ0123456789';

    for (var i=0; i < pass.length; i++) {
        if(letters.indexOf(pass[i]) > -1) {
            newText1 = newText1 + pass[i];
        }
        else {
          alert("Sadece rakam ve harf girebilirsiniz.");
        }
        this.setState({ musteriSifre: newText1 });
    }
    
};
constructor(props) {
 
  super(props)

  this.state = {
    musteriSifre: '',
    musteriTCKN:''
   

  }

}
UserLogin = () =>{
  const {musteriTCKN,musteriSifre} = this.state;
  if(musteriTCKN==""){
    alert("TCKN bos bırakılamaz");
  }
  else if(musteriSifre==""){
    alert("Sifre bos bırakılamaz");
   
  }
  
  else{
  
  
fetch('http://192.168.43.180/php/login.php', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    musteriSifre: musteriSifre,
    musteriTCKN: musteriTCKN
   })
  
 })
 .then((response) => response.json())
 .then((responseJson)=>{
   if(responseJson == "ok"){
     // redirect to profile page
     alert("Giriş Başarılı");
     this.props.navigation.navigate("goHome");
   }else{
     alert("TCKN veya Şifre Hatalı.");
   }
 })
 .catch((error)=>{
 console.error(error);
 });
}


Keyboard.dismiss();
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground  source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <ImageBackground  source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <ImageBackground  source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                style={[styles.input, styles.whiteFont]}
                placeholder="TC Kimlik Numarası"
                placeholderTextColor="#FFF"
                keyboardType={'numeric'}
                onChangeText={(text)=> this.onChanged(text)}
                value={this.state.musteriTCKN}
                maxLength={11}
                minLength={10}
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtPassword.focus()} 
                ref={"txtTcNo"}
                
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <ImageBackground  source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Şifre"
                keyboardType={'default'}
                onChangeText={(pass)=> this.pass(pass)}
                value={this.state.musteriSifre}
                placeholderTextColor="#FFF"
                returnKeyType='go'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtLogin.focus()} 
                ref={"txtPassword"}
                maxLength={16}
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.UserLogin(); }} activeOpacity={.5}>
              <View style={styles.button}>
                <Text  style={styles.buttonText }   ref={"txtLogin"} >Giriş Yap</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Hesabım yok?</Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('goRegister')}} activeOpacity={.5}>
                <View>
                  <Text style={styles.signupLinkText}>Kayıt Ol</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
    fontSize: 18,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8",
    fontSize:15,
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    fontSize:15,
  }
});
