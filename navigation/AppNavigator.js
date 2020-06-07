import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/HomeScreen';
import ActivationScreen from '../Screens/ActivationScreen';
import CheckInScreen from '../Screens/CheckInScreen';
import NoShowScreen from '../Screens/NoShowScreen';
import SupportScreen from '../Screens/SupportScreen';
import SupportConvoPartnerScreen from '../Screens/SupportConvoPartnerScreen';
import SupportConvoClientScreen from '../Screens/SupportConvoClientScreen';
// import AuthScreen from '../screens/AuthScreen';
// import StartUpScreen from '../screens/StartUpScreen';
// import MessageScreen from '../screens/MessageScreen';
// import ConversationScreen from '../screens/ConversationScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import PaymentScreen from '../screens/PaymentScreen';
// import OrderHistoryScreen from '../screens/OrderHistoryScreen';
// import CancelledOrdersScreen from '../screens/CancelledOrdersScreen';
// import SupportScreen from '../screens/SupportScreen';
// import SupportConversationScreen from '../screens/SupportConversationScreen';
// import WebViewScreen from '../screens/WebViewScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Activation: ActivationScreen,
    CheckIn: CheckInScreen,
    NoShow: NoShowScreen,
    Support: SupportScreen,
    SupportConvoPartner: SupportConvoPartnerScreen,
    SupportConvoClient: SupportConvoClientScreen,
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
