import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
let windowWidth = Dimensions.get('window').width
let windowHeight=Dimensions.get('window').height
export default StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    body:{},
    avtarContainer:{
        marginVertical:41,
        alignSelf:'center'
    },
    avtar:{
        height:120,
        width:120
    },
    add:{
        position:'absolute',
        height:40,
        width:40,
        bottom:76,
        left:88,
        top:4,
    },
    profileInfo:{
      marginHorizontal:30
    },
    nameText:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:'#000',
        paddingBottom:7
    },
    textInput:{
        //marginTop:35,
      //  marginHorizontal:24,
        backgroundColor:'#F0F0F0',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:3,
    },

    // buttonText:{
    //     fontSize:20,
    //     //color:'#CCCCCC',
    //     fontFamily:'Lato-Regular',
    //     fontWeight:'900'
    // },
    // buttonContainer:{
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height: 70,
    //     position:'absolute',
    //     left:0,
    //     right:0,
    //     bottom:0,
    //    // backgroundColor:'#FF4273',
    //     //backgroundColor:'#F0F0F0',
    //     borderRadius:0
        
    // },
    LifeTimeText: {
        color:'#FF4273',
        fontSize:34,
        alignSelf:'center',
        fontFamily:"PatuaOne-Regular",
        textAlign:'center',
        marginTop: 20
    },
    walletImage: {
        resizeMode: 'contain',
        alignSelf:'center',
        marginTop: 30,
        width: windowWidth/2,
        height: 471*(windowWidth/2)/360
    },
    walletImage1: {
        width: windowWidth-36,
        height: (windowWidth-36)*810/960,
        alignSelf:'center',
        marginTop: 30
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
        marginVertical: 30
        // position:'absolute',
        // bottom:50

    },
    buttonText:{
        color:'#FF4273',
        fontFamily:'Lato-Regular',
        fontWeight:"bold",
        fontSize:18
    },
    header: {
        width: windowWidth,
        height: 68,
        justifyContent: 'center',
        backgroundColor: '#ff009d'
    },
    privacyTitle: {
        fontSize: 20,
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        alignSelf:'center',
        color: '#ff009d',
        marginVertical: 30
    },
    privacyText: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        fontWeight: '300',
        color: 'rgba(0,0,0,0.8)',
        alignSelf:'flex-start',
        paddingHorizontal: 10,
        textAlign: 'auto',
        lineHeight: 20,
        letterSpacing: 0.9
    }
})