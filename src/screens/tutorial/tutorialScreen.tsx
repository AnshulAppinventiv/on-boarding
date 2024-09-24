import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type TutorialScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TutorialScreen'
>;

interface State {
  currentStep: number;
}

class TutorialScreen extends Component<TutorialScreenProps, State> {
  constructor(props: TutorialScreenProps) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  steps = [
    {
      title: 'Welcome to the App!',
      description: 'Discover all the amazing features we offer.',
      image: require('../../assets/icons/splash-logo.png'),
    },
    {
      title: 'Track Your Orders',
      description:
        'Easily track the status of your orders with real-time updates.',
      image: require('../../assets/icons/splash-logo.png'),
    },
    {
      title: 'Manage Your Account',
      description:
        'Update your profile, manage preferences, and more in the account section.',
      image: require('../../assets/icons/splash-logo.png'),
    },
  ];

  handleNext = () => {
    const {currentStep} = this.state;
    if (currentStep < this.steps.length - 1) {
      this.setState({currentStep: currentStep + 1});
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  };

  handleSkip = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  render() {
    const {currentStep} = this.state;

    return (
      <View style={styles.container}>
        <Image source={this.steps[currentStep].image} style={styles.image} />

        <Text style={styles.title}>{this.steps[currentStep].title}</Text>
        <Text style={styles.description}>
          {this.steps[currentStep].description}
        </Text>

        <View style={styles.pagination}>
          {this.steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={this.handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === this.steps.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={this.handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4F5F72',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#486284',
  },
  inactiveDot: {
    backgroundColor: '#C8CFD6',
  },
  nextButton: {
    backgroundColor: '#486284',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#486284',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TutorialScreen;
