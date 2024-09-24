import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modalimage: any;
  title: string;
  desc: string;
  finalButton: string;
}

class CustomModal extends Component<Props> {
  render() {
    const { modalVisible, setModalVisible, modalimage, title, desc, finalButton } = this.props;
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={modalimage} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{desc}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>{finalButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 345,
    height:280,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width:126,
    height:48,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#2A7BBB',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
