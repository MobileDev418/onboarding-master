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
  Platform,
  Alert,
  ScrollView,
  Linking,
  WebView,
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
import Sugar from "sugar";
import I18n from "../../../locales/config";
import LWebView from "../../../components/LWebView";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { CachedImage } from "react-native-cached-image";

export default class PreviewScreen extends Component {
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
      wishlist: [],
      country: "",
      street: "",
      city: "",
      zipcode: "",
      balance: 0,
      state: "",
      apt: "",
      fullname: "",
      badge: 0,
      commentShow: false,
      productWebPage: false,
      ratio: 20
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("wishList/" + uid)
      .on("value", snapshot => {
        let data = [];
        snapshot.forEach(child => {
          let obj = {};
          obj.id = child.key;
          obj.description = child.val().description;
          obj.price = child.val().price;
          obj.time = child.val().time;
          obj.product_img = child.val().product_img;
          obj.store = child.val().store;
          obj.url = child.val().url;
          obj.order = child.val().order;
          obj.title = child.val().title;
          data.push(obj);
        });
        this.setState({ wishlist: data });
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

  selectData(route) {
    if (this.state.data.length > 0) {
      // return(
      let test = this.state.data.filter(d => {
        return d.category === route.title;
      })[0];
      // console.log('++--TEST',test.val)
      return test.val;
      // )
    }
    return [];
  }

  showProduct() {
    this.setState({ productWebPage: true });
  }

  deleteProduct() {
    Alert.alert("", "Are you sure you want to delete this product request?", [
      { text: "Cancel", onPress: () => console.log("cancel") },
      {
        text: "OK",
        onPress: () => {
          let uid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("wishList/" + uid)
            .remove();
          this.props.navigator.push({
            screen: "StoreList",
            animationType: "slide-horizontal"
          });
        }
      }
    ]);
  }
  next(p) {
    this.props.navigator.push({
      screen: "Submit1",
      animationType: "slide-horizontal",
      passProps: { product: p }
    });
  }

  render() {
    //if (this.state.loading) return <View />;

    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent
          title="WISH LIST"
          navigator={this.props.navigator}
          rightnav="HowWorksWishList"
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                width: WindowWidth,
                height: 80,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ff4273",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={[
                  styles.desText,
                  {
                    color: "#fff",
                    lineHeight: 20,
                    width: WindowWidth / 2 + 50,
                    textAlign: "left",
                    marginLeft: 20
                  }
                ]}
              >
                Add products to your Wishlist from our supported friends
              </Text>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 5,
                  justifyContent: "center",
                  marginRight: 20
                }}
                onPress={() =>
                  this.props.navigator.push({
                    screen: "StoreList",
                    animationType: "slide-horizontal"
                  })
                }
              >
                <Text
                  style={[
                    styles.titleText,
                    { lineHeight: 20, color: "#ff4273", fontSize: 16 }
                  ]}
                >
                  GO
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.wishlist.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  height: WindowHeight - 250,
                  justifyContent: "center"
                }}
              >
                <Image
                  source={require("@images/wishlist/UnicornEmptySpace.png")}
                  style={{
                    width: WindowWidth / 2,
                    height: ((WindowWidth / 2) * 234) / 480
                  }}
                />
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: 14,
                      fontWeight: "900",
                      color: "#9b9b9b",
                      marginTop: 21
                    }
                  ]}
                >
                  YOUR WISH LIST IS EMPTY
                </Text>
              </View>
            ) : (
              <View>
                {this.state.wishlist.map(p => {
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
                      onPress={() => this.next(p)}
                    >
                      {p.product_img ? (
                        <CachedImage
                          source={{ uri: p.product_img }}
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
                          {p.description}
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
                          {p.store}
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
              </View>
            )}
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
            <LWebView
              source={{
                uri: this.state.wishlist ? this.state.wishlist.url : ""
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
  link() {
    let url = this.state.wishlist.url;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          alert("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }
}
