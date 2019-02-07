import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  AsyncStorage
} from "react-native";
import { Input, Button } from "native-base";
import styles from "./style";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import firebase from "react-native-firebase";
import { TextField } from "react-native-material-textfield";
import axios from "axios";
let windowHeight = Dimensions.get("window").height;
let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
export default class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      confirmResult: props.confirmResult,
      loading: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  componentDidMount() {}
  resend() {
    firebase
      .auth()
      .signInWithPhoneNumber(this.props.phonenumber)
      .then(confirmResult => {
        this.setState({ confirmResult });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  verifyCode() {
    this.setState({ loading: true });
    let self = this;
    const { confirmResult } = this.state;
    const { text } = this.state;
    console.log("++--", confirmResult);
    if (confirmResult && text.length) {
      console.log(text);
      confirmResult
        .confirm(text)
        .then(user1 => {
          let user = firebase.auth().currentUser;
          let userid = firebase.auth().currentUser.uid;
          let newEmail = self.props.phonenumber + "@domain.com";
          let newPass = this.props.pass;
          user.updateEmail(newEmail).then(() => {
            user.updatePassword(newPass);
          });
          firebase
            .database()
            .ref("users/" + userid)
            .update({
              fullname: self.props.fullname,
              birthday: self.props.birthday,
              country: self.props.country,
              phoneNumber: self.props.phonenumber
            });
          let url = `https://us-central1-lolos-v1.cloudfunctions.net/scrapimages?siteurl=${userid}&store=sendEmail&phone=${
            this.props.phonenumber
          }`;

          axios
            .get(url)
            .then(responseJson => {})
            .catch(error => {
              console.log("++--", error);
              this.setState({ loading: false });
              alert(error);
            });

          self.setState({ loading: false });
          self.props.navigator.resetTo({
            screen: "app.HomePage",
            animationType: "slide-horizontal",
            passProps: {
              createAccount: true,
              birthday: self.props.birthday
            }
          });
        })
        .catch(error => {
          this.setState({ loading: false });
          if (Platform.OS == "android") {
            if (error.message.indexOf("The sms code has expired.") > -1) {
              let user = firebase.auth().currentUser;
              let userid = firebase.auth().currentUser.uid;
              let newEmail = self.props.phonenumber + "@domain.com";
              let newPass = this.props.pass;
              user.updateEmail(newEmail).then(() => {
                user.updatePassword(newPass);
              });
              firebase
                .database()
                .ref("users/" + userid)
                .update({
                  fullname: self.props.fullname,
                  birthday: self.props.birthday,
                  country: self.props.country,
                  phoneNumber: self.props.phonenumber
                });

              let url = `https://us-central1-lolos-v1.cloudfunctions.net/scrapimages?siteurl=${userid}&store=sendEmail&phone=${
                this.props.phonenumber
              }`;

              axios
                .get(url)
                .then(responseJson => {})
                .catch(error => {
                  console.log("++--", error);
                  this.setState({ loading: false });
                  alert(error);
                });
              self.setState({ loading: false });
              AsyncStorage.setItem("Login", "login");
              self.props.navigator.resetTo({
                screen: "app.HomePage",
                animationType: "slide-horizontal",
                passProps: {
                  createAccount: true,
                  birthday: self.props.birthday
                }
              });
            } else alert(error.message);
          } else alert(error.message);
        });
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HeaderComponent navigator={this.props.navigator} />

        <View style={styles.container}>
          <Text style={styles.codeHeader}>Enter Confirmation code</Text>
          <Text style={[styles.retry]} onPress={() => this.resend()}>
            Resend code
          </Text>
          <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
            <TextField
              label="Code"
              value={this.state.text}
              onChangeText={text => this.setState({ text: text })}
              returnKeyType="done"
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <Button
          onPress={() => this.verifyCode()}
          style={[styles.buttonContainer]}
        >
          <Text style={[styles.buttonText]}>Done</Text>
        </Button>
        {this.state.loading ? (
          <View
            style={{
              width: WindowWidth,
              height: WindowHeight,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 2
            }}
          >
            <ActivityIndicator size="large" color="#ffb100" />
          </View>
        ) : null}
      </View>
    );
  }
}
