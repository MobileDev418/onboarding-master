import { StyleSheet, Dimensions, Platform } from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
const iphone5s = 568;
const android = 640;
const iphone7plus = 736;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 0
    //    borderWidth:6,
  },
  headText: {
    marginTop: Platform.OS == "android" ? 6 : 6,
    alignSelf: "center",
    color: "#212123",
    fontSize: 20,
    fontFamily: "PatuaOne-Regular"
  },
  tagline: {
    alignSelf: "center",
    color: "#9B9B9B",
    fontFamily: "Lato-Regular",
    fontSize: 16,
    paddingTop: 4
  },
  bodyText: {
    textAlign: "center",
    marginTop: Platform.OS == "android" ? 90 : 90,
    fontFamily: "Lato-Regular",
    color: "#000",
    fontSize: 16,
    justifyContent: "center",
    width: WindowWidth - 50,
    alignSelf: "center"
  },
  emoj: {
    height: 108 * 0.85,
    width: 96 * 0.85,
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
    zIndex: 1
  },
  btnGoodContainer: {
    // flex:1,
    position: "absolute",
    bottom: 65,
    // borderWidth:1,
    alignSelf: "center",
    zIndex: 1
  },
  btnGood: {
    height: 60,
    width: WindowWidth - 186,
    // marginHorizontal:93,
    borderColor: "#FF4273",
    borderWidth: 3,
    borderRadius: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    //position:'absolute',
    bottom: 0,
    alignSelf: "center",
    zIndex: 2
  },
  btnGoodText: {
    color: "#FF4273",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 1
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 72
  },
  input: {
    flex: 1,
    height: 60,
    marginHorizontal: 24,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3
  },
  crossImage: {
    height: 26,
    width: 26
  },
  imageContainer: {
    position: "absolute",
    right: 10
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
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
    //backgroundColor:'#FF4273',
    //  backgroundColor:'#F0F0F0',
    borderRadius: 0
  },
  editIcon: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: "#FF4273",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 30,
    bottom: 30
  },
  modalContainer: {
    backgroundColor: "red"
  },
  pickerHead: {
    elevation: 0.3,
    backgroundColor: "#fff",
    marginTop: 15,
    color: "#D8D8D8",
    fontSize: 18,
    paddingLeft: 20,
    padding: 15,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 }
  },
  inputView: {
    width: WindowWidth - 32,
    height: 48,
    justifyContent: "center",
    borderBottomColor: "#dedede",
    alignSelf: "center",
    borderBottomWidth: 1,
    marginTop: 15,
    zIndex: 20
  },
  textinput: {
    fontSize: 16,
    width: WindowWidth - 38,
    zIndex: 10
  },
  header: {
    height: 80,
    shadowOpacity: 0.3,
    shadowColor: "rgba(0,0,0,0.20)",
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: Platform.OS == "android" ? 3 : 0
  },
  imageContainer: {
    left: 14,
    position: "absolute",
    width: 50
    //  top:10,
  },
  backImage: {
    height: 24,
    width: 24,
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
  },
  locationPreview: {
    alignSelf: "center",
    width: WindowWidth - 32,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    paddingLeft: 10,
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.2)",
    borderLeftWidth: 0.5,
    borderLeftColor: "rgba(0,0,0,0.2)"
  },
  locationName: {
    fontSize: 15,
    color: "#212123",
    fontWeight: "400",
    marginLeft: 8
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
  }
});
