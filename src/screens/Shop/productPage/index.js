import React,{Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Text, Icon, Body, Right, Left,Title, Card, Badge, CardItem} from 'native-base';
import {View,Dimensions,Image,TouchableOpacity,FlatList,ScrollView,ActivityIndicator,Alert} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Swiper from 'react-native-deck-swiper'
import  ProductSwiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
var WindowWidth = Dimensions.get('window').width
var WindowHeight = Dimensions.get('window').height

import styles from './style'
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import LinearGradient from 'react-native-linear-gradient';

//const ImageSource1,ImageSource2,ImageSource3=null

export default class ProductPage extends Component{


    static navigatorStyle = {
        navBarHidden:true
    };
    constructor(){
        super()
        this.state = {
            country:'',
            street: '',
            city: '',
            zipcode: '',
            loading: false,
            balance: 0,
            state: '',
            apt: '',
            fullname:''
        }
    }
    componentWillMount(){
        this.setState({loading: true})
        let uid=firebase.auth().currentUser.uid;
        let country,street,zipcode,city,state,apt;
        
        firebase.database().ref('users/'+uid).on('value',function(snapshot){
            country=snapshot.child('country').val();
            street=snapshot.child('street').val();            
            city=snapshot.child('city').val();
            zipcode=snapshot.child('zipcode').val();
            state=snapshot.child('state').val();
            apt=snapshot.child('apt').val();
            let balance = snapshot.child('balance').val();
            let fullname=snapshot.child('fullname').val();
            if(country === null) country = ''
            if(street === null) street = ''
            if(city === null) city = ''
            if(zipcode === null) zipcode = ''
            if(balance === null) balance = 0
            if(state===null) state=''
            if(apt===null) apt=''
            if(fullname===null) fullname=''
             // alert(country+street+city+zipcode)
           this.setState({
               country,
               city,
               street,
               zipcode,
               loading: false,
               balance,
               apt,
               state,
               fullname
           })
          
        }.bind(this));
        console.log('++----PRODUCT',this.props.item.Info)
    }
    render(){

       // this.ImageSource=
           
                this.ProductName=this.props.name
                this.ImageSource1=require('@images/shopSports/1_sport.jpg')
                this.ImageSource2=require('@images/shopSports/1_sport.jpg')
                this.ImageSource3=require('@images/shopSports/1_sport.jpg')
            let images = this.props.item.gallery_imgs.filter(img=>{
                return img!==null
            })
            let Info = []
            if(this.props.item.Info===null) Info = []
            else Info = this.props.item.Info

        return(
            <ScrollView style={{backgroundColor:'#F0F0F0'}}>
                <TouchableOpacity style={styles.back}
                                onPress={()=>{
                                    this.props.navigator.pop({
                                        animationType:"slide-horizontal"
                                    }
                                    )
                                    }}>
                    <Image style={[ {height:24,width:12}]} source={require('@images/Shop/back.png')} />
                </TouchableOpacity>
               
                {/* <Image style={styles.Image} resizeMode={'cover'}  source={require('@images/HomePage/image.jpg')}/> */}
               
                <ProductSwiper 
                    style={styles.Image}
                    dotStyle={{backgroundColor:'#fff',opacity:0.3,height:10,width:10,borderRadius:10}}
                    activeDotStyle={{backgroundColor:'#fff',height:10,width:10,borderRadius:10,}}>
                    {images.map((img,i)=>{
                        
                        return(
                            <View style={{flex:1}} key={i}>
                                <Image style={{ height:WindowWidth,width:WindowWidth,resizeMode:'stretch',flex:1}}
                                source={{uri: img}}/> 
                            </View>
                        )
                    })
                    
                    }
                </ProductSwiper>

                
                <View style={styles.extraInfoLabel}>
                    <Image style={styles.extraInfoIcon} source={require('@images/Shop/popular.png')} />
                    <Text style={styles.superHotText}>POPULAR</Text>
                </View>


                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            {this.props.item.Product_Name} 
                        </Text>

                        <View style={styles.label}>
                            <Text style={styles.labelText}>
                                {this.props.item.Price_Lolos} lolos
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={[styles.shipping]}>
                            <Text style={[styles.itemText]}>Delivery</Text>
                            <Text style={styles.shippingText}>{this.props.item.Shipping_Price_USA}</Text>
                            {/* <Image style={styles.down} source={require('@images/Shop/down-arrow.png')}/> */}
                        </View>
                        <Text style={styles.shippingSubText}>{this.props.item.Delivery_time_USA}</Text>
                    </View>

                    {/* <View style={styles.titleView}>
                        <Text style={styles.itemText}>Item Description</Text>
                        {
                            Info.map((info,index)=>{
                                if(!info) return
                                let key = Object.keys(info)[0]
                                let val = info[key]
                                // console.log('++--INFO',info[key])
                                return(
                                    <View style={[styles.type,{backgroundColor:index%2===0?'#fff':'#f0f0f0'}]} key={index}>
                                        <View style={{width:(WindowWidth-50)/2}}><Text style={styles.key}>{key}</Text></View>
                                        <View style={{width:(WindowWidth-50)/2}}><Text style={styles.value}>{val}</Text></View>
                                    </View>
                                )
                            })
                        }
                    </View> */}

                    <View style={styles.titleView}>
                        <Text style={[styles.itemText]}>Product rating</Text>
                        {/* <Text style={[styles.shippingSubText,{color:'#000',marginBottom:0}]}>Computer and laptop Accessories Store</Text> */}
                        <Text style={[styles.shippingSubText,{marginBottom:17}]}>{this.props.item.Product_rating}</Text>
                    </View>

                    <View style={styles.titleView}>

                    <LinearGradient 
                    start={{x: 1.04, y: 0.55}} end={{x: -0.04, y: 0.45}}  
                    locations={[0.00,1.00]}
                    style={[styles.slideBuy,{ marginVertical:28,justifyContent:'center',alignSelf:'center'}]} colors={['#F5317F', '#FF7C6E']} >
                        <RNSlidingButton
                            style={[styles.slideBuy,{backgroundColor:'transparent'},]}
                            height={58}
                            onSlidingSuccess={()=>{
                                if(this.state.country===''||this.state.city===''||this.state.street===''||this.state.zipcode===''){
                                    
                                    Alert.alert(
                                        '',
                                        'You must setup an address in order to make a purchase.',
                                        [
                                            {text:'Later',onPress:()=>console.log('cancel'),style:'cancel'},
                                            {text: 'Setup',onPress:()=>this.props.navigator.push({screen:'app.shippingAddressHome',
                                animationType:"slide-horizontal"})}
                                        ]

                                    )
                                    return
                                }
                                if(this.state.fullname===''){
                                    Alert.alert(
                                        '',
                                        'You must complete your profile details to make a purchase.',
                                        [
                                            {text:'Later',onPress:()=>console.log('cancel'),style:'cancel'},
                                            {text: 'Setup',onPress:()=>this.props.navigator.push({screen:'app.myProfile',
                                            animationType:"slide-horizontal"})}
                                        ]

                                    )
                                    return
                                }
                                if(this.state.balance===0||this.state.balance<this.props.item.Price_Lolos){
                                    alert('Your wallet balance is not enough')
                                    return
                                }
                                this.props.navigator.push({
                                    screen:'app.ConfirmationPage',
                                    animationType:"slide-horizontal",
                                    passProps: {
                                        item: this.props.item
                                    }
                                })
                            }}
                            successfulSlidePercent={40}
                            slideDirection={SlideDirection.RIGHT}>
                            <View style={{justifyContent:'center',alignItems:'center',height:64,width:WindowWidth/2.47,backgroundColor:'white',borderColor:'#F5317F',borderRadius:40,borderWidth:2}}>
                                <Text style={{color:'#FF4273',fontFamily:'Lato-Bold',fontSize:14}}>SLIDE TO BUY  >></Text>
                            </View>
                        </RNSlidingButton>
                    </LinearGradient>
                        
                    </View>
                </View>
                   {
                       this.state.loading?
                       <View style={{flex:1,width:WindowWidth, height: WindowHeight,justifyContent:"center",alignItems:'center'}}>                
                            <ActivityIndicator size='large' color='#ffb100' />
                        </View>:null
                   }
            </ScrollView>
        )
    }
}