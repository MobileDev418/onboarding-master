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
      screen: "Submit",
      animationType: "slide-horizontal",
      passProps: { product: this.props.product, index: this.props.index }
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
            <Text style={styles.headerText}>SUBMIT</Text>
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
                paddingTop: 25,
                paddingHorizontal: 30,
                paddingBottom: 80
              }}
            >
              <Image
                source={require("@images/PlayWin/RaffleSubmitScreen.png")}
                style={{
                  width: WindowWidth - 70,
                  height: (WindowWidth - 70) * 828 / 798,
                  resizeMode: Image.resizeMode.contain
                }}
              />

              <Text
                style={[
                  {
                    //color: "#212123",
                    fontSize: 19,
                    marginTop: 25,
                    fontWeight: "bold",
                    textAlign: "center"
                  }
                ]}
              >
                The product who selected the most will be the prize and will be
                raffled between the owns who selected it!
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
            <Text style={[styles.buttonText, { color: "white" }]}>Got It</Text>
          </Button>
        </View>
      </View>
    );
  }
}
