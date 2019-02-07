import { StyleSheet, Platform, Dimensions } from "react-native";
import { isIphoneX, ifIphoneX } from "react-native-iphone-x-helper";
let window = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    height: 80,
    shadowOpacity: 0.3,
    shadowColor: "rgba(0,0,0,0.20)",
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: Platform.OS == "android" ? 3 : 0,
    alignItems: "center",
    flexDirection: "row",
    width: window.width,
    zIndex: 100
  },
  imageContainer: {
    left: 14,
    position: "absolute",
    width: 50
    //  top:10,
  },
  backImage: {
    height: 23,
    width: 20,
    marginLeft: 10,
    marginTop: Platform.OS == "android" ? 0 : 10
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    paddingTop: Platform.OS == "android" ? 0 : 10,
    color: "black",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    textAlign: "center"
  }
});
