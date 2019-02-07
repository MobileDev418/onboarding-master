import React,{Component} from "react"
import {Text,View,TextInput,Image,ScrollView,TouchableHighlight, TouchableOpacity} from "react-native"
import styles from "./style"



export default class Store extends Component{
    static navigatorStyle = {
        navBarHidden:true
      };

    render(){
        return(
            <ScrollView>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.navigator.push({
                    screen: 'app.BorderLineRefund',
                    animationType: 'slide-horizontal'
                })}>
                    <Image source={require('@images/store.png')} style={styles.image} />
                </TouchableHighlight>
            </ScrollView>
        )
    }
}