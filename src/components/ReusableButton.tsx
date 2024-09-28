import {Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

class ReusableButton extends Component<any> {
  render() {
    const {text,style,textStyle} = this.props;

    return (
      <TouchableOpacity style={style}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default ReusableButton;
