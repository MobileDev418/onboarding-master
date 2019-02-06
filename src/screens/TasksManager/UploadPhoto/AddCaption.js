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
  Input,
  Textarea
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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";

import CheckBox from "react-native-check-box";
import RNFetchBlob from "react-native-fetch-blob";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Video from "react-native-af-video-player";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import Permissions from "react-native-permissions";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
export default class TasksManage extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      index: 0,
      fashion: [],
      text: "",
      badge: 0,
      photo: "",
      check1: false,
      check2: false,
      check3: false,
      focus: false
    };
  }
  componentWillMount() {
    let self = this;
    setTimeout(() => {
      self.ImagePicker();
    }, 500);
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
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    Permissions.request("photo").then(res => {
      if (res === "denied") this.props.navigator.pop();
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.refs.Scroll.scrollTo(10);
  };

  _keyboardDidHide = () => {
    this.refs.Scroll.scrollTo(0);
  };

  gotoHome() {
    this.props.navigator.push({
      screen: "BrandDescription",
      animationType: "slide-horizontal",
      passProps: {
        photo: this.state.photo,
        des: this.state.text,
        mediaType: this.props.mediaType,
        tags: this.props.tags,
        brandname: this.props.brandname,
        brandID: this.props.brandID,
        campaignID: this.props.campaignID
      }
    });
  }
  ImagePicker() {
    let self = this;
    var options = {
      title: "Select Avatar",
      mediaType: this.props.mediaType
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response.uri });
        setTimeout(function() {
          self.setState({ focus: true });
        }, 500);
      }
      if (response.didCancel) {
        this.props.navigator.pop();
      }
    });
  }
  render() {
    if (this.state.photo === "") return <View />;
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="ADD CAPTION"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            ref="Scroll"
            contentContainerStyle={{
              paddingBottom: 20,
              alignSelf: "center"
            }}
          >
            <Text style={[styles.titleText, { marginTop: 35 }]}>
              Nice :) now add your caption to make it stand out
            </Text>

            <Textarea
              ref="textInput"
              onChangeText={t => this.setState({ text: t })}
              placeholder="Your caption here..."
              returnKeyType="done"
              rowSpan={6}
              style={[
                styles.textInputArea,
                { marginTop: 24, zIndex: 10, backgroundColor: "#f6f6f6" }
              ]}
              blurOnSubmit={true}
              value={this.state.text}
              autoFocus={this.state.focus}
            />

            <KeyboardSpacer />
          </ScrollView>
          <Button
            disabled={this.state.text ? false : true}
            onPress={() => this.gotoHome()}
            style={[
              styles.button1,
              {
                backgroundColor: this.state.text ? "#FF4273" : "#F0F0F0",
                position: "relative",
                bottom: 30
              }
            ]}
          >
            <Text
              style={[
                styles.buttonText1,
                {
                  color: this.state.text ? "white" : "#CCCCCC"
                }
              ]}
            >
              Next
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
