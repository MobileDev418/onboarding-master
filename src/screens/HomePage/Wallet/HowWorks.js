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
      king: 0
    };
  }

  render() {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <HeaderComponent
          title="HOW IT WORKS"
          navigator={this.props.navigator}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30, paddingTop: 44 }}
        >
          <Text style={styles.titleText}>upgrade your post pricing level</Text>
          <Image
            source={require("@images/Assets/3Kings.png")}
            style={{
              width: WindowWidth / 2,
              height: ((WindowWidth / 2) * 351) / 519,
              alignSelf: "center",
              marginVertical: 30
            }}
          />
          <Text style={styles.desText}>
            "Kings" are your own earning booster, Once you earned 10 kings (by
            inviting friends of any other eligible method). It will double your
            income from the next post you'll sell to a brand in Lolos.
          </Text>

          <Text style={[styles.desText, { fontWeight: "bold", marginTop: 15 }]}>
            Just like this ...10 kings...one post...double payment.
          </Text>
          <Text style={[styles.desText, { marginTop: 15 }]}>
            Example:
            {"\n"}
            your post is priced at 100 Lolos
            {"\n"} Brand approved your post
            {"\n"} you post it
            {"\n"}
            the brand pays 100 Lolos
            {"\n"}
            you get 200 Lolos
          </Text>
        </ScrollView>
      </View>
    );
  }
}
