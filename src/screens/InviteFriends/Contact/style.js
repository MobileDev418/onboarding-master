import { StyleSheet, Platform, Dimensions } from "react-native";
let windowHeight = Dimensions.get("window").height;
let { width } = Dimensions.get("window");
console.log(windowHeight);
const iphoneSE = 600;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerText: {
    textAlign: "center",
    color: "#FF4273",
    fontSize: 34,
    marginTop: 32,
    fontFamily: "PatuaOne-Regular"
  },
  subText: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: 16,
    marginHorizontal: 30,
    color: "#6f6f6f"
  },
  image: {
    height: (width * 810) / 1125,
    width: width,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: windowHeight <= iphoneSE ? 5 : 5
  },
  invite: {
    color: "#9B9B99",
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    marginTop: 25
  },
  button: {
    height: 50,
    width: width - 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF4273",
    // borderWidth: 2,
    alignSelf: "center",
    // position: "absolute",
    marginTop: 30
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
    fontSize: 18
  },
  searchBox: {
    height: 60,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center"
  },
  textInput: {
    marginLeft: 20,
    marginRight: 50
  },
  contactView: {
    height: 30,
    backgroundColor: "#f6f6f6",

    marginBottom: 10
  },

  inviteText: {
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "black",
    marginTop: 61
  },
  contactName: {
    color: "#FF4273",
    fontSize: 34,
    fontFamily: "PatuaOne-Regular",
    textAlign: "center"
  },
  image2: {
    height: 83,
    width: 151,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 68
  },
  contactNameStyle: {
    marginLeft: 15,
    fontFamily: "lato-Regular",
    fontSize: 18
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    top: 24
  },
  icon: {
    height: 16,
    width: 16
  },
  sectionList: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    width: 30,
    //overflow:'visible',
    paddingTop: Platform.OS === "ios" ? 0 : 80
    // flexWrap:'wrap',
    // height:windowHeight,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: width,
    height: windowHeight,
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  linkView: {
    width: width - 60,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 4,
    position: "absolute",
    bottom: 110
  },
  link: {
    fontFamily: "lato-Regular",
    fontSize: 18,
    width: width - 70
  }
});
