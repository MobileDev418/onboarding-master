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
import ImagePicker from "react-native-image-picker";
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
    Permissions.request("photo").then(res => {
      if (res === "denied") this.openSetting();
    });
  }
  componentDidMount() {}
  openSetting() {
    Alert.alert(
      "Can we access your Videos?",
      "We need access so you can set Video",
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
        mediaType: "video",
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
          title="VIDEO TIP"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <Image
            source={require("@images/Influance/VideoTips.png")}
            style={{
              width: WindowWidth - 100,
              height: ((WindowWidth - 100) * 570) / 765,
              alignSelf: "center",
              marginTop: 70
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
            Steady your shot, pose your framing and orientation, make sure your
            video is suitable for social media usage don't use offensive
            content, video length is up to 20 sec.
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
