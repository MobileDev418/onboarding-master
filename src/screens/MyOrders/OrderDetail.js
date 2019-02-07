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
  Alert,
  Modal
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
import styles from "./style";
import firebase from "react-native-firebase";
import LWebView from "../../components/LWebView";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import LinearGradient from "react-native-linear-gradient";
import { CachedImage } from "react-native-cached-image";
import Lottie from "lottie-react-native";
import moment from "moment";
export default class OrderDetail extends Component {
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
      country: "",
      street: "",
      city: "",
      zipcode: "",
      fullname: "",
      productWebPage: false,
      balance: 0,
      ratio: 20
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("users/" + uid)
      .on("value", snapshot => {
        country = snapshot.child("country").val();
        street = snapshot.child("street").val();
        city = snapshot.child("city").val();
        zipcode = snapshot.child("zipcode").val();
        state = snapshot.child("state").val();
        apt = snapshot.child("apt").val();
        badge = snapshot.child("badge").val();
        let balance = snapshot.child("balance").val();
        let fullname = snapshot.child("fullname").val();
        if (country === null) country = "";
        if (street === null) street = "";
        if (city === null) city = "";
        if (zipcode === null) zipcode = "";
        if (balance === null) balance = 0;
        if (state === null) state = "";
        if (apt === null) apt = "";
        if (fullname === null) fullname = "";
        if (badge === undefined || badge === null) badge = 0;
        this.setState({
          country,
          city,
          street,
          zipcode,
          loading: false,
          balance,
          apt,
          state,
          fullname,
          badge,
          show: false
        });
      })
      .bind(this);
    firebase
      .database()
      .ref("Admin/ratio")
      .on("value", snap => {
        this.setState({ ratio: snap.val() });
      })
      .bind(this);
  }

  gotoHome() {
    this.props.navigator.push({
      screen: "Submit2",
      animationType: "slide-horizontal",
      passProps: { url: this.state.text }
    });
  }

  makeorder() {
    if (!this.props.product.price) {
      alert("Price is not defined yet!");
      return;
    }
    if (this.props.product.price * this.state.ratio > this.state.balance) {
      this.props.navigator.resetTo({
        screen: "app.HomePage",
        animationType: "slide-horizontal",
        passProps: { from: true, index: 1 }
      });
      return;
    }
    if (
      this.state.country === "" ||
      this.state.city === "" ||
      this.state.street === "" ||
      this.state.zipcode === ""
    ) {
      Alert.alert(
        "",
        "You must setup an address in order to make a purchase.",
        [
          {
            text: "Later",
            onPress: () => console.log("cancel"),
            style: "cancel"
          },
          {
            text: "Setup",
            onPress: () =>
              this.props.navigator.push({
                screen: "app.shippingAddressHome",
                animationType: "slide-horizontal"
              })
          }
        ]
      );
      return;
    }
    if (this.state.fullname === "") {
      Alert.alert(
        "",
        "You must complete your profile details to make a purchase.",
        [
          {
            text: "Later",
            onPress: () => console.log("cancel"),
            style: "cancel"
          },
          {
            text: "Setup",
            onPress: () =>
              this.props.navigator.push({
                screen: "app.myProfile",
                animationType: "slide-horizontal"
              })
          }
        ]
      );
      return;
    }
    this.props.navigator.push({
      screen: "PreviewOrder",
      animationType: "slide-horizontal",
      passProps: { product: this.props.product }
    });
  }
  showProduct() {
    this.setState({ productWebPage: true });
  }
  delete() {
    Alert.alert(
      "",
      "Are you sure you want to delete this product from wish list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            let uid = firebase.auth().currentUser.uid;
            firebase
              .database()
              .ref("wishList/" + uid + "/" + this.props.product.id)
              .remove();
            if (this.props.product.order) {
              firebase
                .database()
                .ref("users/" + uid + "/product_cards")
                .transaction(cards => {
                  let data = [...cards];
                  let index = data.indexOf(this.props.product.order);
                  if (index > -1) {
                    data.splice(index, 1);
                  }
                  return data;
                });
            }
            this.props.navigator.pop();
          }
        }
      ]
    );
  }
  indicator() {
    return (
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          //flex: 1,
          width: WindowWidth - 50,
          height: WindowHeight - 50,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 5
          //justifyContent: "center"
        }}
      >
        <Lottie
          source={require("@images/ice_cream_animation.json")}
          loop
          autoPlay
          style={{
            width: WindowWidth,
            resizeMode: Image.resizeMode.contain,
            marginTop: -20
          }}
        />
        <Image
          source={require("@images/load.png")}
          style={{
            width: WindowWidth - 50,
            height: WindowHeight - 50,
            resizeMode: "contain",
            borderRadius: 10,
            marginTop: (-WindowWidth * 2) / 3
          }}
        />
      </View>
    );
  }
  render() {
    let { product } = this.props;
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent title="MY ORDERS" navigator={this.props.navigator} />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
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
                PRICE {product.price_lolos} LOLOS
              </Text>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: 12,
                    color: "#fff"
                  }
                ]}
              >
                ORDER DATE: {moment(product.time).format("DD.MM.YY")}
              </Text>
            </LinearGradient>

            {product.image ? (
              <CachedImage
                source={{ uri: product.image }}
                style={{
                  width: WindowWidth - 60,
                  height: WindowWidth - 60,
                  resizeMode: "cover",
                  alignSelf: "center",
                  marginTop: 10
                }}
              />
            ) : (
              <Image
                source={require("@images/wishlist/NoInfoPreviewImage.png")}
                style={{
                  width: WindowWidth / 3,
                  height: WindowWidth / 3,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginVertical: 14
                }}
              />
            )}
            <View
              style={{
                width: WindowWidth,
                height: 5,
                backgroundColor: "transparent",
                marginVertical: 15
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: WindowWidth,
                paddingHorizontal: 20,
                paddingVertical: 1
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Lato",
                  lineHeight: 18
                }}
              >
                {product.title}
              </Text>
            </View>

            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                color: "#9b9b9b",
                width: WindowWidth - 60,
                lineHeight: 24,
                marginVertical: 8
              }}
            >
              {product.description}
            </Text>

            <Text
              style={{
                marginLeft: 20,
                fontSize: 14,
                color: "#3393D1",
                lineHeight: 24,
                fontFamily: "Lato"
              }}
              onPress={() => this.showProduct()}
            >
              View Product
            </Text>
            <View
              style={{
                width: WindowWidth,
                paddingVertical: 50,
                backgroundColor: "#f6f6f6",
                alignItems: "center",
                marginTop: 10
              }}
            >
              {product.order_status === "Ordered" ? (
                <Text
                  style={[
                    styles.titleText,
                    { fontSize: 14, lineHeight: 20, color: "#17b978" }
                  ]}
                >
                  YOUR ORDER IS ON IT'S WAY
                </Text>
              ) : (
                <Text
                  style={[styles.titleText, { fontSize: 14, lineHeight: 20 }]}
                >
                  YOUR ORDER IS IN UNDER REVIEW
                </Text>
              )}
              <Text style={[styles.desText, { lineHeight: 20 }]}>
                {!product.status
                  ? "we need to make sure all products ordered by teenagers using Lolos are appropriate for this age group"
                  : "this might take up 30 days according to the seller notes "}
              </Text>
            </View>
          </ScrollView>
        </View>

        <Modal
          animationType={"slide"}
          visible={this.state.productWebPage}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20
            }}
          >
            {this.state.show ? (
              <TouchableOpacity
                style={{ position: "absolute", top: 30, left: 16, zIndex: 2 }}
                onPress={() => this.setState({ productWebPage: false })}
              >
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: "#ff4273",
                    borderRadius: 12.5,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="md-close"
                    style={{ fontSize: 20, color: "white" }}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
            <LWebView
              source={{
                uri: product.product_url
              }}
              style={{
                height: WindowHeight - 50,
                width: WindowWidth - 20,
                zIndex: 1
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={this.indicator}
              onLoadEnd={d => {
                let self = this;
                self.setState({ show: true });
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
