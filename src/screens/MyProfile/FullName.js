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
import { TextField } from "react-native-material-textfield";
let customStyles = {
  dateInput: {
    position: "absolute",
    left: 6,
    bottom: 15,
    //borderRadius:3,
    borderWidth: 0
    //height:60
  }
};
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
export default class MyProfile extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      birthday: "",
      text: "",
      date: "",
      dateDisabled: true,
      color: "#F0F0F0",
      textColor: "#CCCCCC",
      dateVisible: false,
      nameText: true,
      buttonDisabled: true,
      avatarSource: null,
      loading: false,
      imageLoading: false,
      first: "",
      last: ""
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  componentWillMount() {
    let uid = firebase.auth().currentUser.uid;
    let avatarSource, text, date;
    this.setState({ imageLoading: true });
    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          avatarSource = snapshot.child("avatarurl").val();
          text = snapshot.child("fullname").val();
          date = snapshot.child("birthday").val();
          if (text === null) text = "";
          if (date === null) date = "";
          if (date !== "") this.setState({ dateDisabled: false });
          this.setState({
            avatarSource,
            text,
            date,
            imageLoading: false,
            first: text.split(" ")[0],
            last: text.split(" ")[1]
          });
        }.bind(this)
      );
  }
  uploadImage = (uri, mime = "application/octet-stream") => {
    return new Promise((resolve, reject) => {
      let uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      // const uid=firebase.auth().currentUser.uid

      let sessionId = new Date().getTime();
      let uploadBlob = null;
      let imageRef = firebase
        .storage()
        .ref("images")
        .child(`${sessionId}`);
      this.setState({ imageLoading: true });
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

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      this.uploadImage(response.uri)
        .then(url => {
          this.setState({
            avatarSource: url,
            imageLoading: false
          });
          // let uid=firebase.auth().currentUser.uid
          // firebase.database().ref('users/'+uid).update({
          //   avatarurl:url
          // });
        })
        .catch(error => this.setState({ imageLoading: false }));
    });
  }

  gotoHome() {
    let birthYear = this.state.date.split(" ")[2];
    let year = new Date().getFullYear();

    if (year - parseInt(birthYear) > 17 || year - parseInt(birthYear) < 13) {
      alert(
        "The app is aimed for 13-17 YO teenagers. if you are under 13 or above 18 you are not allowed to sign up"
      );
      return;
    }
    AsyncStorage.setItem(
      "birthday",
      JSON.stringify({ birthday: this.state.date, registered: true })
    );
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .update({
        fullname: this.state.first + " " + this.state.last,
        birthday: this.state.date
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

  next(nav) {
    this.props.navigator.push({
      screen: nav,
      animationType: "slide-horizontal"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title="FULL NAME & BIRTHDAY"
          navigator={this.props.navigator}
        />
        <ScrollView style={styles.body}>
          <Text
            style={{
              color: "gray",
              marginVertical: 50,
              alignSelf: "center",
              textAlign: "center",
              width: WindowWidth - 60
            }}
          >
            Your privacy is important to us, this won't be shown to other users
          </Text>
          <View style={styles.profileInfo}>
            <TextField
              label="First Name"
              value={this.state.first}
              onChangeText={text => this.setState({ first: text })}
            />
            <TextField
              label="Last Name"
              value={this.state.last}
              onChangeText={text => this.setState({ last: text })}
              containerStyle={{ marginVertical: 25 }}
            />

            <Text style={[styles.nameText, { marginTop: 20, fontSize: 15.5 }]}>
              Birthday
            </Text>
            <View style={styles.textInput}>
              <DatePicker
                style={{ marginTop: 25, width: WindowWidth - 100 }}
                showIcon={false}
                customStyles={customStyles}
                date={this.state.date}
                mode="date"
                placeholder=" "
                format="MMMM DD YYYY"
                //minDate="01 JANUARY 2001"
                //maxDate="31 DECEMBER 2005"
                confirmBtnText="confirm"
                cancelBtnText="cancel"
                onDateChange={date => {
                  this.setState({
                    date,
                    dateDisabled: false,
                    color: "#FF4273",
                    textColor: "white"
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
        <Button
          disabled={
            this.state.first !== "" &&
            this.state.last !== "" &&
            this.state.date !== ""
              ? false
              : true
          }
          onPress={() => this.gotoHome()}
          style={[
            styles.button1,
            {
              backgroundColor:
                this.state.first !== "" &&
                this.state.last !== "" &&
                this.state.date !== ""
                  ? "#FF4273"
                  : "#ccc",
              bottom: 30
            }
          ]}
        >
          <Text style={[styles.buttonText1, { color: "white" }]}>Save</Text>
        </Button>

        <KeyboardSpacer />
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
