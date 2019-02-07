import React, { Component } from "react";
import { Button, Text, Icon, Textarea } from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActionSheetIOS,
  Modal,
  ActivityIndicator,
  WebView
} from "react-native";

var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import KeyBoardSpace from "react-native-keyboard-spacer";
import axios from "axios";
import LWebView from "../../../components/LWebView";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import LinearGradient from "react-native-linear-gradient";
const DismissKeyboardHOC = Comp => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);
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
      toScroll: false,
      ratio: 10
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

    /// test
    firebase
      .database()
      .ref("Admin/ratio")
      .on("value", snap => {
        this.setState({ ratio: snap.val() });
      })
      .bind(this);

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
  gotoHome() {
    let self = this;
    if (this.state.text === "") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title:
            "if there are variants to the product such as size, color etc mention it in product description box",
          options: ["Add Description", "Continue"]
        },
        buttonIndex => {
          if (buttonIndex === 0) {
          }
          if (buttonIndex === 1) {
            let uid = firebase.auth().currentUser.uid;
            firebase
              .database()
              .ref("wishList/" + uid)
              .push({
                time: new Date().getTime(),
                url: this.props.link,
                description: self.state.text,
                product_img: this.state.productImage,
                store: this.props.store,
                price: this.props.price
                  ? String(this.props.price.replace(/[^-.\d]/g, ""))
                  : null,
                currency: this.props.currency
                  ? String(
                      this.props.currency.replace(
                        /[0-9]|[A-Z]|[a-z]|\:|\.|\s/g,
                        ""
                      )
                    )
                  : null,
                category: this.props.category,
                features: this.props.features,
                order: this.props.order ? this.props.order : null,
                title: this.props.title
              });
            firebase
              .database()
              .ref("users/" + uid + "/product_cards")
              .transaction(card => {
                if (!card) return [this.props.order];
                else {
                  return [card.push(this.props.order)];
                }
              });
            self.props.navigator.resetTo({
              screen: "app.HomePage",
              animationType: "slide-horizontal",
              passProps: { from: true, request: true }
            });
          }
        }
      );
    } else {
      let uid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("wishList/" + uid)
        .push({
          time: new Date().getTime(),
          url: this.props.link,
          description: self.state.text,
          product_img: this.state.productImage,
          store: this.props.store,
          price: this.props.price ? this.props.price : null,
          currency: this.props.currency,
          category: this.props.category,
          features: this.props.features,
          order: this.props.order ? this.props.order : null,
          title: this.props.title
        });
      firebase
        .database()
        .ref("users/" + uid + "/product_cards")
        .transaction(card => {
          if (!card) return [this.props.order];
          else {
            console.log("++--", card);
            let data = [];
            card.forEach(c => {
              data.push(c);
            });
            data.push(this.props.order);

            return data;
          }
        });
      self.props.navigator.resetTo({
        screen: "app.HomePage",
        animationType: "slide-horizontal",
        passProps: {
          from: true,
          request: true,
          productSubmissionImage: this.state.productImage,
          productSubmissionPrice: this.props.price
        }
      });
    }
  }
  showProduct() {
    // Linking.canOpenURL(this.props.link).then(supported => {
    //     if (!supported) {
    //         alert('Can\'t handle url: ' + this.props.link);
    //     } else {
    //         return Linking.openURL(this.props.link);
    //     }
    // }).catch(err => console.error('An error occurred', err));
    this.setState({ productWebPage: true });
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.refs.Scroll.scrollTo(200);
  };

  _keyboardDidHide = () => {
    this.refs.Scroll.scrollTo(0);
  };

  render() {
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent
          title="SUBMIT PRODUCT"
          navigator={this.props.navigator}
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 30 }}
          ref="Scroll"
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
              THIS PRODUCT PRICE IS {this.props.price * this.state.ratio} LOLOS
            </Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
          >
            {this.state.productImage === "" ? (
              <Image
                source={require("@images/wishlist/Gift_Image.png")}
                style={{
                  width: WindowWidth / 2,
                  height: ((WindowWidth / 2) * 534) / 627,
                  alignSelf: "center",
                  marginBottom: 10
                }}
              />
            ) : (
              <Image
                source={{ uri: this.state.productImage }}
                style={{
                  width: WindowWidth / 2,
                  height: ((WindowWidth / 2) * 534) / 627,
                  alignSelf: "center",
                  marginBottom: 10,
                  resizeMode: Image.resizeMode.contain
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              width: WindowWidth,
              height: 7,
              backgroundColor: "#f0f0f0"
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Product Link:
            </Text>
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
            {this.props.link}
          </Text>
          <View
            style={{
              width: WindowWidth,
              height: 7,
              backgroundColor: "#f0f0f0"
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
              marginLeft: 16
            }}
          >
            Production Description:
          </Text>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Textarea
              ref="textInput"
              onChangeText={t => this.setState({ text: t })}
              placeholder=""
              returnKeyType="done"
              rowSpan={5}
              style={styles.textInputArea}
              blurOnSubmit={true}
              value={this.state.text}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: WindowWidth,
              height: 7,
              backgroundColor: "#f0f0f0",
              marginVertical: 15
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 5,
              marginLeft: 16
            }}
          >
            Sold From:
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 16,
              fontSize: 16,
              color: "#bdbdbc",
              marginTop: 10,
              width: WindowWidth - 32
            }}
          >
            {this.props.store}
          </Text>

          {/* <View style={{flexDirection:'row',marginTop:30,height:15}}>                            
                            <View style={[styles.activeCircle,{opacity:0.6,marginRight: 8}]} />
                            <View style={styles.activeCircle} />
                        </View> */}
          {/* <View
            style={{
              width: WindowWidth,
              paddingVertical: 15,
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              marginTop: 10
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <Text style={{ fontSize: 13, color: "#3393D1" }}>
                Not the product you wanted? try again
              </Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
            >
              NEED HELP?
            </Text>
            <Text style={{ fontSize: 14, color: "#bdbdbc" }}>
              You can contact us using our in app chat
            </Text>
          </View> */}
          <Button
            onPress={() => this.gotoHome()}
            style={[
              styles.button1,
              { backgroundColor: "#FF4273", position: "relative" }
            ]}
          >
            <Text style={[styles.buttonText1, { color: "white" }]}>Submit</Text>
          </Button>
        </ScrollView>

        <KeyBoardSpace />
        <Modal
          animationType={"slide"}
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 30, left: 16 }}
              onPress={() => this.setState({ modalVisible: false })}
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
            <View
              style={{
                width: WindowWidth - 100,
                height: WindowHeight - 100,
                borderRadius: 7,
                backgroundColor: "#f0f0f0",
                padding: 7,
                paddingTop: 60
              }}
            >
              <View style={styles.modalheader}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Lato-Regular",
                    fontSize: 15
                  }}
                >
                  Just to make sure, select the photo of your product again
                </Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: WindowWidth - 114
                }}
              >
                {this.state.data
                  .filter(d => {
                    if (d === null) return;
                    if (d.indexOf("gif") > -1) return;
                    if (d.indexOf("png") > -1) return;

                    return d.indexOf(".gif") < 0 || d.indexOf(".png") < 0;
                  })
                  .map((url, i) => {
                    if (this.props.store === "Ebay") {
                      if (url.indexOf("l64.jpg") > -1)
                        url = url.replace("l64.jpg", "l500.jpg");
                      //else return;
                    }
                    if (url.indexOf("https://") < 0) {
                      url = url.replace("//", "https://");
                    }
                    if (url.indexOf("http:https") > -1) {
                      return;
                    }
                    console.log("++--URL", url);
                    return (
                      <View
                        style={{
                          width: (WindowWidth - 100) / 2 - 10.5,
                          height: (WindowWidth - 100) / 2 - 10.5,
                          marginLeft: i % 2 === 0 ? 0 : 7,
                          marginBottom: 7
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              productImage: url,
                              modalVisible: false
                            })
                          }
                        >
                          <View
                            style={{
                              width: (WindowWidth - 100) / 2 - 14,
                              height: (WindowWidth - 100) / 2 - 10.5,
                              borderRadius: 4,
                              backgroundColor: "white"
                            }}
                          >
                            <Image
                              source={{ uri: url }}
                              style={{
                                width: (WindowWidth - 100) / 2 - 14,
                                height: (WindowWidth - 100) / 2 - 10.5,
                                borderRadius: 4,
                                resizeMode: Image.resizeMode.contain
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
              source={{ uri: this.props.link }}
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
