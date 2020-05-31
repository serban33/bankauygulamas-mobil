import React from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	FlatList
} from 'react-native';

const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height 

export default class MenuDrawer extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  dataSource:[],
		  loading: false,
		  accs: [],
		  allAccs: []
		};
	  };
	navLink(nav, text) {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}
	componentDidMount() {
		fetch("http://192.168.43.180/php/getuser.php")
		  .then(response => response.json())
		  .then((responseJson) => {
			this.setState({
			  dataSource: responseJson
			})
		  })
		  .catch(error => console.log(error)) //to catch the errors if any
	  }
	UserLogouts = () =>{
	  fetch('http://192.168.43.180/php/logout.php', {
		 method: 'GET',
		 headers: {
		   'Accept': 'application/json',
		   'Content-Type': 'application/json',
		 }	
	   })
	  
	   
		   this.props.navigation.navigate("goLogin");
		 }
	/*	 GetActiveAccount = () => {


			fetch('http://192.168.43.180/php/getuser.php',
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
		*/
	
	  
		
	  
	  
	  

	render() {
		return(
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
								<Image style={styles.img} source={require('../assets/login1_person.png')} />
							</View>
							<FlatList
     
         data={this.state.dataSource}
         renderItem={({item}) => 
       
           
							<View style={styles.profileText}>
		 <Text style={styles.name}>{item.musteriAd} {item.musteriSoyAd}</Text>
						</View>
        
        
        }
       />
						</View>
					</View>
					<View style={styles.bottomLinks}>
						{this.navLink('Home', 'Anasayfa')}
						{this.navLink('Hesap', 'Hesaplarım')}
						{this.navLink('Virman', 'Virman')}
						{this.navLink('Havale', 'Havale')}
						{this.navLink('HGSAl', 'Hgs Satın Al')}
						{this.navLink('HGSSorgula', 'Hgs Sorgula')}
						{this.navLink('HGSYukle', 'Hgs Para Yükle')}
						{this.navLink('Settings', 'Hesap Ayarları')}
					</View>
				</ScrollView>
			
				<TouchableOpacity onPress={this.UserLogouts}>
              <View style={styles.footer}>
                <Text style={styles.logout} >Çıkış Yap<Text style={styles.description}></Text></Text>
				<Image style={styles.logoutimg} source={require('../assets/logout.png')} />
              </View>
            </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EF3D45',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	logoutimg: {
		height: 50,
		width: 20,
		paddingRight: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: 'purple',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'blue',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'purple',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	},
	logout: {
		flex: 1,
		paddingLeft: 90,
		paddingRight: 20,
		
	},
})