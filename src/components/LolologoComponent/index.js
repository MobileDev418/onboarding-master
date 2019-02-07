import React from 'react';
import {View ,Image, TouchableOpacity} from 'react-native';
import styles from './style'

export const LoloLogoComponent = (props) =>{
    return(
        <View>
            <TouchableOpacity onPress={()=>{
                props.navigator.pop({animationType:"slide-horizontal"})
                        }} style={styles.touchable}>
                <Image style={styles.backImage} source={require('@images/component/back.png')}/>
             </TouchableOpacity>
             <Image style={styles.loloImage} source={require('@images/component/lolos.png')}/>
        </View>
    )
}