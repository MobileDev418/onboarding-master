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
  Form,
  CardItem,
  Textarea
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";

var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import LinearGradient from "react-native-linear-gradient";
import { CachedImage } from "react-native-cached-image";
export default class Submit1 extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.data ? this.props.data : [],
      index: 0,
      fashion: [],
      text: this.props.description ? this.props.description : "",
      badge: 0,
      focus: false,
      modalVisible: false,
      productImage: this.props.producImg ? this.props.producImg : "",
      productWebPage: false,
      country: "",
      street: "",
      zipcode: "",
      city: "",
      state: "",
      apt: "",
      ratio: 20
    };
  }
  componentWillMount() {
    let self = this;
    if (!this.props.producImg) {
      setTimeout(function() {
        self.setState({ modalVisible: true });
      }, 500);
    }

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

    firebase
      .database()
      .ref("Admin/ratio")
      .on("value", snap => {
        this.setState({ ratio: snap.val() });
      })
      .bind(this);
  }
  gotoHome() {
    let uid = firebase.auth().currentUser.uid;
    let self = this;
    firebase
      .database()
      .ref("users/" + uid + "/balance")
      .transaction(balance => {
        return balance - self.props.product.price * this.state.ratio;
      });
    firebase
      .database()
      .ref("users/" + uid + "/transaction_history")
      .push({
        time: new Date().getTime(),
        description: "Product purchased",
        type: "purchase",
        balance: this.props.product.price * this.state.ratio
      });
    firebase
      .database()
      .ref("purchased/" + uid)
      .push({
        product_url: this.props.product.url,
        image: this.props.product.product_img,
        sold_from: this.props.product.store,
        time: new Date().getTime(),
        price_dollar: this.props.product.price,
        price_lolos: this.props.product.price * this.state.ratio,
        address:
          this.state.street +
          ", " +
          this.state.apt +
          ", " +
          this.state.country +
          ", " +
          this.state.state +
          ", " +
          this.state.city +
          ", " +
          this.state.zipcode,
        description: this.props.product.description,
        title: this.props.product.title,
        order_status: "In Review"
      });
    firebase
      .database()
      .ref("wishList/" + uid + "/" + this.props.product.id)
      .remove();
    this.props.navigator.resetTo({
      screen: "app.HomePage",
      animationType: "slide-horizontal",
      passProps: { from: true, purchase: true }
    });
  }

  render() {
    let self = this;
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent title="WISH LIST" navigator={this.props.navigator} />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 5,
            backgroundColor: "transparent",
            paddingBottom: 130
          }}
        >
          <LinearGradient
            start={{ x: 1.04, y: 0.55 }}
            end={{ x: -0.04, y: 0.45 }}
            locations={[0.0, 1.0]}
            style={styles.linerButton}
            colors={["#F5317F", "#FF7C6E"]}
          >
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: 12,
                  color: "#fff"
                }
              ]}
            >
              THIS PRODUCT PRICE IS{" "}
              {this.props.product.price * this.state.ratio} LOLOS
            </Text>
          </LinearGradient>
          <Image
            source={{ uri: this.props.product.product_img }}
            style={{
              width: WindowWidth,
              height: (WindowWidth * 534) / 627,
              alignSelf: "center",
              marginBottom: 10,
              resizeMode: Image.resizeMode.contain,
              marginTop: 6
            }}
          />
          <View
            style={{
              width: WindowWidth,
              paddingVertical: 20,
              alignItems: "center",
              backgroundColor: "#fff",
              marginTop: 15
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#ff4273",
                marginBottom: 10,
                fontFamily: "Lato",
                fontWeight: "bold",
                lineHeight: 24
              }}
              onPress={() => this.props.navigator.pop()}
            >
              SEND TO:
            </Text>
            <Text style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}>
                {this.state.street}
              </Text>
              {this.state.apt !== "" ? (
                <Text
                  style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}
                >
                  , {this.state.apt}
                </Text>
              ) : null}
            </Text>

            <Text style={{ marginTop: 10 }}>
              {this.state.state !== "" ? (
                <Text
                  style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}
                >
                  {this.state.state},
                </Text>
              ) : null}
              <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}>
                {this.state.city}
              </Text>
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}>
              {this.state.country}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}>
              {this.state.zipcode}
            </Text>
          </View>
        </ScrollView>
        <View
          style={[
            {
              padding: 30,
              position: "absolute",
              bottom: 0,
              backgroundColor: "white"
            },
            styles.shadowStyle1
          ]}
        >
          <Button
            disabled={false}
            onPress={() => this.gotoHome()}
            style={[
              styles.button1,
              {
                backgroundColor: "#FF4273",
                position: "relative",
                marginTop: 0
              }
            ]}
          >
            <Text style={[styles.buttonText1, { color: "white" }]}>Buy</Text>
          </Button>
        </View>
      </View>
    );
  }
}
