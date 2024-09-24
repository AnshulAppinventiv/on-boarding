import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type CreateAccountProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateAccount'
>;

interface State {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isPasswordVisible: boolean;
}

class CreateAccount extends Component<CreateAccountProps, State> {
  constructor(props: CreateAccountProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isPasswordVisible: false,
    };
  }

  // Email Validation
  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handling Login
  handleLogin = () => {
    let isValid = true;
    const {email, password} = this.state;

    // Email Validation
    if (!this.validateEmail(email)) {
      this.setState({emailError: 'Invalid email address'});
      isValid = false;
    } else {
      this.setState({emailError: ''});
    }

    // Password Validation
    if (password.length < 6) {
      this.setState({passwordError: 'Password must be at least 6 characters'});
      isValid = false;
    } else {
      this.setState({passwordError: ''});
    }

    // If valid, proceed with navigation
    if (isValid) {
      this.props.navigation.navigate('FirstPage');
    }
  };

  // Toggling Password Visibility
  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  render() {
    const {email, password, emailError, passwordError, isPasswordVisible} =
      this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image
            source={require('../../assets/icons/Left-arrow.png')}
            style={styles.Left}
          />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subContainer}>
            <SafeAreaView>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>Enter in your credentials</Text>
            </SafeAreaView>

            <View style={styles.FirstNameContainer}>
              <TextInput
                style={styles.inputFirstName}
                placeholder="First Name"
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.LastNameContainer}>
              <TextInput
                style={styles.inputLastName}
                placeholder="Last Name"
                keyboardType="default"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.emailContainer}>
              <TextInput
                style={[styles.input, emailError ? styles.errorInput : null]}
                placeholder="Email Address"
                value={email}
                onChangeText={text => this.setState({email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.inputPhone}
                placeholder="Phone Number (Optional)"
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  passwordError ? styles.errorInput : null,
                ]}
                placeholder="Password"
                value={password}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={this.togglePasswordVisibility}>
                <Image
                  source={require('../../assets/icons/eye-open.png')}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  passwordError ? styles.errorInput : null,
                ]}
                placeholder="Confirm Password"
                value={password}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={this.togglePasswordVisibility}>
                <Image
                  source={require('../../assets/icons/eye-open.png')}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.handleLogin}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.SignInText}>
              Don't have an account?
              <TouchableOpacity>
                <Text style={styles.SignInButton}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.SignInText}>now</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  Left: {
    width: 18,
    height: 16,
    marginTop: 94,
    // marginLeft: 20,
  },
  subContainer: {
    // marginLeft: 32,
    marginTop: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '400',
    color: '#6c6c6c',
  },
  FirstNameContainer: {
    // width: 329,
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 24,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  inputFirstName: {
    width: 200,
    height: 54,
    fontSize: 16,
    marginLeft: 6,
    color: '#4D5876',
  },
  LastNameContainer: {
    // width: 329,
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 24,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  inputLastName: {
    //backgroundColor:'white',
    width: 328,
    height: 54,
    fontSize: 16,
  },
  emailContainer: {
    // width: 329,
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 24,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 54,
    fontSize: 16,
    marginLeft: 6,
  },
  phoneContainer: {
    // width: 329,
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 24,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  inputPhone: {
    width: 200,
    height: 54,
    fontSize: 16,
    marginLeft: 6,
  },
  passwordContainer: {
    // width: 329,
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 10,
  },
  passwordInput: {
    // width: 200,
    height: 50,
    fontSize: 16,
    marginLeft: 6,
  },
  eyeIcon: {
    width: 20,
    height: 15,
    marginRight: 8,
    tintColor: '#888',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    // width: 329,
    height: 56,
    opacity: 0.2,
    marginTop: 50,
    backgroundColor: '#19213D',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  SignInButton: {
    width: 70,
    height: 18,
    fontSize: 16,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginHorizontal: 4,
    // marginBottom:50,
  },
  SignInText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 24,
    marginLeft: 20,
    marginBottom: 50,
  },
});

export default CreateAccount;
