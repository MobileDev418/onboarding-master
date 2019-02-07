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
  FlatList
} from "react-native";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";

export default class AddressEdit extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      street: "",
      zipcode: "",
      city: "",
      apt: "",
      state: ""
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
          if (country === null) country = "";
          if (street === null) street = "";
          if (city === null) city = "";
          if (zipcode === null) zipcode = "";
          if (state === null) state = "";
          if (apt === null) apt = "";
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
              marginTop: 11,
              alignSelf: "center",
              height: (WindowWidth * 1950) / 2301,
              width: WindowWidth
            }
          ]}
          source={require("@images/Assets/InsertAddressNEW2.png")}
        />

        <Text style={[styles.bodyText, { marginTop: 39 }]}>
          {this.state.street !== "" ? this.state.street + "" : ""},{" "}
          {this.state.apt}
        </Text>

        <Text style={[styles.bodyText, { marginTop: 0, paddingTop: 4 }]}>
          {this.state.city !== "" ? this.state.city + ", " : ""}
          {this.state.state},{" "}
          {this.state.country !== "" ? this.state.country + ", " : ""}
          {this.state.zipcode}
        </Text>

        <TouchableOpacity
          onPress={() => {
            this.props.navigator.push({
              screen: "app.shippingAddressCountry"
            });
          }}
          style={styles.editIcon}
        >
          <Image
            style={{ height: 22, width: 22 }}
            source={require("@images/ShippingAddress/edit.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
