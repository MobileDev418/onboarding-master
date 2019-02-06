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
  AlertIOS,
  Alert
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import Swipe from "react-native-swiper";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import Prompt from "react-native-prompt";
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
      index: 0,
      instagram_username: "",
      promptVisible: false,
      followers: null
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
        instagram_username = snapshot.child("instagram_username").val();
        followers = snapshot.child("followers").val();
        if (!badge) badge = 0;

        if (!instagram_username) instagram_username = "";
        this.setState({ badge, instagram_username, followers });
      })
      .bind(this);
  }

  next() {
    let uid = firebase.auth().currentUser.uid;

    if (this.state.instagram_username === "" || !this.state.followers) {
      Alert.alert(
        "",
        "In order to create a Shoutout we must have your Instagram account name and followers number",
        [
          { text: "Cancel", onPress: () => console.log("cancel") },
          {
            text: "Add Details",
            onPress: () => {
              this.props.navigator.push({
                screen: "SocialAccounts",
                animationType: "slide-horizontal"
              });
            }
          }
        ]
      );
    } else {
      this.props.navigator.push({
        screen: "SelectCampaign",
        animationType: "slide-horizontal"
      });
    }
  }

  next1() {
    this.props.navigator.push({
      screen: "BrandGuaid",
      animationType: "slide-horizontal"
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="SHOUTOUTS"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Image
              source={require("@images/Influance/IntroScreen.png")}
              style={{
                width: WindowWidth,
                height: (WindowWidth * 735) / 1125,
                marginBottom: 22
              }}
            />
            <Text style={[styles.titleText, { marginBottom: 10 }]}>
              Become a social media RockStar!
            </Text>
            <Text style={styles.desText}>
              Help your favorite brands to rise and shine in social media,
              create content to fit their requirements and boost your wallet on
              a successful match.
            </Text>
            <TouchableOpacity
              style={[styles.button1, { position: "relative" }]}
              onPress={() => this.next()}
            >
              <Text style={styles.buttonText1}>Let's Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button1,
                {
                  position: "relative",
                  backgroundColor: "transparent",
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 15
                }
              ]}
              onPress={() => this.next1()}
            >
              <Text style={[styles.buttonText1, { color: "#000" }]}>
                How It Works?
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Prompt
          title="what's your Instagram user name?"
          placeholder="user name"
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false })}
          onSubmit={v => {
            this.setState({ promptVisible: false });
            if (v === "") return;
            else {
              let uid = firebase.auth().currentUser.uid;

              firebase
                .database()
                .ref("users/" + uid)
                .update({ instagram_username: v });
              this.props.navigator.push({
                screen: "SelectCampaign",
                animationType: "slide-horizontal"
              });
              this.setState({ loading: false });
            }
          }}
        />
      </View>
    );
  }
}
