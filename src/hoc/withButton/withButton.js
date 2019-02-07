import React, { Component } from "react";
import { TouchableOpacity,View } from "react-native";
import _ from "lodash";

export default (withButton = WrappedComponent => {
  class WithButton extends Component {
    onPressHandle = async () => {
      await this.props.onPress(this.props);
    };
    onPress = _.debounce(this.onPressHandle, 300, {
      leading: true,
      trailing: false
    });
    render() {
      return (
        <TouchableOpacity onPress={this.onPress} style={this.props.style}>
          <WrappedComponent {...this.props} />
        </TouchableOpacity>
      );
    }
  }
  return WithButton;
});
