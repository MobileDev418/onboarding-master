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
  ScrollView,
  Platform,
  AsyncStorage
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
import Carousel from "react-native-snap-carousel";
import PreviewScreen from "@screens/Shop/PreviewScreen/index";
import SliderPage from "@screens/HomePage/SliderPage";
import Walllet from "@screens/HomePage/Wallet";
import Tasksmanager from "@screens/TasksManager";
import styles from "./style";
import firebase from "react-native-firebase";
import FCM, { FCMEvent } from "react-native-fcm";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";
import DropdownAlert from "react-native-dropdownalert";
import DeviceInfo from "react-native-device-info";

// const initialLayout = {
//     height: 0,
//     width: Dimensions.get('window').width,
//   };

const images = {
  Image1: require("@images/HomePage/WishlistSelected.png"),
  Image2: require("@images/HomePage/EarnSelected.png"),
  Image3: require("@images/HomePage/HomeSelected.png"),
  Image4: require("@images/HomePage/Shop.png"),
  Image5: require("@images/HomePage/Earn.png"),
  Image6: require("@images/HomePage/Home.png")
};

export default class TabViewExample extends React.Component {
  componentDidMount() {
    AsyncStorage.setItem("Login", "login");
    if (!this.props.from) this.setState({ splash: true });
    if (this.props.purchase) {
      // this.sendNOtification()
    }
    let self = this;
    setTimeout(function() {
      self.setState({ splash: false });
    }, 5000);
    // console.log('++--',this.props.birthday)
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid + "/balance")
      .transaction(balance => {
        // alert('initial'+balance)
        this.setState({ balance: balance ? balance : 0 });
        if (balance === null) {
          return 0;
        }
      });

    firebase
      .database()
      .ref("users/" + uid)
      .update({
        deviceId: DeviceInfo.getUniqueID()
        // phoneNumber: firebase.auth().currentUser.phoneNumber
      });

    AsyncStorage.getItem("birthday").then(value => {
      let res = JSON.parse(value);
      if (res) {
        if (!res.registered) {
          firebase
            .database()
            .ref("users/" + uid)
            .update({
              birthday: res.birthday
            })
            .then(() => {
              AsyncStorage.setItem(
                "birthday",
                JSON.stringify({ registered: true })
              );
            });

          firebase
            .database()
            .ref("users/" + uid)
            .update({
              last_signin_at: Math.floor(Date.now())
            });

          // AsyncStorage.getItem("url").then(value => {
          //   let res = JSON.parse(value);
          //   if (res && res.url) {
          //     firebase
          //       .database()
          //       .ref("users/" + res.url + "/transaction_history")
          //       .push({
          //         time: new Date().getTime(),
          //         description: "Referral bonus",
          //         type: "reward"
          //         //balance: 20
          //       });
          //     firebase
          //       .database()
          //       .ref("users/" + res.url + "/invite_success")
          //       .transaction(balance => {
          //         if (balance === null) return 1;
          //         else return balance + 1;
          //       });
          //   }
          // });

          AsyncStorage.getItem("fullUrl").then(value => {
            if (value) {
              firebase
                .database()
                .ref("users/" + uid)
                .update({
                  fullInviteUrl: value
                });
              if (value !== "undefined") {
                let inviterId = value.split("invitedby=")[1];
                firebase
                  .database()
                  .ref("users/" + inviterId + "/invite_success")
                  .transaction(balance => {
                    if (balance === null) return 1;
                    else return balance + 1;
                  });
                firebase
                  .database()
                  .ref("users/" + inviterId + "/transaction_history")
                  .push({
                    time: new Date().getTime(),
                    description: "Referral bonus",
                    type: "reward"
                    //king: 20
                  })
                  .then(() => {
                    AsyncStorage.setItem("fullUrl", "undefined");
                  });
              }
            } else {
              firebase
                .database()
                .ref("users/" + uid)
                .update({
                  fullInviteUrl: "no handled"
                });
            }
          });

          // firebase
          //   .database()
          //   .ref("users/" + uid + "/transaction_history")
          //   .push({
          //     time: new Date().getTime(),
          //     description: "SignUp bonus",
          //     type: "reward",
          //     balance: 20
          //   });
          // this.sendNOtification()
        }
      }
    });
    AsyncStorage.getItem("country").then(value => {
      let res = JSON.parse(value);
      if (res) {
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            country: res.country
          });
      }
    });
    AsyncStorage.getItem("url").then(value => {
      let res = JSON.parse(value);
      if (res && res.url) {
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            referred_by: res.url
          });
      }
    });

    if (this.props.birthday !== "" && this.props.birthday !== undefined) {
      firebase
        .database()
        .ref("users/" + uid)
        .update({
          birthday: self.props.birthday
        });
    }
  }

  onNavigatorEvent(event) {
    if (event.type == "DeepLink") {
      if (event.link == "sidemenu") {
        this.props.navigator.toggleDrawer({
          side: "left",
          to: "closed"
        });
        this.props.navigator.push({
          screen: event.payload.screen,
          title: event.payload.title,
          animationType: "slide-horizontal"
        });

        //   if(event.link == 'logOut') {

        //       this.props.navigator.resetTo({
        //       screen:event.payload.screen,
        //       title:event.payload.title,
        //       animationType:"slide-horizontal"
        //     })
        // }
      }
      if (event.link === "sidemenu1") {
        this.props.navigator.toggleDrawer({
          side: "left",
          to: "closed"
        });
        this.props.navigator.resetTo({
          screen: "app.HomePage",
          animationType: "slide-horizontal",
          passProps: { from: true, sorry: true }
        });
      }
    }
  }
  // splash=()=>{
  //   this.setState({})
  // }

  static navigatorStyle = {
    navBarHidden: true,
    disabledBackGesture: true
  };
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index ? props.index : 2,
      routes: [
        { key: "0", icon: images.Image4, iconSelected: images.Image1 },
        { key: "1", icon: images.Image5, iconSelected: images.Image2 },
        { key: "2", icon: images.Image6, iconSelected: images.Image3 }
      ],
      splash: false,
      reload: true,
      sorry: false,
      balance: 0
    };
    this._renderScene = this._renderScene.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  _renderIcon = ({ route }) => {
    return (
      <Image
        style={
          route.key == this.state.index.toString()
            ? {
                marginTop: -5,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#f0f0f0",
                width: 60,
                height: 60
              }
            : { width: 28, height: 28 }
        }
        source={
          route.key == this.state.index.toString()
            ? route.iconSelected
            : route.icon
        }
      />
    );
  };

  _handleIndexChange = index => {
    let uid = firebase.auth().currentUser.uid;
    this.setState({ index, reload: false });
    if (index === 1) {
      firebase
        .database()
        .ref("users/" + uid + "/walletHidden")
        .transaction(function(badge) {
          if (badge === null) return true;
          else return;
        });
    }
    if (index === 0) {
      firebase
        .database()
        .ref("users/" + uid + "/marketHidden")
        .transaction(function(badge) {
          if (badge === null) return true;
          else return;
        });
    }
  };

  _renderHeader = props => (
    <TabBar
      style={{
        backgroundColor: "#fff",
        height: 73,
        shadowColor: "#D3D3D3",
        shadowOffset: {
          width: 0,
          height: -2
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
      }}
      labelStyle={{ fontSize: 10, color: "#000" }}
      {...props}
      renderIcon={this._renderIcon}
      indicatorStyle={{ height: 0 }}
      //onTabPress={(index)=>alert(index)}
    />
  );

  _renderScene({ route }) {
    switch (route.key) {
      case "0":
        return <PreviewScreen navigator={this.props.navigator} />;
      case "1":
        return <Tasksmanager navigator={this.props.navigator} />;
      case "2":
        return (
          <SliderPage
            _handleIndexChange={this._handleIndexChange}
            navigator={this.props.navigator}
            reload={this.props.reload}
            splash={this.props.splash}
            purchase={this.props.purchase}
            invite={this.props.invite}
            reward={this.props.reward}
            request={this.props.request}
            lifetime={this.props.lifetime}
            post={this.props.post}
            photo={this.props.photo}
            raffle={this.props.raffle}
            sorry={this.props.sorry}
            productSubmissionImage={this.props.productSubmissionImage}
            productSubmissionPrice={this.props.productSubmissionPrice}
            balance={this.state.balance}
          />
        );
    }
  }
  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    );
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  _renderPager = props => {
    return Platform.OS === "ios" ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    );
  };

  render() {
    return (
      <View style={{ height: WindowHeight, flex: 1, width: WindowWidth }}>
        <TabViewAnimated
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderFooter={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          //initialLayout={initialLayout}
          renderPager={this._renderPager}
        />
        {this.state.splash ? (
          <View
            style={{
              width: WindowWidth,
              height: WindowHeight,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              backgroundColor: "white",
              zIndex: 1000
            }}
          >
            <Image
              source={require("@images/Assets/em.png")}
              style={{ width: 80, height: 80, marginBottom: 60 }}
            />
            <Bars size={10} color="#ffce00" />
          </View>
        ) : null}
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          showCancel={false}
          renderImage={() => this.renderImage()}
          useNativeDriver={true}
          onClose={() =>
            this.props.navigator.resetTo({
              screen: "app.HomePage",
              animationType: "slide-horizontal",
              passProps: { from: true, index: 1 }
            })
          }
          closeInterval={10000}
        />
      </View>
    );
  }
  renderImage() {
    return (
      <Image
        source={require("@images/Assets/em.png")}
        style={{ width: 40, height: 40 }}
      />
    );
  }
  sendNOtification() {
    this.dropdown.alertWithType(
      "warn",
      "Check out your wallet",
      "You just got a reward"
    );
  }
}
