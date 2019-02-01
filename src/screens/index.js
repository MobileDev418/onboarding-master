import { Navigation } from "react-native-navigation";
import SplashScreen from "./SplashScreen/index";
import HomePage from "./HomePage/index";

import Onboarding from "./Onboarding/index";
import SignUp from "./SignUp/index";
import Phone from "./SignUp/Phone/index";

import OtpScreen from "./SignUp/OtpScreen/index";
import DrawerScreen from "./DrawerScreen/index";
import PreviewScreen from "./Shop/PreviewScreen";
import ProductPage from "./Shop/productPage";

import InviteFriendsHome from "./InviteFriends/Contact/index.js";
import InviteHelp from "./InviteFriends/Contact/social.js";

import NotificationsHome from "./Notifications/index";
import Notifications from "./Notifications/index2";
import SliderPage from "./HomePage/SliderPage";
import Wallet from "./HomePage/Wallet/index";
import MyProfile from "./MyProfile/index";
import ShippingAddressShow from "./ShippingAddress/AddressShow";
import ShippingAddressHome from "./ShippingAddress/AddressHome";
import ShippingAddressCountry from "./ShippingAddress/AddressCountry";

import ShippingAddressEdit from "./ShippingAddress/AddressEdit";

import ValleyScreen from "./FakeWallet/Valley";
import ValleyCheckout from "./FakeWallet/ValleyCheckout";
import CrazyLab from "./FakeWallet/CrazyLab";
import BorderLine from "./FakeWallet/BorderLine";
import Store from "./FakeWallet/Store";
import BorderLineRefund from "./FakeWallet/BorderLineRefund";
import LifeScreen from "./How/index";
import Privacy from "./How/Privacy";
import Terms from "./How/Terms";
import Submit1 from "./Shop/PreviewScreen/submit1";
import Submit2 from "./Shop/PreviewScreen/submit2";
import Chat from "./Chat/index";
import TasksManager from "./TasksManager";
import ActivityMonitor from "./TasksManager/ActivityMonitor";
import Campaign from "./TasksManager/Campaign";
import PreviewPost from "./TasksManager/ShoutoutsDetail";
import StoreList from "./Shop/PreviewScreen/storelist";
import UploadHome from "./TasksManager/UploadPhoto";
import BrandGuaid from "./TasksManager/UploadPhoto/Howtoworks";
// import BrandName from "./TasksManager/UploadPhoto/BrandName";
import BrandDescription from "./TasksManager/UploadPhoto/Addtag";
import SubmitPhoto from "./TasksManager/UploadPhoto/SubmitPhoto";
import SubmitCheck from "./TasksManager/UploadPhoto/AddCaption";
import PhotoDetail from "./TasksManager/UploadPhoto/PhotoDetail";
import WinHome from "./Shop/PreviewScreen/PlayWin";
import SelectProduct from "./Shop/PreviewScreen/PlayWin/SelectProduct";
import ProductProperty from "./Shop/PreviewScreen/PlayWin/ProductProperty";
import Submit from "./Shop/PreviewScreen/PlayWin/Submit";
import PreviewOrder from "./Shop/PreviewScreen/ReviewOrder";
import MyOrders from "./MyOrders";

import MyShoutouts from "./TasksManager/Myshoutouts";
import SelectCampaign from "./TasksManager/UploadPhoto/SelectCampaign";
import Requirements from "./TasksManager/UploadPhoto/Requirements";
import Phototip from "./TasksManager/UploadPhoto/Phototip";
import Videotip from "./TasksManager/UploadPhoto/Videotip";
import FullName from "./MyProfile/FullName";
import SocialAccounts from "./MyProfile/SocialAccounts";
import MyKings from "./HomePage/Wallet/MyKings";
import WalletHowWorks from "./HomePage/Wallet/HowWorks";

import HowWorksWishList from "./Shop/PreviewScreen/HowItWorks";
import SignupName from "./SignUp/Name";
import Password from "./SignUp/SetPassword";

import Login from "./Login";
import phoneForPassword from "./Login/ForgotPassword";
import codeForPassword from "./Login/verifyCode";
import createPassword from "./Login/createPassword";

import OrderDetail from "./MyOrders/OrderDetail";

export function registerScreens(params) {
  Navigation.registerComponent("app.SplashScreen", () => SplashScreen);
  Navigation.registerComponent("app.HomePage", () => HomePage);

  Navigation.registerComponent("app.Onboarding", () => Onboarding);
  Navigation.registerComponent("app.SignUp", () => SignUp);
  Navigation.registerComponent("app.Phone", () => Phone);
  Navigation.registerComponent("app.OtpScreen", () => OtpScreen);

  Navigation.registerComponent("app.DrawerScreen", () => DrawerScreen);
  Navigation.registerComponent("app.PreviewScreen", () => PreviewScreen);
  Navigation.registerComponent("app.ProductPage", () => ProductPage);

  Navigation.registerComponent(
    "app.InviteFriendsHome",
    () => InviteFriendsHome
  );
  Navigation.registerComponent(
    "app.InviteFriendsContactSearch",
    () => InviteFriendsContactSearch
  );
  Navigation.registerComponent(
    "app.InviteFriendsInvite",
    () => InviteFriendsInvite
  );
  Navigation.registerComponent(
    "app.InviteFriendsSucess",
    () => InviteFriendsSucess
  );
  Navigation.registerComponent("app.Notifications", () => NotificationsHome);
  Navigation.registerComponent("app.NoficationScreen", () => Notifications);
  Navigation.registerComponent("app.SliderPage", () => SliderPage);
  Navigation.registerComponent("app.Wallet", () => Wallet);
  Navigation.registerComponent("app.myProfile", () => MyProfile);
  Navigation.registerComponent(
    "app.shippingAddressShow",
    () => ShippingAddressShow
  );
  Navigation.registerComponent(
    "app.shippingAddressHome",
    () => ShippingAddressHome
  );
  Navigation.registerComponent(
    "app.shippingAddressCountry",
    () => ShippingAddressCountry
  );
  Navigation.registerComponent(
    "app.shippingAddressState",
    () => ShippingAddressState
  );
  Navigation.registerComponent(
    "app.shippingAddressCity",
    () => ShippingAddressCity
  );
  Navigation.registerComponent(
    "app.shippingAddressStreet",
    () => ShippingAddressStreet
  );
  Navigation.registerComponent(
    "app.shippingAddressZip",
    () => ShippingAddressZip
  );
  Navigation.registerComponent(
    "app.shippingAddressApt",
    () => ShippingAddressApt
  );
  Navigation.registerComponent(
    "app.shippingAddressEdit",
    () => ShippingAddressEdit
  );
  Navigation.registerComponent("app.VideoCard", () => VideoCard);
  Navigation.registerComponent("app.ValleyScreen", () => ValleyScreen);
  Navigation.registerComponent("app.ValleyCheckout", () => ValleyCheckout);
  Navigation.registerComponent("app.CrazyLab", () => CrazyLab);
  Navigation.registerComponent("app.BorderLine", () => BorderLine);
  Navigation.registerComponent("app.Store", () => Store);
  Navigation.registerComponent("app.BorderLineRefund", () => BorderLineRefund);
  Navigation.registerComponent("LifeScreen", () => LifeScreen);
  Navigation.registerComponent("Privacy", () => Privacy);
  Navigation.registerComponent("Terms", () => Terms);
  Navigation.registerComponent("Submit2", () => Submit2);
  Navigation.registerComponent("Submit1", () => Submit1);
  Navigation.registerComponent("Chat", () => Chat);
  Navigation.registerComponent("TasksManager", () => TasksManager);
  Navigation.registerComponent("ActivityMonitor", () => ActivityMonitor);
  Navigation.registerComponent("Campaign", () => Campaign);
  Navigation.registerComponent("Instagram", () => Instagram);
  Navigation.registerComponent("PreviewPost", () => PreviewPost);
  Navigation.registerComponent("StoreList", () => StoreList);
  Navigation.registerComponent("UploadHome", () => UploadHome);
  Navigation.registerComponent("SubmitPhoto", () => SubmitPhoto);
  Navigation.registerComponent("SubmitCheck", () => SubmitCheck);
  Navigation.registerComponent("PhotoDetail", () => PhotoDetail);
  Navigation.registerComponent("WinHome", () => WinHome);
  Navigation.registerComponent("SelectProduct", () => SelectProduct);
  Navigation.registerComponent("ProductProperty", () => ProductProperty);
  Navigation.registerComponent("Submit", () => Submit);
  Navigation.registerComponent("PreviewOrder", () => PreviewOrder);
  Navigation.registerComponent("MyOrders", () => MyOrders);
  Navigation.registerComponent("InviteHelp", () => InviteHelp);
  Navigation.registerComponent("BrandGuaid", () => BrandGuaid);
  Navigation.registerComponent("BrandName", () => BrandName);
  Navigation.registerComponent("BrandDescription", () => BrandDescription);
  Navigation.registerComponent("MyShoutouts", () => MyShoutouts);
  Navigation.registerComponent("SelectCampaign", () => SelectCampaign);
  Navigation.registerComponent("Requirements", () => Requirements);
  Navigation.registerComponent("Phototip", () => Phototip);
  Navigation.registerComponent("Videotip", () => Videotip);
  Navigation.registerComponent("FullName", () => FullName);
  Navigation.registerComponent("SocialAccounts", () => SocialAccounts);
  Navigation.registerComponent("MyKings", () => MyKings);
  Navigation.registerComponent("HowWorksWishList", () => HowWorksWishList);
  Navigation.registerComponent("WalletHowWorks", () => WalletHowWorks);
  Navigation.registerComponent("SignupName", () => SignupName);
  Navigation.registerComponent("Password", () => Password);
  Navigation.registerComponent("Login", () => Login);
  Navigation.registerComponent("phoneForPassword", () => phoneForPassword);
  Navigation.registerComponent("codeForPassword", () => codeForPassword);
  Navigation.registerComponent("createPassword", () => createPassword);
  Navigation.registerComponent("OrderDetail", () => OrderDetail);
}
