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

const ActivationScreen = props => {
  const [partners, setPartners] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [today, setToday] = useState(new Date());
  const [search, setSearch] = useState('');

  const [partnerId_, setPartnerId_] = useState('');

  useEffect(() => {
    const getPartners = async () => {
      const response = await appAction.getPartners();
      setPartners(response.data);
    };
    getPartners();
  }, []);

  const viewAppointments = async item => {
    const response = await appAction.getAllAppointments(item._id);
    setAppointments(response.allAppoitments);
    setPartnerId_(item._id);
    setFname(item.fName);
    setLname(item.lName);
    setOpenModal(true);
  };

  const displayName = (str, idx, array) => {
    if (str !== '') {
      if (idx === array.length - 1) {
        return str;
      }

      return str + ',';
    } else {
      return str;
    }
  };

  const services = items => {
    return items.map((result, index, array) => {
      return (
        <Text
          key={index}
          style={{
            fontSize: 17,
            marginRight: 5,
            color: '#9e9e9e',
          }}>
          {displayName(result.services.serviceName, index, array)}
        </Text>
      );
    });
  };

  const renderItem = ({item}) => (
    <View style={{marginTop: 50}}>
      <TouchableOpacity>
        <View style={styles.imageGrid}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `${item.profilePhoto}`}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 20}}>
        Full name - {item.fName} {item.lName}
      </Text>
      <Text style={{fontSize: 20}}>PhoneNumber - {item.phone}</Text>
      <Text style={{fontSize: 20}}>SSN - {item.ssnNumber}</Text>
      <Text style={{fontSize: 20}}>Profession - {item.profession}</Text>
      <TouchableOpacity onPress={() => viewAppointments(item)}>
        <View style={{backgroundColor: 'blue', padding: 10}}>
          <Text style={{color: '#fff', fontSize: 20}}>View Appointments</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const updateCartCheckIn = async (
    cartId,
    partner_stripe_id,
    partnerId,
    partnerPhone,
    stripe_charge_id,
    today,
    total,
    booking_date,
    booking_time,
    clientId,
  ) => {
    const checkInData = {
      cartId,
      partner_stripe_id,
      partnerId,
      partnerPhone,
      stripe_charge_id,
      today,
      total,
      booking_date,
      booking_time,
      clientId,
    };
    const removeAppointment = appointments.filter(
      value => value._id !== cartId,
    );
    setAppointments(removeAppointment);
    await appAction.updateCartCheckIn(checkInData);
  };

  const handleCheckIn = async (
    cartId,
    partner_stripe_id,
    partnerId,
    partnerPhone,
    stripe_charge_id,
    total,
    booking_date,
    booking_time,
    clientId,
  ) => {
    await updateCartCheckIn(
      cartId,
      partner_stripe_id,
      partnerId,
      partnerPhone,
      stripe_charge_id,
      today,
      total,
      booking_date,
      booking_time,
      clientId,
    );
  };

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
        CHECK-IN
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={search}
          placeholder="Search partner"
          style={{
            width: '70%',
            height: 45,
            borderColor: '#000',
            borderWidth: 1,
            marginTop: 20,
            fontSize: 20,
          }}
          onChangeText={value => {
            setSearch(value);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            paddingTop: 8,
            height: 45,
            marginTop: 20,
            width: '30%',
            paddingLeft: 20,
          }}
          onPress={async () => {
            const response = await appAction.searchPartner(search);
            setPartners(response.data);
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={partners}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={{marginTop: 2, marginBottom: 50}}
      />
      <Modal animationType="slide" transparent={false} visible={openModal}>
        <SafeAreaView style={{borderBottomWidth: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              paddingBottom: 10,
            }}>
            <Text style={{fontSize: 20}}>{fName + ' ' + lName}</Text>
            <TouchableOpacity
              onPress={() => {
                setFname('');
                setLname('');
                setAppointments([]);
                setPartnerId_('');
                setOpenModal(false);
              }}>
              <Text
                style={{
                  fontSize: 20,
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <TouchableOpacity
          onPress={async () => {
            const response = await appAction.getAllAppointments(partnerId_);
            setAppointments(response.allAppoitments);
          }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              marginTop: 10,
              color: 'red',
            }}>
            Click to refresh
          </Text>
        </TouchableOpacity>
        <FlatList
          data={appointments}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: '15%',
                  marginTop: '10%',
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#9e9e9e',
                  }}>
                  {Moment(item.booking_date).format('D')}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#9e9e9e',
                  }}>
                  {Moment(item.booking_date).format('MMM')}
                </Text>
              </View>
              <View style={styles.appointmentCard}>
                <View style={styles.appointmentBody}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        marginBottom: 7,
                      }}>
                      {item.booking_time}
                    </Text>

                    <View
                      style={{
                        backgroundColor:
                          Moment(today).format('MM/DD/YYYY') ==
                          Moment(item.booking_date).format('MM/DD/YYYY')
                            ? Colors.pink
                            : Colors.blue,
                        width: 40,
                        alignItems: 'center',
                        borderRadius: 50,
                        height: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#fff',
                          marginTop: 5,
                        }}>
                        {Moment(today).format('MM/DD/YYYY') ==
                        Moment(item.booking_date).format('MM/DD/YYYY')
                          ? 'T'
                          : 'UC'}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 17,
                      marginBottom: 7,
                    }}>
                    {item.client.name}
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {services(item.items)}
                  </ScrollView>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: Colors.blue, marginTop: 3}}>
                      {item.comfort_fee !== '0.00' && '( Comfort )'}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 17,
                      marginBottom: 7,
                    }}>
                    Total: ${item.total}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableWithoutFeedback
                      onPress={handleCheckIn.bind(
                        this,
                        item._id,
                        item.partner.stripeAccountId,
                        item.partner._id,
                        item.partner.phone,
                        item.stripe_charge_id,
                        item.total,
                        item.booking_date,
                        item.booking_time,
                        item.client._id,
                      )}>
                      <View style={styles.button}>
                        <Icon
                          name="md-checkmark"
                          size={20}
                          style={{marginRight: 10}}
                          color="green"
                        />
                        <Text>Check in</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {padding: 20},
  image: {height: 200, width: '100%'},
  appointmentCard: {
    alignSelf: 'center',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 8,
    marginHorizontal: 10,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 10,
  },

  appointmentBody: {
    padding: 10,
  },
  button: {
    width: '70%',
    padding: 5,
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default ActivationScreen;
