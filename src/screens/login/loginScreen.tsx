 /* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailInput from '../../components/emailInput';
import PasswordInput from '../../components/passwordInput';
import { RootStackParamList } from '../../../App';
import AutoScroll from '@homielab/react-native-auto-scroll';
import Toast, { BaseToast, ToastProps, ToastConfig } from 'react-native-toast-message';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/scaling';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

interface State {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isButtonEnabled: number;
  isPasswordVisible: boolean;
  topContainerFlex: number;
  isModalVisible: boolean;
  loginAttempts: number;
  isAccountLocked: boolean;
}

export default class LoginScreen extends Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isPasswordVisible: false,
      topContainerFlex: 0,
      isButtonEnabled: 0.4,
      isModalVisible: false,
      loginAttempts: 0,
      isAccountLocked: false,
    };
  }

  storeLoginStatus = async () => {
    try {
      await AsyncStorage.setItem('isLogin', 'true');
    } catch (r) {
      console.error(r);
    }
  };

  // Live email validation
  handleEmailChange = (email: string) => {
    this.setState({ email });
    if (!this.validateEmail(email)) {
      this.setState({ emailError: 'Invalid email address entered' });
    } else {
      this.setState({ emailError: '' });
    }
  };

  // Live password validation
  handlePasswordChange = (password: string) => {
    this.setState({ password });
    if (password.length < 6) {
      this.setState({ passwordError: 'Password must be at least 6 characters' });
    } else {
      this.setState({ passwordError: '' });
    }
  };

  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleLogin = () => {
    const { email, password, isAccountLocked } = this.state;
    let isValid = true;

    if (isAccountLocked) {
      this.setState({ isModalVisible: true });
      return;
    }

    if (!this.validateEmail(email)) {
      this.setState({ emailError: 'Invalid email address entered' });
      isValid = false;
    }

    if (password.length < 6) {
      this.setState({ passwordError: 'Invalid password entered' });
      isValid = false;
    }

    this.setState({
      isButtonEnabled: 0.9,
    });

    if (!isValid) {
      this.setState(prevState => ({
        loginAttempts: prevState.loginAttempts + 1,
      }));

      Toast.show({
        type: 'error',
        text1: 'Invalid credentials. Please try again',
        text2: 'Try again',
      });

      if (this.state.loginAttempts + 1 >= 3) {
        this.setState({ isAccountLocked: true, isModalVisible: true });
      }
    } else {
      this.storeLoginStatus();
      // Navigate to HomeScreen when login is successful
      this.props.navigation.navigate('HomeScreen');
    }
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  handleEmailFocus = () => {
    this.setState({ topContainerFlex: 4 });
  };

  handleEmailBlur = () => {
    this.setState({ topContainerFlex: 0 });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      isPasswordVisible,
      isModalVisible,
    } = this.state;

    return (
      <View style={styles.container}>

        <View
          style={[styles.topContainer, { flex: this.state.topContainerFlex }]}>
          <Image
            source={require('../../assets/icons/headerImage.png')}
            style={styles.headerImage}
          />
          <View style={styles.headerView}>
            <Image
              source={require('../../assets/icons/mainImage.png')}
              style={styles.mainImg}
            />
            <Text style={styles.headerTitle}>QUIVIO</Text>
            <Text style={styles.headerText}>
              Your Personal CarWash Assistant
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FFFFFF1A',
                marginTop: 40,
                width: 71,
              }}
            />
            <AutoScroll duration={9000} style={styles.autoscroll}>
              <View style={styles.listContainer}>
                <View style={styles.ItemContainer}>
                  <Image
                    source={require('../../assets/icons/listImage1.png')}
                    style={styles.listImage}
                  />
                  <Text style={styles.listItemText}> Aesthetical Graphics</Text>
                </View>

                <View style={styles.ItemContainer}>
                  <Image
                    source={require('../../assets/icons/listImage2.png')}
                    style={styles.listImage}
                  />
                  <Text style={styles.listItemText}> Real time Statistics</Text>
                </View>

                <View style={styles.ItemContainer}>
                  <Image
                    source={require('../../assets/icons/listImage3.png')}
                    style={styles.listImage}
                  />
                  <Text style={styles.listItemText}>Track equipment usage</Text>
                </View>
              </View>
            </AutoScroll>
          </View>
        </View>

        <ScrollView>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle}>with your valid credentials</Text>

            {/* EmailInput Component */}
            <EmailInput
              email={email}
              emailError={emailError}
              onChangeEmail={this.handleEmailChange}
              onFocus={this.handleEmailFocus}
              onBlur={this.handleEmailBlur}
            />

            {/* PasswordInput Component */}
            <PasswordInput
              label="Password"
              value={password}
              passwordError={passwordError}
              isPasswordVisible={isPasswordVisible}
              onChangeText={this.handlePasswordChange}
              togglePasswordVisibility={this.togglePasswordVisibility}
              onFocus={this.handleEmailFocus}
              onBlur={this.handleEmailBlur}
            />

            <View style={styles.forgotPasswordView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ResetPasswordScreen')
                }>
                <Text style={styles.resetPassword}>Reset Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPasswordScreen')
                }>
                <Text style={styles.forgotPassword}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { opacity: this.state.isButtonEnabled },
              ]}
              onPress={this.handleLogin}>
              <Text style={styles.loginButtonText}>Primary</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../../assets/icons/lock.png')}
                style={styles.modalImage}
              />

              <Text style={styles.modalHeading}>Account Locked</Text>

              <Text style={styles.modalText}>
                Your account has been locked due to too many failed attempts.
                Please try again after some time.
              </Text>

              <TouchableOpacity
                style={styles.okayButton}
                onPress={this.closeModal}>
                <Text style={styles.okayButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Toast config={toastConfig} />
      </View>
    );
  }
}

const toastConfig = ToastConfig = {
  tomatoToast: ({ text1, text2, ...rest }: { text1: string; text2: string } & ToastProps) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'tomato' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
        color: 'gray',
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    width: SCREEN_WIDTH / 1.1 + 36,
    height: SCREEN_HEIGHT / 2.5 + 20,
  },
  mainImg: {
    width: 82,
    height: 55,
    marginBottom: 20,
  },
  headerView: {
    width: SCREEN_WIDTH / 1.1 + 36,
    height: SCREEN_HEIGHT / 2.5 + 20,
    position: 'absolute',
    marginTop: 86,
    marginLeft: 28,
  },

  headerImage: {
    width: SCREEN_WIDTH / 1.1 + 36,
    height: SCREEN_HEIGHT / 2.5 + 20,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: '800',
  },
  headerText: {
    fontSize: 17,
    color: 'white',
    marginTop: 6,
  },
  autoscroll: {
    width: SCREEN_WIDTH / 1.1 - 10,
    position: 'absolute',
    marginTop: 200,
  },
  listContainer: {
    flexDirection: 'row',
  },
  ItemContainer: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  listImage: {
    width: 16,
    height: 16,
    marginRight: 10,
    marginTop: 10,
  },
  listItemText: {
    color: '#fff',
  },
  subContainer: {
    flex: 0.6,
    width: SCREEN_WIDTH / 1.0,
    height: SCREEN_HEIGHT / 1.3,
    backgroundColor: '#E6EDF3',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 240,
    marginTop: 40,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginRight: 146,
    color: '#4F5F72',
  },
  forgotPasswordView: {
    width: SCREEN_WIDTH / 1.1 - 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor:'red',
  },
  forgotPassword: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 30,
  },
  resetPassword: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 30,
    marginLeft: 4,
  },
  loginButton: {
    width: SCREEN_WIDTH / 1.1 - 10,
    height: 55,
    backgroundColor: '#2A7BBB',
    opacity: 0.2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonopacity: {
    width: SCREEN_WIDTH / 1.1 - 10,
    height: 55,
    backgroundColor: '#2A7BBB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: SCREEN_WIDTH / 1.2 + 10,
    height: SCREEN_HEIGHT / 2.5 - 40,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
  },
  okayButton: {
    width: SCREEN_WIDTH / 3 - 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A7BBB',
    borderRadius: 8,
  },
  okayButtonText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});
