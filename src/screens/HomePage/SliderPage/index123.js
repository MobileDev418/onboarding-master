import React,{PureComponent} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Body, Right, Left,Title, Card, Badge, CardItem} from 'native-base';
import {View,Dimensions,Image,TouchableOpacity,FlatList, ActivityIndicator, Linking ,Text,  Platform} from 'react-native';
import Swiper from 'react-native-deck-swiper'
import Sound from 'react-native-sound'
var WindowWidth = Dimensions.get('window').width
var WindowHeight = Dimensions.get('window').height
import styles from './style';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {CachedImage} from 'react-native-cached-image';
import axios from 'axios';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob';
const iphone5s = 568

const {
    fs
} = RNFetchBlob;

const baseCacheDir = fs.dirs.CacheDir + '/videocache.mp4';

//call the downloadVideo function
  
//Function to download a file..
const activeDownloads = {};

export default class SliderPage extends PureComponent{

static navigatorStyle = {
    navBarHidden:true
};
constructor(props){
    super(props);
    this.state={
        played:false,
        data: [],
        badge: 0,
        loading: false
    }
    this.renderCard=this.renderCard.bind(this)
    this._swipedLeft=this._swipedLeft.bind(this)
    this._swipedRight=this._swipedRight.bind(this)
    this._handleCardTap=this._handleCardTap.bind(this)
}

 downloadVideo(fromUrl, toFile) {
    // use toFile as the key
        // activeDownloads[toFile] = 
        // new Promise((resolve, reject) => {
            RNFetchBlob
                .config({path: toFile})
                .fetch('GET', fromUrl)
                .then(res => {
                    console.log('hehe',res)
                    if (Math.floor(res.respInfo.status / 100) !== 2) {
                        throw new Error('Failed to successfully download video');
                    }
                    // alert(res)
                })
                .catch(err => {
                    alert(err)
                })
                // .finally(() => {
                //     // cleanup
                //     delete activeDownloads[toFile];
                // });
        // });
    // return activeDownloads[toFile];
}

componentWillUnmount(){
    this.notificationListener.remove();
  }

showNotification(notif){
      if(notif.fcm.title===undefined||notif.fcm.body===undefined) return
      let uid = firebase.auth().currentUser.uid;
      let key = new Date().getTime()
      let badge = 0
      firebase.database().ref('users/'+uid).once('value',function(snapshot){
            badge=snapshot.child('badge').val();           
            if(badge === null) badge = 0            
           firebase.database().ref('users/'+uid).update({
              badge: badge+1
            })
        });
      let updates = {};
      updates[key] = {title: notif.fcm.title,body: notif.fcm.body,time: key}
      firebase.database().ref('notifications/'+uid).update(updates)   
  }
componentWillMount(){
    this.setState({loading: true})
    let uid = firebase.auth().currentUser.uid, badge=0;
    // this.downloadVideo('https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/Clash%20Royale%20Official%20Epic%20Comeback%20Trailer.mp4?alt=media&token=81b14dfd-e6b7-4584-a4ed-f48a7f2a1121',baseCacheDir)
    // alert('cards')
    firebase.database().ref('cards').on('value',snapshot=>{
        console.log('++--',snapshot._value)
        this.setState({data: snapshot._value})
    })
    firebase.database().ref('users/'+uid).on('value',function(snapshot){
        badge=snapshot.child('badge').val();
        if(badge===undefined||badge===null) badge = 0
        this.setState({badge,loading: false})
    }.bind(this))
    
}



async componentDidMount()
{
     
    let uid = firebase.auth().currentUser.uid
     FCM.requestPermissions(); 
    FCM.getFCMToken().then(token => {      
        firebase.database().ref('users/'+uid).update({
            token: token
        })
    });     

    
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      // console.log('refresh_token', token);
     
    });

    this.notificationListener = FCM.on(FCMEvent.Notification,  (notif) => {
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload      
        if(notif.local_notification) return     
        console.log('reactnative++--',notif) 
        if(notif.local_notification) return
          this.showNotification(notif)      
      })
    
    this.SoundLeft=await new Sound('left_swipe.mp3',Sound.MAIN_BUNDLE,(error)=>{
        if(error){
            console.log(error)
        }
    })
    this.SoundRight=await new Sound('right_swipe.mp3',Sound.MAIN_BUNDLE,(error)=>{
        if(error){
            console.log(error)
        }
        this.SoundRight.setVolume(2)
    })
}
_swipedLeft(){
    
   
    this.SoundLeft.play((onEnd)=>{
        
        this.setState({played:true})
    })
}

_swipedRight(){

    
    this.SoundRight.play((onEnd)=>console.log("played"))

}

_handleCardTap(index){
    
    if(index=='9'){
       this.props.navigator.showModal({
            screen: 'app.VideoCard', // unique ID registered with Navigation.registerScreen
            passProps: {videoUrl: baseCacheDir}
          });
    }
}

renderCard(cardIndex){

switch(cardIndex)
{
    
      case '1':{
        
        return(
            
        <View style={[styles.slide1,{shadowOpacity:0, shadowRadius:2,shadowColor:'rgba(0,0,0,0)',shadowOffset:{width:0,height:2}}]}>
            {/* <Image source={require('@images/sliderImages/IC_Product_Sale.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}
        <Image style={[styles.topImage]}
            source={require('@images/HomePage/em_10.png')}/>
        <Text style={styles.titleSlide1}>Congratulations</Text>
        <Text style={[styles.tagLine]}>your first 20 lolo’s are on their way, Stay Tune…</Text>
        <View style={[styles.swipeTextView]}>
            <Image style={[styles.leftArrow]} 
            source = {require('@images/HomePage/Arrow.png')}/>
            <Text style={[styles.swipeText]}>swipe</Text>
            <Image style={[styles.rightArrow]}
            source = {require('@images/HomePage/Arrow.png')}/>
        </View>
        <CachedImage source={{uri:'https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/giphy1.gif?alt=media&token=03c6f15e-ed55-4854-9e39-8226b6a670c3'}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover',opacity:0 }}/>
        <CachedImage source={{uri:'https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/giphy2.gif?alt=media&token=adc2566b-cf7e-4c23-96ed-674340c17d22'}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover',opacity:0 }}/>
    </View>
    
        )};

    case '2':{
        
        return(
    <View style={styles.slide1}>
        {/* <Image source={require('@images/sliderImages/IC_Success_Invitation_sent.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}

        <Text style={styles.title}>Invite Freinds</Text>
        <Text style={[styles.tagLine]}>on each freind get rewarded with 20 lolo’s</Text>
        <Image style={[styles.freindsSmile]} 
            source={require('@images/HomePage/lolofreinds.png')}/>
        <Text style={[styles.baseLine]}>2 invites per day</Text>
        <TouchableOpacity onPress={()=>{
                    this.props.navigator.push({
                    screen:'app.InviteFriendsHome',
                    animationType:"slide-horizontal"
                })
        }}style={[styles.button]}>
            <Text style={[styles.buttonTextInvite]}>Invite Freinds</Text>
        </TouchableOpacity>
    </View> 
        )};

    case '3':{
        
        return(

        <View style={[styles.slide1]}>
        {/* <Image source={require('@images/sliderImages/IC_Success_purchase_item.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}

            <Text style={[styles.tagLine,{marginTop:WindowHeight<= iphone5s?15:22,}]}>you can see and manage all your lolo’s in your</Text>
            <Text style={styles.titleSWallte}>Smart Wallet</Text>
            <Image  style={[styles.emojiGroup]}
            source={require('@images/HomePage/emojis1.png')}/>
            <TouchableOpacity onPress={()=>{
                this.props._handleIndexChange(1)

                //     this.props.navigator.push({
                //     screen:'app.Wallet',
                //     // passProps:{navigator:this.props.navigator}
                // }) 
            }}
                     style={[styles.button]}>
                    <Text style={[styles.buttonTextInvite]}>Take a Look</Text>
            </TouchableOpacity> 
        </View>
        )};

    case '4':{
        return(
        <View style={styles.slide1}>
        {/* <Image source={require('@images/sliderImages/IC_Product_plus_CTA.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}

         <Text style={styles.title}>Buy Online</Text>
            <Text style={styles.tagLine}>just like the grownups do in our awesome marketplace </Text>
            <Image style={[styles.giftImg]}
        source={require('@images/HomePage/lologift.png')}/>
            <TouchableOpacity onPress={()=>{
                     {/* this.props.navigator.push({
                    screen:'app.PreviewScreen',
                    animationType:"slide-horizontal" 
                    // passProps:{navigator:this.props.navigator}
                    }) */}
                    this.props._handleIndexChange(0)
                }} 
            
            style={[styles.button]}>
                    <Text style={[styles.buttonTextInvite]}>Check It Out</Text>
            </TouchableOpacity> 
        </View>

        )};
    case '5':{
        return(
        <View style={styles.slide1}>
                {/* <Image source={require('@images/sliderImages/IC_Video_promotion.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}

            <Text style={styles.title}>Help Our Mailman</Text>
            <Text style={styles.tagLine}>set up address before you shop in our marketplace </Text>
            <Image style={[styles.manImg]}
                source={require('@images/HomePage/lolomailman.png')}/>
            <TouchableOpacity style={[styles.button]} onPress={()=>{
                    this.props.navigator.push({
                    screen:'app.shippingAddressEdit',
                    animationType:"slide-horizontal" 
                    // passProps:{navigator:this.props.navigator}
                    }) 
                }}>
                    <Text style={[styles.buttonTextInvite]}>Set Up Address</Text>
            </TouchableOpacity> 
        </View>
        )};
    case '6':{
        return(
            
        <View style={[styles.slide1,{shadowOpacity:0, shadowRadius:2,shadowColor:'rgba(0,0,0,0.20)',shadowOffset:{width:0,height:2}}]}>
            <Image source={require('@images/sliderImages/IC_Product_Sale.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
        {/* <Image style={[styles.topImage]}
            source={require('@images/HomePage/em_10.png')}/>
        <Text style={styles.titleSlide1}>Congratulations</Text>
        <Text style={[styles.tagLine]}>your first 20 lolo’s are on their way, Stay Tune…</Text>
        <View style={[styles.swipeTextView]}>
            <Image style={[styles.leftArrow]} 
            source = {require('@images/HomePage/Arrow.png')}/>
            <Text style={[styles.swipeText]}>swipe</Text>
            <Image style={[styles.rightArrow]}
            source = {require('@images/HomePage/Arrow.png')}/>
        </View> */}
    </View>
    
        )};

    case '7':{
        return(
    <View style={styles.videoBackground}>
        <Image source={require('@images/sliderImages/IC_Success_Invitation_sent.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>

        {/* <Text style={styles.title}>Invite Freinds</Text>
        <Text style={[styles.tagLine]}>on each freind get rewarded with 20 lolo’s</Text>
        <Image style={[styles.freindsSmile]} 
            source={require('@images/HomePage/lolofreinds.png')}/>
        <Text style={[styles.baseLine]}>2 invites per day</Text>
        <TouchableOpacity onPress={()=>{
                    this.props.navigator.push({
                    screen:'app.InviteFriendsHome',
                    animationType:"slide-horizontal"
                })
        }}style={[styles.button]}>
            <Text style={[styles.buttonTextInvite]}>Invite Freinds</Text>
        </TouchableOpacity> */}
    </View> 
        )};

    case '8':{
        return(

        <View style={styles.videoBackground}>
        <Image source={require('@images/sliderImages/IC_Success_purchase_item.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>

            {/* <Text style={[styles.tagLine,{marginTop:WindowHeight<= iphone5s?15:22,}]}>you can see and manage all your lolo’s in your</Text>
            <Text style={styles.titleSWallte}>Smart Wallet</Text>
            <Image  style={[styles.emojiGroup]}
            source={require('@images/HomePage/emojis1.png')}/>
            <TouchableOpacity onPress={()=>{
                this.props._handleIndexChange(1)

                //     this.props.navigator.push({
                //     screen:'app.Wallet',
                //     // passProps:{navigator:this.props.navigator}
                // }) 
            }}
                     style={[styles.button]}>
                    <Text style={[styles.buttonTextInvite]}>Take a Look</Text>
            </TouchableOpacity> */}
        </View>
        )};

    case '9':{
        return(
        <View style={styles.videoBackground}>
        <Image source={require('@images/sliderImages/IC_Product_plus_CTA.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>

            {/* <Text style={styles.title}>Buy Online</Text>
            <Text style={styles.tagLine}>just like the grownups do in our awesome marketplace </Text>
            <Image style={[styles.giftImg]}
        source={require('@images/HomePage/lologift.png')}/>*/}
            <TouchableOpacity 
            style={[styles.button]}>
                    <Text style={[styles.buttonTextInvite]}>Get It Now!</Text>
            </TouchableOpacity> 
        </View>

        )};
    case '10':{
        return(
        <View style={styles.videoBackground}>
                <Image source={require('@images/sliderImages/IC_Video_promotion.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
                
            {/* <Text style={styles.title}>Help Our Mailman</Text>
            <Text style={styles.tagLine}>set up address before you shop in our marketplace </Text>
            <Image style={[styles.manImg]}
                source={require('@images/HomePage/lolomailman.png')}/>
            <TouchableOpacity style={[styles.button]}>
                    <Text style={[styles.buttonTextInvite]}>Set Up Address</Text>
            </TouchableOpacity> */}
        </View>
        )};
        case '11':{
            return(
            <View style={styles.videoBackground}>
                    <Image source={require('@images/sliderImages/IC_Download_App.png')} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
                    
                {/* <Text style={styles.title}>Help Our Mailman</Text>
                <Text style={styles.tagLine}>set up address before you shop in our marketplace </Text>
                <Image style={[styles.manImg]}
            source={require('@images/HomePage/lolomailman.png')}/>*/}
                <TouchableOpacity style={[styles.button]}>
                        <Text style={[styles.buttonTextInvite]}>Download & Play</Text>
                </TouchableOpacity>
            </View>
            )};
        case '12':{
            return(
            <View style={styles.slide1}>
                    <CachedImage source={{uri:'https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/giphy1.gif?alt=media&token=03c6f15e-ed55-4854-9e39-8226b6a670c3'}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
    
                {/* <Text style={styles.title}>Help Our Mailman</Text>
                <Text style={styles.tagLine}>set up address before you shop in our marketplace </Text>
                <Image style={[styles.manImg]}
                    source={require('@images/HomePage/lolomailman.png')}/>
                <TouchableOpacity style={[styles.button]}>
                        <Text style={[styles.buttonTextInvite]}>Set Up Address</Text>
                </TouchableOpacity> */}
            </View>
            )};
        case '13':{
            return(
            <View style={styles.slide1}>
                    <CachedImage source={{uri:'https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/giphy2.gif?alt=media&token=adc2566b-cf7e-4c23-96ed-674340c17d22'}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
                    {/* <Image source={{uri:'https://media.giphy.com/media/3oFzmoXxE7Dbj16zzW/source.gif'}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/> */}
                    
                {/* <Text style={styles.title}>Help Our Mailman</Text>
                <Text style={styles.tagLine}>set up address before you shop in our marketplace </Text>
                <Image style={[styles.manImg]}
                    source={require('@images/HomePage/lolomailman.png')}/>
                <TouchableOpacity style={[styles.button]}>
                        <Text style={[styles.buttonTextInvite]}>Set Up Address</Text>
                </TouchableOpacity> */}
            </View>
            )};
}}





    render(){
        if(this.state.data.length===0||this.state.loading){
            return(
                <View style={{flex:1,width:WindowWidth, height: WindowHeight,justifyContent:"center",alignItems:'center'}}>                
                    <ActivityIndicator size='large' color='#ffb100' />
                </View>
            )
        }
        let {data} = this.state;
        console.log('++--',Object.keys(data))
    return(

    <View style={{flex:1,backgroundColor:'#F6F6F6'}}>
        <Header style={styles.headerStyle}>
        <Left style={styles.headerLeftSide}>
            <Button transparent onPress={()=>{
               
                this.props.navigator.toggleDrawer({
                    side:'left',
                    to:'open'
                })
            }}>
                <Image source={require('@images/HomePage/MenuBlack.png')}></Image>
            </Button>
        </Left>

        <Body style={styles.centerLogo}>
            <Title style={styles.headerText}>LOLO'S</Title>
        </Body>

        <Right>
            <Button transparent onPress={()=>{
                this.props.navigator.push({
                    screen:'app.Notifications',
                    animationType:"slide-horizontal"
                })
                // this.props.navigator.toggleDrawer({
                //     side:'right',
                //     to:'open',
                //      })
            }}>
                { this.state.badge !== 0?
                <View style={[styles.badgeStyle]}>
                  
                        <Text style={styles.badgeText}>{this.state.badge}</Text> 
                
                </View>:null
                }  
                <Image source={require('@images/HomePage/NOTIFICATIONWhite.png')}>
                </Image>
            </Button>
        </Right>
    </Header>
        <View style={{flex:1}}>
            <Swiper
                    ref={swiper => {
                    this.swiper = swiper
                    }} 
                    backgroundColor='#f0f0f0'
                    infinite
                    onSwipedLeft={()=>{this._swipedLeft()}}
                    onSwipedRight={()=>this._swipedRight()}	
                    onSwipedTop={()=>{this._swipedLeft()}}
                    onSwipedBottom={()=>this._swipedRight()}
                     //onTapCard={(index)=>{this._handleCardTap(index)}} 
                     //cards={['1', '2', '3','4','5','6','7','8','9','10','11','12','13']} 
                     cards={this.state.data}
                   // cardIndex={0}
                    cardVerticalMargin={20}
                   
                    //cardHorizonyalMargin={20}
                    //renderCard={this.renderCard}
                    renderCard={(card)=>{
                        //if(card===undefined) return
                        return(
                            <View style={[styles.videoBackground,{backgroundColor:'white'}]}>
                                <CachedImage source={{uri: card.image}} style={{width:WindowWidth-40,flex:1, resizeMode:'cover' }}/>
                                {card.video!==null&&card.video!==''&&card.video!==undefined?
                                    <TouchableOpacity  style={styles.playbutton} onPress={()=>this.props.navigator.showModal({
                                                                    screen: 'app.VideoCard', 
                                                                    passProps: {videoUrl: card.video}
                                                                })}>
                                <Image source={require('@images/sliderImages/Artboard.png')} style={{width:60,height:60}} />
                                </TouchableOpacity>:null}
                                {Platform.OS=='ios'?
                                card.appstore!==undefined&&card.appstore!==null&&card.appstore!==''?
                                <TouchableOpacity 
                                style={[styles.button]} onPress={()=>Linking.openURL(card.appstore)}>
                                        <Text style={[styles.buttonTextInvite]}>{card.buttontext}</Text>
                                </TouchableOpacity>:null :
                                card.googlestore!==undefined&&card.googlestore!==null&&card.googlestore!==''?
                                <TouchableOpacity 
                                style={[styles.button]} onPress={()=>Linking.openURL(card.googlestore)}>
                                        <Text style={[styles.buttonTextInvite]}>{card.buttontext}</Text>
                                </TouchableOpacity>:null
                                }
                            </View>
                        )
                    }}
                    animateOverlayLabelsOpacity={false}
                    animateCardOpacity={false}
                >
            
            </Swiper>
        </View>
        
    </View>
    )}}