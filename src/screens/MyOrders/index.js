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
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  WebView,
  Modal
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import I18n from "react-native-i18n";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { CachedImage } from "react-native-cached-image";

export default class MyOrders extends Component {
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
      history: [],
      list: [],
      productWebPage: false,
      producturl: ""
    };
  }
  componentWillMount() {
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
      .ref("purchased/" + uid)
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          data.push(child.val());
        });
        this.setState({ list: data, loading: false });
      });
  }

  showProduct(url) {
    this.setState({ producturl: url, productWebPage: true });
  }

  next(p) {
    this.props.navigator.push({
      screen: "OrderDetail",
      animationType: "slide-horizontal",
      passProps: { product: p }
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent title="MY ORDERS" navigator={this.props.navigator} />

        {this.state.list.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("@images/EmptySpace.png")}
              style={{
                width: WindowWidth - 50,
                height: ((WindowWidth - 50) * 489) / 927,
                alignSelf: "center",
                marginTop: -100
              }}
            />
            <Text>YOUR LIST IS EMPTY</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              //paddingTop: 35,
              //paddingHorizontal: 20,
              paddingBottom: 70
            }}
          >
            {this.state.list.map(o => {
              return (
                <TouchableOpacity
                  style={{
                    width: WindowWidth,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderBottomColor: "#bdbdbc",
                    borderBottomWidth: 0.5
                  }}
                  onPress={() => this.next(o)}
                >
                  {o.image ? (
                    <CachedImage
                      source={{ uri: o.image }}
                      style={{ width: 80, height: 80, resizeMode: "cover" }}
                    />
                  ) : (
                    <Image
                      source={require("@images/wishlist/NoInfoPreviewImage.png")}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        margin: 10
                      }}
                    />
                  )}
                  <View>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.desText,
                        {
                          width: WindowWidth / 2,
                          marginLeft: 10,
                          fontSize: 14,
                          lineHeight: 18,
                          color: "#000",
                          textAlign: "left"
                        }
                      ]}
                    >
                      {o.description}
                    </Text>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          color: "#6f6f6f",
                          lineHeight: 24,
                          fontFamily: "Lato",
                          marginLeft: 10,
                          marginTop: 6
                        }
                      ]}
                    >
                      {o.sold_from}
                    </Text>
                  </View>
                  <Icon
                    name="ios-arrow-forward"
                    style={{
                      fontSize: 27,
                      color: "gray",
                      position: "absolute",
                      right: 25,
                      fontWeight: "300"
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

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
        {/* <View style={styles.bottomView}>
          <Image
            style={{ width: 25, height: 25, marginBottom: 0 }}
            source={require("@images/Chat_Icon.png")}
          />
          <Text style={{ fontSize: 13, marginLeft: 10 }}>
            Need help? chat with us
          </Text>
        </View> */}
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
            <WebView
              source={{
                uri: this.state.producturl ? this.state.producturl : ""
              }}
              style={{
                height: WindowHeight - 50,
                width: WindowWidth - 20,
                zIndex: 1
              }}
              //onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
