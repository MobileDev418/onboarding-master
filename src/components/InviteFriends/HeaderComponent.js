import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { isIphoneX, ifIphoneX } from "react-native-iphone-x-helper";
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

import styles from "./style";

export const HeaderComponent = props => {
  let image = "";
  if (props.rightnav) {
    if (props.rightnav === "Chat") image = require(`@images/Chat_Icon.png`);
    else if (
      props.title === "EARN LOLOS" &&
      props.rightnav === "ActivityMonitor"
    )
      image = require("@images/HomePage/Shoutout.png");
    else image = require(`@images/HomePage/Help.png`);
  }
  return (
    <View style={[styles.container]}>
      {(props.title === "WISH LIST" || props.title === "EARN LOLOS") &&
      props.rightnav ? (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            props.navigator.toggleDrawer({
              side: "left",
              to: "open"
            });
          }}
        >
          <Image
            style={styles.backImage}
            source={require("@images/HomePage/MenuBlack.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            props.navigator.pop({ animationType: "slide-horizontal" });
          }}
        >
          <Image
            style={[styles.backImage, { width: 24, height: 24 }]}
            source={require("@images/DrawerScreen/left.png")}
          />
        </TouchableOpacity>
      )}

      {props.title ? (
        <Text style={styles.text}>{props.title}</Text>
      ) : (
        <Image
          source={require("@images/Assets/Logo.png")}
          style={{
            width: 60,
            height: (60 * 147) / 210,
            alignSelf: "center",
            marginBottom: -5
          }}
        />
      )}
      {props.rightnav ? (
        <TouchableOpacity
          style={[{ position: "absolute", right: 20 }]}
          onPress={() => {
            props.navigator.push({
              screen: props.rightnav,
              animationType: "slide-horizontal"
            });
          }}
        >
          <Image
            source={image}
            style={[styles.backImage, { width: 25, height: 25 }]}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
