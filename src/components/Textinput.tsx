import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';



export default class EpassInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const element = <TextInput.Icon name='pencil' />
    const { leftIcon, rightIcon, onChangeText, error, securetextentry, type,rightComp,leftComp} = this.props;
    return (
      <View style={styles.container}>
        {leftComp && leftComp()
      
        }
        {type === 'password' ? <TextInput
          mode="flat"
          label={this.props.text}
          onChangeText={onChangeText}
         secureTextEntry={securetextentry}
         underlineColor="transparent"

          //placeholder={this.props.text}
          style={[styles.textin, error && styles.text]} /> 


          :

           <TextInput
          onChangeText={onChangeText}
          label={this.props.text}
          mode="flat"
          //placeholder={this.props.text}
          underlineColor="transparent"

          style={[styles.textin, error && styles.text]} />}
        {/* <TextInput
      onChangeText={onChangeText}
      
      placeholder={this.props.text}
      style={[styles.textin, error && styles.text]}/> */}
          { rightComp &&  rightComp()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{ flexDirection: 'row' },
  img3: {
    height: 20,
    width: 20,
  },
  textin: {
    borderRadius: 8,
    backgroundColor: 'white',
    width: 345,
    height: 60,
    marginHorizontal: '7%',
    // padding:'8%',
    paddingLeft:30,
    marginVertical: '2.5%',
    // aspectRatio:16/9,
  },
  text: {
    borderColor: 'red',
    borderWidth:1,
  }
})