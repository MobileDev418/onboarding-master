import React,{Component} from "react"
import {Text,View,TextInput,Image,ScrollView,TouchableHighlight, TouchableOpacity} from "react-native"
import styles from "./style";
import firebase from 'react-native-firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';




export default class BorderLineRefund extends Component{
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
            id: 'UNIQ_ID_STRING',
            title: notif.fcm.title,
            body: notif.fcm.body,
            sound: 'default',
            priority: 'high',
            icon: 'ic_launcher',
            show_in_foreground: true
        })
          
    }

      sendNOtification(){
        let self = this;
        let uid = firebase.auth().currentUser.uid;
        let key = new Date().getTime()
        let badge = 0                   
            
        let updates = {};
        updates[key] = {title: 'Check out your wallet',body: 'You just got a reward',time: key}
        firebase.database().ref('notifications/'+uid).update(updates)       
        
        firebase.database().ref('users/'+uid+'/badge').transaction(function(badge){
            // console.log('++----',userData)
            return badge+1
        })
        firebase.database().ref('users/'+uid+'/balance').transaction(function(badge){
            // console.log('++----',userData)
            return badge+31
        })
        this.dropdown.alertWithType('warn','Check out your wallet','You just got a reward')
        firebase.database().ref('users/'+uid+'/transaction_history').push({
            time: new Date().getTime(),
            description: 'In app purchase',
            type: 'reward',
            balance: 31
        })
        this.props.navigator.resetTo({
            screen:'app.HomePage',
            animationType: 'slide-horizontal',
            passProps: {from: true,reward: true}
        })
      }

    renderImage(){
        return(
            <Image source={require('@images/Assets/em.png')} style={{width:40,height:40}} />
        )
    }

    render(){
        return(
            <ScrollView>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.sendNOtification()}>
                    <Image source={require('@images/borderlinerefund.png')} style={styles.image} />
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