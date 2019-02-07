import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Button } from "native-base";
import styles from "./style";
import DatePicker from "react-native-datepicker";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import { TextField } from "react-native-material-textfield";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
let WindowWidth = windowWidth;

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
      dateVisible: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", height: windowHeight }}>
        <HeaderComponent navigator={this.props.navigator} />
        <Text style={styles.bdayText}>When’s your birthday?</Text>
        <Text style={styles.bdayAlert}>
          You must be 13~17 years old to use Lolos, your birthday won't be shown
          publicly
        </Text>

        <View style={{ paddingHorizontal: 30, marginTop: 49 }}>
          <Text style={[styles.nameText, { marginTop: 20, fontSize: 15.5 }]}>
            Birthday
          </Text>
          <View style={styles.textInput}>
            <DatePicker
              style={{
                marginTop: 13,
                width: WindowWidth - 60,
                marginLeft: -20
              }}
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
                  disabled: false,
                  color: "#FF4273",
                  textColor: "white"
                });
              }}
            />
          </View>
        </View>

        <Button
          onPress={() => {
            let birthYear = this.state.date.split(" ")[2];
            let year = new Date().getFullYear();
            {
              /* alert(year-parseInt(birthYear)); return */
            }
            if (
              year - parseInt(birthYear) > 17 ||
              year - parseInt(birthYear) < 13
            ) {
              alert(
                "The app is aimed for 13-17 YO teenagers. if you are under 13 or above 18 you are not allowed to sign up"
              );
              return;
            }
            AsyncStorage.setItem(
              "birthday",
              JSON.stringify({ birthday: this.state.date })
            );
            this.props.navigator.push({
              screen: "Password",
              animationType: "slide-horizontal",
              passProps: {
                birthday: this.state.date,
                fullname: this.props.fullname
              }
            });
          }}
          disabled={this.state.disabled}
          style={[
            styles.buttonContainer,
            { backgroundColor: this.state.color }
          ]}
        >
          <Text style={[styles.buttonText, { color: this.state.textColor }]}>
            Next
          </Text>
        </Button>
      </View>
    );
  }
}
