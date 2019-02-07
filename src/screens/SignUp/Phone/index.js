import DeviceInfo from "react-native-device-info";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  Alert
} from "react-native";
import CountryPicker, {
  getAllCountries
} from "react-native-country-picker-modal";
import { Input, Button } from "native-base";
import styles from "./style";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import firebase from "react-native-firebase";
import moment from "moment";
import KeyboardSpace from "react-native-keyboard-spacer";
const COUNTRY_LIST = ["CA", "AF", "AL", "DZ", "IN", "MX", "US", "AF", "AX"];
let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
export default class Phone extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    //StatusBarIOS.setHidden(true)
    super(props);
    let userLocaleCountryCode = "1";
    const userCountryData = getAllCountries()
      .filter(country => COUNTRY_LIST.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
    console.log(userCountryData);
    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = "US";
      callingCode = "1";
    } else {
      callingCode = userCountryData.callingCode;
    }

    this.state = {
      cca2,
      callingCode,
      backgroundColor: "#F0F0F0",
      color: "#CCCCCC",
      text: "",
      disabled: true,
      country: "United States",
      loading: true,
      users: []
    };
  }
  componentDidMount() {
    console.log("++", this.props.birthday);
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: "",
          codeInput: "",
          phoneNumber: "+44",
          confirmResult: null
        });
      }
    });

    firebase
      .database()
      .ref("users")
      .on("value", snap => {
        let users = [];
        snap.forEach(child => {
          users.push(child.val());
        });
        this.setState({ users, loading: false });
      })
      .bind(this);
  }

  countryPicker() {
    <CountryPicker
      onChange={value => {
        AsyncStorage.setItem(
          "country",
          JSON.stringify({ country: value.name })
        );
        this.setState({
          cca2: value.cca2,
          callingCode: value.callingCode,
          country: value.name
        });
      }}
      cca2={this.state.cca2}
      translation="eng"
    />;
  }
  async phoneSignUp() {
    this.setState({ loading: true });
    let user = this.state.users.filter(u => {
      return u.phoneNumber === "+" + this.state.callingCode + this.state.text;
    })[0];
    if (user) {
      Alert.alert(
        "",
        "This phone number is already registered. Please Log in",
        [
          { text: "Cancel", onPress: () => console.log("cancel") },
          {
            text: "Go to Login",
            onPress: () => {
              this.props.navigator.push({
                screen: "Login",
                animationType: "slide-horizontal"
              });
            }
          }
        ]
      );
      this.setState({ loading: false });
      return;
      if (user.deviceId !== DeviceInfo.getUniqueID()) {
        alert("Use your device");
        this.setState({ loading: false });
        return;
      }
    }
    let Code = await AsyncStorage.getItem("CodeRequire");
    if (Code === null)
      await AsyncStorage.setItem(
        "CodeRequire",
        JSON.stringify([new Date().getTime()])
      );
    else {
      if (JSON.parse(Code).length < 3) {
        let id = [new Date().getTime()];
        var newIds = JSON.parse(Code).concat(id);
        await AsyncStorage.setItem("CodeRequire", JSON.stringify(newIds));
      } else if (
        JSON.parse(Code).length === 3 &&
        moment(new Date()).diff(JSON.parse(Code)[0], "minutes") > 1
      ) {
        let id = [new Date().getTime()];
        var newIds = JSON.parse(Code).slice(1);
        newIds.concat(id);
        await AsyncStorage.setItem("CodeRequire", JSON.stringify(newIds));
      } else {
        this.setState({ loading: false });
        alert("Too many attemps, Please try in an hour");
        return;
      }
    }

    let self = this;
    firebase
      .auth()
      .signInWithPhoneNumber("+" + this.state.callingCode + this.state.text)
      .then(confirmResult => {
        self.setState({ loading: false });
        self.props.navigator.push({
          screen: "app.OtpScreen",
          animationType: "slide-horizontal",
          passProps: {
            confirmResult: confirmResult,
            phonenumber: "+" + this.state.callingCode + this.state.text,
            birthday: self.props.birthday,
            pass: this.props.pass,
            fullname: this.props.fullname,
            country: this.state.country
          }
        });
      })
      .catch(error => {
        alert(error.message);
        self.setState({ loading: false });
      });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HeaderComponent navigator={this.props.navigator} />
        <Text style={styles.phoneNum}>What's your mobile number</Text>
        <Text style={styles.alert}>We'll send you a confirmation code</Text>

        <View style={{ paddingHorizontal: 30, marginTop: 35 }}>
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
        </View>
        <Button
          onPress={() => this.phoneSignUp()}
          disabled={this.state.text.length <= 7 ? true : false}
          style={[
            styles.buttonContainer,
            this.state.text.length <= 7
              ? { backgroundColor: "#F0F0F0" }
              : { backgroundColor: "#FF4273" }
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              this.state.text.length <= 7
                ? { color: "#CCCCCC" }
                : { color: "white" }
            ]}
          >
            Next
          </Text>
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
