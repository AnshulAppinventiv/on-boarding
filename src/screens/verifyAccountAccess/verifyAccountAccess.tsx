import React, {Component, createRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type verifyAccountAccessProps = NativeStackScreenProps<RootStackParamList, 'verifyAccountAccess'>;

export default class VerifyAccountAccessScreen extends Component<verifyAccountAccessProps> {
  inputRefs: any;
  constructor(props: verifyAccountAccessProps) {
    super(props);
    this.state = {
      code: ['', '', '', ''],
      attempts: 0,
      error: '',
    };

    // Create refs for the TextInput fields
    this.inputRefs = [createRef(), createRef(), createRef(), createRef()];
  }

  handleInputChange = (text: string, index: number) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newCode = [...this.state.code];
      newCode[index] = text;
      this.setState({code: newCode});

      // Automatically focus next input
      if (text !== '' && index < 3) {
        this.inputRefs[index + 1].current.focus();
      }

      // Move to the previous input if the user deletes the current input
      if (text === '' && index > 0) {
        this.inputRefs[index - 1].current.focus();
      }
    }
  };

  handleVerify = () => {
    const otp = this.state.code.join('');
    if (this.state.attempts >= 5) {
      Alert.alert('Error', 'Too many attempts. Please try again later.');
    } else {
      if (otp.length !== 4) {
        this.setState({error: 'Please enter a 4-digit code.'});
      } else if (otp === '1234') {
        Alert.alert('Success', 'Your account has been verified!');
      } else {
        this.setState(prevState => ({
          attempts: prevState.attempts + 1,
          error: 'Invalid code. Please try again.',
        }));
      }
    }
  };

  render() {
    const {code, error} = this.state;

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.subtitle}>
            Enter the code that we just sent to you on
          </Text>
          <Text style={styles.emailText}>hcankit7@gmail.com</Text>
          <Text style={styles.otpText}>4-digit Code</Text>
        </View>
        <View style={styles.otpContainer}>
          {code?.map((digit: string | undefined, index: number) => (
            <TextInput
              key={index}
              ref={this.inputRefs[index]}
              value={digit}
              onChangeText={text => this.handleInputChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              style={[styles.otpInput, {borderColor: error ? 'red' : 'gray'}]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Code Resent',
              'A new code has been sent to your phone number.',
            )
          }
          style={styles.resend}>
          <Text style={styles.linkText}>Resend </Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={this.handleVerify} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '',
    flex: 1,
  },
  Left: {
    width: 18,
    height: 16,
    marginTop: 94,
    marginLeft: 10,
  },
  titleContainer: {
    marginLeft: 20,
    marginTop: 64,
    // marginBottom:40,
  },
  title: {
    fontSize: 24,
    // fontWeight: '800',
    // textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    // fontWeight: '400',
    color: '#6c6c6c',
  },
  emailText: {
    fontWeight: '600',
  },
  otpText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 14,
  },
  otpContainer: {
    width: 500,
    marginLeft: 0,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderBlockColor: '#77829F',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 20,
    width: 65,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    width: 329,
    height: 56,
    marginLeft: 20,
    backgroundColor: '#0000001A',
    padding: 15,
    marginTop: 20,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  resend: {
    marginTop: 10,
  },
  linkText: {
    marginLeft: 20,
    color: '#000',
  },
});
