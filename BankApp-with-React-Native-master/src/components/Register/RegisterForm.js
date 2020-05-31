import React, {Component  } from 'react';
import { StyleSheet, View, Image,Text,TextInput,TouchableOpacity,StatusBar} from 'react-native';


export default class Register extends Component {
   render() {
       return (
           <View style={styles.container}>
           <StatusBar
           barStyle="light-content"
           />
           <TextInput 
           placeholder="TC Kimlik Numarası"
           placeholderTextColor="white"
           returnKeyType="next"
           onSubmitEditing={()=>this.passwordInput.focus()}
           keyboardType="numeric"
           aoutoCapitalize="none"
           autoCorrect={false}
           style={styles.input}
           />
           <TextInput
           placeholder="Şifre" 
           placeholderTextColor="white"
           returnKeyType="go"
           secureTextEntry={true}
           style={styles.input}
           ref={(input)=> this.passwordInput= input}
           />
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.buttonContainer}>
           <Text style={styles.buttonText}>Kayıt Ol</Text>
           </TouchableOpacity>
           </View>
       );
   }
}
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingHorizontal:20
       
    },
    logoContainer:{
        alignItems: 'center',
        
    },
    input: {
        height: 40,
        backgroundColor:'#ff3838',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal:10
    },
    buttonContainer: {
        backgroundColor: '#c0392b',
        paddingVertical:10

    },
    buttonText:  {
        textAlign: 'center',
        color:'#ecf0f1'
    }
});