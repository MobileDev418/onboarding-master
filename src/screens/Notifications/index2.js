import React,{Component} from 'react'
import {Text,View,Image,FlatList, TouchableOpacity, ScrollView} from 'react-native'
import styles from './style'

export default class Notification extends Component{

    static navigatorStyle={navBarHidden:true}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.container}>
                        <TouchableOpacity style={styles.imageContainer} 
                        onPress={()=>{
                             this.props.navigator.pop({animationType:"slide-horizontal"})
                        }}>
                                <Image style={styles.backImage} source={require('@images/InviteFriends/back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.text}>NOTIFICATIONS</Text>
                </View>
                <View style={styles.body}>
                        <Text style={styles.date}>12.12.17</Text>
                        <Text style={styles.headText}>
                                Your Packages are on it's way
                        </Text>
                        
                        <Text style={styles.footerText}>
                                LESHP New USB Gadgets Mini Flexible LED Light Fan DeskTop Clock Time Display
                        </Text>
                </View>
                <Image style={styles.bodyImage} source={require('@images/notification.png')}></Image>
            </View>
        )
    }
}