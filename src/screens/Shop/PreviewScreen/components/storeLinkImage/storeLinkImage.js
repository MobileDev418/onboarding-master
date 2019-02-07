import React, { Component } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";

export default (StoreLinkImage = ({ imageSource, imageStyle }) => (
  <Image source={imageSource} style={imageStyle} />
));

StoreLinkImage.propTypes = {
  source: PropTypes.string,
  imageStyle: PropTypes.object
};
