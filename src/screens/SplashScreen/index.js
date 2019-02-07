import { Container, Button, Content } from "native-base";
import React, { Component } from "react";
import {
  Image,
  View,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  AsyncStorage,
  NetInfo
} from "react-native";
var Appsee = require("react-native-appsee");

import styles from "./style";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const queryString = require("query-string");

import LinearGradient from "react-native-linear-gradient";
import Firebase from "react-native-firebase";
import DeviceInfo from "react-native-device-info";
import { CachedImage, ImageCacheManager } from "react-native-cached-image";

export default class ButtonExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
      online: false
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  };
  componentWillMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type !== "none") this.setState({ online: true });
      else alert("Please connect network and refresh app!");
    });
    let invited_by = null;
    // console.log("++--", DeviceInfo.getUniqueID());
    ImageCacheManager().downloadAndCacheUrl(
      "https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/assets%2FWelcome2.png?alt=media&token=a325f88f-55f3-45d5-a910-65ddf5c990cb"
    );
    Firebase.links().onLink(url => {
      if (url) {
        AsyncStorage.setItem("fullUrl", url);
        invited_by = this.invitedByParser(url);
      } else {
        AsyncStorage.setItem("fullUrl", "undefined");
      }
      if (url && invited_by) {
        AsyncStorage.setItem("url", invited_by);
      }
    });

    Firebase.links()
      .getInitialLink()
      .then(url => {
        if (url) {
          AsyncStorage.setItem("fullUrl", url);
          invited_by = this.invitedByParser(url);
        } else {
          AsyncStorage.setItem("fullUrl", "undefined");
        }
        if (url && invited_by) {
          AsyncStorage.setItem("url", invited_by);
        }
      });
  }
  componentDidMount() {
    Appsee.start("dd73fc9405894eeeb310f19c00de486e");

    let self = this;

    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if (user && this.state.online) {
        AsyncStorage.getItem("Login").then(value => {
          if (value === "login") {
            self.props.navigator.push({
              screen: "app.HomePage",
              animationType: "slide-horizontal"
            });
          } else {
            setTimeout(() => {
              this.setState({ splash: false });
            }, 500);
          }
        });
      } else {
        setTimeout(() => {
          this.setState({ splash: false });
        }, 500);
      }
    });

    this.imageinitialPosition = new Animated.ValueXY({ x: 0, y: 80 });
    this.imageLoloInitialPosition = new Animated.ValueXY({ x: 0, y: 1 });
    this.textInitialPosition = new Animated.ValueXY({ x: 0, y: windowHeight });
    this.initialPosition = new Animated.ValueXY({ x: 0, y: windowHeight });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  invitedByParser(url) {
    let invitedby = null,
      params = null;
    params = queryString.parse(url);
    if (params["https://beta.itunes.apple.com/v1/app/1391950519?invitedby"]) {
      return params[
        "https://beta.itunes.apple.com/v1/app/1391950519?invitedby"
      ];
    } else if (
      params["https://beta.itunes.apple.com/v1/app/1391950519/?invitedby"]
    ) {
      return params[
        "https://beta.itunes.apple.com/v1/app/1391950519/?invitedby"
      ];
    } else if (
      params["https://itunes.apple.com/il/app/lolos/id1391950519?invitedby"]
    ) {
      return params[
        "https://itunes.apple.com/il/app/lolos/id1391950519?invitedby"
      ];
    } else if (
      params[
        "https://play.google.com/store/apps/details?id=com.clickers&invitedby"
      ]
    ) {
      return params[
        "https://play.google.com/store/apps/details?id=com.clickers&invitedby"
      ];
    } else {
      return false;
    }
  }

  next() {
    let self = this;

    self.props.navigator.resetTo({
      screen: "app.Onboarding",
      animationType: "slide-horizontal"
    });
  }
  Login() {
    this.props.navigator.push({
      screen: "Login",
      animationType: "slide-horizontal"
    });
  }
  render() {
    if (this.state.splash) {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Image
            style={[
              {
                resizeMode: "contain",
                height: 114,
                width: 114,
                flex: 1,
                alignSelf: "center"
              }
            ]}
            source={require("@images/Assets/em.png")}
          />
        </View>
      );
    } else {
      Animated.spring(this.imageinitialPosition, {
        toValue: { x: 0, y: 0 },
        bounciness: 10,
        speed: 10
      }).start();

      Animated.spring(this.imageLoloInitialPosition, {
        toValue: { x: 0, y: windowHeight / 2 - 310 },
        speed: 5
      }).start();

      Animated.spring(this.textInitialPosition, {
        toValue: { x: 0, y: windowHeight - 350 },
        easing: Easing.back(),
        bounciness: 10,
        speed: 10
      }).start();

      Animated.spring(this.initialPosition, {
        toValue: {
          x: 0,
          y: Platform.OS == "android" ? windowHeight - 450 : windowHeight - 430
        },
        easing: Easing.back(),
        bounciness: 10,
        speed: 10
      }).start();
    }
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <Animated.Image
          style={[this.imageinitialPosition.getLayout(), styles.loloImage]}
          source={require("@images/HomePage/Logo.png")}
        />
        <Animated.View
          style={[
            this.textInitialPosition.getLayout(),
            { backgroundColor: "transparent" }
          ]}
        >
          <Text
            style={[
              styles.ShoppingText,
              { fontSize: 18, color: "#000", fontWeight: "400" }
            ]}
          >
            YOU CREATE, YOU POST,
          </Text>
          <Text style={[styles.ShoppingText, { fontSize: 18, color: "#000" }]}>
            YOU GET PAID!
          </Text>
        </Animated.View>
        <Animated.Image
          style={[this.imageLoloInitialPosition.getLayout(), styles.lolo]}
          source={require("@images/Assets/em.png")}
        />
        <Animated.View
          style={[
            this.initialPosition.getLayout(),
            {
              width: windowWidth,
              backgroundColor: "transparent"
            }
          ]}
        >
          <LinearGradient
            start={{ x: 1.04, y: 0.55 }}
            end={{ x: -0.04, y: 0.45 }}
            locations={[0.0, 1.0]}
            style={styles.linerButton}
            colors={["#F5317F", "#FF7C6E"]}
          >
            <TouchableOpacity
              onPress={() => this.next()}
              style={styles.ButtonView}
            >
              <Text style={styles.ButtonText}>Check It Out!</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Lato",
              color: "#3393d1",
              lineHeight: 20,
              alignSelf: "center",
              marginTop: 22
            }}
            onPress={() => this.Login()}
          >
            I already have an account
          </Text>
        </Animated.View>
      </View>
    );
  }
}
