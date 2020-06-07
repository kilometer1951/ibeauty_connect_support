import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Moment from 'moment';
import Colors from '../contants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

import * as appAction from '../store/actions/appAction';
import Header from '../components/Header';

const SupportScreen = props => {
  const [support, setSupport] = useState([]);

  useEffect(() => {
    const getSupport = async () => {
      const response = await appAction.getSupport();
      setSupport(response.data);
    };
    getSupport();
  });

  const openSupportConvo = (
    supportId,
    userId,
    typeOfUser,
    category,
    userName,
    phone,
  ) => {
    if (typeOfUser === 'partner') {
      props.navigation.navigate('SupportConvoPartner', {
        supportId,
        userId,
        category,
        userName,
        typeOfUser,
        phone,
      });
    } else {
      props.navigation.navigate('SupportConvoClient', {
        supportId,
        userId,
        category,
        userName,
        typeOfUser,
        phone,
      });
    }
  };

  const renderItem = ({item}) => (
    <View
      style={{
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
      }}>
      <Text style={{color: 'red', fontSize: 20}}>
        Type of User: {item.client ? 'Client' : 'Partner'}
      </Text>
      <Text style={{fontSize: 20}}>
        User ID: {item.client ? item.client._id : item.partner._id}
      </Text>
      <Text style={{fontSize: 20}}>Category ID: {item._id}</Text>
      <Text style={{fontSize: 20}}>Category: {item.category}</Text>
      <Text style={{fontSize: 20}}>
        Name of user:{' '}
        {item.client
          ? item.client.name
          : item.partner.fName + ' ' + item.partner.lName}
      </Text>
      <TouchableOpacity
        onPress={() =>
          openSupportConvo(
            item._id,
            item.client ? item.client._id : item.partner._id,
            item.client ? 'client' : 'partner',
            item.category,
            item.client
              ? item.client.name
              : item.partner.fName + ' ' + item.partner.lName,
            item.client ? item.client.phone : item.partner.phone,
          )
        }
        style={{marginBottom: 20, marginTop: 10}}>
        <View style={{backgroundColor: 'green', padding: 10}}>
          <Text style={{color: '#fff', fontSize: 20}}>Open Message</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header navigation={props.navigation} />
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 10,
          fontSize: 30,
          color: 'green',
        }}>
        Support
      </Text>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={support}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={{marginTop: 2, marginBottom: 50}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {padding: 20},
});

export default SupportScreen;
