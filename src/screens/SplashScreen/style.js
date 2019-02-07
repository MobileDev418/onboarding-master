import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
export default StyleSheet.create({
  imageStyle: {
    width: 145,
    height: 70,
    justifyContent: "center"
  },
  ShoppingText: {
    fontFamily: "Lato",
    fontWeight: "900",
    fontSize: 40,
    textAlign: "center",
    color: "#FF4273",
    lineHeight: 26
  },
  linerButton: {
    height: 60,
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 3
  },
  ButtonView: {
    backgroundColor: "transparent",
    height: 60,
    width: windowWidth - 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  ButtonText: {
    color: "white",
    fontFamily: "Lato-Regular",
    fontSize: 18,
    fontWeight: "900"
  },
  ButtonText2: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    fontWeight: "900",
    color: "#9B9B9B"
  },
  loloImage: {
    height: (120 * 147) / 210,
    width: 120,
    alignSelf: "center",
    marginTop: 25,
    resizeMode: "contain"
  },
  lolo: {
    height: 114,
    width: 114,
    marginLeft: windowWidth / 2 - 60
  }
});
