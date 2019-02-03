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
import styles from "./style";
import firebase from "react-native-firebase";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
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
          image: require("@images/earn_lolos/Invite.png"),
          title: 'EARN "KINGS"',
          des: "earn 20 Lolos for each signup",
          size: {
            width: WindowWidth / 5,
            height: WindowWidth / 5,
            marginRight: 10
          },
          index: 0
        },
        {
          image: require("@images/earn_lolos/Shoutout.png"),
          title: "CREATE SHOUTOUTS",
          des: "Be creative and earn Lolos",
          size: {
            width: WindowWidth / 5 - 15,
            height: ((WindowWidth / 5 - 15) * 150) / 171,
            marginHorizontal: 10,
            marginVertical: 12,
            marginRight: 14
          },
          index: 1
        }
      ],
      index: 0,
      fashion: [],
      text: "",
      badge: 0,
      tasks: [
        {
          title: "Invite Friends",
          text: "On each successful earn up to 20 Lolos",
          image: require("@images/Invite_task.png")
        },
        {
          title: "Photos Marketplace",
          text: "Sell your awesome photos to boost your wallet.",
          image: require("@images/sellimg.png")
        },
        {
          title: "Instagram Campaigns",
          text: "Boost your wellat with your social skills",
          image: require("@images/instagram.jpg")
        },
        {
          title: "Product Reviews",
          text: "Make a produt review",
          image: require("@images/task_rate.jpg")
        },
        {
          title: "Cash Back",
          text: "Get full refaunds with Lolos",
          image: require("@images/cash.jpg")
        }
      ],
      invite_button: true
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
      .ref("Dynamic_Variable")
      .on("value", snap => {
        limitinvite = snap.child("limit_invite").val();

        firebase
          .database()
          .ref("users")
          .on("value", s => {
            let i = 0;
            s.forEach(child => {
              if (!child.val().transaction_history) return;
              let obj = child.val().transaction_history;
              Object.keys(obj).forEach(c => {
                if (obj[c].description === "Referral bonus") i++;
              });
            });
            // console.log("++--LIMITINVITE", limitinvite, i);
            if (limitinvite < i) this.setState({ invite_button: false });
            else this.setState({ invite_button: true });
          });
      })
      .bind(this);
  }

  clickTask(i) {
    if (i === 0) {
      this.props.navigator.push({
        screen: "app.InviteFriendsHome",
        animationType: "slide-horizontal"
      });
    }
    if (i === 1) {
      this.props.navigator.push({
        screen: "UploadHome",
        animationType: "slide-horizontal"
      });
    }
    // if (i === 2) {
    //   this.props.navigator.push({
    //     screen: "Campaign",
    //     animationType: "slide-horizontal"
    //   });
    // }
  }

  render() {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((t, i) => {
      if (i === 0 && !this.state.invite_button) return;
      return true;
    });
    console.log("++--SHOWS", this.state.invite_button);
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderComponent
            title="EARN LOLOS"
            navigator={this.props.navigator}
            rightnav="ActivityMonitor"
          />

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: 15
            }}
          >
            {this.state.data.map(d => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    //justifyContent: "center",
                    borderBottomColor: "#bdbdbc",
                    borderBottomWidth: 0.5,
                    alignItems: "center",
                    width: WindowWidth,
                    paddingLeft: 5
                  }}
                  onPress={() => this.clickTask(d.index)}
                >
                  <Image source={d.image} style={d.size} />

                  <Text style={{ fontWeight: "bold" }}>{d.title}</Text>

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
        </View>
        <Text
          style={{
            fontSize: 18,
            opacity: 0.8,
            position: "absolute",
            bottom: 30,
            textAlign: "center",
            alignSelf: "center",
            width: WindowWidth - 70
          }}
        >
          Many more ways to earn Lolos are coming soon
        </Text>
      </View>
    );
  }
}
