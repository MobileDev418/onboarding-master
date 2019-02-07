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
export default class InviteFriends extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor() {
    super();
    this.state = {
      link: "",
      loading: true
    };
  }
  componentWillMount() {
    let self = this;
    let uid = firebase.auth().currentUser.uid;
    const link =
      // uncomment this line for production https://beta.itunes.apple.com/v1/app/1391950519
      // new firebase.links.DynamicLink('https://itunes.apple.com/il/app/lolos/id1391950519?invitedby=' + uid, 'h54u6.app.goo.gl')
      new firebase.links.DynamicLink(
        "https://h54u6.app.goo.gl/lolos?invitedby=" + uid,
        "h54u6.app.goo.gl"
      ).ios // delete this line for production
        .setBundleId("com.clickers")
        .ios.setFallbackUrl(
          "https://beta.itunes.apple.com/v1/app/1391950519?invitedby=" + uid
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

  next() {
    if (this.state.link === "") return;
    Clipboard.setString(this.state.link);
    Share.open({
      title: "Check out this new app ",
      message: "Check out this new app ",
      url: this.state.link,
      subject: this.state.link
    });
  }

  render() {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <HeaderComponent
          title="INVITE FRIENDS"
          navigator={this.props.navigator}
          rightnav="InviteHelp"
        />
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20
            }}
          >
            Share & Earn!
          </Text>
          <Text style={styles.subText}>
            The more you share, the more you earn! spread the word about Lolos
            using your unique invitation link and for every successful invite
            win 1 King
          </Text>
          <Image
            source={require("../../../images/Artboard.png")}
            style={styles.image}
          />
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
        {this.state.loading ? (
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
        ) : null}
        <View style={styles.linkView}>
          <Text numberOfLines={1} style={styles.link}>
            {this.state.link}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { flexDirection: "row", position: "absolute", bottom: 30 }
          ]}
          onPress={() => this.next()}
        >
          <Image
            source={require("@images/InviteFriends/ShareIcon.png")}
            style={{ width: 22, height: (22 * 84) / 81, marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Share Link</Text>
        </TouchableOpacity>
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
