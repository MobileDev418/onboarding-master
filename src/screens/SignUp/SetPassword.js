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
  ScrollView
} from "react-native";
import { Button } from "native-base";
import styles from "./style";
import DatePicker from "react-native-datepicker";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { TextField } from "react-native-material-textfield";
import KeyboardSpace from "react-native-keyboard-spacer";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

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
      error: "",
      passwordValid: false,
      show: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: windowHeight
        }}
      >
        <HeaderComponent navigator={this.props.navigator} />
        <Text style={styles.bdayText}>Set a password</Text>
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
        </View>

        <Button
          onPress={() => {
            if (!this.state.passwordValid) {
              this.setState({
                error: "Password is simple. Please add special character."
              });
              return;
            }
            this.props.navigator.push({
              screen: "app.Phone",
              animationType: "slide-horizontal",
              passProps: {
                fullname: this.props.fullname,
                birthday: this.props.birthday,
                pass: this.state.pass
              }
            });
          }}
          disabled={this.state.pass.length > 7 ? false : true}
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.pass.length > 7 ? "#FF4273" : "#ccc"
            }
          ]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Next</Text>
        </Button>
        <KeyboardSpace />
      </View>
    );
  }
}
