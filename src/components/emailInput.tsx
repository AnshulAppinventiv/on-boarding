/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {SCREEN_WIDTH} from '../utils/scaling';

interface EmailInputProps {
  email: string;
  emailError: string;
  onChangeEmail: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

class EmailInput extends Component<EmailInputProps> {
  render() {
    const {email, emailError, onChangeEmail, onFocus, onBlur} = this.props;
    return (
      <View style={styles.wrapper}>
        <View
          style={[
            styles.emailContainer,
            emailError ? {borderColor: 'red'} : null,
          ]}>
          <Image
            source={
              emailError
                ? require('../assets/icons/error_email.png')
                : require('../assets/icons/email.png')
            }
            style={styles.emailIcon}
          />
          <PaperTextInput
            style={[styles.paperinput, emailError ? styles.errorInput : null]}
            label="Email"
            value={email}
            onChangeText={onChangeEmail}
            onFocus={onFocus}
            onBlur={onBlur}
            mode="flat"
            underlineStyle={{
              display: 'none',
            }}
            underlineColor={emailError ? 'red' : '#fff'}
            activeUnderlineColor={emailError ? 'red' : 'black'}
            theme={{
              colors: {
                primary: 'black',
                placeholder: 'gray',
                background: 'transparent', // Ensure background is transparent
                disabled: 'transparent', // Disable color for disabled state
              },
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          {emailError ? (
            <Image
              source={require('../assets/icons/invalidImage.png')}
              style={styles.invalidImage}
            />
          ) : null}
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  emailContainer: {
    width: SCREEN_WIDTH / 1.2 + 20,
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  emailIcon: {
    width: 24,
    height: 24,
  },
  paperinput: {
    width: 280,
    height: 54,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    width: 220,
    height: 55,
    fontSize: 16,
    marginLeft: 16,
    backgroundColor: '#fff',
  },
  invalidView: {
    flexDirection: 'row',
  },
  invalidImage: {
    width: 17,
    height: 17,
    marginLeft: 10,
    marginTop: 6,
  },
  errorContainer: {
    flexDirection: 'row',
    borderColor: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: '#122636',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default EmailInput;
