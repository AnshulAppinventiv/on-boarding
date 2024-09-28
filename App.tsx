import React, {Component} from 'react';
//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screens
import SplashScreen from './src/screens/spalsh/splashScreen';
import TutorialScreen from './src/screens/tutorial/tutorialScreen';
import LoginScreen from './src/screens/login/loginScreen';
import VerifyAccountAccess from './src/screens/verifyAccountAccess/verifyAccountAccess';
import CreateAccount from './src/screens/register/createAccount';
import ForgotPasswordScreen from './src/screens/forgotPassword/forgotPassword';
import ResetPasswordScreen  from './src/screens/resetPassword/resetPassword';
import HomeScreen from './src/screens/home/home';
import Toast from 'react-native-toast-message';
import PhoneNumberScreen from './src/screens/addPhoneNumber/addPhoneNumber';
import ProfileScreen from './src/screens/profile/profileScreen';
// import { CustomToast } from './src/components/Toastmsg';

export type RootStackParamList = {
  SplashScreen: undefined;
  TutorialScreen: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen:undefined;
  verifyAccountAccess: undefined;
  CreateAccount: undefined;
  HomeScreen:undefined;
  PhoneNumberScreen:undefined;
  ProfileScreen:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProfileScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TutorialScreen"
            component={TutorialScreen}
            options={{
              title: 'TutorialScreen',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: 'LoginScreen',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              title: 'ForgotPasswordScreen',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{
              title: 'ResetPasswordScreen',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              title: 'CreateAccount',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'HomeScreen',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PhoneNumberScreen"
            component={PhoneNumberScreen}
            options={{
              title: 'PhoneNumberScreen',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="verifyAccountAccess"
            component={VerifyAccountAccess}
            options={{
              title: 'verifyAccountAccess',
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: 'ProfileScreen',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    );
  }
}
