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
import I18n from "../../../locales/config";
import LWebView from "../../../components/LWebView";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import LinearGradient from "react-native-linear-gradient";
import { CachedImage } from "react-native-cached-image";
import Lottie from "lottie-react-native";
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
        <HeaderComponent title="WISH LIST" navigator={this.props.navigator} />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 25,
                justifyContent: "space-between",
                backgroundColor: "#f6f6f6",
                paddingVertical: 10
              }}
            >
              <Text
                style={[
                  styles.desText,
                  { width: (WindowWidth * 2) / 3, textAlign: "left" }
                ]}
              >
                {product.title}
              </Text>
              <TouchableOpacity onPress={() => this.delete()}>
                <Icon
                  name="trash"
                  style={{ color: "#000", width: 20, fontWeight: "bold" }}
                />
              </TouchableOpacity>
            </View>
            {product.product_img ? (
              <CachedImage
                source={{ uri: product.product_img }}
                style={{
                  width: WindowWidth - 60,
                  height: WindowWidth - 60,
                  resizeMode: "cover",
                  alignSelf: "center"
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
                backgroundColor: "#f6f6f6",
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
                  fontWeight: "bold",
                  fontFamily: "Lato",
                  lineHeight: 24
                }}
              >
                Product Link:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#3393D1",
                  lineHeight: 24,
                  fontFamily: "Lato"
                }}
                onPress={() => this.showProduct()}
              >
                View Product
              </Text>
            </View>

            <Text
              numberOfLines={1}
              style={{
                marginLeft: 20,
                fontSize: 16,
                color: "#9b9b9b",
                marginBottom: 10,
                width: WindowWidth - 60,
                lineHeight: 24
              }}
            >
              {product.url}
            </Text>
            <View
              style={{
                width: WindowWidth,
                height: 5,
                backgroundColor: "#f6f6f6",
                marginVertical: 15
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Lato",
                lineHeight: 24,
                marginLeft: 20
              }}
            >
              Description:
            </Text>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                color: "#9b9b9b",
                width: WindowWidth - 60,
                lineHeight: 24
              }}
            >
              {product.description}
            </Text>
            <View
              style={{
                width: WindowWidth,
                height: 5,
                backgroundColor: "#f6f6f6",
                marginVertical: 15
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Lato",
                lineHeight: 24,

                marginLeft: 20
              }}
            >
              Sold From:
            </Text>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                color: "#9b9b9b",
                marginBottom: 10,
                width: WindowWidth - 60,
                lineHeight: 24
              }}
            >
              {product.store}
            </Text>
          </ScrollView>
        </View>
        <View
          style={[
            {
              padding: 30,
              position: "absolute",
              bottom: 0,
              backgroundColor: "white",
              paddingTop: 17
            },
            styles.shadowStyle1
          ]}
        >
          <Text style={[styles.titleText, { fontSize: 14, marginBottom: 13 }]}>
            {this.props.product.price * this.state.ratio > this.state.balance
              ? "YOU CURRENTLY DON'T HAVE ENOUGH LOLOS TO BUY THIS PRODUCT"
              : "YOU CAN BUY THIS PRODUCT RIGHT NOW"}
          </Text>
          <Button
            disabled={false}
            onPress={() => this.makeorder()}
            style={[
              styles.button1,
              {
                backgroundColor:
                  this.props.product.price * this.state.ratio >
                  this.state.balance
                    ? "#FF4273"
                    : "#17b978",
                position: "relative",
                marginTop: 0
              }
            ]}
          >
            <Text
              style={[
                styles.buttonText1,
                {
                  color: "white"
                }
              ]}
            >
              {this.props.product.price * this.state.ratio > this.state.balance
                ? "Earn Lolos"
                : "Make Order"}
            </Text>
          </Button>
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
                uri: product.url
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

{
  /* <View style={{ flex: 1, paddingTop: 25, paddingHorizontal: 0 }}>
  {this.state.wishlist.product_img ? (
    <Image
      source={{ uri: this.state.wishlist.product_img }}
      style={{
        width: WindowWidth / 2,
        height: ((WindowWidth / 2) * 534) / 627,
        alignSelf: "center",
        marginBottom: 10,
        resizeMode: Image.resizeMode.contain
      }}
    />
  ) : (
    <Image
      source={require("@images/wishlist/Gift_Image.png")}
      style={{
        width: WindowWidth / 2,
        height: ((WindowWidth / 2) * 534) / 627,
        alignSelf: "center",
        marginBottom: 10
      }}
    />
  )}

  <View
    style={{
      width: WindowWidth,
      height: 7,
      backgroundColor: "#f0f0f0",
      marginBottom: this.state.wishlist.price ? 15 : 0
    }}
  />
  <View
    style={{
      backgroundColor: this.state.wishlist.price ? "white" : "#ff4273",
      paddingVertical: this.state.wishlist.price ? 0 : 15
    }}
  >
    {this.state.wishlist.price ? (
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          alignSelf: "center"
        }}
      >
        You need{" "}
        <Text style={{ color: "#FF4273" }}>
          {Math.round(this.state.wishlist.price * this.state.ratio * 10) / 10}{" "}
          Lolos
        </Text>{" "}
        to get this product
      </Text>
    ) : (
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          alignSelf: "center",
          color: "white"
        }}
      >
        Your product request is still in proccess...
      </Text>
    )}
    <Text
      style={{
        fontSize: 14,
        alignSelf: "center",
        opacity: this.state.wishlist.price ? 0.8 : 1,
        marginTop: 10,
        color: this.state.wishlist.price ? "black" : "white"
      }}
    >
      {this.state.wishlist.price
        ? this.state.balance > this.state.wishlist.price * this.state.ratio
          ? `Review order and submit for purchase`
          : `You currently don't have enough Lolos`
        : `We promise this won't take long`}
    </Text>
  </View>
  {this.state.wishlist.price ? (
    <View>
      {this.state.balance > this.state.wishlist.price * this.state.ratio ? (
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#FF4273", borderRadius: 4 }
          ]}
          onPress={() => {
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
              passProps: {
                productImage: this.state.wishlist.product_img,
                price: this.state.wishlist.price,
                url: this.state.wishlist.url,
                store: this.state.wishlist.store,
                description: this.state.wishlist.description
                  ? this.state.wishlist.description
                  : ""
              }
            });
          }}
        >
          <Text
            style={[styles.buttonTextInvite, { color: "white", fontSize: 19 }]}
          >
            {I18n.t("get_it_now")}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button]}
          onPress={() =>
            this.props.navigator.push({
              screen: "TasksManager",
              animationType: "slide-horizontal"
            })
          }
        >
          <Text style={[styles.buttonTextInvite]}>Earn Lolos</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null}
  <View
    style={{
      width: WindowWidth,
      height: 7,
      backgroundColor: "#f0f0f0",
      marginTop: this.state.wishlist.price ? 15 : 0
    }}
  />
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: WindowWidth,
      paddingHorizontal: 16,
      paddingVertical: 10
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Product Link:</Text>
    <Text
      style={{ fontSize: 13, color: "#3393D1" }}
      onPress={() => this.showProduct()}
    >
      View Product
    </Text>
  </View>
  <Text
    numberOfLines={1}
    style={{
      marginLeft: 16,
      fontSize: 13,
      color: "#bdbdbc",
      marginBottom: 10,
      width: WindowWidth - 32
    }}
  >
    {this.state.wishlist.url}
  </Text>
  <View
    style={{
      width: WindowWidth,
      height: 7,
      backgroundColor: "#f0f0f0"
    }}
  />
  <View
    style={{
      width: WindowWidth,
      paddingHorizontal: 16,
      paddingVertical: 10
    }}
  >
    <Text
      style={{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8
      }}
    >
      Description:
    </Text>
    <Text style={{ fontSize: 13, color: "#bdbdbc" }}>
      {this.state.wishlist.description}
    </Text>
  </View>
  <View
    style={{
      width: WindowWidth,
      height: 7,
      backgroundColor: "#f0f0f0"
    }}
  />
  <View
    style={{
      width: WindowWidth,
      paddingHorizontal: 16,
      paddingVertical: 10
    }}
  >
    <Text
      style={{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8
      }}
    >
      Sold on:
    </Text>
    <Text style={{ fontSize: 13, color: "#bdbdbc" }}>
      {this.state.wishlist.store}
    </Text>
  </View>

  <View
    style={{
      width: WindowWidth,
      paddingVertical: 15,
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      marginTop: 10
    }}
  >
    <TouchableOpacity onPress={() => this.deleteProduct()}>
      <Text
        style={{
          fontSize: 13,
          color: "#FF4273",
          paddingVertical: 5
        }}
      >
        Delete Product From List
      </Text>
    </TouchableOpacity>
    <Text
      style={{
        fontSize: 17,
        fontWeight: "bold",
        marginVertical: 10
      }}
    >
      NEED HELP?
    </Text>
    <Text style={{ fontSize: 14, color: "#bdbdbc" }}>
      You can contact us using our in app chat
    </Text>
  </View>
</View>; */
}
