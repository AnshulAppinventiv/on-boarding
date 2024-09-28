/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {styles} from './styles';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReusableButton from '../../components/ReusableButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

type State = {
  phoneNumber: string;
  name: string;
  userName: string;
  birthday: string;
  text: string;
  isDatePickerVisible: boolean;
  countryCode: CountryCode;
  callingCode: string;
  showCountryPicker: boolean;
  showModal: boolean;
};

class ProfileScreen extends Component<ProfileProps, State> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      phoneNumber: '',
      name: '',
      userName: '',
      countryCode: 'US',
      callingCode: '1',
      showCountryPicker: false,
      showModal: false,
      isDatePickerVisible: false,
      birthday: '',
      text: '',
    };
  }

  requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          this.openCamera();
        } else {
          console.log('Camera permission denied');
          Alert.alert('Camera permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const permission = await request(PERMISSIONS.IOS.CAMERA);
        if (permission === RESULTS.GRANTED) {
          console.log('Camera permission granted');
          this.openCamera();
        } 
        else {
          console.log('Camera permission denied');
          Alert.alert('Camera permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  openGallery = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Image selected from gallery: ', response.assets);
      }
    });
  };

  openCamera = () => {
    const options = {
      mediaType: 'photo',
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        console.log('Image captured by camera: ', response.assets);
      }
    });
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    this.setState({birthday: formattedDate});
    this.hideDatePicker();
  };
  // Function to toggle the modal visibility
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleNameChange = (text: string) => {
    this.setState({name: text});
  };

  handleUserNameChange = (text: string) => {
    this.setState({userName: text});
  };

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
        <SafeAreaView>
          <ScrollView>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.replace('HomeScreen')}>
                <Image
                  source={require('../../assets/icons/profileBackArrow.png')}
                  style={styles.leftArrow}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Profile</Text>
            </View>

            {/* Top Profile Section */}
            <View style={styles.topContainer}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/profileImg.png')}
                  style={styles.profileImg}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.profilePicText}>Profile Picture</Text>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Modal Section */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModal}
              onRequestClose={this.toggleModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text
                    style={{fontSize: 24, fontWeight: '700', color: '#000'}}>
                    Profile Photo
                  </Text>
                  <View
                    style={{
                      width: 380,
                      borderWidth: 1,
                      marginTop: 16,
                      borderColor: '#E6E9EE',
                    }}
                  />
                  <TouchableOpacity style={styles.modalOption} onPress={this.openGallery}>
                    <Image
                      source={require('../../assets/icons/option1.png')}
                      style={styles.option1Img}
                    />
                    <Text style={styles.modalOptionText}>
                      Upload from Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalOption}  onPress={this.requestCameraPermission}>
                    <Image
                      source={require('../../assets/icons/option2.png')}
                      style={styles.option1Img}
                    />
                    <Text style={styles.modalOptionText}>Use Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={this.toggleModal}>
                    <Image
                      source={require('../../assets/icons/option3.png')}
                      style={styles.option1Img}
                    />
                    <Text style={styles.modalOptionText}>Select an Avatar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
 
            {/* Rest of the form */}
            <View style={styles.subContainer}>
              {/* Name */}
              <TextInput
                label={'Name'}
                style={styles.nameInput}
                keyboardType="name-phone-pad"
                onChangeText={this.handleNameChange}
                value={this.state.name}
                outlineColor="#E7EBF3"
                activeOutlineColor="#E7EBF3"
                mode="outlined"
                theme={{roundness: 16, colors: {primary: '#7F879A'}}}
              />
              {/* Username */}
              <TextInput
                label={'Username'}
                style={styles.nameInput}
                keyboardType="name-phone-pad"
                onChangeText={this.handleUserNameChange}
                value={this.state.userName}
                outlineColor="#E7EBF3"
                activeOutlineColor="#E7EBF3"
                mode="outlined"
                underlineStyle={{display: 'none'}}
                theme={{roundness: 16, colors: {primary: '#7F879A'}}}
              />
              <View style={styles.birthdayContainer}>
                <TextInput
                  label={'Birthday'}
                  style={styles.birthdayInput}
                  keyboardType="phone-pad"
                  value={this.state.birthday}
                  outlineColor={'#E7EBF3'}
                  activeOutlineColor={'#E7EBF3'}
                  mode="outlined"
                  underlineStyle={{
                    display: 'none',
                  }}
                  theme={{
                    roundness: 16,
                    colors: {
                      primary: '#7F879A',
                    },
                  }}
                />
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={this.showDatePicker}>
                  <Image
                    source={require('../../assets/icons/calendar.png')}
                    style={styles.calendarImage}
                  />
                </TouchableOpacity>

                {/* DateTimePickerModal */}
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}
                />
              </View>

              <TextInput
                label={'Gender'}
                style={styles.genderInput}
                keyboardType="phone-pad"
                onChangeText={this.handlePhoneNumberChange}
                value={this.state.phoneNumber}
                outlineColor={'#E7EBF3'}
                activeOutlineColor={'#E7EBF3'}
                mode="outlined"
                underlineStyle={{
                  display: 'none',
                }}
                theme={{
                  roundness: 16,
                  colors: {
                    primary: '#7F879A',
                  },
                }}
              />
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({showCountryPicker: true});
                    }}
                    style={styles.flagWrapper}>
                    <CountryPicker
                      countryCode={this.state.countryCode}
                      withFilter
                      withFlag
                      withCallingCode
                      withCountryNameButton={false}
                      onSelect={this.onSelectCountry}
                      visible={false}
                      containerButtonStyle={styles.countryPicker}
                    />
                  </TouchableOpacity>
                  <Text style={styles.callingCodeText}>
                    +{this.state.callingCode}
                  </Text>
                </View>
                <TextInput
                  label={'Phone Number'}
                  style={styles.phoneNumberInput}
                  keyboardType="phone-pad"
                  onChangeText={this.handlePhoneNumberChange}
                  value={this.state.phoneNumber}
                  outlineColor={'#E7EBF3'}
                  activeOutlineColor={'#E7EBF3'}
                  mode="outlined"
                  underlineStyle={{
                    display: 'none',
                  }}
                  theme={{
                    roundness: 16,
                    colors: {
                      primary: '#7F879A',
                    },
                  }}
                />
              </View>
              <TextInput
                label={'Email ID'}
                style={styles.emailInput}
                keyboardType="email-address"
                onChangeText={this.handlePhoneNumberChange}
                value={this.state.phoneNumber}
                outlineColor={'#E7EBF3'}
                activeOutlineColor={'#E7EBF3'}
                mode="outlined"
                underlineStyle={{
                  display: 'none',
                }}
                theme={{
                  roundness: 16,
                  colors: {
                    primary: '#7F879A',
                  },
                }}
              />
              <ReusableButton
                style={styles.button}
                text="Update"
                textStyle={styles.buttonText}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default ProfileScreen;
