import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal
} from "react-native";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "../style";
import firebase from "react-native-firebase";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

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
          image: require("@images/Influance/1.png"),
          title: "Become a brand influencer",
          width: (WindowWidth * 2) / 3
        },
        {
          image: require("@images/Influance/3.png"),
          title: "The brands you love!",
          width: WindowWidth / 3
        },
        {
          image: require("@images/Influance/4.png"),
          title: `Be creative to get attention!`,
          width: (WindowWidth * 2) / 5
        },
        {
          image: require("@images/Influance/5.png"),
          title: "What's in it for you?",
          width: (WindowWidth * 3) / 5
        }
      ],
      index: 0,
      fashion: [],
      text: "",
      badge: 0,
      index: 0,
      modalVisible: false
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
  }

  next() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderComponent
          title="HOW IT WORKS"
          navigator={this.props.navigator}
        />
        <ScrollView>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 30 }}
          >
            {this.state.data.map(d => {
              return (
                <Image
                  source={d.image}
                  style={{ width: d.width, height: WindowWidth / 2 }}
                />
              );
            })}
          </View>
          <Text style={styles.desText}>You Create, You Post,</Text>
          <Text style={styles.titleText}>You Get Paid</Text>
          <Image
            source={require("@images/Influance/Hearts.png")}
            style={{
              width: WindowWidth / 5,
              height: ((WindowWidth / 5) * 126) / 210,
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 46
            }}
          />
          <Text style={[styles.titleText, { marginBottom: 9 }]}>
            Seriously, how does it works?
          </Text>
          <Text style={styles.desText}>
            Select the campaign you relate to submit a creative photo or video
            wait for the brand's approval Post it in your social media account
            get paid to your digital wallet.
          </Text>
          <View
            style={{
              width: 60,
              height: 4,
              backgroundColor: "#ff4273",
              alignSelf: "center",
              borderRadius: 2,
              marginVertical: 30
            }}
          />
          <Text style={[styles.titleText, { marginBottom: 9 }]}>
            What is a Shoutout anyway?
          </Text>
          <Text style={styles.desText}>
            Shoutout is a creative and original Instagram post that celebrates a
            brand, a product of a lifestyle.
          </Text>
          <View
            style={{
              width: 60,
              height: 4,
              backgroundColor: "#ff4273",
              alignSelf: "center",
              borderRadius: 2,
              marginVertical: 30
            }}
          />
          <Text style={[styles.titleText, { marginBottom: 9 }]}>
            How do I get paid?
          </Text>
          <Text style={styles.desText}>
            If your Shoutout selected, you will get paid according to your
            follower's number only after 5 days that your post was published on
            your Instagram account.
          </Text>
          <Text
            style={[styles.desText, { color: "#3393d1", marginTop: 16 }]}
            onPress={() => this.setState({ modalVisible: true })}
          >
            Pricing Table
          </Text>
          <View
            style={{
              width: 60,
              height: 4,
              backgroundColor: "#ff4273",
              alignSelf: "center",
              borderRadius: 2,
              marginVertical: 30
            }}
          />
          <Text style={[styles.titleText, { marginBottom: 9 }]}>
            What if i have only a few followers?
          </Text>
          <Text style={styles.desText}>
            We can hlep you with that too, if your Shoutouts are super tasty,
            the brand might{" "}
            <Text style={{ fontWeight: "600" }}>
              re-posted them in their 5 Million followers Instagram account with
              your name on it
            </Text>
            , this exposer can make a social media{" "}
            <Text style={{ fontWeight: "600" }}>rockstar.</Text>
          </Text>
          <View
            style={{
              width: WindowWidth,
              paddingTop: 25,
              paddingBottom: 32,
              backgroundColor: "#ff4273",
              marginTop: 24
            }}
          >
            <Text
              style={[styles.titleText, { marginBottom: 9, color: "white" }]}
            >
              But wait... there is more
            </Text>
            <Text style={[styles.desText, { color: "white" }]}>
              Your creative Shoutout can sometimes be useful for brands not only
              in their Instagram account, for example, but your awesome photo
              can also be a great fit to their new printed catalog, for this,
              you will get a special quote with the brand suggestion to purchase
              your Shoutout.
            </Text>
          </View>
          <Text style={[styles.desText, { marginTop: 13, marginBottom: 20 }]}>
            Let's start influencing, together...
          </Text>
          <TouchableOpacity
            style={[
              styles.button1,
              { position: "relative", marginBottom: 30, marginTop: 0 }
            ]}
            onPress={() => this.next()}
          >
            <Text style={styles.buttonText1}>Got It!</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType={"fade"}
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: WindowWidth - 60,
                height: WindowHeight - 60,
                backgroundColor: "white",
                borderRadius: 5
                //paddingTop: WindowWidth / 7,
                //alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  zIndex: 100
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image
                  source={require("@images/Influance/X.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
              <ScrollView contcontentContainerStyle={{ paddingTop: 50 }}>
                <Text
                  style={[
                    styles.titleText,
                    { marginBottom: 16, marginTop: 50 }
                  ]}
                >
                  Pricing Table
                </Text>
                <Text style={[styles.desText, { width: WindowWidth - 120 }]}>
                  The pricing for your Shoutouts is based on your Instagram
                  followers number.
                </Text>
                <Image
                  source={require("@images/Influance/Currency.png")}
                  style={{
                    width: 180,
                    height: (180 * 243) / 540,
                    marginTop: 35,
                    marginBottom: 30,
                    alignSelf: "center"
                  }}
                />
                <Text style={[styles.desText, { width: WindowWidth - 110 }]}>
                  Remember, what your gonna get paid for the post itself could
                  quickly become just the start... the brand might offer to
                  purchase your content rights, and that's a whole new game!
                </Text>
                <Image
                  source={require("@images/Influance/GoodLuck.png")}
                  style={{
                    width: 94,
                    height: (94 * 285) / 294,
                    marginTop: 35,
                    alignSelf: "center",
                    marginBottom: 30
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
