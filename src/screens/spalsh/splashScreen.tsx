import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TutorialScreen from '../tutorial/TutorialScreen';
import LoginScreen from '../login/LoginScreen';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

class SplashScreen extends Component<SplashScreenProps> {
  componentDidMount() {
    // Navigate to the next screen after 2 seconds
    setTimeout(() => {
      this.props.navigation.navigate('TutorialScreen');
    }, 2000);
  }
  storage = async () => {
    try {
      const login = await AsyncStorage.getItem('isLogin');
      // console.log(login);
      if (login === 'true') {
        this.props.navigation.navigate('HomeScreen');
      } else {
        this.props.navigation.navigate('TutorialScreen');
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/splash-logo.png')}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A7BBB',
  },
  image: {
    width: SCREEN_WIDTH / 1,
    height: SCREEN_HEIGHT / 1,
  },
});

export default SplashScreen;
