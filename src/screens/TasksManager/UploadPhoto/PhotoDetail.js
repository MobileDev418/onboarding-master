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
  Alert,
  Modal,
  Clipboard
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import moment from "moment";
import Video from "react-native-af-video-player";
import { CachedImage } from "react-native-cached-image";
// import Video from "react-native-video";

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
      modalVisible: false,
      modalVisible1: false,
      note: {},
      play: true
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
      .ref("Shoutouts/" + uid + "/" + this.props.detail.id + "/note")
      .on("value", snapshot => {
        if (snapshot.val()) {
          this.setState({ note: snapshot.val() });
        }
      });
  }

  delete() {
    Alert.alert(
      "",
      "Are you sure you want to delete this Shoutout from the list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            let uid = firebase.auth().currentUser.uid;
            firebase
              .database()
              .ref("Shoutouts/" + uid + "/" + this.props.detail.id)
              .remove();
            this.props.navigator.resetTo({
              screen: "app.HomePage",
              animationType: "slide-horizontal",
              passProps: { from: true, index: 1 }
            });
          }
        }
      ]
    );
  }

  next() {
    Clipboard.setString(this.props.detail.des + " " + this.props.detail.tags);
    this.setState({ modalVisible1: false });
    this.props.navigator.resetTo({
      screen: "app.HomePage",
      animationType: "slide-horizontal",
      passProps: { from: true }
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title={`${this.props.title.toUpperCase()}`}
          navigator={this.props.navigator}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 200
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 80,
                backgroundColor: "#f6f6f6",
                paddingHorizontal: 25,
                justifyContent: "space-between"
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Lato",
                    lineHeight: 24
                  }}
                >
                  {this.props.detail.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Lato",
                    color:
                      this.props.title === "published" ? "#17b918" : "#6f6f6f",
                    lineHeight: 24
                  }}
                >
                  {this.props.title === "published"
                    ? "Published in"
                    : "Created in:"}{" "}
                  {moment(this.props.detail.time).format("YYYY-MM-DD")}
                </Text>
              </View>
              {this.props.title === "rejected" ||
              this.props.title === "declined" ? (
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: true })}
                  style={{ position: "absolute", right: 60 }}
                >
                  <Image
                    source={require("@images/Assets/Note.png")}
                    style={{
                      width: 20,
                      height: (20 * 63) / 72
                    }}
                  />
                </TouchableOpacity>
              ) : null}
              {this.props.title !== "published" ? (
                <TouchableOpacity onPress={() => this.delete()}>
                  <Icon
                    name="trash"
                    style={{ color: "#000", width: 20, fontWeight: "bold" }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {this.props.detail.mediaType === "photo" ? (
              <CachedImage
                source={{ uri: this.props.detail.image }}
                style={{
                  width: WindowWidth,
                  height: WindowWidth,
                  justifyContent: "center",
                  alignSelf: "center"
                }}
              />
            ) : (
              <Video
                resizeMode="cover"
                // source={{ uri: this.props.detail.image }}
                url={this.props.detail.image}
                paused={this.state.play}
                controls={true}
                style={{
                  width: WindowWidth,
                  //height: WindowWidth,
                  alignSelf: "center"
                }}
              />
            )}

            <Text
              style={{
                fontFamily: "Lato-Regular",
                fontSize: 16,
                marginTop: 20,
                marginLeft: 20,
                lineHeight: 24
              }}
            >
              {this.props.detail.des}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 20
              }}
            >
              {this.props.detail.tags.map(t => {
                return (
                  <Text
                    style={{
                      fontFamily: "Lato-Regular",
                      fontSize: 16,
                      lineHeight: 24,
                      color: "#3393d1",
                      marginRight: 8
                    }}
                  >
                    {t}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType={"fade"}
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                paddingHorizontal: 30,
                backgroundColor: "white",
                borderRadius: 5,
                paddingVertical: 40
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  zIndex: 100
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image
                  source={require("@images/Influance/X.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
              <Text style={[styles.titleText, { width: WindowWidth - 120 }]}>
                {/* {this.props.title === "rejected"
                  ? "We Sorry..."
                  : "You Did Good, But..."} */}
                {this.state.note.title ? this.state.note.title : ""}
              </Text>
              <Text
                style={[
                  styles.desText,
                  { width: WindowWidth - 120, marginTop: 15 }
                ]}
              >
                {/* {this.props.title === "rejected"
                  ? "Dou to inappropriate content we didn't approve your Shoutout, please make sure your next creations will not include this type of content"
                  : "Unfortunately, this not exactly what we were looking for, however, you more than welcome to give it another try..."} */}
                {this.state.note.description ? this.state.note.description : ""}
              </Text>
              <Image
                source={{
                  uri: this.state.note.image ? this.state.note.image : ""
                }}
                style={{
                  width: WindowWidth / 2,
                  height: WindowWidth / 2,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 40
                }}
              />
            </View>
          </View>
        </Modal>
        {this.props.title === "approved" ? (
          <View
            style={[
              {
                padding: 30,
                position: "absolute",
                bottom: 0,
                backgroundColor: "white",
                paddingTop: 17
              },
              styles.shadowStyle1
            ]}
          >
            <Text
              style={[styles.titleText, { fontSize: 14, marginBottom: 13 }]}
            >
              COPY & PASTE THE CAPTION AND TAGS INTO YOUR INSTAGRAM ACCOUNT
            </Text>
            <Button
              disabled={false}
              onPress={() => this.setState({ modalVisible1: true })}
              style={[
                styles.button1,
                {
                  backgroundColor: "#FF4273",
                  position: "relative",
                  marginTop: 0
                }
              ]}
            >
              <Text style={[styles.buttonText1, { color: "white" }]}>Copy</Text>
            </Button>
          </View>
        ) : null}
        <Modal
          animationType={"fade"}
          visible={this.state.modalVisible1}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                //paddingHorizontal: 30,
                backgroundColor: "white",
                borderRadius: 5,
                //paddingVertical: 40
                width: WindowWidth - 60,
                height: WindowHeight - 60
              }}
            >
              <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    zIndex: 100
                  }}
                  onPress={() => this.setState({ modalVisible1: false })}
                >
                  <Image
                    source={require("@images/Influance/X.png")}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
                <Text style={[styles.titleText, { width: WindowWidth - 120 }]}>
                  Pay Attention
                </Text>
                <Image
                  source={require("@images/Assets/edit.png")}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: "center",
                    marginTop: 20
                  }}
                />
                <Text
                  style={[
                    styles.desText,
                    {
                      width: WindowWidth - 120,
                      marginTop: 15,
                      color: "#000",
                      fontWeight: "bold"
                    }
                  ]}
                >
                  Making Changes
                </Text>
                <Text
                  style={[
                    styles.desText,
                    { width: WindowWidth - 120, marginTop: 15 }
                  ]}
                >
                  You must not change the content of this Shoutout (caption &
                  tags) after it was approved by brand, such thing will be a
                  violation of our{" "}
                  <Text style={{ color: "#3393d1" }}>Terms of Use</Text>
                </Text>
                <Image
                  source={require("@images/Assets/calendar.png")}
                  style={{
                    width: 20,
                    height: 22,
                    alignSelf: "center",
                    marginTop: 20
                  }}
                />
                <Text
                  style={[
                    styles.desText,
                    {
                      width: WindowWidth - 120,
                      marginTop: 15,
                      color: "#000",
                      fontWeight: "bold"
                    }
                  ]}
                >
                  Durtion Time
                </Text>
                <Text
                  style={[
                    styles.desText,
                    { width: WindowWidth - 120, marginTop: 15 }
                  ]}
                >
                  You will get paid after 5 days the post was live in your
                  account but you must not delete it for 30 day. This will also
                  consider as a violation of our{" "}
                  <Text style={{ color: "#3393d1" }}>Terms of Use</Text>
                </Text>
                <Button
                  disabled={false}
                  onPress={() => this.next()}
                  style={[
                    styles.button1,
                    {
                      backgroundColor: "#FF4273",
                      position: "relative",
                      marginTop: 20,
                      width: WindowWidth - 120
                    }
                  ]}
                >
                  <Text style={[styles.buttonText1, { color: "white" }]}>
                    Got It
                  </Text>
                </Button>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
