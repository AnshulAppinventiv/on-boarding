/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import CountryPicker, { CountryCode, DARK_THEME } from 'react-native-country-picker-modal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {TextInput} from 'react-native-paper';

type PhoneNumberProps = NativeStackScreenProps<
  RootStackParamList,
  'PhoneNumberScreen'
>;

type State = {
  phoneNumber: string;
  countryCode: CountryCode;
  callingCode: string;
};

class PhoneNumberScreen extends Component<PhoneNumberProps, State> {
  constructor(props: PhoneNumberProps) {
    super(props);
    this.state = {
      phoneNumber: '',
      countryCode: 'US', // Default country code
      callingCode: '1', // Default calling code for the US
    };
  }

  handlePhoneNumberChange = (text: string) => {
    this.setState({phoneNumber: text});
  };

  onSelectCountry = (country: any) => {
    this.setState({
      countryCode: country.cca2,
      callingCode: country.callingCode[0],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace('HomeScreen');
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

        <View style={{paddingRight: 50}}>
          <Text style={styles.title}>Add Phone Number</Text>
          <Text style={styles.subtitle}>
            To initiate the two-factor authentication, provide your phone number
            below.
          </Text>

          {/* Country picker and phone number input in the same view */}
          <View style={styles.phoneInputContainer}>
            <CountryPicker
              countryCode={this.state.countryCode}
              withFilter
              withFlag
              withCallingCode
              withCountryNameButton={false}
              onSelect={this.onSelectCountry}
              containerButtonStyle={styles.countryCodeButton}
              theme={DARK_THEME}
            />
            <View style={styles.inputContainer}>
              <Text>+{this.state.callingCode}</Text>
              <TextInput
                label={'Phone Number'}
                style={styles.phoneNumberInput}
                keyboardType="phone-pad"
                onChangeText={this.handlePhoneNumberChange}
                value={this.state.phoneNumber}
                underlineStyle={{
                  display: 'none',
                }}
                theme={{
                  colors: {
                    primary: 'black',
                  },
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: '#E6EDF3',
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#4F5F72',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeButton: {
    borderColor: '#fff',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    width: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputContainer: {
    width: 271,
    height: 60,
    marginLeft: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  phoneNumberInput: {
    width: 216,
    height: 60,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    // marginLeft: 10,
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
});
