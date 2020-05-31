
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
  FlatList,
  Picker,
  Button,
  ActivityIndicator

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
const tlIcon = require("../assets/money1.jpg");
const hesapnoIconn = require("../assets/hesapno.png");
const { height } = Dimensions.get('window');

export default class HavaleScreen extends Component {
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    gonderenHesapBakiye:'',
    bakiye:'',
    havaleGonderenEkNo:'',
    havaleAliciEkNo:'',
    havaleAliciHesapNo:'',
    isLoading: true,
 
    PickerValueHolder : '',
    PickerValueHolder1 : ''
 
   }
  }
  _refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); this.refreshProps(); }, 1000)
    });
  }
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
    this.setState({ bakiye: newText1 });
};
repass1(repass1){
  let newText2 = '';
  let letters = '0123456789';

  for (var i=0; i < repass1.length; i++) {
      if(letters.indexOf(repass1[i]) > -1 ) {
          newText2 = newText2 + repass1[i];
      }
      else {
      }
  }
  this.setState({ havaleAliciHesapNo: newText2 });
};
repass2(repass2){
  let newText3 = '';
  let letters = '0123456789';

  for (var i=0; i < repass2.length; i++) {
      if(letters.indexOf(repass2[i]) > -1 ) {
          newText3 = newText3 + repass2[i];
      }
      else {
      }
  }
  this.setState({ havaleAliciEkNo: newText3 });
};
 
  componentDidMount() {
 
       return fetch('http://192.168.43.180/php/geteknumara.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
     GetEkNumara = () => {


      fetch('http://192.168.43.180/php/geteknumara.php',
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
    

     SaveHavale = () =>{
      const {gonderenHesapBakiye} = this.state ;
      const { bakiye }  = this.state ;
      const { havaleGonderenEkNo }  = this.state ;
      const { havaleAliciEkNo }  = this.state ;
      const { havaleAliciHesapNo }  = this.state ;
  

       if(bakiye==""){
        alert("Bakiye Giriniz");
       
      }
      else{
    
      
      
      
    fetch('http://192.168.43.180/php/savehavale.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        bakiye:bakiye,
        havaleGonderenEkNo:havaleGonderenEkNo,
        havaleAliciEkNo: havaleAliciEkNo,
        havaleAliciHesapNo:havaleAliciHesapNo,

       })
      
     })
     .then((response) => response.json())
     .then((responseJson)=>{
       if(responseJson == "ok")
       {
         alert("İşlem Başarılı");
        
       }
  
      
       else{
         alert("İşlem Başarısız.Tekrar Deneyin");
       }
     })
     .catch((error)=>{
     console.error(error);
     });
     }
     }
     refreshProps = () => {
      this.GetEkNumara();
    }
 
   
 
  render() {
 
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
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
                <Text style={styles.titleViewText}>        Havale İşlemi</Text>
              </View>
              <View style={{padding:1}}>
              <View style={styles.MainContainer}>
              <View style={styles.virman}>
                  <Text style={styles.virman}>Gönderen Hesap Seçiniz</Text>
              </View>
              <View style={styles.virman}>
                  <Text style={styles.virman}></Text>
              </View>
 <Picker
   selectedValue={this.state.havaleGonderenEkNo}
   onValueChange={(itemValue, itemIndex) => this.setState({havaleGonderenEkNo: itemValue})} >
   { this.state.dataSource.map((item, key)=>(
   <Picker.Item 
   style={[styles.input, styles.whiteFont]}
   label={"Hesap Ek Numarası:   "+item.hesapEkNumarasi +"     Bakiye:    "+item.hesapBakiye+"TL"} 
   value={item.hesapEkNumarasi} 
   key={key} />)
   )}

 </Picker>              
              <View style={styles.inputsContainer}>
 <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={hesapnoIconn} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(repass1)=> this.repass1(repass1)}
                value={this.state.havaleAliciHesapNo}
                placeholder="     ALICI HESAP NO"
                keyboardType='numeric'
                placeholderTextColor="black"
                returnKeyType='go'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtVirman.focus()} 
               
                maxLength={9} 
                
              />
            </View>
  </View>
  <View style={styles.inputsContainer}>
 <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={hesapnoIconn} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(repass2)=> this.repass2(repass2)}
                value={this.state.havaleAliciEkNo}
                placeholder="     ALICI HESAP EK NO"
                keyboardType='numeric'
                placeholderTextColor="black"
                returnKeyType='go'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtVirman.focus()} 
               
                maxLength={4} 
                
              />
            </View>
  </View>
 <View style={styles.inputsContainer}>
 <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground 
                  source={tlIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(repass)=> this.repass(repass)}
                value={this.state.bakiye}
                placeholder="     Gönderilecek Tutar"
                keyboardType='numeric'
                placeholderTextColor="black"
                returnKeyType='go'
                autoCorrect={false}
                onSubmitEditing={()=> this.refs.txtVirman.focus()} 
               
                maxLength={5} 
                
              />
            </View>
  </View>

 
 <TouchableOpacity 
  onPress={ this.GetPickerSelectedItemValue }
  onPress={() => { this.SaveHavale(); }} ref={"txtVirman"}
  >
    <View style={styles.signup}>
      <Text   style={styles.whiteFont}  >Para Gönder</Text>
    </View>
  </TouchableOpacity>

</View>
      
     </View>

            </View>




            
          </ImageBackground>
        </View>
      </PTRView>
 
    
 
    );
  }
 }
 
 const styles = StyleSheet.create({
 
 MainContainer :{
 
 justifyContent: 'center',
 flex:1,
 margin: 10
 },
 signup: {
  backgroundColor: '#FF3366',
  paddingVertical: 25,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 80,
},
whiteFont: {
  color: '#FFF'
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
  height: 150,
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
  fontSize: 20
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
  color: '#FFF',
  fontSize:20
},
purpleFont: {
  color: '#FF3366'
},
virman:{
  color: 'black',
  fontSize:20,
  marginLeft:45
}
 
 
 });