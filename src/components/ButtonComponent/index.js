import React,{Component} from 'react';

import styles from './style'
import { Button, Text } from 'native-base';
 const ButtonComponent = (props)=>{
    return(
        <Button rounded style={styles.roundedButton} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.text}</Text>
          </Button>
    )
}
export default ButtonComponent