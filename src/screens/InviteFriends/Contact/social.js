import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Clipboard,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Touchable from "react-native-platform-touchable";
import styles from "./style";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";
import firebase from "react-native-firebase";
import DropdownAlert from "react-native-dropdownalert";
import Share from "react-native-share";

var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
export default class Social extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor() {
    super();
    this.state = {
      link: "",
      loading: true,
      social: [
        {
          image: require("@images/InviteFriends/Share.png"),
          name: "Facebook",
          url: "https://facebook.com"
        }
      ]
    };
  }
  componentWillMount() {
    let self = this;
    let uid = firebase.auth().currentUser.uid;
    const link = new firebase.links.DynamicLink(
      "https://h54u6.app.goo.gl/lolos?invitedby=" + uid,
      "h54u6.app.goo.gl"
    ).ios // delete this line for production
      .setBundleId("com.clickers")
      .ios.setFallbackUrl(
        "https://itunes.apple.com/il/app/lolos/id1391950519?invitedby=" + uid
      ) // delete this line for production
      .ios.setAppStoreId("1391950519")
      .android.setPackageName("com.clickers")
      .android.setFallbackUrl(
        "https://play.google.com/store/apps/details?id=com.clickers&invitedby=" +
          uid
      );

    firebase
      .links()
      .createShortDynamicLink(link)
      .then(url => {
        self.setState({ link: url, loading: false });
      });
  }
  componentDidMount() {}

  next() {
    this.props.navigator.pop();
  }
  openApp(url) {
    Share.open({
      title: "Check out this new app",
      message: "Check out this new app",
      url: `${this.props.link}`,
      subject: `${this.props.link}`
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <HeaderComponent
          title="HOW IT WORKS"
          navigator={this.props.navigator}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <Image
            source={require("@images/InviteFriends/InviteHelpImage.png")}
            style={styles.image}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              textAlign: "center",
              width: WindowWidth - 70
            }}
          >
            Inviting friends is the easiest way to boost your wallet
          </Text>
          <Text style={[styles.subText, { width: WindowWidth - 60 }]}>
            Really, when one of your friends sign up for Lolos by your
            invitation link, you get rewarded with a "King".
          </Text>
          <Image
            source={require("@images/InviteFriends/MightyKingBig.png")}
            style={{
              width: WindowWidth / 4,
              height: ((WindowWidth / 4) * 474) / 300,
              marginHorizontal: 5,
              alignSelf: "center",
              marginVertical: 30
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              textAlign: "center",
              width: WindowWidth - 60
            }}
          >
            What is this "King"?
          </Text>
          <Text style={styles.subText}>
            The "Kings" are money multipliers. when you reach 10 kings, we will
            automatically double your next income.
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#3c98d3",
              alignSelf: "center",
              marginTop: 15
            }}
            onPress={() => {
              this.props.navigator.push({
                screen: "WalletHowWorks",
                animationType: "slide-horizontal",
                passProps: { from: true }
              });
            }}
          >
            Learn more about "Kings"
          </Text>
          <TouchableOpacity style={[styles.button]} onPress={() => this.next()}>
            <Text style={styles.buttonText}>Got It!</Text>
          </TouchableOpacity>
        </ScrollView>

        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          showCancel={false}
          renderImage={() => this.renderImage()}
          useNativeDriver={true}
          messageStyle={{
            fontSize: 18,
            textAlign: "center",
            color: "white",
            fontWeight: "bold"
          }}
          closeInterval={2000}
        />
      </View>
    );
  }

  renderImage() {
    return (
      <Image
        source={require("@images/Assets/em.png")}
        style={{ width: 1, height: 1 }}
      />
    );
  }
  sendNOtification() {
    //this.dropdown.alertWithType('warn','Link successfully copied to clipboard')
    alert();
  }
}
