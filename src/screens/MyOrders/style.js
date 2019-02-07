import { StyleSheet, Dimensions } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
deviceWidth = Dimensions.get("window").width;
height = Dimensions.get("window").height;
let WindowWidth = deviceWidth;
const iphone5s = 568;
const android = 640;
const iphone7plus = 736;
export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
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
  bottomView: {
    width: deviceWidth,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    shadowColor: "#D3D3D3",
    shadowOffset: {
      width: 1,
      height: -2
    },
    shadowRadius: 3,
    shadowOpacity: 0.9
  },
  linerButton: {
    height: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: WindowWidth,
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    lineHeight: 24,
    textAlign: "center",
    //width: WindowWidth - 60,
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
  }
});
