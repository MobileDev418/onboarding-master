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
  Keyboard
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import Swipe from "react-native-swiper";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

export default class TasksManage extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      index: 0,
      data: this.props.tags,
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
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.refs.Scroll.scrollTo(100);
  };

  _keyboardDidHide = () => {
    this.refs.Scroll.scrollTo(0);
  };

  next() {
    Keyboard.dismiss();
    if (this.state.data.length === 0) return;
    this.props.navigator.push({
      screen: "SubmitPhoto",
      animationType: "slide-horizontal",
      passProps: {
        tags: this.state.data,
        photo: this.props.photo,
        des: this.props.des,
        mediaType: this.props.mediaType,
        brandname: this.props.brandname,
        brandID: this.props.brandID,
        campaignID: this.props.campaignID
      }
    });
  }

  Addtag() {
    let data = [...this.state.data];
    if (this.state.text === "" || data.indexOf("#" + this.state.text) > -1)
      return;
    data.push(this.state.text);
    this.setState({ text: "", data });
  }

  deleteTag(t) {
    let data = [...this.state.data];
    let index = data.indexOf(t);
    if (index > -1) {
      data.splice(index, 1);
    }
    this.setState({ data });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="ADD #HASHTAGS"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView ref="Scroll" keyboardShouldPersistTaps="always">
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                flex: 1,
                paddingTop: 30
              }}
            >
              <Text style={styles.titleText}>Add # & @ if you want</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: 30,
                  marginVertical: 30
                }}
              >
                {this.state.data.map(d => {
                  return (
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 5,
                        marginRight: 10,
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "#3f99d4", fontSize: 15 }}>
                        {d}
                      </Text>
                      {this.props.tags.indexOf(d) < 0 ? (
                        <TouchableOpacity onPress={() => this.deleteTag(d)}>
                          <Icon
                            name="md-close"
                            style={{
                              color: "black",
                              fontSize: 20,
                              marginLeft: 8,
                              marginBottom: -3
                            }}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  );
                })}
              </View>
              <View
                style={[
                  styles.textInput,
                  {
                    height: 50,
                    marginHorizontal: 0,
                    paddingHorizontal: 30,
                    backgroundColor: "#f6f6f6"
                  }
                ]}
              >
                <Input
                  value={this.state.text}
                  returnKeyType="done"
                  onChangeText={text =>
                    this.setState({ text, nameText: false })
                  }
                  placeholder="Your own tags here"
                  autoFocus
                  autoCapitalize={false}
                />
                <TouchableOpacity onPress={() => this.Addtag()}>
                  <Image
                    source={require("@images/Influance/PinkPlus.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button1,
                  {
                    position: "relative",
                    marginTop: 30,
                    backgroundColor:
                      this.state.data.length === 0 ? "#f0f0f0" : "#ff4273"
                  }
                ]}
                onPress={() => this.next()}
              >
                <Text
                  style={[
                    styles.buttonText1,
                    { color: this.state.data.length === 0 ? "#999" : "#fff" }
                  ]}
                >
                  Review Shoutout
                </Text>
              </TouchableOpacity>
            </View>
            <KeyboardSpacer />
          </ScrollView>
        </View>
      </View>
    );
  }
}
