import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  NetInfo,
  Alert,
  Linking,
  AsyncStorage,
  Platform
} from "react-native";
import styles from "./style";
import firebase from "react-native-firebase";
import Country from "../ShippingAddress/AddressCountry";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
const { width, height } = Dimensions.get("window");
export default class DrawerScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      already: false,
      country: "",
      street: "",
      apt: "",
      city: "",
      zipcode: "",
      state: "",
      myprofile: true,
      invite: true,
      lifetime: true,
      address: true,
      raffle: true
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  componentDidMount() {
    NetInfo.addEventListener("connectionChange", v => {
      if (v.type === "none") {
        Alert.alert(
          "You are offline",
          "Can't connect to the internet. Check your settings or try again later.",
          [
            {
              text: "CLOSE",
              onPress: () => console.log("cancel")
            },
            {
              text: "GO TO SETTINGS",
              onPress: () => Linking.openURL("app-settings:")
            }
          ]
        );
      }
    });
    firebase
      .database()
      .ref("Dynamic_Variable")
      .on("value", snap => {
        myprofile = snap.child("myprofile").val();
        invite = snap.child("invite").val();
        lifetime = snap.child("lifetime").val();
        address = snap.child("address").val();
        limitinvite = snap.child("limit_invite").val();
        raffle = snap.child("raffle").val();
        this.setState({ myprofile, invite, lifetime, address, raffle });
        firebase
          .database()
          .ref("users")
          .on("value", s => {
            let i = 0;
            s.forEach(child => {
              if (!child.val().transaction_history) return;
              let obj = child.val().transaction_history;
              Object.keys(obj).forEach(c => {
                // console.log("++---=====", obj[c].description);
                if (obj[c].description === "Referral bonus") i++;
              });
            });
            if (limitinvite < i) this.setState({ invite: false });
          });
      })
      .bind(this);
    // firebase.config().enableDeveloperMode();
    // firebase.config().setDefaults({
    //   remote_invite: 123
    // });
  }

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.toggleDrawer({
                side: "left",
                to: "close"
              });
            }}
            style={styles.leftIconContainer}
          >
            <Image
              style={styles.leftIcon}
              source={require("@images/DrawerScreen/left.png")}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>MENU</Text>
        </View>

        <View style={styles.drawerContainer}>
          {this.state.myprofile ? (
            <View>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={() => {
                  this.props.navigator.handleDeepLink({
                    link: "sidemenu",
                    payload: { screen: "app.myProfile", title: "MY PROFILE" }
                  });
                }}
              >
                <Text style={styles.drawerInnerText}>My Profile</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "MyOrders",
                    title: "Bookmarks"
                  }
                })
              }
            >
              <Text style={styles.drawerInnerText}>My Orders</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "app.Wallet",
                    title: "Bookmarks"
                  }
                })
              }
            >
              <Text style={styles.drawerInnerText}>My Wallet</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          {/* <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "TasksManager",
                    title: "Bookmarks"
                  }
                })
              }
            >
              <Text style={styles.drawerInnerText}>Earn Lolos</Text>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
            style={{ paddingBottom: 15 }}
            onPress={() =>
              this.props.navigator.handleDeepLink({
                link: "sidemenu",
                payload: {
                  screen: "ActivityMonitor",
                  title: "Bookmarks"
                }
              })
            }
          >
            <Text style={styles.drawerInnerText}>Shoutout Monitor</Text>
          </TouchableOpacity>
          {/* <View style={styles.line} /> */}

          <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "MyKings",
                    title: "Bookmarks"
                  }
                })
              }
            >
              <Text style={styles.drawerInnerText}>My Kings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "Chat",
                    title: "Bookmarks"
                  }
                })
              }
            >
              <Text style={styles.drawerInnerText}>Chat With Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View>
            <TouchableOpacity
              style={{ paddingBottom: 15 }}
              onPress={() => {
                firebase.auth().signOut();
                AsyncStorage.removeItem("Login");
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: {
                    screen: "app.SplashScreen",
                    title: "Bookmarks"
                  }
                });
              }}
            >
              <Text style={styles.drawerInnerText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          {/* {this.state.lifetime ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigator.handleDeepLink({
                    link: "sidemenu",
                    payload: { screen: "LifeScreen" }
                  });
                }}
                style={{ paddingBottom: 15 }}
              >
                <Text style={styles.drawerInnerText}>
                  Life Earnings Program
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    width: 55,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ff4273",
                    borderRadius: 3,
                    marginRight: 16,
                    marginLeft: 10
                  }}
                >
                  <Text style={{ color: "white" }}>SOON</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null} */}
          {/* <View style={styles.line} /> */}
        </View>
        <View
          style={{
            position: "absolute",
            //bottom: 0.25 * width + 10,
            alignItems: "center",
            width: "100%",
            ...Platform.select({
              ios: {
                bottom: 0.25 * width + 15
              },
              android: {
                bottom: 0.36 * width + 15
              }
            })
          }}
        >
          <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)" }}>
            Check our
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)" }}>
            <Text
              style={{ color: "#4d92e3" }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: { screen: "Terms", title: "LANDING" }
                })
              }
            >
              Terms of Use{" "}
            </Text>
            &
            <Text
              style={{ color: "#4d92e3" }}
              onPress={() =>
                this.props.navigator.handleDeepLink({
                  link: "sidemenu",
                  payload: { screen: "Privacy", title: "LANDING" }
                })
              }
            >
              {" "}
              Privary Policy
            </Text>
          </Text>
        </View>

        <Image
          style={styles.footerImage}
          source={require("@images/DrawerScreen/footer.png")}
        />
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              width: width,
              height: height,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#ffb100" />
          </View>
        ) : null}
      </View>
    );
  }
}
