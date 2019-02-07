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
import styles from "./style";
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
          <Text style={[styles.titleText, { marginTop: 40 }]}>
            Adding Product To WishList
          </Text>
          <Text style={[styles.desText, { marginTop: 25 }]}>
            You can share products with Lolos using the share icon on the store
            product page, or, you can browse stores inside Lolos and use our
            custom little Lolo button to add your product.
          </Text>
          <Image
            source={require("@images/wishlist/LoloButtonDescription.png")}
            style={{
              width: WindowWidth / 2,
              height: WindowWidth / 2,
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 46
            }}
          />
        </ScrollView>
        <TouchableOpacity
          style={[styles.button1, { bottom: 30 }]}
          onPress={() => this.next()}
        >
          <Text style={styles.buttonText1}>Got It!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
