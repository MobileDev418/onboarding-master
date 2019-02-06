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
  Alert
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import Swipe from "react-native-swiper";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import Permissions from "react-native-permissions";

export default class TasksManage extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [
        {
          image: require("@images/Influance/2.png"),
          title: "The brands you love!",
          des:
            "We work with almost all big brands and they just waiting to see how you step up their game in the social media paltforms."
        },
        {
          image: require("@images/Influance/3.png"),
          title: "Be creative to get attention!",
          des:
            "Our partners looking for the most creative content, it can be a great photo or even a short video, just make it look awesome..."
        },
        {
          image: require("@images/Influance/4.png"),
          title: `What's in it for you?`,
          des:
            "You get a chance to play a role in big brands social media campaigns and boosting your wallet with Lolos!"
        },
        {
          image: require("@images/Influance/5.png"),
          title: "How deos it works?",
          des:
            "Our partners have access to all your creations, once they found something they like, you get paid, they easy!"
        }
      ],
      index: 0,
      fashion: [],
      text: "",
      badge: 0,
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
  }

  componentDidMount() {
    Permissions.request("photo").then(res => {
      if (res === "denied") this.openSetting();
    });
  }
  openSetting() {
    Alert.alert(
      "Can we access your photos?",
      "We need access so you can set your Photo",
      [
        {
          text: "No way",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        this.state.photoPermission == "undetermined"
          ? { text: "OK", onPress: this._requestPermission }
          : { text: "Open Settings", onPress: Permissions.openSettings }
      ]
    );
  }

  next() {
    this.props.navigator.push({
      screen: "SubmitCheck",
      animationType: "slide-horizontal",
      passProps: {
        mediaType: "photo",
        tags: this.props.tags,
        brandname: this.props.brandname,
        brandID: this.props.brandID,
        campaignID: this.props.campaignID
      }
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="PHOTO TIP"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <Image
            source={require("@images/Influance/PhotoTips.png")}
            style={{
              width: WindowWidth - 120,
              height: ((WindowWidth - 120) * 777) / 696,
              alignSelf: "center",
              marginTop: 30
            }}
          />

          <Text
            style={{
              fontSize: 16,
              alignSelf: "center",
              textAlign: "center",
              color: "gray",
              width: WindowWidth - 60,
              marginTop: 30,
              position: "absolute",
              bottom: 110
            }}
          >
            Make sure your photos are good for social media use, maintain high
            quality images, use familier formats and don't use offensive
            content.
          </Text>
          <TouchableOpacity
            style={[styles.button1, { bottom: 30 }]}
            onPress={() => this.next()}
          >
            <Text style={styles.buttonText1}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
