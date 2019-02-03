import { StyleSheet, Dimensions, Platform } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
deviceWidth = Dimensions.get("window").width;
let WindowWidth = deviceWidth;
height = Dimensions.get("window").height;
const iphone5s = 568;
const android = 640;
const iphone7plus = 736;
export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  card: {
    flexDirection: "row",
    padding: 7,
    backgroundColor: "#f8f8f8",
    borderRadius: 2
  },
  productIcon: {
    height: 100,
    width: 100,
    marginRight: 19
    //borderWidth:1,
  },
  detail: {
    flexWrap: "wrap",
    flex: 1
  },
  title: {
    marginRight: 10,
    fontSize: 12,
    color: "#000",
    fontFamily: "Lato-Regular"
  },
  label: {
    width: 70,
    height: 24,
    backgroundColor: "#FF4273",
    //marginTop:7,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    borderRadius: 2
  },
  labelText: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "PatuaOne-Regular"
  },
  extraInfo: {
    //marginTop:5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    right: 10,
    bottom: 0,
    width: deviceWidth - 156

    //borderWidth:1,
  },
  shippingText: {
    fontSize: 10,
    color: "#9B9B9B",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  extraInfoLabel: {
    //borderWidth:1,
    borderRadius: 20,
    height: 24,
    width: 81,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    //justifyContent:'center',
    flexDirection: "row",
    marginBottom: 5
  },
  extraInfoIcon: {
    height: 16,
    width: 12,
    marginLeft: 5
  },
  superHotText: {
    //paddingLeft:4,
    fontSize: 10,
    color: "#000",
    fontFamily: "PatuaOne-Regular",
    marginLeft: 7
  },
  header: {
    height: 80,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    //paddingHorizontal:17,
    justifyContent: "center",
    paddingTop: 15,
    alignItems: "center",
    width: deviceWidth,
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    borderBottomColor: "rgba(211,211,211,0.5)",
    borderBottomWidth: 2
  },
  leftButton: {
    height: 23,
    width: 20,
    paddingRight: 10,
    //...ifIphoneX({marginTop:25},{}),
    marginBottom: -13
  },
  headerText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    fontWeight: "bold",
    ...ifIphoneX({ marginTop: 25 }, {})
  },
  rightButton: {
    height: 18,
    width: 18,
    marginRight: 27,
    paddingLeft: 10,
    ...ifIphoneX({ marginTop: 25 }, {})
  },
  tabBar: {
    height: 50
  },
  cardImage: {
    width: deviceWidth - 50,
    height: ((deviceWidth - 50) * 567) / 918
  },
  logoImage: {
    width: deviceWidth - 50,
    height: ((deviceWidth - 50) * 210) / 900,
    marginTop: 40
  },
  button: {
    position: "absolute",
    bottom: height >= iphone7plus ? 50 : height <= android ? 10 : 30,
    marginHorizontal: 73,
    height: 60,
    width: 189,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    alignSelf: "center",
    borderColor: "#FF4273",
    borderRadius: 1,
    backgroundColor: "#FFFFFF"
  },
  buttonTextInvite: {
    fontSize: height <= android ? 14 : 18,
    color: "#FF4273",
    textAlign: "center",
    fontFamily: "lato-Regular",
    fontWeight: "bold"
  },
  wishcommand: {
    fontSize: 17,
    fontFamily: "lato-Regular",
    fontWeight: "bold",
    marginTop: 35
  },
  wishplane: {
    fontFamily: "lato-Regular",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 25,
    width: deviceWidth - 70
  },

  buttonText: {
    fontSize: 20,
    //color:'#CCCCCC',
    fontFamily: "Lato-Regular",
    fontWeight: "900"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor:'#FF4273',
    //backgroundColor:'#F0F0F0',
    borderRadius: 0
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#000",
    paddingBottom: 7
  },
  textInput: {
    //marginTop:35,
    //  marginHorizontal:24,
    backgroundColor: "#F0F0F0",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3,
    marginHorizontal: 20,
    marginTop: 25
  },
  activeCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: "#FF4273"
  },
  textInputArea: {
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    marginHorizontal: 20,
    marginTop: 25,
    width: deviceWidth - 40,
    paddingVertical: 10
  },
  gift_open: {
    width: deviceWidth / 2 - 50,
    height: ((deviceWidth / 2 - 50) * 414) / 396,
    marginTop: 37
  },
  Line: {
    width: deviceWidth - 50,
    borderBottomColor: "#bdbdbc",
    borderBottomWidth: 1,
    alignSelf: "center",
    marginVertical: 20
  },
  badgeStyle: {
    height: 14,
    width: 14,
    borderRadius: 7,
    position: "absolute",
    right: -1,
    top: -2,
    zIndex: 1,
    backgroundColor: "#d0021b",
    justifyContent: "center",
    alignItems: "center"
  },
  badgeText: {
    fontSize: 10,
    // position:"absolute",
    // top:-6,
    backgroundColor: "transparent",
    color: "white",
    marginTop: -0.7
  },
  trackView: {
    width: deviceWidth - 40,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "white"
  },
  ImageView: {
    width: deviceWidth - 40,
    height: ((deviceWidth - 40) * 2) / 3,
    borderRadius: 15,
    position: "absolute"
  },
  TouchView: {
    width: deviceWidth - 40,
    height: ((deviceWidth - 40) * 2) / 3,
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    marginTop: 20,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    borderRadius: 15
  },
  childView: {
    backgroundColor: "white",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10
  },
  monitorRow: {
    flexDirection: "row",
    alignItems: "center",
    width: deviceWidth - 60,
    height: 50,
    borderColor: "#bdbdbc",
    borderWidth: 1,
    borderRadius: 13,
    paddingLeft: 15,
    alignSelf: "center",
    marginTop: 8
    //flexWrap: "wrap"
  },
  shadowStyle: {
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    backgroundColor: "transparent"
  },
  shadowStyle1: {
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: Platform.OS == "android" ? 3 : 0
  },
  bottomView: {
    width: deviceWidth,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f0f0f0",
    justifyContent: "center"
  },
  button1: {
    height: 50,
    width: deviceWidth - 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF4273",
    // borderWidth: 2,
    alignSelf: "center",
    position: "absolute",
    marginTop: 30,
    zIndex: 100
    //bottom: 50
  },
  buttonText1: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    fontSize: 18
  },
  textInputArea: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    width: deviceWidth,
    paddingVertical: 15
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    lineHeight: 24,
    textAlign: "center",
    width: WindowWidth - 60,
    backgroundColor: "transparent"
  },
  desText: {
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    color: "#6f6f6f",
    width: WindowWidth - 60,
    lineHeight: 24,
    fontFamily: "Lato-Regular",
    backgroundColor: "transparent"
  },
  linerButton: {
    height: 40,
    justifyContent: "center"
  }
});
