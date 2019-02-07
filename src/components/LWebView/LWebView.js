import React, { Component } from "react";
import { WebView, Platform } from "react-native";
import PropTypes from "prop-types"
import WKWebView from 'react-native-wkwebview-reborn';



class LWebView extends React.Component {
    componentDidMount() {
        if(this.props.onRef)
            this.props.onRef(this.myWebView)
    }
    render() {
        if (Platform.OS === "ios") {
            return (
                <WKWebView
                    ref={webview => { this.myWebView = webview; }}
                    {...this.props}
                />
            )
        }
        return (
            <WebView
                ref={webview => { this.myWebView = webview; }}
                {...this.props}
            />
        )
    }
}

export default LWebView

LWebView.propTypes = {
    props: PropTypes.object
};
