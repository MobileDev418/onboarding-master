import {StyleSheet,Dimensions,Platform} from 'react-native'
var WindowWidth = Dimensions.get('window').width
var WindowHeight = Dimensions.get('window').height
const iphone5s = 568
const android = 640
const iphone7plus = 736
export default StyleSheet.create({
    headerText:{
        color:"#000",
        fontSize:16, 
        fontFamily:'Lato-Regular',
        fontWeight:"bold",
    },
    middlePart:{
        marginHorizontal:10,
        marginVertical:10,
        elevation:0.5
    },
    middlepartTestStyle:{
        marginHorizontal:15,
        marginVertical:15
    },
    imageStyle:{
        height:380,
        width:"auto",
    },
    badgeStyle:{
        height:16,
        width:16,
       borderRadius:8,
        position:"absolute",
        right:10,
        top:6,
        zIndex:1,
        backgroundColor:"#d0021b",
        justifyContent: 'center',
        alignItems: 'center'
       // opacity:1
    },
    cardImage:{
        height: 371,
        width: null, 
        //flex: 1
    },
    badgeText:{
        fontSize:10,
        fontFamily:'Lato-Regular',
        color:'#fff',
        opacity:1,
        backgroundColor:'transparent',

        // alignSelf:'center',
        // marginBottom: 6,
        zIndex:2,
        marginLeft:-1
        // lineHeight:24
    },
    wrapper:{
        borderWidth:1, 
        borderColor:"#F0F0F0",
        borderRadius:5,	
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#F6F6F6",
    },
    slide1:{
    
        borderWidth:1,
        borderColor:'#f0f0f0',  
        backgroundColor : '#fff',
        width:WindowWidth-40,
        ...Platform.OS=='ios'?{height:WindowHeight-190}:{height:WindowHeight-210},
        borderRadius:5,
        overflow:"hidden",

    
    },
    videoBackground:{
        borderWidth:1,
        borderColor:'#f0f0f0',  
      
        width:WindowWidth-40,
        ...Platform.OS=='ios'?{height:WindowHeight-190}:{height:WindowHeight-210},
        borderRadius:5,
        // overflow:"hidden",
        shadowColor: '#D3D3D3',
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.9,
        
        
    },
    titleSlide1:{
        marginTop:WindowHeight<= iphone5s?125:WindowHeight <= android?120:149,
        fontSize:WindowHeight <= android?26:35,
        fontFamily:"PatuaOne-Regular",
        textAlign:"center",
        color: "#FF4273"
    },
    emojiGroup:{
        alignSelf:'center',
        height:180*0.85,
        position:'absolute',
        resizeMode:'contain',
        bottom:WindowHeight >=iphone7plus? 110:WindowHeight <= android?70:90,
        //marginTop:WindowHeight<= iphone5s?20:WindowHeight <= android?35:40
    },
    title:{
        marginTop:WindowHeight<= iphone5s?20:33,
        fontSize:WindowHeight <= android?24:34,
        fontFamily:"PatuaOne-Regular",
        textAlign:"center",
        color: "#FF4273"
    },
    titleSWallte:{
        marginTop:WindowHeight<= iphone5s?5:10,
        fontSize:WindowHeight <= android?24:34,
        fontFamily:"PatuaOne-Regular",
        textAlign:"center",
        color: "#FF4273"   
    },
        tagLine:{
        paddingHorizontal:20,
       marginTop:WindowHeight<= iphone5s?5:10,
        color: "#000000",	
        textAlign:'center',
        fontFamily:'Lato-Regular',	
        fontSize:WindowHeight <= android? 15:22
    },
    giftImg:{
        marginTop:WindowHeight<= iphone5s?30:WindowHeight <= android?43:63,
        alignSelf:'center',
        height:160*0.85,
        width:190*0.85,
    },
    manImg:{
        marginTop:WindowHeight<= iphone5s?25:WindowHeight <= android?38:54,
        alignSelf:'center',
        height:150*0.85,
        width:130*0.85,
    },
    
    topImage:{
        position:'absolute',
        top:-25,
        right:-28,
        transform: [{ rotate: '215deg'}],
        height:128,
        width:128,
        
    },
    freindsSmile:{   
       // marginTop:WindowHeight <= android?50:90,
        marginTop:WindowHeight <= android?50:50,
        alignSelf:'center',
        height:95*0.85,
        width:173*0.85,
        resizeMode:'contain'
    },
    baseLine:{
        marginTop:WindowHeight<= iphone5s? 30:WindowHeight <= android?45:50,
        color:"#9B9B9B",	
        fontFamily:'Lato-Regular',
        fontSize:WindowHeight <= android?12:14,		
        textAlign: "center"
    },
    inviteFreinds:{
        position:'absolute',
        bottom:WindowHeight >=iphone7plus? 50:WindowHeight <= android?10: 30,
        marginHorizontal:73,
        height:60,
        width:189,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderWidth: 2,
        borderColor: "#FF4273",	
        borderRadius:3,	
        backgroundColor: "#FFFFFF",
    },
    button:{
        position:'absolute',
        bottom:WindowHeight >=iphone7plus? 50:WindowHeight <= android?10: 30,
        marginHorizontal:73,
        height:60,
        width:189,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        alignSelf:'center',
        borderColor: "#FF4273",	
        borderRadius:1,	
        backgroundColor: "#FFFFFF",
    },
    playbutton: {
        position:'absolute',
        top:60,
        marginHorizontal:73,
        // height:60,
        // width:60,
        justifyContent:'center',
        alignItems:'center',
        // borderWidth: 2,
        alignSelf:'center',
        // borderColor: "#FF4273",	
        // borderRadius:0,	
        // backgroundColor: "#FFFFFF",
    },

    buttonTextInvite:{
        fontSize:WindowHeight <= android?14:18,
        color:"#FF4273",
        textAlign:'center',
        fontFamily:"lato-Regular",
        fontWeight:'bold'
    },
    swipeTextView:{
       marginTop: WindowHeight <= android?90:134,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        //flex:1
    },
    swipeText:{
        fontSize:18,
        color:'#FF4273',
        marginHorizontal:19,
        textAlign:'center',
        fontWeight:'bold',
        fontFamily:'Lato-Regular'
    },
    leftArrow:{
        height:24,
        width:24,
        marginLeft:4,
        transform: [{ rotate: '90deg'}]
    },
    rightArrow:{
        height:24,
        width:24,
        marginLeft:4,
        transform: [{ rotate: '270deg'}]
        
    },
    menuIcon:{
        height:20,
        width:20,
    },
    headerStyle:{
        backgroundColor:"#FFFFFF",
        height:80
    },
    headerLeftSide:{
    
       // marginRight:35
    },
    notificationIcon:{
        height:20,
        width:20,
    },
    cardWelcomeText:{
        color:'#FF4273', 
        fontSize:20,
        fontWeight:"normal"
    },
    cardMessage:{
        color:"#646464",
        fontSize:14,
    },
    footerStyle:{
        height:70,
        flexDirection:"column"
    },
    footerLine:{
        backgroundColor:"#64B7E3",
        height:5
    },
    centerLogo:{
        
        ...Platform.OS === 'ios'?{}: {paddingLeft:WindowWidth/4 }
    },
    swiper:{
        flex:1,
        height:WindowHeight,
        width:WindowWidth,
        backgroundColor:'#f6f6f6', 
        
    },
    date:{
        color:'#9B9B9B',
        marginTop:41,
        alignSelf:'center',
        fontSize:14,
        fontFamily:'Lato-Regular'
    },
    currentWalletText:{
        marginTop:25,
        color:'black',
        alignSelf:'center',
        fontSize:22,
        fontFamily:'Lato-Regular'
    },
    currentWalletNum:{
        fontFamily:'Lato-Bold',
        fontSize:150,
        alignSelf:'center',
       
        fontWeight:'900',
        color:'#FF4273'
    },
    twoSmiley:{
        width:60,
        height:26,
        alignSelf:'center',
        marginTop:0
    },
    box:{
        height:60,
        width:WindowWidth/2-29,
        borderColor:'#FF4273',
        borderWidth:2,
        borderRadius:3,
        zIndex:0,
        justifyContent:'center',
        alignItems:'center'
    },
    backGround:{
        height:5,
        backgroundColor:'#F0F0F0',
       
    },
    soonBox:{
        height:24,
        width:50,
        zIndex:2,
        borderRadius:3,
        position:'absolute',
        borderColor:'black',
        backgroundColor:'white',
        left:11,
        borderWidth:1,
        top:-12,
        justifyContent:'center',
        alignItems:'center'
    },
    soonText:{
        color:'black',
        fontFamily:'Lato-Regular',
        fontSize:14
    },
    requestText:{
        color:'#FF4273',
        fontFamily:'Lato-Regular',
        fontSize:18
    },
    // flexColumn:{
    //     position:'absolute',
    //     right:24,
    //     top:22,
    //    // justifyContent:'flex-end'
    // },
    smileyIcon:{
        height:98,
        width:98,
        position:'absolute',
        left:85,
        top:25
    },
    greenIcon:{
        height:46,
        width:48,
        position:'absolute',
        top:52,
        left:25
    },
    sadIcon:{
        height:98,
        width:98,
        position:'absolute',
        left:25,
        top:25
    },
    redIcon:{
        height:46,
        width:48,
        position:'absolute',
        top:52,
        left:134
    },
    days:{
        color:'#9B9B9B',
        fontFamily:'Lato-Regular',
        fontSize:14,
        position:'absolute',
        right:24,
        top:23,
    },
    age:{
        color:'black',
        fontFamily:'Lato-Regular',
        fontWeight:'900',
        fontSize:26,
        position:'absolute',
        right:24,
        top:58,
    },
    sendText:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:'black',
        position:'absolute',
        right:24,
        top:86,
    }

})