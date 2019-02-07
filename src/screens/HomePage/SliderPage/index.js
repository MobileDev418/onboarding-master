import React, { PureComponent } from "react";
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
  CardItem
} from "native-base";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
  Platform,
  Text,
  Alert,
  StyleSheet,
  PixelRatio
} from "react-native";
import Swiper from "react-native-deck-swiper";
import Sound from "react-native-sound";
var WindowWidth = Dimensions.get("window").width;
var WindowHeight = Dimensions.get("window").height;
import styles from "./style";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
import { CachedImage, ImageCacheManager } from "react-native-cached-image";
import axios from "axios";
import firebase from "react-native-firebase";
import RNFetchBlob from "react-native-fetch-blob";
import index from "react-native-swipeable";
import Lottie from "lottie-react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import TextButton from "./components/text_button";
import withButton from "../../../hoc/withButton";
import withDetails from "../../../hoc/withDetails";
import withAnimation from "../../../hoc/withAnimation";
import withProductSubmissionAnimation from "../../../hoc/withProductSubmissionAnimation";
import withImage from "../../../hoc/withImage";
import CARD_TYPES from "../../../constants/card_types";
import CARD_SUB_TYPES from "../../../constants/card_sub_types";
import I18n from "../../../locales/config";

const iphone5s = 568;

const { fs } = RNFetchBlob;

const baseCacheDir = fs.dirs.CacheDir + "/videocache.mp4";

const activeDownloads = {};

const CardButtonWithButton = withButton(TextButton);
const CardButtonWithButtonWithCardDetails = withDetails(CardButtonWithButton);
const CardButtonWithButtonWithDetailsWithImage = withImage(
  CardButtonWithButtonWithCardDetails
);
const CardButtonWithButtonWithDetailsWithAnimation = withAnimation(
  CardButtonWithButtonWithCardDetails
);
const CardButtonWithButtonWithDetailsWithProductSubmissionAnimation = withProductSubmissionAnimation(
  CardButtonWithButtonWithCardDetails
);

export default class SliderPage extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      played: false,
      data: [],
      badge: 0,
      loading: false,
      splash: false,
      country: "",
      city: "",
      apt: "",
      zipcode: "",
      street: "",
      cardIndex: 0,
      hiddenCard: [],
      hiddenCard1: [],
      purchase: this.props.purchase,
      invite: this.props.invite,
      walletHidden: false,
      marketHidden: false,
      rewarded: this.props.reward,
      reload: this.props.reload,
      got_target: false,
      request: this.props.request,
      lifetime: this.props.lifetime,
      post: this.props.post,
      invite_button: true,
      photo: this.props.photo,
      raffle: this.props.raffle,
      playwin: true,
      sorry: this.props.sorry,
      product_cards: []
    };

    this._swipedLeft = this._swipedLeft.bind(this);
    this._swipedRight = this._swipedRight.bind(this);
  }

  downloadVideo(fromUrl, toFile) {
    RNFetchBlob.config({ path: toFile })
      .fetch("GET", fromUrl)
      .then(res => {
        console.log("hehe", res);
        if (Math.floor(res.respInfo.status / 100) !== 2) {
          throw new Error("Failed to successfully download video");
        }
        // alert(res)
      })
      .catch(err => {
        // alert(err)
      });
  }
  componentWillReceiveProps(next) {
    this.setState({ rewarded: false });
  }
  componentWillMount() {
    this.setState({ loading: true, splash: true });
    let uid = firebase.auth().currentUser.uid,
      badge = 0;

    let self = this;
    setTimeout(function() {
      self.setState({ splash: false });
    }, 5000);

    firebase
      .database()
      .ref("cards")
      .on("value", snapshot => {
        let data = [];
        snapshot.forEach(child => {
          data.push(child.val());
        });
        data = data
          .sort(function(a, b) {
            if (a.Order === null || b.Order === null) return false;
            if (a.Order > b.Order) return 1;
            if (a.Order < b.Order) return -1;
            return 0;
          })
          .filter((d, i) => {
            ImageCacheManager().downloadAndCacheUrl(d.image);
            d.index = i;
            return true;
          });
        this.setState({ data: data });
      })
      .bind(this);
    firebase
      .database()
      .ref("users/" + uid)
      .on(
        "value",
        function(snapshot) {
          badge = snapshot.child("badge").val();
          if (badge === undefined || badge === null) badge = 0;
          let country = snapshot.child("country").val();
          let city = snapshot.child("city").val();
          let street = snapshot.child("street").val();
          let apt = snapshot.child("apt").val();
          let zipcode = snapshot.child("zipcode").val();
          let hiddenCard = snapshot.child("hiddenCard").val();
          let hiddenCard1 = snapshot.child("hiddenCard1").val();
          let walletHidden = snapshot.child("walletHidden").val();
          let marketHidden = snapshot.child("marketHidden").val();
          let got_target = snapshot.child("got_target").val();
          if (country === null) country = "";
          if (city === null) city = "";
          if (street === null) street = "";
          if (apt === null) apt = "";
          if (zipcode === null) zipcode = "";
          if (hiddenCard === null) hiddenCard = [];
          if (hiddenCard1 === null) hiddenCard1 = [];
          if (walletHidden === null) walletHidden = false;
          if (marketHidden === null) marketHidden = false;
          if (got_target === null) got_target = false;

          this.setState({
            badge,
            loading: false,
            country,
            city,
            apt,
            street,
            zipcode,
            hiddenCard,
            hiddenCard1,
            walletHidden,
            marketHidden,
            got_target
          });
        }.bind(this)
      );
    firebase
      .database()
      .ref("raffle_results/" + uid)
      .on("value", snap => {
        if (snap.child("product_index").val())
          this.setState({ playwin: false });
        else this.setState({ playwin: true });
      })
      .bind(this);
    firebase
      .database()
      .ref("users/" + uid + "/product_cards")
      .on("value", snap => {
        let data = [];
        snap.forEach(child => {
          data.push(child.val());
        });
        this.setState({ product_cards: data });
      })
      .bind(this);
  }
  showNotification(notif) {
    if (
      notif.notification.title === undefined ||
      notif.notification.body === undefined
    )
      return;
    let uid = firebase.auth().currentUser.uid;
    let key = new Date().getTime();
    let badge = 0;
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", function(snapshot) {
        badge = snapshot.child("badge").val();
        if (badge === null) badge = 0;
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            badge: badge + 1
          });
      });
    let updates = {};
    updates[key] = {
      title: notif.notification.title,
      body: notif.notification.body,
      time: key
    };
    firebase
      .database()
      .ref("notifications/" + uid)
      .update(updates);
  }

  async componentDidMount() {
    // ImageCacheManager().clearCache();
    let uid = firebase.auth().currentUser.uid;
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      firebase
        .database()
        .ref("users/" + uid + "/token")
        .transaction(tt => {
          return token;
        });

      firebase
        .database()
        .ref("Dynamic_Variable")
        .on("value", snap => {
          limitinvite = snap.child("limit_invite").val();
          firebase
            .database()
            .ref("users")
            .on("value", s => {
              let i = 0;
              s.forEach(child => {
                if (!child.val().transaction_history) return;
                let obj = child.val().transaction_history;
                Object.keys(obj).forEach(c => {
                  if (obj[c].description === "Referral bonus") i++;
                });
              });
              if (limitinvite < i) this.setState({ invite_button: false });
              else this.setState({ invite_button: true });
            });
        })
        .bind(this);
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {});

    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      if (notif.opened_from_tray) {
        this.props.navigator.push({
          screen: `${notif.action}`,
          animationType: "slide-horizontal"
        });
      }
    });

    this.SoundLeft = await new Sound(
      "left_swipe.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log(error);
        }
      }
    );
    this.SoundRight = await new Sound(
      "right_swipe.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log(error);
        }
        this.SoundRight.setVolume(2);
      }
    );
  }
  _swipedLeft() {
    this.SoundLeft.play(onEnd => {
      this.setState({ played: true });
    });
  }

  _swipedRight() {
    this.SoundRight.play(onEnd => console.log("played"));
  }
  filter(i) {
    // console.log("++--I", i);
    let uid = firebase.auth().currentUser.uid;
    if (i === 0) {
      firebase
        .database()
        .ref("users/" + uid + "/hiddenCard1")
        .transaction(function(badge) {
          if (badge === null) return [0];
          else return;
        });
    }

    if (i === 0 && this.state.hiddenCard1.length > 0) {
      firebase
        .database()
        .ref("users/" + uid + "/hiddenCard")
        .transaction(function(badge) {
          if (badge === null) return [5];
          else return;
        });
    }
    // if (i === 0) {
    //   this.setState({ hiddenCard1: [0] });
    // }
    // if (i === 0 && this.state.hiddenCard1.length > 0) {
    //   this.setState({ hiddenCard: [5] });
    // }
    if (this.state.rewarded && i === 0) this.setState({ rewarded: false });
    if (this.state.invite && i === 0) this.setState({ invite: false });
    if (this.state.purchase && i === 0) this.setState({ purchase: false });
    if (this.state.request && i === 0) this.setState({ request: false });
    if (this.state.lifetime && i === 0) this.setState({ lifetime: false });
    if (this.state.post && i === 0) this.setState({ post: false });
    if (this.state.photo && i === 0) this.setState({ photo: false });
    if (this.state.raffle && i === 0) this.setState({ raffle: false });
    if (this.state.sorry && i === 0) this.setState({ sorry: false });
  }

  navigateTo = async card => {
    const { country, city, street, zipcode } = this.state;
    /**
     * IF there is a link to AppStore OR GooglePlay
     */
    const store = Platform.OS === "ios" ? card.appstore : card.googlestore;
    const isAppStore =
      card.appstore !== undefined &&
      card.appstore !== null &&
      card.appstore !== "";
    const isGooglePlay =
      card.googlestore !== undefined &&
      card.googlestore !== null &&
      card.googlestore !== "";
    if (isAppStore || isGooglePlay) {
      Linking.openURL(store);
      return;
    }

    if (card.LinkButtonText === "Make Yours Now!") {
      this.props._handleIndexChange(0);
      return;
    }

    if (card.typeOfCard === CARD_TYPES.PRODUCT) {
      let uid = firebase.auth().currentUser.uid;
      const product = await firebase
        .database()
        .ref("wishList/" + uid)
        .once("value");
      const url = product.child("url").val();
      const productImage = product.child("product_img").val();
      if (!url) {
        await this.navigateToCard(card);
        return;
      }
      if (card.product_img === productImage) {
        alert("You have already selected this product.");
        return;
      } else {
        await Alert.alert(
          "",
          "Are you sure you want to delete /replace your existing product request ?",
          [
            {
              text: "Cancel",
              onPress: () => {
                console.log("cancel");
                return;
              },
              style: "cancel"
            },
            {
              text: "OK",
              onPress: async product => {
                await firebase
                  .database()
                  .ref("wishList/" + uid)
                  .remove();
                await this.navigateToCard(card);
                return;
              }
            }
          ]
        );
      }
    }

    /**
     * Check there is a valid LinkButtonLink
     */
    if (!card.LinkButtonLink) {
      return;
    }

    switch (card.LinkButtonLink) {
      case "app.PreviewScreen":
        this.props._handleIndexChange(0);
        break;
      case "instagram":
        Linking.openURL("https://www.instagram.com/lolos.me");
        break;
      case "TasksManager":
        this.props._handleIndexChange(1);
        break;
      case "app.shippingAddress":
        const isAddressValid =
          country !== "" && city !== "" && street !== "" && zipcode !== "";
        const addressLink = isAddressValid
          ? "app.shippingAddressEdit"
          : "app.shippingAddressHome";
        this.props.navigator.push({
          screen: addressLink,
          animationType: "slide-horizontal"
        });
        break;
      default:
        this.props.navigator.push({
          screen: `${card.LinkButtonLink}`,
          animationType: "slide-horizontal"
        });
        break;
    }
  };

  navigateToCard = async card => {
    this.props.navigator.push({
      screen: "Submit2",
      animationType: "slide-horizontal",
      passProps: {
        link: card.url,
        store: card.store ? card.store : "admin",
        producImg: card.product_img,
        description: card.description ? card.description : "",
        price: card.price ? card.price : null,
        order: card.Order,
        title: card.title
      }
    });
  };

  calculateFillProgress = (balance, price) => {
    const iPrice = price ? parseInt(price) : 0;
    const iBalance = balance ? parseInt(balance) : 0;
    if (iPrice === 0) {
      return 0;
    } else if (iBalance >= iPrice) {
      return 100;
    }
    return iBalance / iPrice;
  };

  lolosToGo = (balance, price) => {
    const iPrice = price ? parseInt(price) : 0;
    const iBalance = balance ? parseInt(balance) : 0;
    if (iPrice === 0) {
      return I18n.t("Not_Available");
    } else if (iBalance >= iPrice) {
      return 0;
    }
    return iPrice - iBalance;
  };

  render() {
    const { country, city, apt, street, zipcode, reload } = this.state;
    if (this.state.data.length === 0 || this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            width: WindowWidth,
            height: WindowHeight,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#ffb100" />
        </View>
      );
    }
    let self = this;

    let data = [...this.state.data];

    // if (
    //   this.state.purchase ||
    //   this.state.invite ||
    //   this.state.rewarded ||
    //   this.state.request ||
    //   this.state.lifetime ||
    //   this.state.post ||
    //   this.state.photo ||
    //   this.state.raffle ||
    //   this.state.sorry
    // ) {
    //   data = this.state.data.filter(d => {
    //     if (this.state.request && d.index === 12) return;
    //     return true;
    //   });
    // } else {
    data = data.filter(d => {
      if (this.state.hiddenCard1.length > 0 && d.Order === 0) return;
      if (this.state.hiddenCard.length > 0 && d.Order === 1) return;
      if (this.state.walletHidden && d.Order === 2) return;
      //if (d.index === 3) return;
      if (
        country !== "" &&
        city !== "" &&
        apt !== "" &&
        street !== "" &&
        zipcode !== "" &&
        d.Order === 4
      )
        return;
      if (!this.state.rewarded && d.Order === 5) return;
      if (!this.state.purchase && d.Order === 6) return;
      if (!this.state.invite && d.Order === 7) return;
      if (d.card_hidden) return;
      if (this.state.got_target && d.Order === 9) return;
      if (!this.state.lifetime && d.Order === 10) return;
      if (!this.state.request && d.Order === 11) return;
      if (!this.state.post && d.Order === 12) return;
      if (!this.state.photo && d.Order === 14) return;
      if (!this.state.raffle && d.Order === 16) return;
      if (d.Order === 15) return;
      if (!this.state.sorry && d.Order === 17) return;
      if (this.state.product_cards.indexOf(d.Order) > -1) return;
      if (!d.typeOfCard) return;
      return true;
    });
    // console.log("++---hiddenCard", data);
    return (
      <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
        <Header style={styles.headerStyle}>
          <Left style={styles.headerLeftSide}>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.toggleDrawer({
                  side: "left",
                  animated: true,
                  to: "open"
                });
              }}
            >
              <Image source={require("@images/HomePage/MenuBlack.png")} />
            </Button>
          </Left>

          <Body style={styles.centerLogo}>
            <Image
              source={require("@images/HomePage/Logo.png")}
              style={{ width: (50 * 210) / 147, height: 50 }}
            />
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.push({
                  screen: "app.Wallet",
                  animationType: "slide-horizontal"
                });
              }}
            >
              {/* {this.state.badge !== 0 ? (
                <View style={[styles.badgeStyle]}>
                  <Text style={styles.badgeText}>{this.state.badge}</Text>
                </View>
              ) : null} */}
              <Image
                source={require("@images/HomePage/WalletColor.png")}
                style={{ width: 24, height: 24 }}
              />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            backgroundColor="#f0f0f0"
            infinite
            //keyExtractor={cardData => console.log("++----DATA", cardData)}
            onSwipedLeft={() => {
              this._swipedLeft();
            }}
            onSwipedRight={() => this._swipedRight()}
            onSwipedTop={() => {
              this._swipedLeft();
            }}
            onSwipedBottom={() => this._swipedRight()}
            onSwiped={i => this.filter(i)}
            cards={data}
            cardVerticalMargin={20}
            cardIndex={
              !this.state.purchase
                ? !this.props.invite
                  ? !this.props.reward
                    ? !this.props.request
                      ? !this.props.lifetime
                        ? !this.props.post
                          ? !this.props.photo
                            ? !this.props.raffle
                              ? !this.props.sorry
                                ? 0
                                : data.findIndex(d => d.Order === 17)
                              : data.findIndex(d => d.Order === 16)
                            : data.findIndex(d => d.Order === 14)
                          : data.findIndex(d => d.Order === 12)
                        : data.findIndex(d => d.Order === 10)
                      : data.findIndex(d => d.Order === 11)
                    : data.findIndex(d => d.Order === 5)
                  : data.findIndex(d => d.Order === 7)
                : data.findIndex(d => d.Order === 6)
            }
            renderCard={card => {
              // console.log("++---Card", card);
              if (!card) return;
              const exceedInvitations =
                !this.state.invite_button &&
                card.LinkButtonLink === "app.InviteFriendsHome";

              return (
                <View
                  style={[styles.videoBackground, { backgroundColor: "white" }]}
                >
                  {card.typeOfCard === CARD_TYPES.PROGRESS &&
                    card.subTypeOfCard ===
                      CARD_SUB_TYPES.PRODUCT_SUBMISSION && (
                      <CardButtonWithButtonWithDetailsWithProductSubmissionAnimation
                        cardDetailsContainer={cardStyles.cardDetailsContainer}
                        style={cardStyles.cardButton}
                        pSATitleStyle={cardStyles.pSATitleStyle}
                        pSASubTitleStyle={cardStyles.pSASubTitleStyle}
                        buttonTextStyle={cardStyles.cardButtonText}
                        titleStyle={cardStyles.cardTitle}
                        subTitleStyle={cardStyles.cardSubTitle}
                        titleSubTitleContainer={
                          cardStyles.titleSubTitleContainer
                        }
                        buttonTitle={card.LinkButtonText}
                        onPress={this.navigateTo.bind(this, card)}
                        title={card.title}
                        subTitle={card.subTitle}
                        fillProgress={this.calculateFillProgress(
                          parseInt(this.props.balance),
                          parseInt(this.props.productSubmissionPrice)
                        )}
                        lolosToGo={this.lolosToGo(
                          parseInt(this.props.balance),
                          parseInt(this.props.productSubmissionPrice)
                        )}
                        imageSource={{
                          uri:
                            this.props.productSubmissionImage ||
                            card.product_img
                        }}
                        imageStyle={{
                          width: WindowWidth / 3 - 30,
                          height: WindowWidth / 3 - 30,
                          borderRadius: 25
                        }}
                      />
                    )}
                  {card.typeOfCard === CARD_TYPES.SUCCESS_WITH_ACTION && (
                    <CardButtonWithButtonWithDetailsWithAnimation
                      cardDetailsContainer={cardStyles.cardDetailsContainer}
                      style={cardStyles.cardButton}
                      buttonTextStyle={cardStyles.cardButtonText}
                      titleStyle={cardStyles.cardTitle}
                      subTitleStyle={cardStyles.cardSubTitle}
                      titleSubTitleContainer={cardStyles.titleSubTitleContainer}
                      buttonTitle={card.LinkButtonText}
                      onPress={this.navigateTo.bind(this, card)}
                      title={card.title}
                      subTitle={card.subTitle}
                      animationSource={card.lottie}
                      animationStyle={{
                        width: WindowWidth - 40
                      }}
                    />
                  )}
                  {(card.typeOfCard === CARD_TYPES.INFORMATION ||
                    card.typeOfCard === CARD_TYPES.SUCCESS) && (
                    <CachedImage
                      source={{ uri: card.image }}
                      style={{
                        width: WindowWidth - 40,
                        flex: 1,
                        resizeMode: "cover",
                        borderRadius: 5
                      }}
                    />
                  )}
                  {(card.typeOfCard === CARD_TYPES.NAVIGATION ||
                    card.typeOfCard === CARD_TYPES.PRODUCT) && (
                    <CardButtonWithButtonWithDetailsWithImage
                      cardDetailsContainer={cardStyles.cardDetailsContainer}
                      style={cardStyles.cardButton}
                      buttonTextStyle={cardStyles.cardButtonText}
                      titleStyle={cardStyles.cardTitle}
                      subTitleStyle={cardStyles.cardSubTitle}
                      titleSubTitleContainer={cardStyles.titleSubTitleContainer}
                      buttonTitle={card.LinkButtonText}
                      onPress={this.navigateTo.bind(this, card)}
                      title={card.title}
                      subTitle={card.subTitle}
                      imageSource={{ uri: card.image }}
                      imageStyle={{
                        width: WindowWidth - 40,
                        height: (WindowHeight - 190) / 2,
                        flex: 1,
                        resizeMode: "contain"
                      }}
                    />
                  )}
                  {card.typeOfCard === CARD_TYPES.FULL_IMAGE && (
                    <CachedImage
                      source={{ uri: card.image }}
                      style={{
                        width: WindowWidth - 40,
                        flex: 1,
                        resizeMode: "cover",
                        borderRadius: 5,
                        paddingHorizontal: 30
                      }}
                    >
                      <CardButtonWithButton
                        style={[
                          cardStyles.cardButton,
                          {
                            bottom: 0,
                            position: "absolute",
                            width: WindowWidth - 100,
                            alignSelf: "center"
                          }
                        ]}
                        buttonTitle={card.LinkButtonText}
                        buttonTextStyle={cardStyles.cardButtonText}
                        onPress={this.navigateTo.bind(this, card)}
                      />
                    </CachedImage>
                  )}
                </View>
              );
            }}
            animateOverlayLabelsOpacity={false}
            animateCardOpacity={false}
            cardStyle={styles.videoBackground}
          />
        </View>
      </View>
    );
  }
}

const cardStyles = StyleSheet.create({
  cardButton: {
    height: 50,
    backgroundColor: "#FF4273",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  cardButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: "#FFFFFF"
  },
  cardTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 15,
    marginTop: 30,
    textAlign: "center",
    width: WindowWidth - 80,
    backgroundColor: "transparent"
  },
  cardSubTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "#6F6F6F",
    textAlign: "center",
    width: WindowWidth - 80
  },
  titleSubTitleContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  cardDetailsContainer: {
    marginHorizontal: 30
  },
  pSATitleStyle: {
    fontFamily: "Lato-Bold",
    fontSize: 26,
    color: "#FF4273"
  },
  pSASubTitleStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#6F6F6F",
    textAlign: "center"
  }
});
