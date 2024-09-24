import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {myscreenwidthpadding} from '../utils/scaling.ts';

class HeadingText extends Component<any> {
  render() {
    const {name, desc} = this.props;

    return (
      <View style={styles.textboxcontainer}>
        <Text style={styles.signin}>{name}</Text>
        <Text style={styles.credentials}>{desc}</Text>
      </View>
    );
  }
}

export default HeadingText;

const styles = StyleSheet.create({
  textboxcontainer: {
    left: myscreenwidthpadding,
  },
  signin: {
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: -0.03,
    lineHeight: 31.2,
    fontFamily: 'Montserrat-SemiBold',
  },
  credentials: {
    color: '#4F5F72',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.01,
    marginBottom: 27,
  },
});
