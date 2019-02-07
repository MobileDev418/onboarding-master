import React,{Component} from 'react'
import {Header,Left,Body,Right,Button,Icon,Title} from 'native-base'
import styles from './style'

export const HeaderComponent = (props)=>{

return(
    <Header style={styles.header}>
    <Left>
      <Button transparent style={{height:40,width:40}} onPress={()=>{
        props.navigator.pop({animationType:"slide-horizontal"})
        }}>
        <Icon style={styles.backArrow} name='arrow-back'/>
      </Button>
    </Left>

    <Body>
      <Title style={styles.TitleStyle}></Title>
    </Body>
    <Right>

    </Right>

</Header>
)
  
}

