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
  ImageBackground
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import Swipe from "react-native-swiper";
import { CachedImage } from "react-native-cached-image";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

export default class TasksManage extends Component {
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

    // firebase
    //   .database()
    //   .ref("Campaign")
    //   .on("value", snap => {
    //     let data = [];
    //     snap.forEach(child => {
    //       data.push(child.val());
    //     });
    //     this.setState({ data });
    //   })
    //   .bind(this);

    firebase
      .database()
      .ref("Brands")
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          firebase
            .database()
            .ref("Brands_Campaigns/" + child.key)
            .once("value", shot => {
              shot.forEach(c => {
                let obj = {};
                // console.log("++--", c.val(), child.val());
                obj.logo = c.val().brandLogo;
                obj.image = c.val().campaign_image;
                obj.title = c.val().campaign_name;
                obj.des = c.val().campaign_punchline;
                obj.brandKey = child.key;
                obj.campaignKey = c.key;
                data.push(obj);
              });
              this.setState({ data });
            });
        });
      })
      .bind(this);
  }

  next(d) {
    this.props.navigator.push({
      screen: "Requirements",
      animationType: "slide-horizontal",
      passProps: { data: d }
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#f0f0f0", flex: 1 }}>
        <HeaderComponent
          title="SELECT CAMPAIGN"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
            {this.state.data.map(d => {
              return (
                <TouchableOpacity
                  style={{ marginBottom: 5 }}
                  onPress={() => this.next(d)}
                >
                  <CachedImage
                    source={{ uri: d.image }}
                    style={{
                      width: WindowWidth,
                      height: (499 * WindowWidth) / 960,
                      resizeMode: Image.resizeMode.cover
                    }}
                    //resizeMode="contain"
                  />
                  <View
                    style={{
                      width: 90,
                      height: 60,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: -60,
                      marginLeft: 30
                    }}
                  >
                    <CachedImage
                      source={{ uri: d.logo }}
                      style={{ width: 90, height: 50 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ padding: 30, backgroundColor: "white" }}>
                    <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                      {d.title}
                    </Text>
                    <Text
                      style={{ fontSize: 15, color: "gray", marginTop: 15 }}
                    >
                      {d.des}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
