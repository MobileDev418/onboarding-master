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
  Modal,
  TextInput,
  Keyboard
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import axios from "axios";
import QS from "qs";
import ImagePicker from "react-native-image-picker";
import KeyBoardSpace from "react-native-keyboard-spacer";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { CachedImage } from "react-native-cached-image";
import Video from "react-native-video";

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
      text: "qwe",
      badge: 0,
      tasks: [
        {
          title: "Lolos",
          text: "The new teenagers Pocket Money. check it!",
          image: require("@images/campaign.png")
        }
      ],
      modalVisible: false,
      photo: "",
      description: `The new teenagers Pocket Money. Check it out! buy any product you want with NO credit card!`,
      editText: false
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
  }

  next(s) {
    this.props.navigator.push({
      screen: "PhotoDetail",
      animationType: "slide-horizontal",
      passProps: { detail: s, title: this.props.data.title }
    });
  }

  render() {
    const theme = {};
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title={`${this.props.data.title.toUpperCase()}`}
          navigator={this.props.navigator}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 70 }}
            ref="Scroll"
          >
            <View
              style={{
                width: WindowWidth,
                height: 80,
                backgroundColor: "#ff4273",
                justifyContent: "center",
                marginBottom: 5
              }}
            >
              <Text style={[styles.desText, { color: "#fff", lineHeight: 20 }]}>
                {this.props.data.des}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", paddingLeft: 5 }}
            >
              {this.props.data.val.map(s => {
                return (
                  <TouchableOpacity onPress={() => this.next(s)}>
                    {s.mediaType === "photo" ? (
                      <CachedImage
                        source={{ uri: s.image }}
                        style={{
                          width: (WindowWidth - 20) / 3,
                          resizeMode: "cover",
                          height: (WindowWidth - 20) / 3,
                          marginRight: 5,
                          marginBottom: 5
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          backgroundColor: "black"
                        }}
                      >
                        <Video
                          source={{ uri: s.image }}
                          style={{
                            width: (WindowWidth - 20) / 3,
                            height: (WindowWidth - 20) / 3,
                            marginRight: 5,
                            marginBottom: 5,
                            backgroundColor: "black"
                          }}
                          resizeMode={"contain"}
                          paused
                        />
                        <Image
                          source={require("@images/Assets/video.png")}
                          style={{
                            width: 25,
                            height: 25,
                            position: "absolute",
                            bottom: 10,
                            right: 15
                          }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <KeyBoardSpace />
        </View>
      </View>
    );
  }
}
