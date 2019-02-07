import React, { Component } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { CachedImage } from "react-native-cached-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import I18n from "../../locales/config";
const window = Dimensions.get("window");

export default (withProductSubmissionAnimation = WrappedComponent => {
  class WithProductSubmissionAnimation extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Text style={this.props.pSATitleStyle}>
                {this.props.lolosToGo}
              </Text>
              <Text style={this.props.pSASubTitleStyle}>
                {I18n.t("Lolos_to_go")}
              </Text>
            </View>
            <AnimatedCircularProgress
              size={window.width / 3}
              width={10}
              fill={this.props.fillProgress}
              tintColor="#FF4273"
              rotation={0}
              duration={2000}
              backgroundColor="#DFDFDF"
            >
              {fill => (
                <CachedImage
                  source={this.props.imageSource}
                  style={this.props.imageStyle}
                />
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={{ flex: 2, justifyContent: "flex-end" }}>
            <WrappedComponent {...this.props} />
          </View>
        </View>
      );
    }
  }
  return WithProductSubmissionAnimation;
});
