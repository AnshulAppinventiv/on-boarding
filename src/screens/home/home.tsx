/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type EquipmentItem = {
  id: string;
  name: string;
};

const equipmentData: EquipmentItem[] = [
  {
    id: '1',
    name: 'Successfully configured POS for sites',
  },
  {
    id: '2',
    name: 'You ended the campaign Holiday Special',
  },
  {
    id: '3',
    name: 'Created a campaign Holiday Special',
  },
  {
    id: '4',
    name: 'Activated the user access group named Site manager',
  },
  {
    id: '5',
    name: 'Added a discount code to a campaign named Holiday Special',
  },
  {
    id: '6',
    name: 'Added a new customer C02039',
  },
  {
    id: '7',
    name: 'Activated the user access group named Site Managers',
  },
];

type State = {
  locationModalVisible: boolean;
  moreOptionsVisible: boolean;
  isContentModalVisible: boolean;
};

export default class HomeScreen extends Component<HomeScreenProps, State> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      locationModalVisible: false,
      moreOptionsVisible: false,
      isContentModalVisible: false, // Initialize modal visibility state
    };
  }

  logOut = async () => {
    try {
      await AsyncStorage.removeItem('isLogin');
      this.props.navigation.replace('LoginScreen');
    } catch (error) {}
  };


  toggleLocationModal = () => {
    this.setState({locationModalVisible: !this.state.locationModalVisible});
  };

  // Toggle content modal visibility
  toggleContentModal = () => {
    this.setState({isContentModalVisible: !this.state.isContentModalVisible});
  };

  toggleAndNavigate = () => {
    this.toggleContentModal();
    this.props.navigation.navigate('PhoneNumberScreen');
  };

  renderEquipmentItem = ({item}: {item: EquipmentItem}) => (
    <View style={styles.equipmentItem}>
      <View style={styles.equipmentDetails}>
        <TouchableOpacity style={styles.listImgButton}>
          <Image
            source={require('../../assets/icons/listImg.png')}
            style={styles.equipmentDetailsImage}
          />
        </TouchableOpacity>

        <View style={{marginRight: 30}}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>Jun 3, 2023 | 12:30 PM</Text>
        </View>
      </View>
      <View style={styles.Line} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.nameText}>Kevin</Text>
          </View>
          <View style={styles.headerImages}>
            <TouchableOpacity style={styles.messageButton}>
              <Image
                source={require('../../assets/icons/message.png')}
                style={styles.messageIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton}>
              <Image
                source={require('../../assets/icons/bell.png')}
                style={styles.bellIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={this.toggleContentModal}
            activeOpacity={0.7}>
            <View style={styles.content}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/contentImg.png')}
                  style={styles.mainImage}
                />
              </TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <Text style={{fontWeight: '700'}}>
                  Complete your account setup
                </Text>
                <Text style={{fontWeight: '500', color: '#60707D'}}>
                  Tap to continue
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.head}>FREQUENTLY USED</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.subContent}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#46A4BA',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image
                  source={require('../../assets/icons/i1.png')}
                  style={styles.subContentImage}
                />
              </TouchableOpacity>

              <View
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  width: 110,
                  height: 36,
                }}>
                <Text style={styles.subContentHeading}>Create Campaign</Text>
              </View>
            </View>

            <View style={styles.subContent}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#46A4BA',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image
                  source={require('../../assets/icons/i2.png')}
                  style={styles.subContentImage}
                />
              </TouchableOpacity>

              <View
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  width: 110,
                  height: 36,
                }}>
                <Text style={styles.subContentHeading}>One Time Trigger</Text>
              </View>
            </View>
            <View style={styles.subContent}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#46A4BA',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image
                  source={require('../../assets/icons/i3.png')}
                  style={styles.subContentImage}
                />
              </TouchableOpacity>

              <View
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  width: 110,
                  height: 36,
                }}>
                <Text style={styles.subContentHeading}>One Time Trigger</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.listHeaderContainer}>
            <Text style={styles.flatListHeaderText}>RECENT ACTIVITIES</Text>
            <View style={styles.allProduct}>
              <Text style={styles.allProductText}>All Product </Text>
              <Image
                source={require('../../assets/icons/down.png')}
                style={styles.down}
              />
            </View>
          </View>

          <View style={styles.flatView}>
            <FlatList
              data={equipmentData}
              renderItem={this.renderEquipmentItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={require('../../assets/icons/home.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>HOME</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={require('../../assets/icons/account.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={require('../../assets/icons/favourites.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>FAVOURITES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem} onPress={this.logOut}>
            <Image
              source={require('../../assets/icons/menu.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>MENU</Text>
          </TouchableOpacity>
        </View>
        {/* Content Modal */}
        <Modal
          transparent={true}
          visible={this.state.isContentModalVisible}
          animationType="slide"
          onRequestClose={this.toggleContentModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../../assets/icons/modalImg.png')}
                style={styles.modalImage}
              />
              <Image
                source={require('../../assets/icons/modalText.png')}
                style={styles.modalTextImg}
              />
              <TouchableOpacity
                style={styles.GetStartedButton}
                onPress={this.toggleAndNavigate}>
                <Text style={styles.closeModal}>Get Started</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.toggleContentModal}>
                <Text style={styles.closeModal}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

