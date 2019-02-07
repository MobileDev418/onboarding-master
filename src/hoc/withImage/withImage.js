import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { CachedImage } from "react-native-cached-image";

export default (withCardMedia = WrappedComponent => {
  class WithCardMedia extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CachedImage
              source={this.props.imageSource}
              style={this.props.imageStyle}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 30 }}>
            <WrappedComponent {...this.props} />
          </View>
        </View>
      );
    }
  }
  return WithCardMedia;
});
