import React,{Component} from "react"
import {Text,View,TextInput,Image,ScrollView,TouchableHighlight, TouchableOpacity} from "react-native"
import Touchable from 'react-native-platform-touchable'
import styles from "./style"



export default class Valley extends Component{
    static navigatorStyle = {
        navBarHidden:true
      };

    render(){
        return(
            <ScrollView>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.navigator.push({
                    screen: 'app.ValleyCheckout',
                    animationType: 'slide-horizontal'
                })}>
                    <Image source={require('@images/valley.png')} style={styles.image} />
                </TouchableHighlight>
            </ScrollView>
        )
    }
}