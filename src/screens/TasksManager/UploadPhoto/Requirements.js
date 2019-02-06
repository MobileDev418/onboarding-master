import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Body,
  Right,
  Left,
  Title,
  Card,
  Badge,
  CardItem,
  Input
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Linking
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import Swipe from "react-native-swiper";
import { CachedImage } from "react-native-cached-image";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import moment from "moment";

export default class TasksManage extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [
        {
          image: require("@images/Influance/2.png"),
          title: "The brands you love!",
          des:
            "We work with almost all big brands and they just waiting to see how you step up their game in the social media paltforms."
        },
        {
          image: require("@images/Influance/3.png"),
          title: "Be creative to get attention!",
          des:
            "Our partners looking for the most creative content, it can be a great photo or even a short video, just make it look awesome..."
        },
        {
          image: require("@images/Influance/4.png"),
          title: `What's in it for you?`,
          des:
            "You get a chance to play a role in big brands social media campaigns and boosting your wallet with Lolos!"
        },
        {
          image: require("@images/Influance/5.png"),
          title: "How deos it works?",
          des:
            "Our partners have access to all your creations, once they found something they like, you get paid, they easy!"
        }
      ],
      index: 0,
      fashion: [],
      text: "",
      badge: 0,
      index: 0,
      campaign: {},
      brand: {}
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", snapshot => {
        badge = snapshot.child("badge").val();
        if (!badge) badge = 0;
        this.setState({ badge });
      })
      .bind(this);
    firebase
      .database()
      .ref("Brands/" + this.props.data.brandKey)
      .on("value", snapshot => {
        this.setState({ brand: snapshot.val() });
      });
    firebase
      .database()
      .ref(
        "Brands_Campaigns/" +
          this.props.data.brandKey +
          "/" +
          this.props.data.campaignKey
      )
      .on("value", snapshot => {
        this.setState({ campaign: snapshot.val(), loading: false });
      });
  }

  Imagetip() {
    this.props.navigator.push({
      screen: "Phototip",
      animationType: "slide-horizontal",
      passProps: {
        tags: this.state.campaign.campaign_default_tags,
        brandname: this.state.campaign.campaign_name,
        brandID: this.props.data.brandKey,
        campaignID: this.props.data.campaignKey
      }
    });
  }

  Videotip() {
    this.props.navigator.push({
      screen: "Videotip",
      animationType: "slide-horizontal",
      passProps: {
        tags: this.state.campaign.campaign_default_tags,
        brandname: this.state.campaign.campaign_name,
        brandID: this.props.data.brandKey,
        campaignID: this.props.data.campaignKey
      }
    });
  }
  link() {
    Linking.canOpenURL(this.state.brand.brand_url)
      .then(supported => {
        if (!supported) {
          alert("Can't handle url: " + this.state.brand.brand_url);
        } else {
          return Linking.openURL(this.state.brand.brand_url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  render() {
    if (this.state.loading)
      return (
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
      );
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="REQUIREMENTS"
          navigator={this.props.navigator}
          rightnav="BrandGuaid"
        />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
            <CachedImage
              source={{ uri: this.props.data.image }}
              style={{
                width: WindowWidth,
                height: (499 * WindowWidth) / 960,
                resizeMode: Image.resizeMode.cover
              }}
            />
            <View
              style={{
                width: 90,
                height: 60,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -60,
                marginLeft: 30
              }}
            >
              <CachedImage
                source={{ uri: this.state.campaign.brandLogo }}
                style={{ width: 90, height: 50 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  marginTop: 30,
                  marginLeft: 30,
                  marginBottom: 15
                }}
              >
                About
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 30,
                  color: "gray",
                  width: WindowWidth - 60
                }}
              >
                {this.state.campaign.about_brand_product}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  marginTop: 30,
                  marginLeft: 30,
                  marginBottom: 15
                }}
              >
                What we are looking for?
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 30,
                  color: "gray",
                  width: WindowWidth - 60
                }}
              >
                {this.state.campaign.what_are_we_looking_for}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  marginTop: 30,
                  marginLeft: 30,
                  marginBottom: 15
                }}
              >
                Special instructions
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 30,
                  color: "gray",
                  width: WindowWidth - 60
                }}
              >
                {this.state.campaign.special_instructions}
              </Text>
            </View>

            {[1, 2, 3, 4, 5].map(b => {
              if (
                this.state.campaign[`extra_title_${b}`] === "" ||
                !this.state.campaign[`extra_title_${b}`]
              )
                return;
              return (
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "bold",
                      marginTop: 30,
                      marginLeft: 30,
                      marginBottom: 15
                    }}
                  >
                    {this.state.campaign[`extra_title_${b}`]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 30,
                      color: "gray",
                      width: WindowWidth - 60
                    }}
                  >
                    {this.state.campaign[`extra_paragraph_${b}`]}
                  </Text>
                </View>
              );
            })}

            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  marginTop: 30,
                  marginLeft: 30,
                  marginBottom: 15
                }}
              >
                Check out our website
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 30,
                  color: "#3393d1",
                  width: WindowWidth - 60
                }}
                onPress={() => this.link()}
              >
                {this.state.campaign.company_site}
              </Text>
            </View>
            <View
              style={{
                width: WindowWidth - 60,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 30,
                marginTop: 24,
                borderWidth: 2,
                borderColor: "#ff4273",
                paddingLeft: 20,
                borderRadius: 3
              }}
            >
              <Image
                source={require("@images/Assets/calendar1.png")}
                style={{ width: 25, height: (25 * 66) / 60, marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 13, fontFamily: "Lato", color: "#ff4273" }}
              >
                this campaign will end at{" "}
                {moment(this.state.campaign.campaign_end_date).format(
                  "DD.MM.YYYY"
                )}
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              paddingHorizontal: 30,
              height: 80,
              width: WindowWidth,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 2,
              borderTopColor: "#f0f0f0",
              marginTop: 15,
              position: "absolute",
              bottom: 0,
              backgroundColor: "white"
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => this.Imagetip()}
            >
              <Image
                source={require("@images/Influance/CameraIcon.png")}
                style={{ width: 20, height: (20 * 60) / 72 }}
              />
              <Text style={{ color: "#ff4273", marginLeft: 8 }}>ADD IMAGE</Text>
            </TouchableOpacity>
            <View
              style={{ width: 2, height: 50, backgroundColor: "#f0f0f0" }}
            />
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => this.Videotip()}
            >
              <Image
                source={require("@images/Influance/VideoIcon.png")}
                style={{ width: 20, height: (20 * 48) / 72 }}
              />
              <Text style={{ color: "#ff4273", marginLeft: 8 }}>ADD VIDEO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
