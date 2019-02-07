import React, { Component } from 'react'
import { View } from 'react-native'
import Lottie from "lottie-react-native";

export default withCardAnimation = WrappedComponent => {
    class WithCardAnimation extends Component {
        render() {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Lottie
                            source={this.props.animationSource}
                            loop
                            autoPlay
                            style={this.props.animationStyle}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <WrappedComponent
                            {...this.props}
                        />
                    </View>
                </View>
            )
        }
    }
    return WithCardAnimation
}
