import { StyleSheet, PixelRatio, Dimensions } from "react-native";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
    //  alignItems:'center'
  },
  codeHeader: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Lato-Regular",
    marginTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
    lineHeight: 28
    //borderWidth:1,
  },
  textInput: {
    marginTop: 35,
    marginHorizontal: 24,
    backgroundColor: "#F0F0F0",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3
  },
  crossImage: {
    height: 26,
    width: 26,
    marginRight: 16
  },
  retry: {
    color: "#3393d1",
    marginTop: 5,
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    fontSize: 16
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    fontSize: 18
  },
  buttonContainer: {
    height: 50,
    width: deviceWidth - 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF4273",
    alignSelf: "center",
    position: "absolute",
    marginTop: 30,
    zIndex: 1,
    bottom: 30
  }
});
