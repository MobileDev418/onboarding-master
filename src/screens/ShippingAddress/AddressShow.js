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
  CardItem
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform
} from "react-native";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
let i = 0;

export default class ShippingAddress extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      street: "",
      zipcode: "",
      city: "",
      state: "",
      apt: ""
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  componentDidMount() {
    let uid = firebase.auth().currentUser.uid;
    let country, street, zipcode, city, state, apt;

    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          country = snapshot.child("country").val();
          street = snapshot.child("street").val();
          city = snapshot.child("city").val();
          zipcode = snapshot.child("zipcode").val();
          state = snapshot.child("state").val();
          apt = snapshot.child("apt").val();

          this.setState({
            country,
            city,
            street,
            zipcode,
            state,
            apt
          });
        }.bind(this)
      );
  }
  onPressHandle = async () => {
    await this.props.navigator.resetTo({
      screen: "app.HomePage",
      animationType: "slide-horizontal",
      passProps: { from: true }
    });
  };
  onPress = _.debounce(this.onPressHandle, 300, {
    leading: true,
    trailing: false
  });

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title="SHIPPING ADDRESS"
          navigator={this.props.navigator}
        />
        <Image
          style={[
            {
              marginTop: 1,
              alignSelf: "center",
              height: (WindowWidth * 1950) / 2301,
              width: WindowWidth
            }
          ]}
          source={require("@images/Assets/InsertAddressNEW2.png")}
        />
        <Text style={[styles.headText]}>Are We Good?</Text>

        <Text style={[styles.bodyText, { marginTop: 15 }]}>
          {this.state.street}, {this.state.apt}
        </Text>
        <Text style={[styles.bodyText, { marginTop: 0, paddingTop: 4 }]}>
          {this.state.city}, {this.state.state}, {this.state.country},{" "}
          {this.state.zipcode}
        </Text>

        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.button1, { bottom: 30 }]}
        >
          <Text style={styles.buttonText1}>We're Good!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
