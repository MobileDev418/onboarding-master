import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform
} from "react-native";
import { Input, Button } from "native-base";
import styles from "./style";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import firebase from "react-native-firebase";
import { TextField } from "react-native-material-textfield";
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
        .then(user => {
          var credential = firebase.auth.PhoneAuthProvider.credential(
            confirmResult.verificationId,
            text
          );

          let newEmail = self.props.phonenumber + "@domain.com";
          self.setState({ loading: false });
          self.props.navigator.push({
            screen: "createPassword",
            animationType: "slide-horizontal"
          });
        })
        .catch(error => {
          this.setState({ loading: false });
          if (Platform.OS == "android") {
            if (error.message.indexOf("The sms code has expired.") > -1) {
              let newEmail = self.props.phonenumber + "@domain.com";
              self.setState({ loading: false });
              self.props.navigator.push({
                screen: "createPassword",
                animationType: "slide-horizontal"
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
