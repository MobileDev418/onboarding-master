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
  AlertIOS
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import KeyboardSpacer from "react-native-keyboard-spacer";
import RNFetchBlob from "react-native-fetch-blob";
import moment from "moment";
import Video from "react-native-af-video-player";
import Prompt from "react-native-prompt";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import LinearGradient from "react-native-linear-gradient";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
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
      photo: "",
      instagram_username: "",
      promptVisible: false,
      followers: 0
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
  uploadImage = (uri, mime = "video/quicktime") => {
    return new Promise((resolve, reject) => {
      let uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      // const uid=firebase.auth().currentUser.uid
      console.log("++--", uploadUri);
      let sessionId = new Date().getTime();
      let uploadBlob = null;
      let imageRef = firebase
        .storage()
        .ref("Shoutouts/" + moment().format("YYYY_MM_DD"))
        .child(`${sessionId}`);
      this.setState({ loading: true });
      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(uploadUri, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  gotoHome() {
    let uid = firebase.auth().currentUser.uid;
    if (Platform.OS === "ios") {
      if (this.state.instagram_username === "") {
        AlertIOS.prompt(
          "What's your instagram user name?",
          "this is how we match the posts to our users",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: username => {
                if (username === "") return;
                else {
                  this.uploadImage(this.props.photo)
                    .then(url => {
                      firebase
                        .database()
                        .ref("Shoutouts/" + uid)
                        .push({
                          image: url,
                          time: new Date().getTime(),
                          tags: this.props.tags,
                          des: this.props.des,
                          action: "In Review",
                          mediaType: this.props.mediaType,
                          brandname: this.props.brandname,
                          brandID: this.props.brandID,
                          campaignID: this.props.campaignID
                        });
                    })
                    .catch(error => {
                      alert(error.message);
                      this.setState({ loading: false });
                    });
                  firebase
                    .database()
                    .ref("users/" + uid)
                    .update({ instagram_username: username });
                  this.props.navigator.resetTo({
                    screen: "app.HomePage",
                    animationType: "slide-horizontal",
                    passProps: { from: true, post: true }
                  });
                  this.setState({ loading: false });
                }
              }
            }
          ]
        );
      } else {
        this.uploadImage(this.props.photo)
          .then(url => {
            firebase
              .database()
              .ref("Shoutouts/" + uid)
              .push({
                image: url,
                time: new Date().getTime(),
                tags: this.props.tags,
                des: this.props.des,
                action: "In Review",
                mediaType: this.props.mediaType,
                brandname: this.props.brandname,
                brandID: this.props.brandID,
                campaignID: this.props.campaignID
              });
          })
          .catch(error => {
            alert(error.message);
            this.setState({ loading: false });
          });

        this.props.navigator.resetTo({
          screen: "app.HomePage",
          animationType: "slide-horizontal",
          passProps: { from: true, post: true }
        });
        this.setState({ loading: false });
      }
    } else {
      if (this.state.instagram_username === "") {
        this.setState({ promptVisible: true });
        return;
      }
      this.uploadImage(this.props.photo)
        .then(url => {
          firebase
            .database()
            .ref("Shoutouts/" + uid)
            .push({
              image: url,
              time: new Date().getTime(),
              tags: this.props.tags,
              des: this.props.des,
              action: "In Review",
              mediaType: this.props.mediaType,
              brandname: this.props.brandname,
              brandID: this.props.brandID,
              campaignID: this.props.campaignID
            });
        })
        .catch(error => {
          alert(error.message);
          this.setState({ loading: false });
        });

      this.props.navigator.resetTo({
        screen: "app.HomePage",
        animationType: "slide-horizontal",
        passProps: { from: true, post: true }
      });
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="REVIEW"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 120
            }}
          >
            <LinearGradient
              start={{ x: 1.04, y: 0.55 }}
              end={{ x: -0.04, y: 0.45 }}
              locations={[0.0, 1.0]}
              style={styles.linerButton}
              colors={["#F5317F", "#FF7C6E"]}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: 12,
                    color: "#fff"
                  }
                ]}
              >
                THIS POST WILL SELL FOR{" "}
                {Math.round((this.state.followers / 5) * 10) / 10} LOLOS
              </Text>
            </LinearGradient>
            {this.props.mediaType === "photo" ? (
              <Image
                source={{ uri: this.props.photo }}
                style={{
                  width: WindowWidth,
                  height: WindowWidth,
                  alignSelf: "center"
                }}
              />
            ) : (
              <Video
                resizeMode="cover"
                url={this.props.photo}
                style={{
                  width: WindowWidth,
                  // height: WindowWidth,
                  alignSelf: "center"
                }}
              />
            )}

            <Text
              style={{
                fontFamily: "Lato-Regular",
                fontSize: 17,
                width: WindowWidth - 40,
                marginTop: 20,
                marginLeft: 30
              }}
            >
              {this.props.des}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 30,
                marginVertical: 10
              }}
            >
              {this.props.tags.map(t => {
                return (
                  <Text
                    style={{
                      fontFamily: "Lato-Regular",
                      fontSize: 15,
                      marginTop: 5,
                      color: "#3f99d4",
                      marginRight: 10
                    }}
                  >
                    {t}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
          <View
            style={[
              {
                padding: 30,
                position: "absolute",
                bottom: 0,
                backgroundColor: "white"
              },
              styles.shadowStyle1
            ]}
          >
            <Button
              disabled={false}
              onPress={() => this.gotoHome()}
              style={[
                styles.button1,
                {
                  backgroundColor: "#FF4273",
                  position: "relative",
                  marginTop: 0
                }
              ]}
            >
              <Text style={[styles.buttonText1, { color: "white" }]}>
                Submit
              </Text>
            </Button>
          </View>
        </View>

        <KeyboardSpacer />
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
              this.uploadImage(this.props.photo)
                .then(url => {
                  firebase
                    .database()
                    .ref("Shoutouts/" + uid)
                    .push({
                      image: url,
                      time: new Date().getTime(),
                      tags: this.props.tags,
                      des: this.props.des,
                      action: "In Review",
                      mediaType: this.props.mediaType,
                      brandname: this.props.brandname
                    });
                })
                .catch(error => this.setState({ loading: false }));

              firebase
                .database()
                .ref("users/" + uid)
                .update({ instagram_username: v });
              this.props.navigator.resetTo({
                screen: "app.HomePage",
                animationType: "slide-horizontal",
                passProps: { from: true, photo: true }
              });
              this.setState({ loading: false });
            }
          }}
        />
      </View>
    );
  }
}
