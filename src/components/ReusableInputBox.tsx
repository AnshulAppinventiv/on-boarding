/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {TextInput} from 'react-native-paper';

class ReusableInputBox extends Component<any> {
  render() {
    const {
      label,
      onChangeText,
      value,
      onFocus,
      onBlur,
      error,
      secureTextEntry,
    } = this.props;

    return (
      <View style={[styles.childrenstyle, error ? styles.errorBorder : null]}>
        <View style={styles.textinputcontainer}>
          <View>
            <Image
              source={
                error
                  ? require('../assets/icons/error_password.png')
                  : require('../assets/icons/password.png')
              }
              style={styles.icon}
            />
          </View>

          <TextInput
            label={label}
            onChangeText={onChangeText}
            value={value}
            style={[styles.textinput, {backgroundColor: '#F8F9F9'}]}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            underlineColor={error ? 'red' : 'transparent'}
            textColor="black"
            activeUnderlineColor={error ? 'red' : 'black'}
            mode="flat"
            theme={{
              colors: {
                primary: 'black', // Label color when focused and border color
                background: 'white', // Background color of the TextInput
                placeholder: 'green', // Placeholder text color
                text: 'black', // Text color inside the input
                error: 'red',
              },
            }}
          />
        </View>
      </View>
    );
  }
}

export default ReusableInputBox;

const styles = StyleSheet.create({
  childrenstyle: {
    width: 345,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#F8F9F9',
    padding: 21,
    justifyContent: 'center',
  },
  textinput: {
    overflow: 'hidden',
    width: '100%',
    height: 58,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 4,
  },
  textinputcontainer: {
    backgroundColor:'red',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  errorBorder: {
    borderColor: 'red',
  },
});
