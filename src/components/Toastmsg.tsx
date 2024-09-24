import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

const toastConfig = {
  tomatoToast: ({text1, props}: any) => (
    <View style={styles.toastContainer}>
      <Image
        source={require('../assets/icons/invalidImage.png')} // Add your image path here
        style={styles.toastImage}
      />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

export const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '90%',
  },
  toastImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});
