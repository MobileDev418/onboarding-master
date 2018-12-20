import { AppRegistry, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import { registerScreens } from "@screens/index";
import firebase from "react-native-firebase";
import Lolos from "./Share";

let windowWidth = Dimensions.get("window").width;
let screen = "";
if (__DEV__) console.disableYellowBox = true;
registerScreens();
Navigation.startSingleScreenApp({
  screen: {
    screen: "app.SplashScreen"
  },
  drawer: {
    left: {
      screen: "app.DrawerScreen"
    },

    style: {
      leftDrawerWidth: 75,
      rightDrawerWidth: windowWidth
      //drawerShadow:false
    },

    disableOpenGesture: true
  },
  animationType: "slide-down",

  appStyle: {
    orientation: "portrait"
  }
});
AppRegistry.registerComponent("Lolos", () => Lolos);
