import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import EmailInput from '../../components/emailInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;
interface State {
  email: string;
  emailError: string;
  isModalVisible: boolean;
}

class ForgotPasswordScreen extends Component<ForgotPasswordProps, State> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      isModalVisible: false,
    };
  }

  // Email validation method
  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handling email submission for password reset
  handlePasswordReset = () => {
    const {email} = this.state;
    let isValid = true;

    if (!this.validateEmail(email)) {
      this.setState({emailError: 'Invalid email address entered'});
      isValid = false;
    } else {
      this.setState({emailError: ''});
    }

    if (isValid) {
      // Show the modal when email is valid
      this.setState({isModalVisible: true});
    }
  };

  // Function to close modal
  handleCloseModal = () => {
    this.setState({isModalVisible: false});
  };

  render() {
    const {email, emailError, isModalVisible} = this.state;

    return (
      <View style={styles.container}>
        {/* Top view with back button and image */}
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace('LoginScreen');
            }}>
            <Image
              source={require('../../assets/icons/Left-arrow.png')}
              style={styles.leftArrow}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/icons/maskGroup.png')}
            style={styles.mainImage}
          />
        </View>

        {/* Forgot Password Title and Subtitle */}
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Reset your password with just a few clicks
        </Text>

        {/* EmailInput Component */}
        <EmailInput
          email={email}
          emailError={emailError}
          onChangeEmail={text => this.setState({email: text})}
          onBlur={null}
          onFocus={null}
        />

        {/* Submit Button */}
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handlePasswordReset}>
            <Text style={styles.submitButtonText}>Send Link</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Confirmation */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={this.handleCloseModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Modal Image */}
              <Image
                source={require('../../assets/icons/linkSent.png')}
                style={styles.modalImage}
              />

              {/* Modal Title */}
              <Text style={styles.modalTitle}>Link Sent !</Text>

              {/* Modal Message */}
              <Text style={styles.modalMessage}>
                The link to reset your password has been sent on your email
                address.
              </Text>

              {/* Modal Send Button */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={this.handleCloseModal}>
                <Text style={styles.modalButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    // backgroundColor: 'red',
  },
  topView: {
    width: 300,
    height: 180,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftArrow: {
    width: 48,
    height: 48,
    marginTop: 66,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: 180,
    height: 185,
    marginLeft: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
  },
  bottomView: {
    width: 370,
    height: 300,
    justifyContent: 'flex-end',
  },
  submitButton: {
    width: 345,
    height: 56,
    backgroundColor: '#2A7BBB',
    opacity: 0.3,
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 20,
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 345,
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    width: 126,
    height: 48,
    backgroundColor: '#2A7BBB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
