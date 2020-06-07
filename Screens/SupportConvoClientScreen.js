import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import Moment from 'moment';
import Colors from '../contants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import {URL} from '../socketURL';

import * as appAction from '../store/actions/appAction';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';

const SupportConvoClientScreen = props => {
  const socket = io(URL);
  const [conversations, setConversations] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const scrollView = useRef();

  const supportMessageId = props.navigation.getParam('supportId');
  const category = props.navigation.getParam('category');
  const userId = props.navigation.getParam('userId');
  const userName = props.navigation.getParam('userName');
  const typeOfUser = props.navigation.getParam('typeOfUser');
  const phone = props.navigation.getParam('phone');

  useEffect(() => {
    const getSupportConversations = async () => {
      const response = await appAction.getSupportConversations(
        supportMessageId,
      );
      setConversations(response.supportConvo.message_data);
    };
    getSupportConversations();
  }, []);

  useEffect(() => {
    socket.on('newSupportMessage', async function(messageData) {
      if (messageData.supportMessageId == supportMessageId) {
        const getSupportConversations = async () => {
          const response = await appAction.getSupportConversations(
            supportMessageId,
          );
          setConversations(response.supportConvo.message_data);
        };
        scrollView.current.scrollToEnd();
        getSupportConversations();
      }
    });
  }, []);

  const newSupportMessage = async () => {
    if (messageInput !== '') {
      const messageData = {
        clientId: userId,
        message: messageInput,
        to: userId,
        from_: 'supportAdmin@iBeautyConnect.com',
        supportMessageId: supportMessageId,
        category: category,
      };
      setConversations(prev => [...prev, messageData]);
      socket.emit('newSupportMessage', messageData);
      appAction.newSupportMessage_client(messageData);
      setMessageInput('');
      scrollView.current.scrollToEnd();
    }
  };

  const sendSMSReminder = () => {
    appAction.sendSMSReminder(phone, userName, typeOfUser);
  };

  const closeSupportTicket = () => {
    appAction.closeSupportTicket(supportMessageId);
    props.navigation.navigate('Support');
  };

  let view;

  const conversationView = conversations.map((conversation, index) => {
    //console.log(index);
    if (conversation.to == 'supportAdmin@iBeautyConnect.com') {
      view = (
        <View style={[styles.item, styles.itemIn]} key={index}>
          <View style={[styles.balloon, {backgroundColor: '#000'}]}>
            <Text
              style={{
                paddingTop: 5,
                color: 'white',
                fontSize: 20,
              }}>
              {conversation.message}
            </Text>
            <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
              <Svg
                style={styles.arrowLeft}
                width={moderateScale(15.5, 0.6)}
                height={moderateScale(17.5, 0.6)}
                viewBox="32.484 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5">
                <Path
                  d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                  fill="#000"
                  x="0"
                  y="0"
                />
              </Svg>
            </View>
          </View>
        </View>
      );
    } else {
      view = (
        <View style={[styles.item, styles.itemOut]} key={index}>
          <View style={[styles.balloon, {backgroundColor: 'blue'}]}>
            <Text
              style={{
                paddingTop: 5,
                color: 'white',
                fontSize: 20,
              }}>
              {conversation.message}
            </Text>
            <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
              <Svg
                style={styles.arrowRight}
                width={moderateScale(15.5, 0.6)}
                height={moderateScale(17.5, 0.6)}
                viewBox="32.485 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5">
                <Path
                  d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                  fill="blue"
                  x="0"
                  y="0"
                />
              </Svg>
            </View>
          </View>
        </View>
      );
    }

    return view;
  });

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{borderBottomWidth: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              props.navigation.navigate('Support');
            }}>
            <Text style={{fontSize: 20}}>Back</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 20, marginLeft: 40}}>
            {userName}
          </Text>
          <Text style={{marginTop: 10, fontSize: 20, marginLeft: 40}}>
            Type Of User:{typeOfUser}
          </Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 20, color: 'green'}}>
          Category: {category}
        </Text>
        <TouchableOpacity
          onPress={() => sendSMSReminder()}
          style={{marginTop: 20}}>
          <View style={{backgroundColor: 'purple', padding: 10}}>
            <Text style={{color: '#fff', fontSize: 20}}>Send SMS Reminder</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => closeSupportTicket()}
          style={{marginBottom: 20, marginTop: 10}}>
          <View style={{backgroundColor: '#000', padding: 10}}>
            <Text style={{color: '#fff', fontSize: 20}}>
              Close Support Ticket
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView ref={scrollView}>{conversationView}</ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <TextInput
            value={messageInput}
            placeholder="Enter SSN"
            style={{
              width: '70%',
              height: 100,
              borderColor: '#000',
              borderWidth: 1,
              marginTop: 20,
              fontSize: 20,
            }}
            onChangeText={value => {
              setMessageInput(value);
            }}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity
            onPress={() => newSupportMessage()}
            style={{marginBottom: 20, marginTop: 20}}>
            <View style={{backgroundColor: 'green', padding: 10}}>
              <Text style={{color: '#fff', fontSize: 20}}>Send Message</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row',
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export default SupportConvoClientScreen;
