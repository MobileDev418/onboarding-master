import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
  Modal,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Button } from "native-base";
import styles from "./style";
import DatePicker from "react-native-datepicker";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { TextField } from "react-native-material-textfield";
import KeyboardSpace from "react-native-keyboard-spacer";
import firebase from "react-native-firebase";
let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;

let customStyles = {
  dateInput: {
    position: "absolute",
    left: 20,
    bottom: 15,
    //borderRadius:3,
    borderWidth: 0
  }
};
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      disabled: true,
      color: "#F0F0F0",
      textColor: "#CCCCCC",
      dateVisible: false,
      pass: "",
      last: "",
      privacyModal: false,
      termsModal: false,
      pass1: "",
      error: "",
      passwordValid: false,
      loading: false,
      show: false,
      show1: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  next() {
    this.setState({ loading: true });
    if (!this.state.passwordValid) {
      this.setState({
        error: "Password is simple. Please add special character.",
        loading: false
      });
      return;
    }
    let user = firebase.auth().currentUser;
    user
      .updatePassword(this.state.pass)
      .then(() => {
        this.props.navigator.resetTo({
          screen: "Login",
          animationType: "slide-horizontal"
        });
        this.setState({ loading: false });
      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: WindowHeight
        }}
      >
        <HeaderComponent navigator={this.props.navigator} />
        <Text style={styles.bdayText}>Set a new password</Text>
        <Text style={styles.bdayAlert}>
          Your password should be at least 8 characters and contain 1 special
          character
        </Text>
        <View style={{ paddingHorizontal: 30 }}>
          <TextField
            label="Password"
            value={this.state.pass}
            onChangeText={text => {
              this.setState({ pass: text });
              var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
              if (re.test(text)) {
                this.setState({ passwordValid: true, error: null });
              } else {
                this.setState({ passwordValid: false });
              }
            }}
            secureTextEntry={!this.state.show}
            error={this.state.error}
            renderAccessory={() => {
              if (this.state.show)
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({ show: false })}
                  >
                    <Image
                      source={require("@images/Assets/EyeOff.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                );
              else
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({ show: true })}
                  >
                    <Image
                      source={require("@images/Assets/Eye.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                );
            }}
          />
          <TextField
            label="Confirm Password"
            value={this.state.pass1}
            onChangeText={text => this.setState({ pass1: text })}
            secureTextEntry={!this.state.show1}
            error={this.state.error}
            renderAccessory={() => {
              if (this.state.show1)
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({ show1: false })}
                  >
                    <Image
                      source={require("@images/Assets/EyeOff.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                );
              else
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({ show1: true })}
                  >
                    <Image
                      source={require("@images/Assets/Eye.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                );
            }}
          />
        </View>

        <Button
          onPress={() => {
            this.next();
          }}
          disabled={
            this.state.pass.length > 7 && this.state.pass === this.state.pass1
              ? false
              : true
          }
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.state.pass.length > 7 &&
                this.state.pass === this.state.pass1
                  ? "#FF4273"
                  : "#ccc"
            }
          ]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Done</Text>
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
        <KeyboardSpace />
      </View>
    );
  }
}
