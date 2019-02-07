import React,{Component} from 'react'
import {Text,View,Image,FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions} from 'react-native'
import Swipeable from 'react-native-swipeable';
import styles from './style';
import firebase from 'react-native-firebase';
import moment from 'moment';
var WindowWidth = Dimensions.get('window').width
var WindowHeight = Dimensions.get('window').height
export default class Notifications extends Component{
   // swipeable=null
    static navigatorStyle={
        navBarHidden:true
    }
    constructor(props){
        super(props)
        this.state={
            data:[],
            swipeable:[],
            backButton:false,
            loading: false,
            key: []
        }
        //swipeable:[]
        this._keyExtractor = this
            ._keyExtractor
            .bind(this)
        this.Notifications=this.Notifications.bind(this)
        this._handleSwipe=this._handleSwipe.bind(this)
        this._handleDelete=this._handleDelete.bind(this)
    }
    componentWillMount(){
        console.log('++--',new Date().getTime())
        this.setState({loading: true})
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+uid).update({
            badge: 0
        })
        
        firebase.database().ref('notifications/'+uid).on('value',function(snapshot){   
            let data = [], key=[];
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log('++--',childKey,childData)
                data.push(childData);
                key.push(childKey)
            });       
            
            this.setState({data,loading: false,key})
        }.bind(this))
    }

    _handleSwipe()
    {
        for(i=0;i<this.state.swipeable.length;i++){
            this.state.swipeable[i].recenter()
        }
    }

    _handleDelete(key){
        console.log('++--',this.state.key[key],key)
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('notifications/'+uid+'/'+this.state.key[key]).remove()
    }

    _keyExtractor = (item, index) => item.id;

     Notifications=(data,index)=>{ 
         let item=data.item;
         console.log('++--data',item,item.body,item.time)
        return(
            <Swipeable onRef={(ref)=>this.state.swipeable.push(ref)} style={[styles.NotificationBox,{flex:1}]}
                rightButtons={[
                    <TouchableOpacity 
                        onPress={()=>{
                            this._handleDelete(data.index)  
                            }}
                        style={[{backgroundColor:'#D0021B',height:70,width:80,alignItems:'center',justifyContent:'center'}]}>
                        <Image style={{height:22,width:22}} source={require('@images/component/cancel.png')}/>
                    </TouchableOpacity>
                ]}>
                    <TouchableOpacity onPress={()=>{
                            this.props.navigator.handleDeepLink({
                                link: "Rightmenu",
                                payload: {screen:"app.NoficationScreen",title:'Notifications'}
                     })}}>    
                        <Text style={styles.mainText}>
                            {item.title}
                        </Text>
                        <Text style={styles.subText}>
                            {item.body}
                        </Text>
                        <Text style={styles.dateText}>
                        {moment(item.time).format('MM.DD.YYYY')}
                        </Text>
                        
                    </TouchableOpacity>
            </Swipeable>
        )}
          
    render(){
        if(this.state.loading){
            return(
                <View style={{flex:1,width:WindowWidth, height: WindowHeight,justifyContent:"center",alignItems:'center'}}>                
                    <ActivityIndicator size='large' color='#ffb100' />
                </View>
            )
        }
        
        return(
            <ScrollView style={{backgroundColor:'white',flex:1}}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.imageContainer} 
                            onPress={()=>{
                                this._handleSwipe()
                                this.props.navigator.pop()
                                // side: 'right',
                                // to:'close',
                                }}>
                                <Image style={styles.backImage} source={require('@images/forward.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.text}>NOTIFICATIONS</Text>
                    </View>
                 
                    <FlatList
                    style={{flex:1}}
                    extraData={this.state}
                    data={this.state.data}
                    renderItem={this.Notifications}
                    keyExtractor={this._keyExtractor}/>
                   
            </ScrollView>
        )
    }
}
