import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Title,
  Card,
  Badge,
  CardItem,
  Item
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  Text
} from "react-native";
import {
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
  TabBar,
  SceneMap
} from "react-native-tab-view";
import Swiper from "react-native-deck-swiper";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import firebase from "react-native-firebase";
import moment from "moment";
import Video from "react-native-af-video-player";
import Image1 from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";

export default class PreviewScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "0", title: "In Review" },
        { key: "1", title: "For Sale" },
        { key: "2", title: "Purchased" }
      ],
      badge: 0,
      data: []
    };
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScane = this._renderScane.bind(this);
    this._renderItems = this._renderItems.bind(this);
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
      .ref("Shoutouts/" + uid)
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          let obj = {};
          obj.url = child.val().image;
          obj.name = child.val().name;
          obj.des = child.val().des;
          obj.id = child.key;
          obj.time = child.val().time;
          obj.action = child.val().action;
          obj.mediaType = child.val().mediaType;
          obj.brandname = child.val().brandname;
          obj.tags = child.val().tags;
          data.push(obj);
        });
        this.setState({ data: data });
      });
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        style={{
          backgroundColor: "rgba(254,116,112,1)",
          height: 50,
          justifyContent: "center"
        }}
        indicatorStyle={{ backgroundColor: "#fff", height: 5 }}
        labelStyle={{ opacity: 1 }}
        renderLabel={scene => (
          <Text
            style={{
              fontWeight: scene.index == this.state.index ? "900" : "normal",
              color: "#fff",
              fontFamily: "Lato-Regular"
            }}
          >
            {scene.route.title}
          </Text>
        )}
        tabStyle={{ width: 100 }}
      />
    );
  };

  _renderScane = ({ route }) => {
    console.log(route.key);
    let categoryKey = route.key;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.dataFilter(route.title)}
        //keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) =>
          this._renderItems({ item, index }, categoryKey)}
      />
    );
  };

  _handleIndexChange(index) {
    this.setState({
      index: index
    });
    console.log(index);
  }

  _renderItems = ({ item, index }, categoryKey) => {
    console.log(item);
    console.log("categoryKey" + categoryKey);
    return (
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 7
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: WindowWidth,
            paddingHorizontal: 25,
            paddingVertical: 25,
            marginBottom: 10
          }}
        >
          <Text
            style={{
              left: 25,
              position: "absolute",
              fontSize: 17,
              fontWeight: "bold",
              color: "#000"
            }}
          >
            {item.brandname}
          </Text>
          <Text style={{}}>{moment(item.time).format("YYYY-MM-DD")}</Text>
          {/* <TouchableOpacity onPress={() => this.deletItem(item.id)}>
            <Icon name="trash" style={{ color: "red", fontSize: 35 }} />
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            marginLeft: 35,
            zIndex: 10,
            borderRadius: 5
          }}
        >
          {item.action === "pending" ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                backgroundColor: "#ffce00",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 3
              }}
            >
              In Review
            </Text>
          ) : item.action === "store" ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#3393d1",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 3
              }}
            >
              For Sale
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#17b978",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 3
              }}
            >
              {item.action}
            </Text>
          )}
        </View>
        {item.mediaType === "photo" ? (
          <Image1
            source={{ uri: item.url }}
            style={{
              width: WindowWidth - 50,
              height: WindowWidth - 50,
              resizeMode: Image.resizeMode.cover,
              zIndex: 1,
              marginTop: -45,
              alignSelf: "center",
              borderRadius: 3
            }}
            indicator={ProgressBar}
          />
        ) : (
          <Video
            resizeMode="contain"
            url={item.url}
            style={{
              width: WindowWidth - 50,
              height: WindowWidth - 50,
              zIndex: 1,
              marginTop: -45,
              alignSelf: "center"
            }}
          />
        )}
        <View
          style={{
            //alignItems: "center",
            width: WindowWidth,
            paddingVertical: 20,
            backgroundColor: "white"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontWeight: "500",
              width: WindowWidth - 80,
              marginLeft: 25
            }}
          >
            {item.des}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 25
              //marginVertical: 10
            }}
          >
            {item.tags.map(t => {
              return (
                <Text
                  style={{
                    fontFamily: "Lato-Regular",
                    fontSize: 15,
                    marginTop: 5,
                    color: "#3f99d4",
                    marginRight: 10
                  }}
                >
                  {t}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    );
  };
  _renderPager = props => {
    return Platform.OS === "ios" ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    );
  };

  deletItem(id) {
    Alert.alert(
      "",
      "Are you sure you want to delete this photo from the Market?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            let uid = firebase.auth().currentUser.uid;
            firebase
              .database()
              .ref("Shoutouts/" + uid + "/" + id)
              .remove();
            this.props.navigator.pop();
            //   this.props.navigator.resetTo({
            //     screen: "app.HomePage",
            //     animationType: "slide-horizontal",
            //     passProps: { from: true }
            //   });
          }
        }
      ]
    );
  }

  dataFilter(title) {
    let { data } = this.state;
    if (title === "All") {
      return data;
    } else if (title === "In Review") {
      data = data.filter(d => {
        return d.action === "pending";
      });
      return data;
    } else if (title === "For Sale") {
      data = data.filter(d => {
        return d.action === "store";
      });
      return data;
    } else {
      data = data.filter(d => {
        return d.action !== "store" && d.action !== "pending";
      });
      return data;
    }

    return data;
  }

  render() {
    return (
      <View style={{ backgroundColor: "#F6F6F6", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{ position: "absolute", left: 27 }}
              onPress={() => {
                this.props.navigator.pop({
                  animationType: "slide-horizontal"
                });
              }}
            >
              <Image
                style={styles.leftButton}
                source={require("@images/DrawerScreen/left.png")}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>MY SHOUTOUTS</Text>
            <TouchableOpacity
              style={{ position: "absolute", right: 27 }}
              onPress={() => {
                this.props.navigator.push({
                  screen: "Chat",
                  animationType: "slide-horizontal"
                });
              }}
            >
              {this.state.badge !== 0 ? (
                <View style={[styles.badgeStyle]}>
                  <Text style={styles.badgeText}>{this.state.badge}</Text>
                </View>
              ) : null}
              <Image
                style={{ width: 25, height: 25, marginBottom: -14 }}
                source={require("@images/Chat_Icon.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TabViewAnimated
              navigationState={this.state}
              renderHeader={this._renderHeader}
              renderScene={this._renderScane}
              onIndexChange={this._handleIndexChange}
              renderPager={this._renderPager}
            />
          </View>
        </View>
      </View>
    );
  }
}
