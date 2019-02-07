import React from 'react';
import {View } from 'react-native';
import styles from './style'

export const ImageLogoComponent = () =>{
    return(
        <View style={styles.imageView}>
              <View style={styles.imgLogo}></View>
        </View>
    )
}