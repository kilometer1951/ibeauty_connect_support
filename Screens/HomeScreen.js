import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import * as appAction from '../store/actions/appAction';
import Header from '../components/Header';

const HomeScreen = props => {
  const [clientCount, setClientCount] = useState([]);
  const [partnerCount, setPartnerCount] = useState([]);
  const [
    partnerNeedingActivationCount,
    setPartnerNeedingActivationCount,
  ] = useState([]);
  const [numberOfSupportTickets, setNumberOfSupportTickets] = useState([]);

  useEffect(() => {
    const getClientCount = async () => {
      const response = await appAction.getClients();
      setClientCount(response.data.length);
    };
    const getPartnerCount = async () => {
      const response = await appAction.getPartners();
      setPartnerCount(response.data.length);
    };
    const getNumberOfPartnersToActivate = async () => {
      const response = await appAction.getPartnersNeedingActivation();
      setPartnerNeedingActivationCount(response.data.length);
    };
    const getNumberOfSupportTickets = async () => {
      const response = await appAction.getNumberOfSupportTickets();
      setNumberOfSupportTickets(response.data.length);
    };
    getNumberOfSupportTickets();
    getNumberOfPartnersToActivate();
    getPartnerCount();
    getClientCount();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header navigation={props.navigation} />
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 40,
          color: 'green',
        }}>
        HOME
      </Text>
      <View
        style={{
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            marginBottom: 20,
            color: 'blue',
            textDecorationLine: 'underline',
            fontSize: 20,
          }}>
          Total Number Of Partners And Clients
        </Text>
        <Text style={{marginBottom: 20, fontSize: 20}}>
          Number Of Clients: {clientCount}{' '}
        </Text>
        <Text style={{marginBottom: 20, fontSize: 20}}>
          Number Of Partners: {partnerCount}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            marginBottom: 20,
            color: 'blue',
            textDecorationLine: 'underline',
            fontSize: 20,
          }}>
          Total Number Of Partners To Activate
        </Text>
        <Text style={{marginBottom: 20, fontSize: 20}}>
          Activation Pending (Partners): {partnerNeedingActivationCount}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            marginBottom: 20,
            color: 'blue',
            textDecorationLine: 'underline',
            fontSize: 20,
          }}>
          Total Number Of Open Support Tickets
        </Text>
        <Text style={{marginBottom: 20, fontSize: 20}}>
          Number Of Support Tickets (Open): {numberOfSupportTickets}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {padding: 20},
});

export default HomeScreen;
