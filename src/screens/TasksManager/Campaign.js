import React,{Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Text, Icon, Body, Right, Left,Title, Card, Badge, CardItem, Input} from 'native-base';
import {View,Dimensions,Image,TouchableOpacity,FlatList,Platform,ScrollView,ImageBackground} from 'react-native';
var WindowWidth = Dimensions.get('window').width
var WindowHeight = Dimensions.get('window').height
import styles from './style';
import firebase from 'react-native-firebase';



export default class TasksManage extends Component{
    
    static navigatorStyle = {
        navBarHidden:true
    };
    constructor(props)
    {
        super(props)
        this.state=({
            loading: true,
            data:[], 
            index:0,
            fashion: [],
            text: '',
            badge: 0,
            tasks:[
                {
                    title: 'Lolos',
                    text: 'The new teenagers Pocket Money. check it!',
                    image: require('@images/campaign.png')
                }
            ]
        })
        
    }
    componentWillMount(){
        
        this.setState({loading: true})
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+uid).on('value',snapshot=>{
            badge = snapshot.child('badge').val();
            if(!badge) badge=0
            this.setState({badge})
        }).bind(this)
       
    }

   

    gotoHome(){
   
        this.props.navigator.push({
            screen: 'Submit2',
            animationType: 'slide-horizontal',
            passProps: {url: this.state.text}
        })
    }
    clickTask(i){       
        if(i===0){
            this.props.navigator.push({
                screen: 'Instagram',
                animationType: 'slide-horizontal'           
            })
        } 
        
    }
  

    
   

    render(){       
        return(
            <View style={{backgroundColor:'#f8f8f8',flex:1}}>
                <View style={{flex:1}}>
                    <View style={[styles.header]}>
                          <TouchableOpacity  
                            style={{position:"absolute",left:27}}
                            onPress={()=>{
                            this.props.navigator.pop({                               
                                animationType:"slide-horizontal"
                            })                            
                        }}> 
                            <Image style={styles.leftButton} source={require('@images/DrawerScreen/left.png')}/>
                        </TouchableOpacity>                          
                        <Text style={styles.headerText}>INSTAGRAM CAMPAIGNS</Text>
                         <TouchableOpacity  
                            style={{position:"absolute",right:27}}
                            onPress={()=>{
                            this.props.navigator.push({
                                screen:'Chat',
                                animationType:"slide-horizontal"
                            })                         
                        }}> 
                            { this.state.badge !== 0?
                            <View style={[styles.badgeStyle]}>
                            
                                    <Text style={styles.badgeText}>{this.state.badge}</Text> 
                            
                            </View>:null
                            }  
                            <Image style={{width:25,height:25,marginBottom: -14}} source={require('@images/Chat_Icon.png')}/>
                        </TouchableOpacity>                          
                    </View>
                    <ScrollView contentContainerStyle={{alignItems:'center',paddingTop:25,paddingBottom:20}}>
                       
                        {
                            this.state.tasks.map((t,index)=>{
                                return(
                                    <TouchableOpacity style={styles.shadowStyle}  activeOpacity={0.9} onPress={()=>this.clickTask(index)}>
                                        <View style={{borderTopLeftRadius:15,borderTopRightRadius:15,overflow:'hidden'}}>
                                        <Image source={t.image} style={[{width: WindowWidth-40,height: ((WindowWidth-40)*300/683)}]}/>
                                        </View> 
                                        <View style={[styles.childView]}>
                                            <View style={{flexDirection:'row'}}>
                                                
                                                <Text style={{color:'#FF4273',backgroundColor:'transparent',fontWeight:'bold',fontSize:18}}>{  t.title}</Text>
                                            </View>
                                            <Text style={{marginTop:12,backgroundColor:'transparent',fontWeight:'500',opacity:0.7}}>{t.text}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                     
                  
                </View>
            
                
            </View>  
                 
        )
    }
}
