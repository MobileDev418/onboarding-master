import {StyleSheet,Dimensions} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper';
const deviceWidth=Dimensions.get("window").width
export default StyleSheet.create({
    back:{
        position:'absolute',
        ...ifIphoneX({
            top:30
        },{
            top:20,
        }),
          
          left:15,
          height:50,
          width:50,
          zIndex:1,
          opacity:1,
      },
    Image:{
        height:375,
        zIndex:0
    },
    extraInfoLabel:{
        position:'absolute',
        zIndex:1,
        top:364,
        left:20,
        borderRadius:20,
        height:24,
        width:76,
        backgroundColor:'#F0F0F0',
        flexDirection:'row', 
        alignItems:'center'  
    },
    extraInfoIcon:{
        height:16,
        width:12,
        marginLeft:5,
        resizeMode:'contain'
    },
    superHotText:{
        //paddingLeft:4,
        fontSize:10,
        color:'#000',
        fontFamily:'Patua One',
        marginLeft:7
     },
    container:{
        backgroundColor:'#F0F0F0',
    },
    titleView:{
        paddingHorizontal:20,
        backgroundColor:'#fff',
        marginBottom:5,   
    },
    title:{
        marginTop:22,
        lineHeight:24,
        fontSize:16,
        fontFamily:'Lato-Regular',
        color:'#000'
    },
    label:{
        width:96,
        height:32,
        backgroundColor:'#FF4273', 
        marginTop:30,   
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
    },
    labelText:{
        fontSize:20,
        color:'#fff',
        fontFamily:"PatuaOne-Regular",
    },
    line:{
        marginTop:28,
        height:1,
        backgroundColor:'#F0F0F0'
    },
    shipping:{
        // flexDirection:'row',
        justifyContent:'space-between',
    },
    shippingText:{
        marginTop:5,
        fontSize:12,
        color:'#000',
        fontFamily:'Lato-Regular',
        opacity: 0.6
    },
    down:{
        width:7.9,
        height:8,
        marginTop:17,
    },
    shippingSubText:{
        fontSize:10,
        fontFamily:'Lato-Regular',
        color:'#9B9B9B',
        marginBottom:9,
    },
    itemText:{
        marginTop:20,
        fontFamily:'Lato-Regular',
        fontSize:12,
        color:'#000',
        marginBottom:15,
    },
    type:{
        height:24,
        backgroundColor:'#F0F0F0',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    key:{
        color:'#9B9B9B',
        fontFamily:'Lato-Regular',
        fontSize:10,
        paddingHorizontal:10,
     
    },
    value:{
        color:'#000',
        fontFamily:'Lato-Regular',
        fontSize:10,
   
    },
    slideBuy:{
        width:deviceWidth-88,
        // marginHorizontal:44,
       
      
       // backgroundColor:'#F5317F',
        borderRadius:40,
        height:64,
    },
    

   

})