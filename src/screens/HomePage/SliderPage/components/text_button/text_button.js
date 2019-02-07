import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'


export default TextButton = ({ buttonTitle, buttonTextStyle }) => (
    <Text style={buttonTextStyle}>{buttonTitle}</Text>
)

TextButton.propTypes = {
    source: PropTypes.string,
    imageStyle: PropTypes.object
}






