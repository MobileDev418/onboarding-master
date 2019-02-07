import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Clipboard,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Touchable from "react-native-platform-touchable";
import styles from "./style";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import firebase from "react-native-firebase";
import moment from "moment";

var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
export default class Social extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor() {
    super();
    this.state = {
      link: "",
      loading: true,
      king: 0,
      history: [],
      invite_success: 1
    };
  }

  componentWillMount() {
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid + "/transaction_history")
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          data.push(child.val());
        });
        this.setState({ history: data });
      });
    firebase
      .database()
      .ref("Admin/invite_success")
      .on("value", snap => {
        this.setState({ invite_success: snap.val() });
      });
  }

  render() {
    let history = [];
    history = this.state.history.filter(h => {
      return h.description === "Referral bonus";
    });
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <HeaderComponent
          title="MY 'KINGS'"
          navigator={this.props.navigator}
          rightnav="WalletHowWorks"
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.date}>{moment().format("DD.MM.YYYY")}</Text>
          <Text style={styles.currentWalletText}>Total Kings</Text>

          <Text
            style={{
              fontSize: 140,
              fontWeight: "900",
              alignSelf: "center",
              textAlign: "center",
              width: WindowWidth - 60,
              color: "#ff4273",
              fontFamily: "Lato-Regular"
            }}
          >
            {Math.floor(history.length / this.state.invite_success)}
          </Text>
        </ScrollView>
        <Image
          source={require("@images/MightyKingsFooter.png")}
          style={{
            width: WindowWidth,
            height: (WindowWidth * 600) / 1125,
            position: "absolute",
            bottom: 0
          }}
        />
      </View>
    );
  }
}
