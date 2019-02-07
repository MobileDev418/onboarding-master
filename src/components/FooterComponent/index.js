import React ,{Component} from 'react'
import {Footer,Button,Text} from 'native-base';
import styles from './style'

export const FooterComponent =(props)=>{
    return(
<Footer style={styles.container}>
                
                <Button transparent full style={styles.ButtonContainer} onPress={()=>{
                    props.navigator.push({
                      screen:'app.HomePage',
                      animationType:"slide-horizontal"
                    })
                    
                    }}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </Button>
            </Footer>
    )
}