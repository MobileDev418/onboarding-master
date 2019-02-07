import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Input,
  Text,
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
  Platform,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  TextInput,
  Modal,
  ScrollView,
  Keyboard
} from "react-native";
import CountryPicker, {
  getAllCountries
} from "react-native-country-picker-modal";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import QS from "qs";
import axios from "axios";
import KeyboardSpace from "react-native-keyboard-spacer";
const COUNTRY_LIST = ["CA", "AF", "AL", "DZ", "IN", "MX", "US", "AF", "AX"];

export default class Country extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
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
      //cca2 = 'US'
      callingCode = "1";
    } else {
      callingCode = userCountryData.callingCode;
    }

    this.state = {
      disabled: true,
      inputPosition: 72,
      height: WindowHeight,
      cca2,
      callingCode,
      Country: "",
      clear: true,
      selected: false,
      street: "",
      city: "",
      zipcode: "",
      apt: "",
      streetModal: false,
      search: "",
      dataSource: [],
      focus: "",
      state: ""
    };
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
  componentDidMount() {
    let uid = firebase.auth().currentUser.uid;
    let Country;

    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          Country = snapshot.child("country").val();
          let city = snapshot.child("city").val();
          let apt = snapshot.child("apt").val();
          let street = snapshot.child("street").val();
          let zipcode = snapshot.child("zipcode").val();
          let state = snapshot.child("state").val();
          if (Country === null) Country = "";
          if (city === null) city = "";
          if (street === null) street = "";
          if (apt === null) apt = "";
          if (zipcode === null) zipcode = "";
          if (state === null) state = "";
          this.setState({
            Country,
            apt,
            city,
            street,
            zipcode,
            state
          });
        }.bind(this)
      );
  }

  next() {
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .update({
        country: this.state.Country,
        city: this.state.city,
        apt: this.state.apt,
        zipcode: this.state.zipcode,
        street: this.state.street,
        state: this.state.state
      })
      .then(() => {
        this.props.navigator.push({
          screen: "app.shippingAddressShow",
          animationType: "slide-horizontal"
        });
      });
  }
  searchLocation = search => {
    this.setState({ search: search });
    console.log(search);
    // alert(search)
    // return
    query = {
      key: "AIzaSyCwr_4qq9ez2aZEk8gDsBWFiVHhV-XoRIk",
      language: "en",
      types: "city"
    };

    GooglePlacesSearchQuery = {
      rankby: "distance"
    };
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=geocode&key=AIzaSyDNz82rLVFd9n8jCv5sz8n6BpFJgSh-EBc`;

    if (search.length > 2) {
      axios
        .get(url)
        .then(responseJson => {
          console.log("++--datasource", responseJson.data.predictions);
          this.setState({ dataSource: responseJson.data.predictions });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.refs.Scroll.scrollTo(
      this.state.focus === "zip" ? 300 : this.state.focus === "city" ? 200 : 100
    );
  };

  _keyboardDidHide = () => {
    this.refs.Scroll.scrollTo(0);
  };
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#f6f6f6" }]}>
        <View
          style={{
            height: this.state.height,
            backgroundColor: "#fff",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 1 }
          }}
        >
          <HeaderComponent
            title="SHIPPING ADDRESS"
            navigator={this.props.navigator}
          />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            ref="Scroll"
          >
            <View
              style={{ backgroundColor: "rgba(33,33,33,0.1)", padding: 16 }}
            >
              <Text style={{ opacity: 0.6 }}>
                please enter only unaccented alphabetical letters, A-Z or a-z as
                required by international logistics services.
              </Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.setState({ streetModal: true })}
            >
              <View style={styles.inputView}>
                {/* <TextInput
                                placeholder='Street address. P.O. box, etc'
                                underlineColorAndroid='transparent'
                                value={this.state.street}
                                editable={false}
                                style={[styles.textinput,{color:'#212123'}]}
                            /> */}
                {this.state.street === "" ? (
                  <Text
                    style={[
                      styles.textinput,
                      { color: "rgba(33,33,33,0.25)", paddingVertical: 10 }
                    ]}
                  >
                    <Text style={{ color: "red", opacity: 1 }}>*</Text>Street
                    address. P.O. box, etc
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textinput,
                      { color: "#212123", paddingVertical: 10 }
                    ]}
                  >
                    {this.state.street}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
            <View
              style={[
                styles.inputView,
                {
                  borderBottomColor:
                    this.state.focus === "apt" ? "#212123" : "#dedede"
                }
              ]}
            >
              <TextInput
                placeholder="Apt, suite, unit, etc"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ apt: text })}
                value={this.state.apt}
                style={styles.textinput}
                onFocus={() => this.setState({ focus: "apt" })}
              />
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.picker.openModal()}
            >
              <View style={[styles.inputView]}>
                {this.state.Country === "" ? (
                  <Text
                    style={[
                      styles.textinput,
                      { color: "rgba(33,33,33,0.25)", paddingVertical: 10 }
                    ]}
                  >
                    <Text style={{ color: "red", opacity: 1 }}>*</Text>Country
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textinput,
                      { color: "#212123", paddingVertical: 10 }
                    ]}
                  >
                    {this.state.Country}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
            <View
              style={[
                styles.inputView,
                {
                  borderBottomColor:
                    this.state.focus === "state" ? "#212123" : "#dedede"
                }
              ]}
            >
              <TextInput
                placeholder="State/Province/Country"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ state: text })}
                value={this.state.state}
                style={styles.textinput}
                onFocus={() => this.setState({ focus: "state" })}
              />
            </View>
            <View
              style={[
                styles.inputView,
                {
                  borderBottomColor:
                    this.state.focus === "city" ? "#212123" : "#dedede",
                  flexDirection: "row",
                  alignItems: "center"
                }
              ]}
            >
              {this.state.city === "" ? (
                <Text style={{ color: "red", opacity: 1, marginBottom: 0 }}>
                  *
                </Text>
              ) : null}
              <TextInput
                placeholder="City"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
                style={styles.textinput}
                onFocus={() => this.setState({ focus: "city" })}
              />
            </View>
            <View
              style={[
                styles.inputView,
                {
                  borderBottomColor:
                    this.state.focus === "zip" ? "#212123" : "#dedede",
                  flexDirection: "row",
                  alignItems: "center"
                }
              ]}
            >
              {this.state.zipcode === "" ? (
                <Text style={{ color: "red", opacity: 1, marginBottom: 0 }}>
                  *
                </Text>
              ) : null}
              <TextInput
                placeholder="ZIP/Postal Code"
                underlineColorAndroid="transparent"
                onChangeText={text => {
                  console.log(
                    "++--",
                    this.state.Country,
                    this.state.city,
                    this.state.apt,
                    this.state.street,
                    this.state.zipcode
                  );
                  this.setState({ zipcode: text });
                }}
                value={this.state.zipcode}
                style={styles.textinput}
                onFocus={() => this.setState({ focus: "zip" })}
              />
            </View>
            <KeyboardSpace />
          </ScrollView>
        </View>

        <View>
          <CountryPicker
            animationType={"slide"}
            transparent={true}
            styles={{
              modalContainer: {
                marginTop: 0,
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0"
              },
              header: { marginTop: 7 },
              itemCountry: {
                marginLeft: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0"
              },
              itemCountryName: {
                borderBottomWidth: 1,
                borderBottomColor: "#fff"
              },
              itemCountryFlag: {
                alignItems: "flex-start"
              },
              letterText: {
                color: "red"
              },
              letters: {
                marginRight: 0
              }
            }}
            //  closeable={true}
            ref={ref => (this.picker = ref)}
            onClose={() => {
              this.setState({
                height: WindowHeight
              });
            }}
            // onOpen={()=>{this.setState({Country:''})}}
            onChange={value => {
              console.log(value);
              this.setState({
                callingCode: value.callingCode,
                Country: value.name,
                height: WindowHeight,
                clear: true,
                inputPosition: 72,
                selected: true
              });
            }}
            closeable={true}
            cca2={this.state.cca2}
            translation="eng"
          >
            <Text style={styles.pickerHead}>Popular Places</Text>
          </CountryPicker>
        </View>
        <Button
          onPress={() => this.next()}
          disabled={
            this.state.Country.length > 0 &&
            this.state.city.length > 0 &&
            this.state.zipcode.length > 0 &&
            this.state.street.length > 0 ? (
              false
            ) : (
              true
            )
          }
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.state.Country.length > 0 &&
                this.state.city.length > 0 &&
                this.state.zipcode.length > 0 &&
                this.state.street.length > 0
                  ? "#FF4273"
                  : "#F0F0F0"
            }
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  this.state.Country.length > 0 &&
                  this.state.city !== "" &&
                  this.state.zipcode !== "" &&
                  this.state.street.length > 0
                    ? "#fff"
                    : "#CCCCCC"
              }
            ]}
          >
            Save
          </Text>
        </Button>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.streetModal}
        >
          <View>
            <View style={[styles.header]}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => this.setState({ streetModal: false })}
              >
                <Image
                  style={styles.backImage}
                  source={require("@images/DrawerScreen/left.png")}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Street Address</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Street address. P.O. box, etc"
                underlineColorAndroid="transparent"
                onChangeText={text => this.searchLocation(text)}
                value={this.state.search}
                style={styles.textinput}
              />
            </View>
            {this.state.dataSource.length > 0 ? (
              this.state.dataSource
                .filter(d => {
                  let c = this.state.Country;
                  if (c === "United States") c = "USA";
                  return d.description.indexOf(c) > -1;
                })
                .map((data, index) => {
                  console.log("++--Terms", data.terms[1]);
                  let city = data.description.split(",")[1];
                  if (data.terms[1] === undefined) return;
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          streetModal: false,
                          street: data.structured_formatting.main_text,
                          city: city
                        })}
                    >
                      <View style={styles.locationPreview}>
                        <Image
                          source={require("@images/pin.png")}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.locationName}>
                          {data.structured_formatting.main_text}, {city}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}
