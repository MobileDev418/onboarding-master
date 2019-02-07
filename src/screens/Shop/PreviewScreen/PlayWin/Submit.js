import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Body,
  Right,
  Left,
  Title,
  Card,
  Badge,
  CardItem,
  Input
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  AlertIOS
} from "react-native";
import {
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
  TabBar,
  SceneMap
} from "react-native-tab-view";
import Swiper from "react-native-deck-swiper";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";

export default class Submit1 extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      index: 0,
      fashion: [],
      text: "",
      badge: 0
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", snapshot => {
        badge = snapshot.child("badge").val();
        if (!badge) badge = 0;
        this.setState({ badge });
      })
      .bind(this);
  }

  gotoHome() {
    AlertIOS.prompt(
      "What's your instagram user name?",
      "this is how we match the posts to our users",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: username => {
            if (username === "") return;
            else {
              let uid = firebase.auth().currentUser.uid;

              firebase
                .database()
                .ref("raffle_results/" + uid)
                .update({
                  product: this.props.product,
                  date: new Date().getTime(),
                  status: "p",
                  product_index: this.props.index
                });
              firebase
                .database()
                .ref("users/" + uid)
                .update({ instagram_username: username });
              this.props.navigator.resetTo({
                screen: "app.HomePage",
                animationType: "slide-horizontal",
                passProps: { from: true, raffle: true }
              });
            }
          }
        }
      ]
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={[styles.header]}>
            <TouchableOpacity
              style={{ position: "absolute", left: 27 }}
              onPress={() => {
                this.props.navigator.pop({
                  animationType: "slide-horizontal"
                });
              }}
            >
              <Image
                style={styles.leftButton}
                source={require("@images/DrawerScreen/left.png")}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>RAFFLE RULES</Text>
            <TouchableOpacity
              style={{ position: "absolute", right: 27 }}
              onPress={() => {
                this.props.navigator.push({
                  screen: "Chat",
                  animationType: "slide-horizontal"
                });
              }}
            >
              {this.state.badge !== 0 ? (
                <View style={[styles.badgeStyle]}>
                  <Text style={styles.badgeText}>{this.state.badge}</Text>
                </View>
              ) : null}
              <Image
                style={{ width: 25, height: 25, marginBottom: -14 }}
                source={require("@images/Chat_Icon.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                paddingTop: 25,
                paddingBottom: 80
              }}
            >
              <Image
                source={require("@images/PlayWin/RaffleRulesScreen.png")}
                style={{
                  width: WindowWidth - 70,
                  height: (WindowWidth - 70) * 528 / 630
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  marginVertical: 24
                }}
              >
                To make your submition count you must give us a shout out in
                your instagram account, the most creative, outrages & unique
                post will win the raffle
              </Text>
              <Image
                source={require("@images/HomePage/em_8.png")}
                style={{
                  width: 50,
                  height: 50
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 20
                }}
              >
                IMPORTANT
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16
                }}
              >
                Make sure to follow us on Instagram.
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16
                }}
              >
                You must include #getyourlolos + #raffle hashtags in your post
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
          <Button
            disabled={false}
            onPress={() => this.gotoHome()}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: "#FF4273"
              }
            ]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Done</Text>
          </Button>
        </View>
      </View>
    );
  }
}
