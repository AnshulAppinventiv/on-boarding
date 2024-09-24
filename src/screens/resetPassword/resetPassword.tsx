/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import BlurredHeader from '../../components/BlurredHeader';
import HeadingText from '../../components/HeadingText';
import PasswordInput from '../../components/passwordInput';
import ReusableButton from '../../components/ReusableButton';
import CustomModal from '../../components/CustomModal';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type ResetProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPasswordScreen'
>;

interface State {
  modalVisible: boolean;
  isFocused: boolean;
  password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  isPasswordVisible: boolean;
  isLoginEnabled: boolean;
  isLengthValid: boolean;
  hasSpecialChar: boolean;
  hasNumber: boolean;
  hasUpperAndLower: boolean;
}

class ResetPasswordScreen extends Component<ResetProps, State> {
  constructor(props: ResetProps) {
    super(props);
    this.state = {
      modalVisible: false,
      isFocused: false,
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      isPasswordVisible: false,
      isLoginEnabled: false,
      isLengthValid: false,
      hasSpecialChar: false,
      hasNumber: false,
      hasUpperAndLower: false,
    };
  }

  validatePassword = (text: string) => {
    this.setState({
      password: text,
      isLengthValid: text.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text),
      hasNumber: /\d/.test(text),
      hasUpperAndLower: /[A-Z]/.test(text) && /[a-z]/.test(text),
    });
  };

  validateConfirmPassword = (text: string) => {
    this.setState({
      confirmPassword: text,
      isLoginEnabled: true,
    });
  };

  setModalVisible = (visible: boolean) => {
    this.setState({modalVisible: visible});
  };
  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  handleFocus = () => {
    this.setState({isFocused: true});
  };

  handleBlur = () => {
    this.setState({isFocused: false});
  };

  handleSubmit = () => {
    const {password, confirmPassword} = this.state;

    if (password !== confirmPassword || confirmPassword === '') {
      // showErrorToast('Your password doesn’t match');
      this.setState({
        passwordError: 'Passwords do not match',
        confirmPasswordError: 'Passwords do not match',
      });
    } else {
      this.setModalVisible(true);
      this.setState({
        passwordError: '',
        confirmPasswordError: '',
      });
    }
  };

  render() {
    const {
      modalVisible,
      isFocused,
      password,
      passwordError,
      confirmPassword,
      isPasswordVisible,
      confirmPasswordError,
      isLoginEnabled,
      isLengthValid,
      hasSpecialChar,
      hasNumber,
      hasUpperAndLower,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#E6EDF3'}}>
        <BlurredHeader navigation={this.props.navigation} />

        <View>
          <HeadingText
            name="Reset Password"
            desc="Enter in your new password."
          />
        </View>

        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          modalimage={require('../../assets/icons/password-updated.png')}
          title="Password Updated !"
          desc="Your new password has been updated successfully."
          finalButton="Back to Login"
        />

        <View style={styles.emailcontainer}>
          <View style={!isFocused && {gap: 20}}>
            <View>
              <PasswordInput
                label="New Password"
                value={password}
                passwordError={passwordError}
                isPasswordVisible={isPasswordVisible}
                onChangeText={this.validatePassword}
                togglePasswordVisibility={this.togglePasswordVisibility}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />

              {isFocused && (
                <View style={styles.bigvalidationcontainer}>
                  <View style={styles.validationcontainer}>
                    <Image
                      source={
                        isLengthValid
                          ? require('../../assets/icons/tick.png')
                          : require('../../assets/icons/cross.png')
                      }
                      style={styles.icon}
                    />
                    <Text style={styles.textstylevalidation}>
                      8 characters or above
                    </Text>
                  </View>

                  <View style={styles.validationcontainer}>
                    <Image
                      source={
                        hasSpecialChar
                          ? require('../../assets/icons/tick.png')
                          : require('../../assets/icons/cross.png')
                      }
                      style={styles.icon}
                    />
                    <Text style={styles.textstylevalidation}>
                      1 or more special characters
                    </Text>
                  </View>

                  <View style={styles.validationcontainer}>
                    <Image
                      source={
                        hasNumber
                          ? require('../../assets/icons/tick.png')
                          : require('../../assets/icons/cross.png')
                      }
                      style={styles.icon}
                    />
                    <Text style={styles.textstylevalidation}>
                      1 or more numbers
                    </Text>
                  </View>

                  <View style={styles.validationcontainer}>
                    <Image
                      source={
                        hasUpperAndLower
                          ? require('../../assets/icons/tick.png')
                          : require('../../assets/icons/cross.png')
                      }
                      style={styles.icon}
                    />
                    <Text style={styles.textstylevalidation}>
                      Upper and lowercase letters
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <PasswordInput
              label="Confirm Password"
              // icon={confirmPasswordError ? require('../../assets/icons/error_password.png') : require('../../assets/icons/password.png')}
              onFocus={null}
              onBlur={null}
              value={confirmPassword}
              onChangeText={this.validateConfirmPassword}
              passwordError={confirmPasswordError}
              secureTextEntry={true}
            />
          </View>

          <ReusableButton
            text="Continue"
            disabled={!isLoginEnabled}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emailcontainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bigvalidationcontainer: {
    marginTop: 10,
  },
  validationcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textstylevalidation: {
    fontSize: 14,
    color: '#333',
  },
});

export default ResetPasswordScreen;
