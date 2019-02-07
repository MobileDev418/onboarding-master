import {StyleSheet,Platform,Dimensions} from 'react-native'
let windowHeight = Dimensions.get('window').height
let width = Dimensions.get('window').width
console.log(windowHeight)
const iphoneSE = 600
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'

    },
    headerText:{
        textAlign:'center',
        color:'#FF4273',
        fontSize:34,
        marginTop:32,
        fontFamily:"PatuaOne-Regular",
    },
    subText:{
        marginTop:20,
        color:'#000000',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:22,
        marginHorizontal:40
    },
    image:{
        width: width
    },
    invite:{
        color:'#9B9B9B',
        fontSize:14,
        alignSelf:'center',
        fontFamily:'Lato-Regular',
        position:'absolute',
        bottom:120

    },
    button:{
        height:60,
        width:189,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:2,
        borderColor:'#FF4273',
        borderWidth:2,
        alignSelf:'center',
        position:'absolute',
        bottom:50

    },
    buttonText:{
        color:'#FF4273',
        fontFamily:'Lato-Regular',
        fontWeight:"bold",
        fontSize:18
    },
    searchBox:{
        height:60,
        backgroundColor:'#F0F0F0',
        marginHorizontal:30,
        borderRadius:100,
        marginTop:30,
        marginBottom:30,
        justifyContent:'center',
       
    },
    textInput:{
        marginLeft:20,
        marginRight:50,
    },
    contactView:{
        height:30,
        backgroundColor:'#f6f6f6',
        
        marginBottom:10
        
    },
   
    inviteText:{
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:'black',
        marginTop:61
    },
    contactName:{
        color:'#FF4273',
        fontSize:34,
        fontFamily:"PatuaOne-Regular",
        textAlign:'center'
    },
    image2:{
        height:83,
        width:151,
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:68
    },
    contactNameStyle:{
        marginLeft:15,
        fontFamily:"lato-Regular",
        fontSize:18
    },
    searchIcon:{
        position:'absolute',
        right:20,
        top:24
    },
    icon:{
        height:16,
        width:16,
        
    },
    sectionList:{
        alignItems:'center',
        justifyContent:'center',
        marginRight:4,
        width:30,
        //overflow:'visible',
        paddingTop:Platform.OS === 'ios'?0:80,
       // flexWrap:'wrap',
       // height:windowHeight,
    }
})