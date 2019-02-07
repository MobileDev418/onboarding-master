import React,{Component} from "react"
import {Text,View,TextInput,Image,ScrollView,TouchableHighlight, TouchableOpacity} from "react-native"
import styles from "./style"



export default class CrazyLab extends Component{
    static navigatorStyle = {
        navBarHidden:true
      };

    render(){
        return(
            <ScrollView>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.navigator.push({
                    screen: 'app.BorderLine',
                    animationType: 'slide-horizontal'
                })}>
                    <Image source={require('@images/crazylab.png')} style={styles.image} />
                </TouchableHighlight>
            </ScrollView>
        )
    }
}