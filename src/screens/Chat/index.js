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
  ActivityIndicator
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
import styles from "./styles";
import firebase from "react-native-firebase";
import { GiftedChat } from "react-native-gifted-chat";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import { HeaderComponent } from "@components/InviteFriends/HeaderComponent.js";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
export default class Chat extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      index: 0,
      fashion: [],
      text: "",
      adminId: "",
      fullname: "",
      myavatar: null,
      adminname: ""
    };
  }
  componentDidMount() {
    // this.setState({loading: true})
    let uid = firebase.auth().currentUser.uid;
    let self = this;
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", snapshot => {
        let fullname = snapshot.child("fullname").val();
        let avatar = snapshot.child("avatarurl").val();
        if (!fullname) fullname = "";
        self.setState({ fullname, myavatar: avatar });
      })
      .bind(this);
    firebase
      .database()
      .ref("Messages/" + uid)
      .on("value", snapshot => {
        let data = [];
        snapshot.forEach(child => {
          data.push(child.val());
        });
        console.log("++--result", data);
        self.setState({ data: data, loading: false });
      });
    firebase
      .database()
      .ref("Admin")
      .on("value", snapshot => {
        let id = snapshot.child("id").val();
        let adminname = snapshot.child("fullname").val();
        self.setState({ adminId: id, adminname });
      })
      .bind(this);
    firebase
      .database()
      .ref("users/" + uid)
      .update({
        badge: 0
      });
  }

  gotoHome() {
    this.props.navigator.push({
      screen: "Submit2",
      animationType: "slide-horizontal",
      passProps: { url: this.state.text }
    });
  }

  send = (messages = []) => {
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Messages/" + uid)
      .push({
        time: new Date(),
        text: messages[0].text,
        to: this.state.adminId,
        show: false,
        image: ""
      })
      .then(() => {
        firebase
          .database()
          .ref("users/" + uid + "/adminbadge")
          .transaction(badge => {
            if (badge === null) return 1;
            else return badge + 1;
          });
      });
  };
  renderAction = () => {
    return (
      <TouchableOpacity onPress={() => this.addImage()}>
        <Image
          source={require("@images/Assets/Blue_Plus.png")}
          style={{ width: 25, height: 27, marginLeft: 10, marginBottom: 10 }}
        />
      </TouchableOpacity>
    );
  };

  uploadImage = (uri, mime = "application/octet-stream") => {
    return new Promise((resolve, reject) => {
      let uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      // const uid=firebase.auth().currentUser.uid

      let sessionId = new Date().getTime();
      let uploadBlob = null;
      let imageRef = firebase
        .storage()
        .ref("images")
        .child(`${sessionId}`);

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(uploadUri, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  addImage = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      this.uploadImage(response.uri)
        .then(url => {
          let uid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("Messages/" + uid)
            .push({
              time: new Date(),
              text: "",
              image: url,
              to: this.state.adminId,
              show: false
            });
        })
        .catch(error => console.log(error));
    });
  };

  render() {
    // console.log('++--DATA',this.state.loading)
    // if(this.state.loading===true){
    //     console.log('++--DATA333',this.state.loading)
    //     return(
    //         <View style={{flex:1,width:WindowWidth, height: WindowHeight,justifyContent:"center",alignItems:'center'}}>
    //             <ActivityIndicator size='large' color='#ffb100' />
    //         </View>
    //     )
    // }
    // console.log('++--DATA22222',this.state.loading)
    let uid = firebase.auth().currentUser.uid;
    let messages = [];
    let { data } = this.state;
    let row = {};
    if (data.length > 0) {
      for (let i = data.length - 1; i > -1; i--) {
        if (data[i].text !== "") {
          row = {
            _id: i,
            text: data[i].text,
            createdAt: data[i].time,
            user: {
              _id: uid !== data[i].to ? 1 : 2,
              name:
                uid !== data[i].to ? this.state.fullname : this.state.adminname,
              avatar:
                uid !== data[i].to
                  ? this.state.myavatar
                  : "https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/config%2Fdownload.jpg?alt=media&token=b760dd19-5328-4d17-9926-b0cb91f3e374"
            }
          };
        } else {
          row = {
            _id: i,
            image: data[i].image,
            createdAt: data[i].time,
            user: {
              _id: uid !== data[i].to ? 1 : 2,
              name:
                uid !== data[i].to ? this.state.fullname : this.state.adminname,
              avatar:
                uid !== data[i].to
                  ? this.state.myavatar
                  : "https://firebasestorage.googleapis.com/v0/b/lolos-v1.appspot.com/o/config%2Fdownload.jpg?alt=media&token=b760dd19-5328-4d17-9926-b0cb91f3e374"
            }
          };
        }

        messages.push(row);
      }
    }
    return this.state.loading ? (
      <View
        style={{
          width: WindowWidth,
          height: WindowHeight,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color="#ffb100" />
      </View>
    ) : (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <HeaderComponent
          title="CHAT WITH US"
          navigator={this.props.navigator}
        />
        <GiftedChat
          messages={messages}
          onSend={this.send}
          renderActions={this.renderAction}
          user={{
            _id: 1
          }}
          showAvatarForEveryMessage={true}
          textInputProps={{
            // borderColor: "#bdbdbc",
            // borderWidth: 1,
            // borderRadius: 92,
            paddingLeft: 10,
            marginRight: 10,
            lineHeight: 25
          }}
          minInputToolbarHeight={60}
        />
      </View>
    );
  }
}
