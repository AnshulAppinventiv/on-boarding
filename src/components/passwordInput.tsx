/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {SCREEN_WIDTH} from '../utils/scaling';
interface PasswordInputProps {
  label: string;
  value: string;
  passwordError: string;
  isPasswordVisible: boolean;
  onChangeText: (text: string) => void;
  togglePasswordVisibility: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

class PasswordInput extends Component<PasswordInputProps> {
  render() {
    const {
      label,
      value,
      passwordError,
      onChangeText,
      togglePasswordVisibility,
      isPasswordVisible,
      onFocus,
      onBlur,
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <View
          style={[
            styles.passwordContainer,
            passwordError ? {borderColor: 'red'} : null,
          ]}>
          <Image
            source={
              passwordError
                ? require('../assets/icons/error_password.png')
                : require('../assets/icons/password.png')
            }
            style={styles.passwordIcon}
          />

          <PaperTextInput
            style={[
              styles.passwordInput,
              passwordError ? styles.errorInput : null,
            ]}
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={!isPasswordVisible}
            onFocus={onFocus}
            onBlur={onBlur}
            underlineColor={passwordError ? 'red' : 'transparent'}
            textColor="black"
            activeUnderlineColor={passwordError ? 'red' : 'black'}
            mode="flat"
            underlineStyle={{
              display:'none',
            }}
            theme={{
              colors: {
                primary: 'black', // Label color when focused and border color
              },
            }}
          />

          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require('../assets/icons/eye-closed.png')
                  : require('../assets/icons/eye-open.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.invalidView}>
          {passwordError ? (
            <Image
              source={require('../assets/icons/invalidImage.png')}
              style={styles.invalidImage}
            />
          ) : null}
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  passwordContainer: {
    width: SCREEN_WIDTH / 1.2 + 20,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  passwordIcon: {
    width: 24,
    height: 24,
  },
  passwordInput: {
    width: SCREEN_WIDTH / 1.4,
    height: 54,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    width: 20,
    height: 15,
    marginRight: 8,
    tintColor: '#888',
  },
  invalidView: {
    flexDirection: 'row',
  },
  invalidImage: {
    width: 17,
    height: 17,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 13,
    color: '#122636',
    marginTop: 6,
  },
});

export default PasswordInput;
