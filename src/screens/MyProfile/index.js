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
      data: [
        {
          image: require("@images/Myprofile/User.png"),
          text: "Full Name & Birthday",
          nav: "FullName",
          w: 96,
          h: 96
        },
        {
          image: require("@images/Myprofile/Location.png"),
          text: "Shipping Address",
          nav: "app.shippingAddressEdit",
          w: 78,
          h: 96
        },
        {
          image: require("@images/Myprofile/Like.png"),
          text: "Social Accounts",
          nav: "SocialAccounts",
          w: 96,
          h: 93
        }
      ],
      country: "",
      street: "",
      apt: "",
      zipcode: "",
      city: "",
      state: ""
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
          country = snapshot.child("country").val();
          street = snapshot.child("street").val();
          city = snapshot.child("city").val();
          zipcode = snapshot.child("zipcode").val();
          state = snapshot.child("state").val();
          apt = snapshot.child("apt").val();
          if (country === null) country = "";
          if (street === null) street = "";
          if (city === null) city = "";
          if (zipcode === null) zipcode = "";
          if (state === null) state = "";
          if (apt === null) apt = "";
          if (text === null) text = "";
          if (date === null) date = "";
          if (date !== "") this.setState({ dateDisabled: false });
          this.setState({
            avatarSource,
            text,
            date,
            imageLoading: false,
            country,
            city,
            street,
            state,
            apt,
            zipcode
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

  _handleavtarEdit(cropit) {
    // ImagePicker.openPicker({
    //     width: 300,
    //     height: 400,
    //     cropping: true
    //   }).then(image => {
    //     console.log(image);
    //   });
  }

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
          let uid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("users/" + uid)
            .update({
              avatarurl: url
            });
        })
        .catch(error => this.setState({ imageLoading: false }));
    });
  }

  gotoHome() {
    let birthYear = this.state.date.split(" ")[2];
    let year = new Date().getFullYear();
    {
      /* alert(year-parseInt(birthYear)); return */
    }
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
        fullname: this.state.text,
        birthday: this.state.date,
        avatarurl: this.state.avatarSource
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
    if (nav === "app.shippingAddressEdit") {
      let { country, state, street, apt, city, zipcode } = this.state;
      if (country === "" || street === "" || city === "" || zipcode === "") {
        this.props.navigator.push({
          screen: "app.shippingAddressCountry",
          animationType: "slide-horizontal"
        });
      } else {
        this.props.navigator.push({
          screen: "app.shippingAddressEdit",
          animationType: "slide-horizontal"
        });
      }
      return;
    }
    this.props.navigator.push({
      screen: nav,
      animationType: "slide-horizontal"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="MY PROFILE" navigator={this.props.navigator} />
        <ScrollView style={[styles.body, { backgroundColor: "#f0f0f0" }]}>
          <TouchableOpacity
            onPress={() => {
              this.selectPhotoTapped();
            }}
            style={styles.avtarContainer}
          >
            {this.state.avatarSource === null ? (
              <ImageBackground
                source={require("@images/SettingMenu/avatar.png")}
                style={[
                  styles.avtar,
                  { justifyContent: "center", alignItems: "center" }
                ]}
              >
                {this.state.imageLoading ? (
                  <ActivityIndicator size="large" color="#ffb100" />
                ) : null}
              </ImageBackground>
            ) : (
              <Image
                source={{ uri: this.state.avatarSource }}
                style={[styles.avtar, { borderRadius: 60 }]}
              />
            )}
            <View style={[styles.add]}>
              <Image
                source={require("@images/SettingMenu/add.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderTopColor: "#bdbdbc",
              borderTopWidth: 0.5,
              marginTop: 30
            }}
          />
          {this.state.data.map(d => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: WindowWidth,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#bdbdbc",
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                  backgroundColor: "#fff"
                }}
                onPress={() => this.next(d.nav)}
              >
                <Image
                  source={d.image}
                  style={{
                    width: 25,
                    height: (25 * d.h) / d.w,
                    marginRight: 15
                  }}
                />
                <Text style={{ fontSize: 17, color: "gray" }}>{d.text}</Text>
                <Icon
                  name="ios-arrow-forward"
                  style={{
                    fontSize: 20,
                    color: "gray",
                    position: "absolute",
                    right: 23
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

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
        <KeyboardSpacer />
      </View>
    );
  }
}
