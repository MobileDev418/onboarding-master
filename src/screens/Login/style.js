import { StyleSheet, Dimensions, PixelRatio } from "react-native";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
let WindowWidth = windowWidth;
export default StyleSheet.create({
  container: {},
  bdayText: {
    marginTop: 52,
    textAlign: "center",
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: 22,
    fontWeight: "500"
  },
  bdayAlert: {
    color: "#9B9B9B",
    fontFamily: "Lato-Regular",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    width: windowWidth - 60,
    marginTop: 10
  },
  datePicker: {
    width: windowWidth - 48,
    alignSelf: "center",
    marginTop: 53,
    height: 60
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
    zIndex: 100,
    bottom: 30
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    fontSize: 18
  },
  crossImage: {
    height: 26,
    width: 26
  },
  datePickerContainer: {
    height: 60,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 24,
    marginTop: 53,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    //borderWidth:1,
    borderRadius: 3
  },
  imageContainer: {
    position: "absolute",
    right: 20
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
  },
  nameText: {
    //fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "rgba(0, 0, 0, .39)",
    paddingBottom: 7
  },
  textInput: {
    backgroundColor: "transparent",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#bdbdbc",
    flexDirection: "row"
  },
  phoneNum: {
    marginTop: 52,
    textAlign: "center",
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: 22
  },
  alert: {
    marginTop: 3,
    color: "#9B9B9B",
    fontFamily: "Lato-Regular",
    fontSize: 14,
    textAlign: "center"
  },
  countryContainer: {
    flex: 1,

    flexDirection: "row"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "#ddd",
    borderColor: "#888",
    borderWidth: 1 / PixelRatio.get(),
    color: "#777"
  },
  triangle: {
    height: 12,
    width: 24,
    resizeMode: "contain"
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 53
  },
  input: {
    marginLeft: 10,
    height: 60,
    width: windowWidth - 163,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3
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
  },
  crossImage: {
    height: 26,
    width: 26
  },
  imageContainer: {
    position: "absolute",
    right: 10
    //top:20
  },
  nameText: {
    //fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "rgba(0, 0, 0, .39)",
    paddingBottom: 7
  },
  textInput: {
    backgroundColor: "transparent",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, .38)",
    flexDirection: "row"
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
  }
});
