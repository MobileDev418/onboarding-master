import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Title,
  Card,
  Badge,
  CardItem
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text
} from "react-native";

var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import moment from "moment";

export default class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      badge: 0,
      balance: 0,
      history: []
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  componentWillMount() {
    let uid = firebase.auth().currentUser.uid,
      badge = 0,
      balance = 0;
    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          badge = snapshot.child("badge").val();
          balance = snapshot.child("balance").val();

          if (badge === undefined || badge === null) badge = 0;
          if (balance === undefined || balance === null) balance = 0;
          this.setState({ badge, loading: false, balance });
        }.bind(this)
      );
    firebase
      .database()
      .ref("users/" + uid + "/transaction_history")
      .on(
        "value",
        function(snapshot) {
          let data = [];
          snapshot.forEach(child => {
            if (child === null) return;
            // console.log("++--tracsactionHistory", child.val());
            data.push(child.val());
          });
          this.setState({ history: data });
        }.bind(this)
      );
    firebase
      .database()
      .ref("users/" + uid + "/walletHidden")
      .transaction(function(badge) {
        if (badge === null) return true;
        else return;
      });
  }
  getDiff(time) {
    let focus = moment(time).format("YYYY-MM-DD");
    let today = moment().format("YYYY-MM-DD");
    return focus;
  }
  render() {
    let balanceLeng = (Math.round(this.state.balance * 10) / 10).toString()
      .length;
    return (
      <View style={{ flex: 1, zIndex: 0, backgroundColor: "#fff" }}>
        <Header style={styles.headerStyle}>
          <Left style={styles.headerLeftSide}>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.pop();
              }}
            >
              <Image
                source={require("@images/DrawerScreen/left.png")}
                style={styles.leftButton}
              />
            </Button>
          </Left>

          <Body style={styles.centerLogo}>
            <Title style={styles.headerText}>WALLET</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.push({
                  screen: "MyKings",
                  animationType: "slide-horizontal"
                });
              }}
            >
              {/* {this.state.badge !== 0 ? (
                <View style={[styles.badgeStyle]}>
                  <Text style={styles.badgeText}>{this.state.badge}</Text>
                </View>
              ) : null} */}
              <Image
                source={require("@images/MightyKingSmall.png")}
                style={{ width: 24, height: (105 * 24) / 72 }}
              />
            </Button>
          </Right>
        </Header>
        <ScrollView>
          <Text style={styles.date}>{moment().format("DD.MM.YYYY")}</Text>
          <Text style={styles.currentWalletText}>Currently in my Wallet</Text>
          <Text
            style={[
              styles.currentWalletNum,
              {
                fontSize:
                  balanceLeng < 4 ? 140 : (WindowWidth + 100) / balanceLeng
              }
            ]}
          >
            {Math.round(this.state.balance * 10) / 10}
          </Text>
          <Image
            style={styles.twoSmiley}
            source={require("@images/InviteFriends/2smiley.png")}
          />
          <TouchableOpacity
            style={[styles.button, { position: "relative", marginTop: 60 }]}
            onPress={() => {
              this.props.navigator.resetTo({
                screen: "app.HomePage",
                animationType: "slide-horizontal",
                passProps: { from: true, index: 1 }
              });
            }}
          >
            <Text style={styles.buttonText}>Earn Lolos</Text>
          </TouchableOpacity>

          {this.state.history
            .sort(function(a, b) {
              if (a.time > b.time) return -1;
              if (a.time < b.time) return 1;
              return 0;
            })
            .map((h, i) => {
              if (h.description === "Referral bonus") return;
              return h.type === "reward" ? (
                <View>
                  <View style={[styles.backGround, { marginTop: 25 }]} />
                  <View style={{ height: 150 }}>
                    <Image
                      style={styles.smileyIcon}
                      source={require("@images/HomePage/wallet/smiley.png")}
                    />
                    <Image
                      style={styles.greenIcon}
                      source={require("@images/HomePage/wallet/greenIcon.png")}
                    />
                    <View style={styles.flexColumn}>
                      <Text style={styles.days}>{this.getDiff(h.time)}</Text>
                      <Text style={styles.age}>+ {h.balance}</Text>
                      <Text style={[styles.sendText, { paddingTop: 15 }]}>
                        {h.description}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.backGround} />
                  <View style={{ height: 150 }}>
                    <Image
                      style={styles.sadIcon}
                      source={require("@images/HomePage/wallet/sadIcon.png")}
                    />
                    <Image
                      style={styles.redIcon}
                      source={require("@images/HomePage/wallet/redIcon.png")}
                    />
                    <View style={styles.flexColumn}>
                      <Text style={styles.days}>{this.getDiff(h.time)}</Text>
                      <Text style={styles.age}>- {h.balance}</Text>
                      <Text style={[styles.sendText, { paddingTop: 15 }]}>
                        {h.description}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}

          {/* <View style={styles.backGround} /> */}
        </ScrollView>
      </View>
    );
  }
}
