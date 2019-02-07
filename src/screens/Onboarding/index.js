import React, { Component } from "react";
import {
  View,
  Animated,
  Easing,
  PanResponder,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView
} from "react-native";
import styles from "./style";
import Swiper from "react-native-swiper";
import { Button, Text } from "native-base";
import firebase from "react-native-firebase";
import _ from "lodash";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
export default class Onboarging extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor() {
    super();
    this.state = {
      index: 0,
      activeImage: "",
      text: "",
      title: "",
      walletImage: "",
      privacyModal: false,
      termsModal: false
    };
  }

  componentWillMount() {
    //   let text='',title='',activeImage='',walletImage='';
    //   firebase.database().ref('config').on('value',function(snapshot){
    //     activeImage=snapshot.child('activeImage').val();
    //     text=snapshot.child('text').val();
    //     title=snapshot.child('title').val();
    //     walletImage=snapshot.child('walletImage').val();
    //    this.setState({
    //     activeImage,text,title,walletImage
    //    })
    // }.bind(this));
  }

  slide1() {
    if (this.state.index == 0) {
      (this.imageinitialPosition = new Animated.ValueXY({ x: 200, y: 0 })),
        Animated.spring(this.imageinitialPosition, {
          toValue: { x: 0, y: 0 },
          bounciness: 5,
          speed: 1
        }).start();
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("@images/HomePage/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.shoppingText}>
            {"Get them, spend them".toUpperCase()}
          </Text>

          <Animated.Text
            style={[
              styles.featureText,
              this.imageinitialPosition.getLayout(),
              { marginTop: (windowHeight - 100) / 4, marginBottom: 15 }
            ]}
          >
            Become a Social Media
          </Animated.Text>
          <Animated.Image
            style={[styles.homeLogo, this.imageinitialPosition.getLayout()]}
            source={require("@images/Assets/RockStar.png")}
          />
          {/* <View style={styles.animatedImageView}>
            <Animated.Image
              style={[styles.arrowImage, this.imageinitialPosition.getLayout()]}
              source={require("@images/Onboarding/ArrowImage.png")}
            />
          </View> */}

          <Image
            style={[styles.footerImage]}
            source={require("@images/Onboarding/footer.png")}
          />
        </View>
      );
    }
  }
  slide2() {
    if (this.state.index == 1) {
      (this.imageinitialPosition = new Animated.ValueXY({ x: 200, y: 0 })),
        Animated.spring(this.imageinitialPosition, {
          toValue: { x: 0, y: 0 },
          bounciness: 5,
          speed: 1
        }).start();
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("@images/HomePage/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.shoppingText}>
            {"Get them, spend them".toUpperCase()}
          </Text>

          <Animated.Text
            style={[
              styles.featureText,
              this.imageinitialPosition.getLayout(),
              { marginTop: (windowHeight - 100) / 4, marginBottom: 15 }
            ]}
          >
            Earn Lolos & Spend Them
            {"\n"}
            On Anything You Like
          </Animated.Text>

          <Image
            style={[
              {
                resizeMode: "contain",
                width: windowWidth,
                height: (windowWidth * 720) / 1125,
                bottom: 0,
                position: "absolute"
              }
            ]}
            source={require("@images/Assets/Boxes.png")}
          />
        </View>
      );
    }
  }

  slide12() {
    if (this.state.index == 1) {
      (this.imageinitialPosition = new Animated.ValueXY({ x: 200, y: 0 })),
        Animated.spring(this.imageinitialPosition, {
          toValue: { x: 0, y: 0 },
          bounciness: 5,
          speed: 1
        }).start();

      return (
        <View style={{ flex: 1 }}>
          <Animated.Image
            style={[styles.homeLogo, this.imageinitialPosition.getLayout()]}
            source={require("@images/Onboarding/ActiveTabs.png")}
          />
          <Animated.Text
            style={[styles.loloText, this.imageinitialPosition.getLayout()]}
          >
            Manage Them
          </Animated.Text>
          <Animated.Text
            style={[styles.featureText, this.imageinitialPosition.getLayout()]}
          >
            in your own private wallet
          </Animated.Text>
          <View style={styles.animatedWalletView}>
            <Animated.Image
              source={require("@images/Onboarding/WalletMoney.png")}
              style={[
                styles.wallet,
                this.imageinitialPosition.getLayout(),
                { marginTop: 55 }
              ]}
            />
          </View>
        </View>
      );
    }
  }
  slide3() {
    if (this.state.index == 2) {
      (this.imageinitialPosition = new Animated.ValueXY({ x: 200, y: 0 })),
        Animated.spring(this.imageinitialPosition, {
          toValue: { x: 0, y: 0 },
          bounciness: 5,
          speed: 1
        }).start();
      return (
        <View style={{ flex: 1 }}>
          <Animated.Image
            style={[styles.homeLogo, this.imageinitialPosition.getLayout()]}
            source={require("@images/Gift.png")}
          />
          <Animated.Text
            style={[styles.loloText, this.imageinitialPosition.getLayout()]}
          >
            Spend Them
          </Animated.Text>
          <Animated.Text
            style={[styles.featureText, this.imageinitialPosition.getLayout()]}
          >
            on anything you want!
          </Animated.Text>
          <View style={styles.animatedSmileyView}>
            <Animated.Image
              source={require("@images/Onboarding/em_8.png")}
              style={[styles.smiley, this.imageinitialPosition.getLayout()]}
            />
          </View>
        </View>
      );
    }
  }

  slide4() {
    if (this.state.index == 2) {
      (this.imageinitialPosition = new Animated.ValueXY({ x: 200, y: 0 })),
        Animated.spring(this.imageinitialPosition, {
          toValue: { x: 0, y: 0 },
          bounciness: 5,
          speed: 1
        }).start();
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("@images/HomePage/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.shoppingText}>
            {"Get them, spend them".toUpperCase()}
          </Text>
          <Animated.Text
            style={[
              styles.featureText,
              this.imageinitialPosition.getLayout(),
              { marginTop: (windowHeight - 100) / 4, marginBottom: 15 }
            ]}
          >
            what are you waiting for?
            {"\n"}
            START NOW
          </Animated.Text>
          <Image
            style={[
              {
                resizeMode: "contain",
                height: 70,
                width: 70,
                alignSelf: "center"
              }
            ]}
            source={require("@images/Assets/em.png")}
          />

          <TouchableOpacity onPress={this.next} style={styles.buttonView}>
            <Animated.View
              style={[
                this.imageinitialPosition.getLayout(),
                styles.animatedButtonView
              ]}
            >
              <Animated.Text style={[styles.buttonText]}>Sign Up</Animated.Text>
            </Animated.View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Lato",
              color: "#3393d1",
              lineHeight: 20,
              alignSelf: "center",
              position: "absolute",
              bottom: 30
            }}
            onPress={() =>
              this.props.navigator.push({
                screen: "Login",
                animationType: "slide-horizontal"
              })
            }
          >
            I already have an account
          </Text>

          {/* */}
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.privacyModal}
          >
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.setState({ privacyModal: false })}
                  style={{ position: "absolute", right: 18 }}
                >
                  <Image
                    source={require("@images/component/cancel.png")}
                    style={{ width: 15, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.privacyTitle}>Privacy Policy</Text>
                <Text style={styles.privacyText}>
                  <Text style={{ fontWeight: "bold" }}>
                    Effective Date: May 25, 2018
                  </Text>
                  {"\n"}
                  {"\n"}
                  This Privacy Policy is incorporated by this reference into the
                  End User Terms and conditions That is available on our app .
                  The terms “Company,” “we,” and “us” include Lolos, an exempted
                  company duly incorporated with limited liability and validly
                  existing under the Laws of the state of Israel Lolos , and its
                  affiliates and/or subsidiaries. All other terms not defined in
                  this Privacy Policy will have the meanings set forth in the
                  terms and conditions. This Privacy Policy explains how the
                  {"\n"}
                  Company may:
                  {"\n"}- collect
                  {"\n"}- use, and
                  {"\n"}- disclose
                  {"\n"}
                  information we obtain through the Service. As used in this
                  Privacy Policy, “Personal Information” means information that
                  alone or when in combination with other information may be
                  used to readily identify, contact, or locate you, such as your
                  name, address, email address, or phone number. We do not
                  consider Personal Information to include information that has
                  been aggregated and/or de- identified so that it does not
                  allow a third party to easily identify a specific individual.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "bold" }}>
                    THE SERVICE COLLECTS YOUR INFORMATION
                  </Text>
                  {"\n"}
                  {"\n"}
                  We collect information, including Personal Information, when
                  you:
                  {"\n"}• register to use the Service;
                  {"\n"}• log in with social networking credentials;
                  {"\n"}• submit information to us when you use the Service;
                  {"\n"}• and communicate with us.
                  {"\n"}
                  We also collect information, such as anonymous usage
                  statistics, by using cookies, server logs, and other similar
                  technology as you use the Service. Personal Information
                  Collection. You may browse the public-facing portions of the
                  Service without registering an Account with the Company. If
                  you register an Account with us to use the Service, then you
                  must provide us with certain Personal Information, such as
                  your phone number, or you may be able to register using your
                  User credentials to certain social media sites, such as
                  Twitter or Facebook.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Social Sign-On
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may collect Personal Information from a social media
                  website when you use your social media credentials to log into
                  the Service. For example, when you log in with your Twitter or
                  Facebook credentials, we may collect the Personal Information
                  you have made publicly available on those websites, such as
                  your User name and profile picture. We may also obtain other
                  non-public information with your permission. Using the Service
                  We collect information that you Post to the Service. For
                  example, when you Post comments, a short biography, UGVs or
                  Broadcast Content on the Service, we will collect the
                  information you include in these submissions, including any
                  Personal Information. Messages. We collect and process
                  information you provide, including any Personal Information,
                  in the context of composing, sending, or receiving messages
                  through our Service’s messaging functionality, and we may
                  collect information about your use of our messaging
                  functionality. Please be aware that messages sent to other
                  Users of our Service will be accessible by those other Users
                  and that we are not responsible for the manner in which those
                  Users use or disclose messages. Location Information. We
                  collect information about your location if you grant us
                  permission to do so. If you change your mind and do not want
                  us to collect your location information, then you can choose
                  to hide your location through the settings available with the
                  Apps.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Customer Support
                  </Text>
                  {"\n"}
                  {"\n"}
                  We collect all information that you provide to us, including
                  any Personal Information, when you contact us for
                  customer-support purposes.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Cookies, Automatic Data Collection, and Related Technologies{" "}
                  </Text>
                  {"\n"}
                  {"\n"}
                  The Service collects and stores information that is generated
                  automatically as you use it, including your preferences and
                  anonymous usage statistics. When you visit the Service, we and
                  our third-party service providers receive and record
                  information on our server logs from your browser, including
                  your IP address, and from cookies and similar technology.
                  Cookies are small text files containing a string of
                  alphanumeric characters. We may use both session cookies and
                  persistent cookies. A session cookie disappears after you
                  close your browser. A persistent cookie remains after you
                  close your browser and may be used by your browser on
                  subsequent visits to the Service. Please review your web
                  browser “Help” file to learn the proper way to modify your
                  cookie settings. Please note that if you delete, or choose not
                  to accept, cookies from the Service, you may not be able to
                  utilize the features of the Service to their fullest
                  potential. We may use third party cookies on our Service as
                  well. For instance, we may use Google Analytics to collect and
                  process certain analytics data. Google provides some
                  additional privacy options described at
                  {"\n"}{" "}
                  <Text
                    style={{
                      color: "#66cfff",
                      textDecorationLine: "underline",
                      textDecorationColor: "#66cfff"
                    }}
                  >
                    www.google.com/policies/privacy/partners/
                  </Text>{" "}
                  regarding Google Analytics cookies. By using the Service, you
                  are authorizing us to gather, parse, and retain data related
                  to the provision of the Service.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    HOW THE COMPANY USES YOUR INFORMATION
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text
                    style={{
                      color: "#ff009d",
                      fontWeight: "300",
                      fontSize: 13
                    }}
                  >
                    We use Personal Information to:
                  </Text>
                  {"\n"}
                  -facilitate and improve our Service;
                  {"\n"}
                  -and communicate with you.
                  {"\n"}
                  We may use de-identified and aggregated information for any
                  lawful purpose, including for marketing purposes.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Internal and Service-Related Usage
                  </Text>
                  {"\n"}
                  {"\n"}
                  We use information, including Personal Information, for
                  internal and Service-related purposes and may provide it to
                  third parties to allow us to provide and improve the Service.
                  For example, we may scan any sound recordings in the local
                  library on your mobile device to identify such content, and we
                  may use that information to restrict certain uses of the
                  content, to pay copyright owners of such content, or to
                  develop or provide other functionalities on the Service.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Communications
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may send email to the email address you provide to us (a)
                  for customer service related purposes, (b) to provide you with
                  updates or information relating to the Service, including
                  promotions and other opportunities, or (c) for enforcement of
                  the EULA or this Privacy Policy.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Aggregate Data
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may de-identify and aggregate information collected through
                  the Service and use it for any lawful purpose.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    THE COMPANY MAY DISCLOSE YOUR INFORMATION
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may share your information:
                  {"\n"}
                  -with our third-party service providers;
                  {"\n"}
                  -to comply with legal obligations;
                  {"\n"}
                  -to protect and defend our rights and property and the rights,
                  property and safety of our Users;
                  {"\n"}
                  -and with your permission.
                  {"\n"}
                  We do not rent, sell, or share Personal Information about you
                  with other people or nonaffiliated companies for their direct
                  marketing purposes, unless we have your permission. We Use
                  Vendors and Service Providers We may share any information we
                  receive with vendors and service providers retained in
                  connection with the provision of the Service.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Social Networking and Other Websites
                  </Text>
                  {"\n"}
                  {"\n"}
                  The Service may allow you to share information, including
                  Personal Information, with social networking websites, such as
                  Twitter, Facebook and Instagram. We do not share your Personal
                  Information with these social networking sites unless you
                  direct the Service to share your Personal Information. The use
                  of your Personal Information by any social networking websites
                  will be governed by their privacy policies, and you may be
                  able to modify your privacy settings on their websites.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    User Content and Information
                  </Text>
                  {"\n"}
                  {"\n"}
                  User Content you Post to the Service, such as UGVs, comments,
                  Broadcast Content and your short biography, will be displayed
                  on the Service and viewable by other users. In addition, your
                  profile information, such as any photograph of you and your
                  User name, will also be searchable and accessible by other
                  Users. We are not responsible for the privacy practices of the
                  other Users who will view and use this information, so you
                  should carefully consider whether to Post any User Content on
                  the Service or how you identify yourself on the Service. You
                  should not disclose your home address or the address of your
                  place of business, school or other locations you frequent on a
                  regular basis in any User Content. Marketing. We do not rent,
                  sell, or share Personal Information about you with other
                  people or nonaffiliated companies for their direct marketing
                  purposes, unless we have your permission. The Service may
                  allow you to opt-in to receive communications from third
                  parties, including the record labels who own the rights to any
                  sound recordings you use on the Service. If you give us your
                  permission to share your Personal Information with such third
                  parties, then you may receive communications from such third
                  parties and you are solely responsible for your engagement
                  with such third parties.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Location Information
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may share your approximate location, but not your exact
                  location, with other Users. As Required By Law and Similar
                  Disclosures. We may access, preserve, and disclose your
                  Personal Information or other account information if we
                  believe doing so is required or appropriate to (a) comply with
                  law enforcement requests and legal process, such as a court
                  order or subpoena; (b) respond to your requests; or (c)
                  protect your, our or others’ rights, property, or safety. For
                  the avoidance of doubt, disclosure of Personal Information may
                  occur if you Post any Objectionable Content on or through the
                  Service.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    {" "}
                    Merger, Sale, or Other Asset Transfers
                  </Text>
                  {"\n"}
                  {"\n"}
                  If we are involved in a merger, acquisition, financing due
                  diligence, reorganization, bankruptcy or liquidation where the
                  business will not continue as a going concern, receivership,
                  sale of the Company’s assets, or transition of the Service to
                  another provider, your information may be sold or transferred
                  as part of such a transaction as permitted by law and/or
                  contract. The use of your Personal Information following any
                  of these events will be governed by the provisions of this
                  Privacy Policy in effect at the time the applicable Personal
                  Information was collected.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    {" "}
                    Consent
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may also disclose your Personal Information with your
                  permission.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    {" "}
                    SECURITY OF YOUR INFORMATION
                  </Text>
                  {"\n"}
                  {"\n"}
                  We take steps to ensure that your information is treated
                  securely and in accordance with this Privacy Policy.
                  Unfortunately, the Internet cannot be guaranteed to be 100%
                  secure, and we cannot ensure or warrant the security of any
                  information you provide to us. We do not accept liability for
                  unintentional access, use or disclosure.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    {" "}
                    CHILDREN’S PRIVACY
                  </Text>
                  {"\n"}
                  {"\n"}
                  We do not knowingly collect information from children under 13
                  and we do not want it. We will take steps to delete it if we
                  learn we have collected it. We do not knowingly collect,
                  maintain, or use Personal Information from children under 13
                  years of age, and no part of the Service is directed to
                  children under the age of 13. If you learn that your child has
                  provided us with Personal Information without your consent,
                  then you may alert us at
                  {"\n"}
                  <Text
                    style={{
                      color: "#66cfff",
                      textDecorationLine: "underline",
                      textDecorationColor: "#66cfff"
                    }}
                  >
                    Getyourlolos@gmail.com.
                  </Text>{" "}
                  {"\n"}
                  If we learn that we have collected any Personal Information
                  from children under 13, then we will promptly take steps to
                  delete such information and terminate the child’s account.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    INTERNATIONAL USERS
                  </Text>
                  {"\n"}
                  {"\n"}
                  By using the Service, you will transfer data to the Israel. By
                  choosing to visit the Service or otherwise provide information
                  to us, you agree that any dispute over privacy or the terms
                  contained in this Privacy Policy will be governed by the laws
                  of the State of Israel and the adjudication of any disputes
                  arising in connection with the Company or the Service will be
                  in accordance with the terms and conditions that are available
                  in our app. If you are visiting the Service from the European
                  Union or the USA or other regions with laws governing data
                  collection and use, then please note that you are agreeing to
                  the transfer of your information to Israel and processing
                  globally. By providing your information to the Service, you
                  consent to any transfer and processing in accordance with this
                  Privacy Policy.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    UPDATE YOUR INFORMATION OR POSE A QUESTION OR SUGGESTION
                  </Text>
                  {"\n"}
                  {"\n"}
                  If you would like to update or correct any information that
                  you have provided to us through your use of the Service or
                  otherwise, or if you have suggestions for improving this
                  Privacy Policy, then please send an e-mail to
                  {"\n"}
                  <Text
                    style={{
                      color: "#66cfff",
                      textDecorationLine: "underline",
                      textDecorationColor: "#66cfff"
                    }}
                  >
                    Getyourlolos@gmail.com
                  </Text>{" "}
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    CHANGES TO OUR PRIVACY POLICY AND PRACTICES
                  </Text>
                  {"\n"}
                  {"\n"}
                  We may revise this Privacy Policy, so please review it
                  periodically. Posting of Revised Privacy Policy. We will post
                  any adjustments to the Privacy Policy on this web page, and
                  the revised version will be effective when it is posted. If
                  you are concerned about how your information is used, then
                  bookmark this page and read this Privacy Policy periodically.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    New Uses of Personal Information
                  </Text>
                  {"\n"}
                  {"\n"}
                  From time to time, we may desire to use Personal Information
                  for uses not previously disclosed in our Privacy Policy. If
                  our practices change regarding previously collected Personal
                  Information in a way that would be materially less restrictive
                  than stated in the version of this Privacy Policy in effect at
                  the time we collected the information, then we will make
                  reasonable efforts to provide notice and obtain consent to any
                  such uses as may be required by law.
                  {"\n"}
                  {"\n"}
                  <Text style={{ color: "#ff009d", fontWeight: "600" }}>
                    Contact Information
                  </Text>
                  {"\n"}
                  {"\n"}
                  Lolos Halamish 14, Caesarea Israel
                  {"\n"}
                  <Text
                    style={{
                      color: "#66cfff",
                      textDecorationLine: "underline",
                      textDecorationColor: "#66cfff"
                    }}
                  >
                    LolosPrivacy@gmail.com
                  </Text>{" "}
                  {"\n"}
                </Text>
              </ScrollView>
            </View>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.termsModal}
          >
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.setState({ termsModal: false })}
                  style={{ position: "absolute", right: 18 }}
                >
                  <Image
                    source={require("@images/component/cancel.png")}
                    style={{ width: 15, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                  style={{
                    color: "#ff009d",
                    fontWeight: "600",
                    marginLeft: 10,
                    marginVertical: 20
                  }}
                >
                  signing up to Lolos you are agreeing to our Terms and
                  Conditions.
                </Text>

                <Text
                  style={{
                    color: "#ff009d",
                    fontWeight: "600",
                    marginLeft: 10,
                    marginVertical: 10
                  }}
                >
                  Terms and Conditions
                </Text>

                <Text style={styles.privacyText}>
                  1. Contractual Relationship
                  {"\n"}
                  1.1 These Conditions of use (“Conditions”) govern the access
                  or use by you, an individual, and applications, websites,
                  content, products and services (“Services”) made available by{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>
                  {"\n"}
                  1.2 Please read these Conditions very carefully before
                  accessing or using the Services.
                  {"\n"}
                  1.3 Your access or use of the Services constitutes your
                  agreement to be bound by these Conditions, which establishes a
                  contractual relationship between you and{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  {"\n"}
                  1.4 The access or use of the Services by any child under your
                  parental responsibility constitutes your agreement to be bound
                  by these Conditions, which establishes a contractual
                  relationship between you and{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>
                  .{"\n"}
                  1.4 IF YOU DO NOT AGREE TO THESE TERMS, YOU OR ANY CHILD UNDER
                  YOUR PARENTAL RESPONSIBILITY MAY NOT ACCESS OR USE THE
                  SERVICES.
                  {"\n"}
                  {"\n"}
                  2. Definitions
                  {"\n"}
                  {"\n"}
                  2.1 In these Conditions, the following terms will be
                  understood as follows: “Conditions” means these Conditions of
                  use (as may be amended from time to time); “Services” means
                  the applications, websites, content, products and services
                  made available by{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  ; “<Text style={{ color: "#ff009d" }}>Lolos</Text>” means{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  ; “You” means any individual using the Services; “Users” means
                  those using the Services collectively; “Membership Account”
                  means a basic account opened and maintained pursuant to these
                  Conditions; “Intellectual Property Rights” means all
                  intellectual property rights wherever in the world arising,
                  whether registered or unregistered (and including any
                  application), including (without limitation) copyright,
                  confidential information, patents, patentable rights, rights
                  in know-how, database rights, trademarks, service marks,
                  logos, URLs, domain names and design rights; “Personal Data”
                  means any personal information provided by you via the
                  Services including (without limitation) the personal
                  information described in{" "}
                  <Text style={{ color: "#ff009d" }}>Lolos</Text> ’s Privacy
                  Policy; “Submission” means any material from time to time
                  submitted by you via the Services including (without
                  limitation) any postings, messages, emails or other
                  communications, and any other text, information, data,
                  [photograph, image, audio or visual material] in whatever
                  medium or form.
                  {"\n"}
                  {"\n"}
                  3. Information about Us
                  {"\n"}
                  {"\n"}
                  3.1 The Services are owned and operated by and on behalf of{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>
                  .{"\n"}
                  3.2{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  is an Israeli company registered in Israel {"\n"}
                  3.3 PLEASE NOTE{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  OPERATE THE SERVICES AND MEMBERSHIP ACCOUNTS TO HELP TEANAGRS
                  & FAMILIES EARN & MANAGE POCKET MONEY. IT IS NOT A BANK AND
                  DOES NOT UNDERTAKE ANY ACTIVITIES WHICH ARE REGULATED BY THE
                  FINANCIAL SERVICES AUTHORITY. WITHOUT LIMITING THE FOREGOING,
                  IT DOES NOT HOLD ANY MONETARY DEPOSITS OR OPERATE OR MANAGE
                  ANY FORM OF SAVINGS ACCOUNTS. 3.4 If you want to ask anything
                  about these Conditions or have any comments or complaints
                  about the Services, please email
                  <Text style={{ color: "#ff009d" }}>
                    GetyourLolos @gmail.com
                  </Text>{" "}
                  or write to <Text style={{ color: "#ff009d" }}>Lolos</Text>{" "}
                  office address:
                  <Text style={{ color: "#ff009d" }}>
                    Lolos
                    {"\n"}
                    Halamish 14, Caesarea
                    {"\n"}
                    Israel
                  </Text>{" "}
                  {"\n"}
                  {"\n"}
                  4. Changes to the Services and to these Conditions
                  {"\n"}
                  {"\n"}
                  4.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  reserve the right at any time to: (i) modify or withdraw the
                  Services (or any part of them) without notice to you and will
                  not be liable to you for any such modification or withdrawal;
                  and/or (ii) change these Conditions from time to time and your
                  continued use of the Services (or any part of them) following
                  such change will be deemed to be your acceptance of such
                  change.
                  {"\n"}
                  {"\n"}
                  5. Use of the Services and your Membership Account
                  {"\n"}
                  {"\n"}
                  5.1 General use of the Services
                  {"\n"}
                  5.1.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  provide a pocket money earning & management facility in the
                  Services, which helps teenagers earn manage spend pocket money
                  in a safe environment.
                  {"\n"}
                  5.1.2 The{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  Services are only intended for use by people resident in the
                  United State of America. You must comply with all applicable
                  laws and regulations in the country which you are resident.
                  Lolos will not be liable for any breach by you of any such
                  laws.
                  {"\n"}
                  5.1.3 By opening a Membership Account on the Services, you
                  warrant that: (i) you are legally capable of entering into
                  binding contracts (ii) you are at least 13 years old (iii) any
                  personal information which you are required to provide when
                  you apply for a Membership Account via the Services
                  (including, without limitation, your age or the age of any
                  child under your parental responsibility) is true, accurate,
                  current and complete in all respects.
                  {"\n"}
                  5.2 Opening a Membership Account
                  {"\n"}
                  5.2.1 You will have to provide your mobile phone number when
                  you submit an application for a Membership Account, which
                  Lolos will use in order to verify your identity if you wish to
                  access your Membership Account on future visits to the
                  Services. Lolos will use and store these details, along with
                  any other Personal Data you may supply from time to time in
                  accordance with its Privacy Policy.
                  {"\n"}
                  5.2.2 You must restrict access to your phone to prevent
                  unauthorized access to your account.{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  may rely on any use of the Services from your phone as being
                  authorized by you.
                  {"\n"}
                  5.2.3 Please inform{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  immediately if you have any reason to believe that your
                  account details have become known to anyone else or if they
                  are being, or are likely to be, used in an unauthorized
                  manner.
                  {"\n"}
                  5.3 Using your basic Membership Account
                  {"\n"}
                  5.3.1 If your membership registration has been accepted,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  will confirm this to you on-screen, at which point your
                  Membership Account will be activated. From this time, and
                  unless and until your Membership Account is terminated, you
                  will be entitled, subject to any restrictions contained in
                  these Conditions (including without limitation the Members
                  Conduct Rules) (see Condition 5.4) to upload and/or post any
                  Submission to or on the Services.
                  {"\n"}
                  5.3.2 Please ensure that you read the Members Conduct Rules as
                  it is a condition of your membership that you comply with such
                  rules at all times.
                  {"\n"}
                  5.4 Members Conduct Rules
                  {"\n"}
                  5.4.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  are committed to ensuring that the Services remains fun and
                  safe for Users. The Services rely on members making or
                  uploading Submissions. By accessing and using the Services,
                  you warrant that you will only use the Services for lawful
                  purposes, and will not upload or submit to or on the Services
                  any Submission which is a Prohibited Submission.
                  {"\n"}
                  5.4.2 You acknowledge and agree that notwithstanding that{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  have the right (but not the obligation) to examine any
                  Submission which you submit or upload to or on the Services,
                  each such Submission is your sole responsibility and that by
                  using the Services you may be exposed to content which you
                  consider to be offensive or harmful. 5.4.3 Subject to the
                  Condition 9,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  will not be liable to you for any loss or damage which you may
                  suffer or incur as a direct or indirect result of any such
                  exposure. You also acknowledge and agree that this means that
                  you are responsible for the Submissions which you submit or
                  upload to or on the Services.
                  {"\n"}
                  {"\n"} 5.4.4 For the purpose of this Condition 5.4, a
                  “Prohibited Submission” includes (without limitation) the
                  following types of Submission:
                  {"\n"} (i) Submissions which infringe any third party’s
                  Intellectual Property Rights, other proprietary rights or
                  rights of privacy wherever in the world arising. Without
                  limiting the foregoing, you must not include in any Submission
                  any Personal Data relating to yourself or any third party;
                  {"\n"} (ii) Submissions which violate any law, statute,
                  ordinance or regulation anywhere in the world;
                  {"\n"} (iii) Submissions which are defamatory, trade libelous,
                  unlawfully threatening or unlawfully harassing, or which are
                  otherwise objectionable or inappropriate having regard to the
                  average User; or
                  {"\n"} (iiii) Submissions which contain viruses, worms,
                  corrupt files, Trojan horses or other forms of corruptive code
                  or any other material which may compromise the Services.
                  {"\n"} 5.4.5{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  have the sole discretion to determine whether any Submission
                  is a Prohibited Submission. You acknowledge and agree that
                  although Lolos do not and will not examine or review any
                  Submission submitted or uploaded to or on the Services, it has
                  the absolute right (but not the obligation) to examine any
                  Submission and delete move, edit and/or disable access to any
                  Submission (and/or any materials derived in whole or in part
                  from such Submission) for any reason, at any time and without
                  notice to you [(including, without limitation, in the event of
                  a Notice of Infringement and/or Notice of Unlawful Activity
                  regarding such Submission or derivative materials).]
                  {"\n"} 5.4.6{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  may also, at its sole discretion at any time and without
                  notice to you:
                  {"\n"} (i) Contact any law enforcement agency or court of
                  competent jurisdiction regarding any Submission which{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  believe may constitute a Prohibited Submission and supply
                  copies of such Submission to them and give them access to any
                  Personal Data which is held relating to you, who submitted
                  such a Submission; and/or
                  {"\n"} (ii){" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  refer any matter to a law enforcement agency or court of
                  competent jurisdiction where in its reasonable opinion, it
                  considers that any matter arising from your use of the
                  Services is of a criminal or illegal nature.
                  {"\n"}
                  {"\n"} 5.5 Termination of your Membership Account
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  5.5.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  reserve the right to terminate your Membership Account without
                  notice to you for any reason, and without limiting the
                  generality of the foregoing, if:
                  {"\n"}
                  (i) You register for membership using a personal information
                  which is untrue, inaccurate or incomplete; or
                  {"\n"} (ii) Your Membership Account is inactive for a
                  consecutive period of 365 days or more; or
                  {"\n"} (iii) You breach any of these Conditions or any other
                  policies or guidelines set forth from time to time elsewhere
                  on the Services (including, without limitation, the Members
                  Conduct Rules (see Condition 5.4); or
                  {"\n"} (iiii) You engage in any conduct which{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  believe, in its sole discretion, to be harmful to its business
                  or to other Users; or
                  {"\n"} (v) Any Submission which you make or upload on or to
                  the Services is the subject of any Notice of Infringement or
                  Notice of Unlawful Activity; or
                  {"\n"} (vi) If{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  decide to sell its business or assets to a third party.
                  {"\n"} 5.5.2{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  take your privacy extremely seriously. If you wish your data
                  to be deleted when your account is closed please notify
                  customer services.
                  {"\n"} 5.5.3 If your Membership Account is terminated for any
                  reason,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  reserve the right without notice to you to de-activate any
                  hyperlink through which it may from time to time have given
                  you access to your Membership Account and to permanently
                  remove and discard any Submission you have made.
                  {"\n"}
                  {"\n"}
                  6. Your Personal Information
                  {"\n"}
                  {"\n"}
                  {"\n"} 6.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  are committed to protecting your privacy. Our privacy policy
                  sets out how Lolos will use your Personal Data. When you
                  submit your Personal Data, you are giving your consent to the
                  collection, use and disclosure of your Personal Data as set
                  forth in Lolos ’s Privacy Policy.
                  {"\n"}
                  {"\n"}
                  7. Ownership of Intellectual Property Rights
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  7.1 The Services contains material, including without
                  limitation, text, photographs and other images, which is
                  protected by copyright and/or other intellectual property
                  rights. All intellectual property rights in the Services are
                  owned by Lolos [or its third party licensors.] Without
                  limiting the foregoing, Lolos own all rights, title and
                  interest (including all Intellectual Property Rights) in and
                  to any materials comprising any Submission or any derivative
                  work based on any Submission.
                  {"\n"}
                  7.2 Without limiting the generality of Condition 7.1, the
                  Services also contain trademarks, including (without
                  limitation) the Lolos Logo. All trademarks included on the
                  Services belong to Lolos [▪or its third party licensors.]
                  {"\n"}
                  {"\n"} 7.3 You may:
                  {"\n"} (i) Download, temporarily store and print hard copies
                  of any of the pages of the Services for personal use, or for
                  internal, non-commercial use within your organization; and/or
                  {"\n"} (ii) Distribute copies (in printed or electronic form)
                  to third parties for their personal use or for their internal,
                  non-commercial use within their organization, provided that
                  Lolos are acknowledged as the source and copyright owner and
                  that their attention is drawn to these terms and conditions.
                  {"\n"} 7.4 You may not:
                  {"\n"} (i) Save as set out in Condition 7.3, systematically
                  extract and/or copy or use any of the contents of the
                  Services, and without limiting the foregoing, use any data
                  mining, robots or similar data gathering and extraction tools
                  to extract (whether on one or more occasions) for use any
                  substantial parts of the Services; and/or
                  {"\n"} (ii) In any way alter or adapt the text of the material
                  on the Services or of any material copied or printed off or
                  distributed from the Services (including without limitation
                  any trademarks or logos included on any such material); and/or
                  {"\n"} (iii) Remove any copyright, trademark or other
                  intellectual property notices contained in the original
                  material from any material copied, printed off or distributed
                  from the Services; and/or
                  {"\n"} (iiii) Create and/or publish any database which
                  features any substantial part of the Services
                </Text>
                <Text style={styles.privacyText}>
                  {"\n"} 8.1.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  have taken every care in the preparation of the content of the
                  Services, in particular to ensure that as far as reasonably
                  possible all information provided is correct at the time of
                  inclusion. However, Lolos cannot guarantee the accuracy of
                  such information or that it will be up to date at all times.
                  {"\n"} 8.1.2 The Services are provided on an “as is” and “as
                  available” basis without any representation or endorsement
                  made. Save as expressly set out in these Conditions,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  make no warranties of any kind, whether express or implied, in
                  relation to the Services including (without limitation)
                  implied warranties of non-infringement, compatibility,
                  security, accuracy, or conditions of completeness. Save as
                  expressly set out in these Conditions, Lolos also make no
                  warranty that the Services will meet your requirements or will
                  be uninterrupted, timely or error-free, or that defects will
                  be corrected. Whilst steps have been taken to ensure that the
                  Services is free from viruses, Lolos make no warranty in this
                  regard and you are responsible for ensuring that you have
                  appropriate virus checking software. Lolos do not accept any
                  responsibility for and, to the fullest extent permitted by
                  law, exclude any liability for, any loss or damage whatsoever
                  arising out of or related to any use of, inability to use, or
                  reliance on, the Services or any information provided on or
                  from them.
                  {"\n"} 8.2{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  liability to you
                  {"\n"}
                  {"\n"} 8.2.1 The provisions of this Condition 8.3 set out{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  entire financial liability to you in respect of any breach of
                  these Conditions and any representation, statement or tortious
                  act or omission including negligence, arising under or in
                  connection with any contract entered into with you pursuant to
                  these Conditions or otherwise relating to these Conditions.
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>
                  {"\n"} 8.2.3 Subject to Condition 8.4,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  will not be liable to you for any losses whether direct or
                  indirect) of income or revenue, business, profits, contracts,
                  anticipated savings, or for any incidental, indirect, special
                  consequential loss or damage (whether direct or indirect)
                  which arises out of or in connection with any contract entered
                  into with you pursuant to these Conditions or otherwise
                  relating to these Conditions.
                  {"\n"} 8.2.4 The limitation on our liability set out in this
                  Condition 8.3 does not exclude or limit in any way our
                  liability:
                  {"\n"} (i) For death or personal injury caused by{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  negligence;
                  {"\n"} (ii) For fraud or fraudulent misrepresentation; or
                  {"\n"} (iii) For any matter for which it would be illegal for{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  to exclude or attempt to exclude our liability.
                  {"\n"}
                  {"\n"}
                  9. Third Party Links
                  {"\n"}
                  {"\n"}
                  {"\n"} 9.1 Electronic links to the Services from any other
                  Services are prohibited without our prior written consent.
                  Requests should be addressed to GetyourLolos@gmail.com.
                  {"\n"} 9. 2 The Services may provide links to third party
                  services or may reference third party services and/or external
                  resources for you to access at your own discretion. Please
                  note that access to the content of any third party websites or
                  resources may be subject to terms and conditions imposed by
                  the owner of that content which you should review before
                  interacting via such websites or providing such third parties
                  with information about yourself. Lolos do not endorse or
                  accept any responsibility for the content of any third party
                  websites and/or external resources.
                  {"\n"}
                  {"\n"}
                  {"\n"} 10. Transfer of Rights and Obligations
                  {"\n"}
                  {"\n"}
                  {"\n"} 10.1 The contract between you and{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  is binding on both parties’ respective successors and assigns.
                  You may not transfer, assign, charge or otherwise dispose of a
                  contract, or any of your rights or obligations arising under
                  it, without our prior written consent. Lolos may transfer,
                  assign, charge, sub-contract or otherwise dispose of a
                  contract, or any of our rights or obligations arising under
                  it, at any time during the term of the contract.
                  {"\n"}
                  {"\n"}
                  11. Events Outside Our Control
                  {"\n"}
                  {"\n"}
                  11.1{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  not be liable or responsible for any failure to perform, or
                  delay in performance of, any of their obligations under a
                  contract that is caused by a Force Majeure Event (events
                  outside our reasonable control).
                  {"\n"}
                  11. 2 A Force Majeure Event includes any act, event,
                  non-happening, omission or accident beyond{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  ’s reasonable control and includes in particular (without
                  limitation) the following:
                  {"\n"} (i) Strikes, lock-outs or other industrial action.
                  {"\n"} (ii) Civil commotion, riot, invasion, terrorist attack
                  or threat of terrorist attack, war (whether declared or not)
                  or threat or preparation for war.
                  {"\n"} (iii) Fire, explosion, storm, flood, earthquake,
                  subsidence, epidemic or other natural disaster.
                  {"\n"} (iiii) Impossibility of the use of railways, shipping,
                  aircraft, motor transport or other means of public or private
                  transport.
                  {"\n"}
                  (v) Impossibility of the use of public or private
                  telecommunications networks.
                  {"\n"} (vi) The acts, decrees, legislation, regulations or
                  restrictions of any government. 11.3{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  performance under any contract is deemed to be suspended for
                  the period that the Force Majeure Event continues, and it will
                  have an extension of time for performance for the duration of
                  that period. Lolos will use reasonable endeavors to bring the
                  Force Majeure Event to a close or to find a solution by which
                  our obligations under the contract may be performed despite
                  the Force Majeure Event.
                  {"\n"}
                  {"\n"}
                  12. Waiver
                  {"\n"}
                  {"\n"}
                  {"\n"} 12.1 If{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  fail, at any time during the term of a contract, to insist
                  upon strict performance of any of your obligations under the
                  contract or any of these Conditions, or if Lolos fail to
                  exercise any of the rights or remedies to which it is entitled
                  under these Conditions, this shall not constitute a waiver of
                  such rights or remedies and shall not relieve you from
                  compliance with such obligations.
                  {"\n"}
                  {"\n"} 12.2 A waiver by{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  of any default shall not constitute a waiver of any subsequent
                  default. 12.3 No waiver by{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  of any of these Conditions shall be effective unless it is
                  expressly stated to be a waiver and is communicated to you in
                  writing.
                  {"\n"}
                  {"\n"}
                  13. Severability
                  {"\n"}
                  {"\n"}
                  {"\n"} 13.1 If any of these Conditions or any provisions of a
                  contract are determined by any competent authority to be
                  invalid, unlawful or unenforceable to any extent, such term,
                  condition or provision will to that extent be severed from the
                  remaining terms, conditions and provisions which will continue
                  to be valid to the fullest extent permitted by law.
                  {"\n"}
                  {"\n"}
                  14. Entire Agreement
                  {"\n"}
                  {"\n"}
                  14.1 These Conditions and any document expressly referred to
                  in them represent the entire agreement between you and Lolos
                  in relation to the subject matter of any contract and
                  supersede any prior agreement, understanding or arrangement
                  (whether oral or in writing). 14.2 You acknowledge that, in
                  entering into a contract, neither you or{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  has relied on any representation, undertaking or promise given
                  by the other or implied from anything said or written in
                  negotiations between you and Lolos prior to such contract
                  except as expressly stated in these terms and conditions.
                  {"\n"}
                  {"\n"}
                  15. Third Party Rights
                  {"\n"}
                  {"\n"}
                  15.1 A person who is not a party to these Conditions shall
                  have no right under the Contract (Rights of Third Parties) Act
                  1999 to enforce any term of these Conditions.
                  {"\n"}
                  {"\n"}
                  16. Law and Jurisdiction
                  {"\n"}
                  {"\n"}
                  16.1 These Conditions and any other legal notices contained
                  from time to time in the Services and all issues arising from
                  the Services are governed by the law of the state of Israel.
                  16.2 The courts of the state of Israel will have exclusive
                  jurisdiction over any claim or matter arising from, or related
                  to, a visit to the Services, and over any claim or matter
                  arising under or in connection with these Conditions or any
                  contract entered into with you pursuant to these Conditions,
                  provided that nothing in this Condition 16.2 shall limit our
                  right to take proceedings against you in any other court of
                  competent jurisdiction.
                  {"\n"}
                  {"\n"}
                  17.Billing
                  {"\n"}
                  {"\n"}
                  17.1 In the course of your use of the{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  Features,{" "}
                  <Text style={{ color: "#ff009d", fontStyle: "italic" }}>
                    Lolos
                  </Text>{" "}
                  and its third party payment service provider may receive and
                  implement updated credit card information from your credit
                  card issuer in order to prevent your actions from being
                  interrupted by an outdated or invalid card. This disbursement
                  of the updated credit card information is provided to Lolos
                  and Lolos third party payment service provider at the sole
                  election of your credit card issuer. Your credit card issuer
                  may give you the right to opt-out of the update service.
                  Should you desire to do so, please contact your credit card
                  issuer.
                </Text>
              </ScrollView>
            </View>
          </Modal>
        </View>
      );
    }
  }

  //   next() {
  //     let self = this;

  //     self.props.navigator.push({
  //       screen: "app.SignUp",
  //       animationType: "slide-horizontal"
  //     });
  //   }
  onPressHandle = async () => {
    let self = this;

    await self.props.navigator.push({
      screen: "SignupName",
      animationType: "slide-horizontal"
    });
  };
  next = _.debounce(this.onPressHandle, 300, {
    leading: true,
    trailing: false
  });

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          onIndexChanged={index => {
            this.setState({
              index: index
            });
          }}
          loop={false}
          showsPagination={this.state.index === 2 ? false : true}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          activeDotColor="#ff4273"
          activeDotStyle={{
            width: 15,
            height: 15,
            borderRadius: 8
          }}
          paginationStyle={{ paddingBottom: 50 }}
        >
          <View style={{ flex: 1 }}>{this.slide1()}</View>
          <View style={{ flex: 1 }}>{this.slide2()}</View>
          {/* <View style={{ flex: 1 }}>{this.slide3()}</View> */}
          <View style={{ flex: 1 }}>{this.slide4()}</View>
        </Swiper>
      </View>
    );
  }
}
