import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';

class ReusableButton extends Component<any> {
  render() {
    const {text, disabled, onPress} = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          disabled ? styles.disabledButton : styles.nondisable,
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.primarystyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default ReusableButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 345,
    height: 56,
    justifyContent: 'center',
    marginTop: 38,
    borderRadius: 8,
    padding: 10,
  },
  primarystyle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20.8,
  },
  disabledButton: {
    backgroundColor: '#bfd7e8',
  },
  nondisable: {
    backgroundColor: '#2A7BBB',
  },
});
