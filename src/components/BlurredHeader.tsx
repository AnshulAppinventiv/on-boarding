import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  SCREEN_HEIGHT,
} from '../utils/scaling.ts';

class BlurredHeader extends Component<any> {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../assets/icons/resetHeader.png')}
            style={styles.backbutton}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/icons/maskGroup.png')}
          style={styles.blurredimage}
        />
      </View>
    );
  }
}

export default BlurredHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  blurredimage: {
    width: 316.25,
    height: 215,
    resizeMode: 'contain',
    marginRight: -70,
  },
  backbutton: {
    width: 90,
    height: 60,
    marginLeft:20,
    marginTop: SCREEN_HEIGHT * 0.07746478873,
  },
});
