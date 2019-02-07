import React, { Component } from 'react';
import withButton from '../../../../../hoc/withButton' 
import TextButton from '../text_button'
const Button = withButton(TextButton)

const Card = (props) => {
    return (
        <View>
            <View>
            </View>
            <View>
                <Text>{props.title}</Text>
                <Text>{props.subTitle}</Text>
                <Button
                    title={props.buttonTitle}
                />
            </View>
        </View>
    )
}
export default Card