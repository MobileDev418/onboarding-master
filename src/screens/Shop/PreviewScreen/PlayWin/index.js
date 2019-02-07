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
  ScrollView
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
import CountDown from "react-native-countdown-component";

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
    this.props.navigator.push({
      screen: "SelectProduct",
      animationType: "slide-horizontal"
    });
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
            <Text style={styles.headerText}>PLAY TO WIN</Text>
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
                source={require("@images/PlayWin/RaffleMainScreenImage.png")}
                style={{
                  width: WindowWidth - 70,
                  height: (WindowWidth - 70) * 828 / 798
                }}
              />

              <Text
                style={[
                  styles.wishplane,
                  {
                    color: "#000",
                    fontSize: 17,
                    marginTop: 15,
                    fontWeight: "400",
                    marginBottom: 25
                  }
                ]}
              >
                The raffle will be open for participating until:
              </Text>
              <CountDown
                until={1000}
                //onFinish={() => alert("finished")}
                //onPress={() => alert("hello")}
                size={20}
              />
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
            <Text style={[styles.buttonText, { color: "white" }]}>
              Let's Start
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
