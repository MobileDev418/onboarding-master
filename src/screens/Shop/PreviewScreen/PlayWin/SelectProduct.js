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
  ActivityIndicator
} from "react-native";
import {
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
  TabBar,
  SceneMap
} from "react-native-tab-view";
import Swiper from "react-native-deck-swiper";
import { CachedImage } from "react-native-cached-image";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import Swipe from "react-native-swiper";

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
      badge: 0,
      products: [],
      selectedProduct: "",
      index: 0
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

    firebase
      .database()
      .ref("Raffles_Products")
      .on("value", snapshot => {
        let products = [];
        snapshot.forEach(child => {
          products.push(child.val());
        });
        this.setState({ products, loading: false });
      })
      .bind(this);
  }

  gotoHome() {
    this.props.navigator.push({
      screen: "ProductProperty",
      animationType: "slide-horizontal",
      passProps: {
        product: this.state.products[this.state.index],
        index: this.state.index
      }
    });
  }

  SelectProduct(url) {
    this.setState({ selectedProduct: url });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 70 }}>
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
            <Text style={styles.headerText}>SELECT PRODUCT</Text>
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              textAlign: "center",
              width: WindowWidth - 50,
              marginTop: 20,
              alignSelf: "center"
            }}
          >
            Which of the following products you want to have as your prize?
          </Text>
          <Swipe
            ref="Swipe"
            activeDotColor="#3393d1"
            //index={this.state.index}
            activeDotStyle={{ width: 12, height: 12, borderRadius: 6 }}
            loop={false}
            style={{ alignItems: "center" }}
            // onIndexChanged={i => this.setState({ index: i })}
          >
            {this.state.products.map((p, index) => {
              return (
                <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
                  <CachedImage
                    source={{ uri: p.image }}
                    style={{
                      width: WindowWidth - 60,
                      height: WindowWidth - 80,
                      marginVertical: 10,
                      resizeMode: Image.resizeMode.contain,
                      borderWidth: 0.5,
                      borderColor: "#f0f0f0"
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "300",
                      textAlign: "center",
                      width: WindowWidth - 30,
                      color: "gray",
                      marginTop: 10
                    }}
                    numberOfLines={2}
                  >
                    {p.description}
                  </Text>
                </View>
              );
            })}
          </Swipe>

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
              Select This Product
            </Text>
          </Button>
        </View>
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              width: WindowWidth,
              height: WindowHeight,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute"
            }}
          >
            <ActivityIndicator size="large" color="#ffb100" />
          </View>
        ) : null}
      </View>
    );
  }
}
