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
import { Button, Input } from "native-base";
import styles from "./style";
import CountryPicker, {
  getAllCountries
} from "react-native-country-picker-modal";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { TextField } from "react-native-material-textfield";
import KeyboardSpace from "react-native-keyboard-spacer";
import firebase from "react-native-firebase";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
const COUNTRY_LIST = ["CA", "AF", "AL", "DZ", "IN", "MX", "US", "AF", "AX"];
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
    let userLocaleCountryCode = "1";
    const userCountryData = getAllCountries()
      .filter(country => COUNTRY_LIST.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = "US";
      callingCode = "1";
    } else {
      callingCode = userCountryData.callingCode;
    }
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
      cca2,
      callingCode,
      country: "United States",
      text: "",
      loading: false,
      passwordValid: false,
      show: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };
  countryPicker() {
    <CountryPicker
      onChange={value => {
        AsyncStorage.setItem(
          "country",
          JSON.stringify({ country: value.name })
        );
        this.setState({ cca2: value.cca2, callingCode: value.callingCode });
      }}
      cca2={this.state.cca2}
      translation="eng"
    />;
  }
  Next() {
    if (!this.state.passwordValid) {
      this.setState({
        error: "Password is simple. Please add special character."
      });
      return;
    }
    this.setState({ loading: true });
    let phonenumber = "+" + this.state.callingCode + this.state.text;
    let email = phonenumber + "@domain.com";
    let self = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, this.state.pass)
      .then(() => {
        AsyncStorage.setItem("Login", "login");
        self.props.navigator.resetTo({
          screen: "app.HomePage",
          animationType: "slide-horizontal",
          passProps: {
            from: true
          }
        });
      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false });
      });
  }
  phone() {
    this.props.navigator.push({
      screen: "phoneForPassword",
      animationType: "slide-horizontal"
    });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: windowHeight
        }}
      >
        <HeaderComponent navigator={this.props.navigator} />
        <Text style={styles.bdayText}>Welcome back...</Text>
        <Text style={styles.bdayAlert}>Log in</Text>
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={[styles.nameText, { marginTop: 20, fontSize: 15.5 }]}>
            Mobile Number
          </Text>
          <View style={[styles.textInput, { paddingBottom: 12 }]}>
            <TouchableOpacity
              onPress={() => this.picker.openModal()}
              style={{
                height: 60,
                width: 90,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "transparent",
                borderRadius: 3
              }}
            >
              <CountryPicker
                ref={ref => (this.picker = ref)}
                onChange={value => {
                  AsyncStorage.setItem(
                    "country",
                    JSON.stringify({ country: value.name })
                  );
                  this.setState({
                    cca2: value.cca2,
                    callingCode: value.callingCode
                  });
                }}
                cca2={this.state.cca2}
                translation="eng"
              />
              {
                <Text
                  style={{
                    fontFamily: "Lato-Regular",
                    fontSize: 18,
                    color: "#000000",
                    marginTop: 5
                  }}
                >
                  +{this.state.callingCode}
                </Text>
              }
              <Image
                style={styles.triangle}
                source={require("@images/LoginScreen/triangle.png")}
              />
            </TouchableOpacity>

            <Input
              value={this.state.text}
              style={{ marginTop: 7 }}
              returnKeyType="done"
              keyboardType="numeric"
              onChangeText={text =>
                this.setState({
                  text,
                  color: "white",
                  disabled: false,
                  backgroundColor: "#FF4273"
                })
              }
            />
          </View>
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
          <Text
            style={{
              color: "#3393d1",
              fontSize: 16,
              fontFamily: "Lato",
              lineHeight: 24,
              alignSelf: "center",
              marginTop: 20
            }}
            onPress={() => this.phone()}
          >
            Forgot your password?
          </Text>
        </View>

        <Button
          onPress={() => {
            this.Next();
          }}
          disabled={
            this.state.pass.length > 7 && this.state.text.length > 7
              ? false
              : true
          }
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.state.pass.length > 7 && this.state.text.length > 7
                  ? "#FF4273"
                  : "#ccc"
            }
          ]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Login</Text>
        </Button>
        <KeyboardSpace />
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
