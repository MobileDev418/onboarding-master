import { StyleSheet, PixelRatio, Dimensions } from "react-native";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {},
  avtarContainer: {
    marginVertical: 41,
    alignSelf: "center"
  },
  avtar: {
    height: 120,
    width: 120
  },
  add: {
    position: "absolute",
    height: 40,
    width: 40,
    bottom: 76,
    left: 88,
    top: 4,
    borderRadius: 20,
    shadowColor: "#bdbdbc",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.7
  },
  profileInfo: {
    marginHorizontal: 30
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
