import { StyleSheet, Platform, Dimensions } from "react-native";

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
const iphone5s = 568;
export default StyleSheet.create({
  container: {
    zIndex: 1000,
    backgroundColor: "white",
    height: WindowHeight
    //zIndex:1000,
  },
  logo: {
    height: 147 * 0.6,
    //marginHorizontal:88,
    resizeMode: "contain",
    marginTop: WindowHeight <= iphone5s ? 25 : 35,
    width: 210 * 0.6,
    alignSelf: "center"
  },
  shoppingText: {
    color: "#000000",
    fontFamily: "Lato-Regular",
    fontWeight: "900",
    fontSize: WindowHeight <= iphone5s ? 20 : 22,
    alignSelf: "center",
    marginTop: WindowHeight <= iphone5s ? 10 : 13
  },
  homeLogo: {
    height: ((WindowWidth - 70) * 447) / 942,
    width: WindowWidth - 70,
    resizeMode: "contain",
    alignSelf: "center"
    //marginTop: WindowHeight <= iphone5s ? 62 : 82
  },
  loloText: {
    color: "#FF4273",
    fontSize: WindowHeight <= iphone5s ? 24 : 34,
    alignSelf: "center",
    fontFamily: "PatuaOne-Regular",

    marginTop: WindowHeight <= iphone5s ? 20 : 24
  },
  featureText: {
    color: "#000000",
    fontFamily: "Lato-Regular",
    textAlign: "center",
    fontSize: WindowHeight <= iphone5s ? 18 : 22,
    marginHorizontal: 35,
    flexWrap: "wrap",
    fontWeight: "bold"
  },
  animatedImageView: {
    position: "absolute",
    bottom: WindowHeight <= iphone5s ? 140 : 176,
    alignSelf: "center"
  },
  arrowImage: {
    height: 24,
    width: 24,
    resizeMode: "contain"
  },
  footerImage: {
    position: "absolute",
    bottom: 0,
    width: WindowWidth,
    ...Platform.select({
      ios: {
        height: 0.21066666666 * WindowWidth
      },
      android: {
        resizeMode: "contain",
        height: 0.3 * WindowWidth
      }
    })
  },
  animatedWalletView: {
    position: "absolute",
    alignSelf: "center",
    bottom: WindowHeight <= iphone5s ? 40 : 78
  },

  wallet: {
    resizeMode: "contain",

    height: 165 * 0.8
  },
  animatedSmileyView: {
    alignSelf: "center",
    position: "absolute",
    bottom: WindowHeight <= iphone5s ? 80 : 105
  },
  smiley: {
    height: 120 * 0.8,
    width: 120 * 0.8
  },
  threeSmile: {
    height: 50,
    alignSelf: "center",
    width: 123,
    marginTop: WindowHeight <= iphone5s ? 67 : 77
  },
  startText: {
    color: "#FF4273",
    fontSize: WindowHeight <= iphone5s ? 28 : 34,
    alignSelf: "center",
    fontFamily: "PatuaOne-Regular",
    marginTop: WindowHeight <= iphone5s ? 20 : 24
  },
  buttonView: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 100,
    bottom: 61
  },
  animatedButtonView: {
    height: 50,
    width: deviceWidth - 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF4273"
    // borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    fontSize: 18
  },
  footerTextView: {
    position: "absolute",
    bottom: 110,
    width: WindowWidth
  },
  footerTextSubView: {
    flexDirection: "row",
    flexWrap: "wrap",
    //alignSelf:'center',
    justifyContent: "center",
    marginHorizontal: 47
  },
  footerText: {
    fontFamily: "Lato-Regular",
    fontSize: 14
  },
  header: {
    width: WindowWidth,
    height: 68,
    justifyContent: "center",
    backgroundColor: "#ff009d"
  },
  privacyTitle: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    alignSelf: "center",
    color: "#ff009d",
    marginVertical: 30
  },
  privacyText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    fontWeight: "300",
    color: "rgba(0,0,0,0.8)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    textAlign: "auto",
    lineHeight: 20,
    letterSpacing: 0.9
  }
});
