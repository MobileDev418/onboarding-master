import React, { Component } from "react";
import { Text } from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  WebView,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import axios from "axios";
import { FloatingAction } from "react-native-floating-action";
import styles from "./style";
import { stores } from "./config/storeListConfig";
import withButton from "../../../hoc/withButton";
import StoreLinkImage from "./components/storeLinkImage";
import { SCRIPTS } from "./config/scripts";
import Lottie from "lottie-react-native";
import LWebView from "../../../components/LWebView";
import I18n from "../../../locales/config";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

const WindowWidth = Dimensions.get("window").width;
const WindowHeight = Dimensions.get("window").height;
const StoreLinkButton = withButton(StoreLinkImage);

const customHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
};

const actions = [
  {
    text: "BACK TO LOLOS",
    icon: require("@images/exit_store.png"),
    name: "exit",
    position: 1,

    color: "transparent"
  },
  {
    text: "GET THIS PRODUCT",
    icon: require("@images/want_this.png"),
    name: "select",
    position: 2,

    color: "transparent"
  }
];

export default class StoreList extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      badge: 0,
      modalVisible: false,
      url: "",
      show: false,
      link: "",
      store: "",
      jsCode: null
    };
  }
  componentDidMount() {
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
  }

  _onNavigationStateChange(webViewState) {
    this.setState({ link: webViewState.url });
  }

  _saveProduct = async () => {
    this.setState({ loading: true });

    // await this.webview.injectJavaScript(jsCode)
    this.myWebView.postMessage("message");

    return;

    let url = `https://us-central1-lolos-v1.cloudfunctions.net/scrapimages?siteurl=${
      this.state.link
    }&store=${this.state.store}`;

    axios
      .get(url)
      .then(responseJson => {
        console.log("++--", responseJson.data);
        let data = responseJson.data.filter(d => {
          if (d === null) return;
          if (d.indexOf("gif") > -1) return;
          if (d.indexOf("png") > -1) return;

          return d.indexOf(".gif") < 0 || d.indexOf(".png") < 0;
        });
        if (data.length === 0) {
          this.setState({ loading: false });
          alert("This is not product url!");
        } else {
          this.setState({ modalVisible: false, loading: false });
          this.props.navigator.push({
            screen: "Submit2",
            animationType: "slide-horizontal",
            passProps: {
              link: this.state.link,
              store: this.state.store,
              data: responseJson.data
            }
          });
        }
      })
      .catch(error => {
        console.log("++--", error);
        this.setState({ loading: false });
        alert(error);
      });
  };
  indicator() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          alignItems: "center",
          //flex: 1,
          width: WindowWidth - 50,
          height: WindowHeight - 50,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 5
        }}
      >
        <Lottie
          source={require("@images/ice_cream_animation.json")}
          loop
          autoPlay
          style={{
            width: WindowWidth,
            resizeMode: Image.resizeMode.cover,
            marginTop: -10
          }}
        />
        <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: -50 }}>
          We are loading your store...
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "gray",
            marginTop: 15,
            marginBottom: 40
          }}
        >
          in the mean time see how it works:)
        </Text>

        <Image
          source={require("@images/load.png")}
          style={{
            width: (WindowHeight * 897) / 1077 / 2.5,
            height: WindowHeight / 2.5
          }}
        />
      </View>
    );
  }

  _onPressStoreLinkHandle = (url, store, key) => {
    // alert(store);
    // return;

    this.setState({
      modalVisible: true,
      url,
      store,
      jsCode: SCRIPTS[key].js
    });
  };

  _onMessageProductDetails = event => {
    let data;

    try {
      data = event.nativeEvent.data;
      const dataObj = JSON.parse(data);

      if (!dataObj.isProductPage) {
        this.setState({ loading: false });
        alert("This is not product url!");
        return;
      }

      if (!dataObj.isCartValid) {
        this.setState({ loading: false });
        alert(I18n.t("you_must_have_one_item_in_cart"));
        return;
      }

      this.setState({ modalVisible: false, loading: false });

      const price = dataObj.price.replace(/[^-.\d]/g, "");
      const currency = dataObj.currency.replace(
        /[0-9]|[A-Z]|[a-z]|\:|\.|\s/g,
        ""
      );

      this.props.navigator.push({
        screen: "Submit2",
        animationType: "slide-horizontal",
        passProps: {
          link: dataObj.url,
          store: this.state.store,
          data: dataObj.images,
          price,
          currency,
          description: dataObj.description,
          category: dataObj.category,
          features: dataObj.features
        }
      });
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#f6f6f6", flex: 1 }}>
        <HeaderComponent
          title="SELECT STORE"
          navigator={this.props.navigator}
          rightnav="HowWorksWishList"
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[
              { alignItems: "center", paddingTop: 25, paddingBottom: 60 }
            ]}
          >
            <Text style={[styles.desText]}>
              Currently we support those shops, but very soon we'll support any
              online shop out there. In the meantime, if you miss a shop drop us
              a line in our{" "}
              <Text
                style={{ color: "#3393d1" }}
                onPress={() => {
                  this.props.navigator.push({
                    screen: "Chat",
                    animationType: "slide-horizontal"
                  });
                }}
              >
                Chat
              </Text>
            </Text>
            <View
              style={[styles.shadowStyle, { backgroundColor: "transparent" }]}
            >
              {stores.map(store => {
                return (
                  <StoreLinkButton
                    onPress={() =>
                      this._onPressStoreLinkHandle(
                        store.url,
                        store.name,
                        store.key
                      )
                    }
                    imageSource={store.image}
                    imageStyle={styles.storeButton}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType={"fade"}
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              paddingTop: 20
            }}
          >
            <LWebView
              onRef={ref => (this.myWebView = ref)}
              source={{ uri: this.state.url, headers: customHeaders }}
              style={{ height: WindowHeight - 20, color: "red" }}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              onLoadEnd={d => {
                let self = this;
                setTimeout(function() {
                  self.setState({ show: true });
                }, 1000);
              }}
              renderLoading={this.indicator}
              injectedJavaScript={this.state.jsCode} //jsCode
              onMessage={this._onMessageProductDetails}
            />
          </View>
          {this.state.show ? (
            <FloatingAction
              overlayColor="rgba(255, 255, 255, 0.9)"
              actions={actions}
              onPressItem={name => {
                if (name === "exit")
                  this.setState({ modalVisible: false, show: false });
                else this._saveProduct();
              }}
              color={"transparent"}
            />
          ) : null}

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
