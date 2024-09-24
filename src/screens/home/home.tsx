/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

type EquipmentItem = {
  id: string;
  name: string;
};

const locations = [
  'Papa Bear Anderson',
  'Sunset Blvd, LA',
  'Ocean Drive, Miami',
];
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
  selectedLocation: string;
  locationModalVisible: boolean;
  moreOptionsVisible: boolean;
  isContentModalVisible: boolean;
};

export default class HomeScreen extends Component<HomeScreenProps, State> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      selectedLocation: locations[0],
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

  setSelectedLocation = (location: string) => {
    this.setState({selectedLocation: location, locationModalVisible: false});
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH / 1,
    backgroundColor: '#E6EDF3',
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: SCREEN_WIDTH / 1.0 + 20,
    backgroundColor: '#2A7BBB',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    width: SCREEN_WIDTH / 1.5 - 6,
    height: SCREEN_HEIGHT / 8.0,
    justifyContent: 'flex-end',
    marginLeft: 4,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 6,
  },
  nameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerImages: {
    width: SCREEN_WIDTH / 3.9,
    height: SCREEN_HEIGHT / 8.0,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingBottom: 4,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  messageButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF1A',
    borderRadius: 8,
  },
  messageIcon: {
    width: 24,
    height: 24,
  },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF1A',
    borderRadius: 8,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flexDirection: 'row',
    width: 361,
    height: 74,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#D9E2EE',
    alignItems: 'center',
  },
  mainImage: {
    width: 36,
    height: 36,
    marginLeft: 20,
  },
  head: {
    fontSize: 12,
    fontWeight: '600',
    color: '#525454',
    marginTop: 30,
  },
  subContent: {
    width: 156,
    height: 64,
    marginTop: 14,
    marginRight: 20,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subContentImage: {
    width: 24,
    height: 24,
    marginVertical: 20,
  },
  subContentHeading: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  subContentText: {
    fontSize: 12,
    width: 254,
    color: '#fff',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allProduct: {
    flexDirection: 'row',
    height: 40,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  allProductText: {
    color: '#23679D',
    fontWeight: '600',
    fontSize: 13,
  },
  down: {
    width: 8,
    height: 5,
    marginBottom: 7,
  },
  flatView: {
    width: SCREEN_WIDTH / 1.1 + 4,
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'black',
  },
  flatListHeaderText: {
    fontSize: 12,
    color: '#525454',
    fontWeight: '600',
    marginTop: 26,
  },
  equipmentItem: {
    width: SCREEN_WIDTH / 1.1 - 4,
    height: SCREEN_HEIGHT / 13,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    marginVertical: 10,
    // backgroundColor: 'blue',
  },
  equipmentDetails: {
    width: SCREEN_WIDTH / 1.3 + 16,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 14,
  },
  itemCategory: {
    marginLeft: 14,
    fontSize: 12,
    color: '#888',
  },
  listImgButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#23679D1A',
  },
  equipmentDetailsImage: {
    width: 20,
    height: 20,
  },
  Line: {
    width: 313,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#0000000F',
  },
  itemLocation: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH / 1,
    height: 94,
    paddingLeft: 4,
    marginRight:10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    backgroundColor: '#ffffff',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 10,
    color: '#333',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: SCREEN_WIDTH / 1,
    height: SCREEN_HEIGHT / 1.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#E6EDF3',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 111,
    height: 148,
    marginTop: 32,
  },
  modalTextImg: {
    width: 320,
    height: 289,
    marginRight: 40,
    marginTop: 24,
  },
  GetStartedButton: {
    width: 345,
    height: 56,
    backgroundColor: '#2A7BBB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeModal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    // marginTop: 20,
  },
});
