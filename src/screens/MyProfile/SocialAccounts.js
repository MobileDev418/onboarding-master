import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Input,
  Icon,
  Body,
  Right,
  Left,
  Title,
  Card,
  Badge,
  CardItem
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  Platform,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  ScrollView
} from "react-native";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import Swiper from "react-native-deck-swiper";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import DatePicker from "react-native-datepicker";
import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";
import RNFetchBlob from "react-native-fetch-blob";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Lottie from "lottie-react-native";
import { TextField } from "react-native-material-textfield";

let customStyles = {
  dateInput: {
    position: "absolute",
    left: 20,
    bottom: 15,
    //borderRadius:3,
    borderWidth: 0
    //height:60
  }
};

export default class MyProfile extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      instagram_username: "",
      followers: 0
    };
  }
  componentWillMount() {
    let uid = firebase.auth().currentUser.uid;

    this.setState({ imageLoading: true });
    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          instagram_username = snapshot.child("instagram_username").val();
          followers = snapshot.child("followers").val();

          if (instagram_username === null) instagram_username = "";
          if (followers === null) followers = 0;

          this.setState({
            instagram_username,
            followers
          });
        }.bind(this)
      );
  }

  gotoHome() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .update({
        instagram_username: this.state.instagram_username,
        followers: this.state.followers
      })
      .then(() => {
        this.props.navigator.resetTo({
          screen: "app.HomePage",
          animationType: "slide-horizontal",
          passProps: { from: true }
        });
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title="SOCIAL ACCOUNTS"
          navigator={this.props.navigator}
        />
        <ScrollView
          contentContainerStyle={[styles.body, { paddingHorizontal: 30 }]}
        >
          <Image
            source={require("@images/InstagramLogo.png")}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              marginTop: 20
            }}
          />
          <Text
            style={{
              color: "gray",
              marginVertical: 50,
              alignSelf: "center",
              textAlign: "center",
              width: WindowWidth - 60
            }}
          >
            We must verify your follower's number on your Instagram account,
            this will affect the pricing of your Shoutouts
          </Text>

          <TextField
            label="User Name"
            value={this.state.instagram_username}
            onChangeText={text => this.setState({ instagram_username: text })}
            containerStyle={{ marginVertical: 15 }}
          />
          <TextField
            label="Number Of Followers"
            value={this.state.followers}
            onChangeText={text => this.setState({ followers: text })}
            keyboardType="number-pad"
          />
        </ScrollView>
        <Button
          disabled={
            this.state.instagram_username !== "" && this.state.followers !== ""
              ? false
              : true
          }
          onPress={() => this.gotoHome()}
          style={[
            styles.button1,
            {
              backgroundColor:
                this.state.instagram_username !== "" &&
                this.state.followers !== ""
                  ? "#FF4273"
                  : "#ccc",
              bottom: 30
            }
          ]}
        >
          <Text style={[styles.buttonText1, { color: "white" }]}>Save</Text>
        </Button>
        <KeyboardSpacer />
      </View>
    );
  }
}
