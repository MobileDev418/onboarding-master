import { StyleSheet, Platform, Dimensions } from "react-native";
import { isIphoneX, ifIphoneX } from "react-native-iphone-x-helper";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  flex: {
    zIndex: 1000,
    backgroundColor: "white"
  },
  header: {
    ...ifIphoneX(
      {
        height: 106
      },
      {
        height: 80,
        alignItems: "center",
        justifyContent: "center"
      }
    ),

    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Lato-Regular",
    fontWeight: "bold",

    ...ifIphoneX({
      marginTop: 56,
      textAlign: "center",
      zIndex: 0
    })
  },
  leftIconContainer: {
    ...ifIphoneX(
      {
        top: 56,
        zIndex: 1
      },
      {
        top: 30
      }
    ),
    left: 24,
    height: 40,
    width: 30,
    position: "absolute"
  },
  leftIcon: {
    height: 24,
    width: 24
  },

  drawerInnerText: {
    marginLeft: 21,
    color: "#000000",
    fontFamily: "Lato-Regular",
    fontSize: 16,

    marginTop: 13
  },
  drawerContainer: {
    // width:windowWidth,
    backgroundColor: "white",
    ...ifIphoneX(
      {
        height: windowHeight - 106
      },
      {
        height: windowHeight - 80
      }
    )
  },
  footerImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth - 60,
    ...Platform.select({
      ios: {
        height: 0.25 * windowWidth
        //resizeMode:'contain'
      },
      android: {
        resizeMode: "contain",
        height: 0.36 * windowWidth
      }
    })
  },
  line: {
    backgroundColor: "#F0F0F0",
    height: 1,
    width: 261,
    // width:windowWidth-20,
    marginTop: 2,
    marginHorizontal: 10,
    marginLeft: 21
  }
});
