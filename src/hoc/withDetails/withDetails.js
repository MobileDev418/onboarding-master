import React, { Component } from "react";
import { View, Text } from "react-native";

export default (withCardDetails = WrappedComponent => {
  class WithCardDetails extends Component {
    render() {
      const {
        title,
        subTitle,
        titleStyle,
        subTitleStyle,
        titleSubTitleContainer,
        cardDetailsContainer
      } = this.props;
      return (
        <View style={cardDetailsContainer}>
          <View style={titleSubTitleContainer}>
            <Text style={titleStyle}>{title}</Text>
            <Text numberOfLines={2} style={subTitleStyle}>
              {subTitle}
            </Text>
          </View>
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  }
  return WithCardDetails;
});
