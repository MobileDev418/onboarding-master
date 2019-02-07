import React,{Component} from "react"
import {Text,View,TextInput,Image,ScrollView,TouchableHighlight, TouchableOpacity} from "react-native"
import Touchable from 'react-native-platform-touchable'
import styles from "./style";
import firebase from 'react-native-firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';


export default class ValleyCheckout extends Component{
    static navigatorStyle = {
        navBarHidden:true
      };
    componentDidMount(){
        this.notificationListener = FCM.on(FCMEvent.Notification,  (notif) => {        
            if(notif.local_notification) return
              this.showNotification(notif)      
          })
    }
    showNotification(notif){
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: notif.aps.alert.title,                     // as FCM payload
            body: notif.aps.alert.body,                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                  // as FCM payload
                                        // as FCM payload
            badge: notif.aps.badge,                                          // as FCM payload IOS only, set 0 to clear badges
                                    
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            
            show_in_foreground: true  
        })
        // let uid = firebase.auth().currentUser.uid;
        // let key = new Date().getTime()
        // let badge = 0
        // firebase.database().ref('users/'+uid).once('value',function(snapshot){
        //       badge=snapshot.child('badge').val();           
        //       if(badge === null) badge = 0            
        //      firebase.database().ref('users/'+uid).update({
        //         badge: badge+1
        //       })
        //   });
        // let updates = {};
        // updates[key] = {title: notif.fcm.title,body: notif.fcm.body,time: key}
        // firebase.database().ref('notifications/'+uid).update(updates)   
    }

      sendNOtification(){
        let self = this
        let uid = firebase.auth().currentUser.uid;
        FCM.getFCMToken().then(token => { 
            
            const params = {
                "to" : token,
                "notification" : {            
                  "title" : "Check out your wallet",
                  "text": `You just got a reward`,
                  "badge":0, 
                  "sound":"default"
                },
                "priority" : "high"
              };
              const headers = {
                'Authorization': 'key=AIzaSyCuFMtUH28h94Mt3ahb0vrOf-S3S55thkI',
                'Content-Type': 'application/json'
              };
              
                
                axios(
                  {
                    url: 'https://fcm.googleapis.com/fcm/send',
                    method:'post',
                    headers: headers,
                    data: params,
                     
                })
        })
        
        this.dropdown.alertWithType('warn','Check out your wallet','You just got a reward')
        // firebase.database().ref('users/'+uid).update({
        //     badge: 1,
        //     balance: 42
        // })
        firebase.database().ref('users/'+uid+'/badge').transaction(function(badge){
            // console.log('++----',userData)
            return badge+1
        })
        firebase.database().ref('users/'+uid+'/balance').transaction(function(badge){
            // console.log('++----',userData)
            return badge+42
        })
        firebase.database().ref('users/'+uid+'/transaction_history').push({
            time: new Date().getTime(),
            description: 'App paid install',
            type: 'reward',
            balance: 42
        })
        // this.props.navigator.resetTo({
        //     screen:'app.HomePage',
        //     animationType: 'slide-horizontal',
        //     passProps: {from: true,reward: true}
        // })
      }
      renderImage(){
          return(
              <Image source={require('@images/Assets/em.png')} style={{width:40,height:40}} />
          )
      }

    render(){
        return(
            <ScrollView>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.sendNOtification()} >
                    <Image source={require('@images/valleycheckout.png')} style={styles.image}  />
                </TouchableHighlight>
                <DropdownAlert 
                    ref={ref=>this.dropdown = ref}
                    showCancel={false}
                    renderImage={()=>this.renderImage()}
                    useNativeDriver={true}
                    onClose={()=> this.props.navigator.resetTo({
                        screen:'app.HomePage',
                        animationType: 'slide-horizontal',
                        passProps: {from: true,index: 1}
                    })}
                    closeInterval={10000}
                />
            </ScrollView>
        )
    }
}