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
  ActivityIndicator
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";

import axios from "axios";
import Pie from "react-native-pie";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

export default class ActivityMonitor extends Component {
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
      photos: []
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Shoutouts/" + uid)
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          let obj = {};
          obj.image = child.val().image;
          obj.name = child.val().brandname;
          obj.des = child.val().des;
          obj.id = child.key;
          obj.time = child.val().time;
          obj.action = child.val().action;
          obj.mediaType = child.val().mediaType;
          obj.tags = child.val().tags;
          data.push(obj);
        });
        this.setState({ photos: data, loading: false });
      });
  }
  next(s) {
    this.props.navigator.push({
      screen: "PreviewPost",
      animationType: "slide-horizontal",
      passProps: { data: s }
    });
  }

  render() {
    let review = this.state.photos.filter(p => {
      return p.action === "In Review";
    });
    let rejected = this.state.photos.filter(p => {
      return p.action === "Rejected";
    });
    let sale = this.state.photos.filter(p => {
      return p.action === "For Sale";
    });
    let declined = this.state.photos.filter(p => {
      return p.action === "Declined By Brand";
    });
    let approved = this.state.photos.filter(p => {
      return p.action === "Approved For Publish";
    });
    let publish = this.state.photos.filter(p => {
      return p.action === "Published";
    });
    let paid = this.state.photos.filter(p => {
      return p.action === "Paid";
    });
    let status = [
      {
        key: "In Review",
        val: review,
        des: "All shoutouts that are currently in review by Lolos",
        title: "in review"
      },
      {
        key: "Rejected",
        val: rejected,
        des: "Shoutouts rejected for inappropriate content",
        title: "rejected"
      },
      {
        key: "For Sale",
        val: sale,
        des:
          "Approved Shoutouts listed for sale, those Shoutouts is seen by brands",
        title: "for sale"
      },
      {
        key: "Declined By Brand",
        val: declined,
        des: "Shoutouts declined by brand",
        title: "declined"
      },
      {
        key: "Approved For Publish",
        val: approved,
        des:
          "All Shoutouts that are approved by brands for your to post them in your approved account",
        title: "approved"
      },
      {
        key: "Published",
        val: publish,
        des: "All your published Shoutouts",
        title: "published"
      },
      {
        key: "Paid",
        val: paid,
        des: "All Shoutouts that you got paid for",
        title: "paid"
      }
    ];

    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent
          title="SHOUTOUTS MONITOR"
          navigator={this.props.navigator}
        />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 0
          }}
        >
          {status.map(s => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderBottomColor: "#bdbdbc",
                  borderBottomWidth: 0.5,
                  alignItems: "center",
                  width: WindowWidth,
                  paddingLeft: 25,
                  paddingVertical: 22
                }}
                onPress={() => this.next(s)}
              >
                <Text
                  style={{
                    color: "#ff4273",
                    lineHeight: 20,
                    marginRight: 10,
                    fontSize: 16
                  }}
                >
                  {s.val.length}
                </Text>
                <Text
                  style={{ color: "#6e6e6e", lineHeight: 20, fontSize: 16 }}
                >
                  {s.key}
                </Text>
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
