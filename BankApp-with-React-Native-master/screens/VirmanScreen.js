
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
const { height } = Dimensions.get('window');

export default class VirmanScreen extends Component {
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    gonderenHesapBakiye:'',
    gonderilenbakiye:'',
    gonderenEkNumarasi:'',
    aliciEkNumarasi:'',
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
    this.setState({ gonderilenbakiye: newText1 });
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
    

     SaveVirman = () =>{
      const {gonderenHesapBakiye} = this.state ;
      const { gonderilenbakiye }  = this.state ;
      const { gonderenEkNumarasi }  = this.state ;
      const { aliciEkNumarasi }  = this.state ;
  

       if(gonderilenbakiye==""){
        alert("Bakiye Giriniz");
       
      }
      else if(aliciEkNumarasi == gonderenEkNumarasi){
        alert("Aynı Hesaba Para Gönderemezsiniz.Farklı bir Hesap Seçiniz!");
       }
      else{
    
      
      
      
    fetch('http://192.168.43.180/php/virmankaydet.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        gonderilenbakiye:gonderilenbakiye,
        gonderenEkNumarasi:gonderenEkNumarasi,
        aliciEkNumarasi: aliciEkNumarasi,
       })
      
     })
     .then((response) => response.json())
     .then((responseJson)=>{
       if(responseJson == "ok")
       {
         alert("İşlem Başarılı");
        
       }
      if(responseJson == "Bakiye Hatası")
       {
        alert("Bakiye Hatası")
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
                <Text style={styles.titleViewText}>        Virman İşlemi</Text>
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
   selectedValue={this.state.gonderenEkNumarasi}
   onValueChange={(itemValue, itemIndex) => this.setState({gonderenEkNumarasi: itemValue})} >
   { this.state.dataSource.map((item, key)=>(
   <Picker.Item 
   style={[styles.input, styles.whiteFont]}
   label={"Hesap Ek Numarası:   "+item.hesapEkNumarasi +"     Bakiye:    "+item.hesapBakiye+"TL"} 
   value={item.hesapEkNumarasi} 
   key={key} />)
   )}

 </Picker>
 <View style={styles.virman}>
                  <Text style={styles.virman}></Text>
              </View>
              <View style={styles.virman}>
                  <Text style={styles.virman}></Text>
              </View>
 <View style={styles.virman}>
                  <Text style={styles.virman}>Alıcı Hesap Seçiniz</Text>
              </View>
              <View style={styles.virman}>
                  <Text style={styles.virman}></Text>
              </View>
              
 <Picker
 
   selectedValue={this.state.aliciEkNumarasi}
   onValueChange={(itemValue1, itemIndex1) => this.setState({aliciEkNumarasi: itemValue1})} >
   { this.state.dataSource.map((item1, key1)=>(
   <Picker.Item1
   style={[styles.input, styles.whiteFont]}
   label={"Hesap Ek Numarası:   "+item1.hesapEkNumarasi +"     Bakiye:    "+item1.hesapBakiye+"TL"} 
   value={item1.hesapEkNumarasi} 
   key1={key1} />)
   )}

 </Picker>
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
                value={this.state.gonderilenbakiye}
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
  onPress={() => { this.SaveVirman(); }} ref={"txtVirman"}
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