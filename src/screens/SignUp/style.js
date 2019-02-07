import { StyleSheet, Dimensions } from "react-native";
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
  }
});
