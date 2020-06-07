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
  KeyboardAvoidingView,
} from 'react-native';

import * as appAction from '../store/actions/appAction';
import Header from '../components/Header';
import ImageView from 'react-native-image-view';

const ActivationScreen = props => {
  const [partners, setPartners] = useState([]);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [ssnInput, setSsnInput] = useState('');
  const [sucMessage, setSucMessage] = useState('');

  useEffect(() => {
    const getPartners = async () => {
      const response = await appAction.getPartnersNeedingActivation();
      setPartners(response.data);
    };
    getPartners();
  }, []);
  const handleImagePreivew = path => {
    const img = [
      {
        source: {
          uri: path,
        },
      },
    ];
    setPreviewData(prev => [...img]);
    setPreviewModal(true);
  };

  const activateUser = async userId => {
    await appAction.activateUser(userId);
    const removeAppointment = partners.filter(value => value._id !== userId);
    setPartners(removeAppointment);
  };

  const editSSN = ssnNumber => {
    setSsnInput(ssnNumber);
  };

  const updateSSN = async partnerId => {
    await appAction.updateSSN(partnerId, ssnInput);
    setSucMessage('Success');
    setTimeout(function() {
      setSucMessage('');
    }, 2000);
  };

  const renderItem = ({item}) => (
    <View style={{marginTop: 50}}>
      <TouchableOpacity
        onPress={handleImagePreivew.bind(this, item.licenseDocument[0].path)}>
        <View style={styles.imageGrid}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `${item.licenseDocument[0].path}`}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 20}}>
        Full name - {item.fName} {item.lName}
      </Text>
      <Text style={{fontSize: 20}}>SSN - {item.ssnNumber}</Text>

      <Text style={{fontSize: 20}}>Profession - {item.profession}</Text>
      {ssnInput !== '' && (
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={ssnInput}
            placeholder="Enter SSN"
            style={{
              width: '70%',
              height: 45,
              borderColor: '#000',
              borderWidth: 1,
              marginTop: 20,
              fontSize: 20,
            }}
            onChangeText={value => {
              setSsnInput(value);
            }}
          />
          <TouchableOpacity
            onPress={() => updateSSN(item._id)}
            style={{marginBottom: 20, marginTop: 20}}>
            <View style={{backgroundColor: 'green', padding: 10}}>
              <Text style={{color: '#fff', fontSize: 20}}>Update SSN</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => editSSN(item.ssnNumber)}
        style={{marginBottom: 20, marginTop: 10}}>
        <View style={{backgroundColor: 'green', padding: 10}}>
          <Text style={{color: '#fff', fontSize: 20}}>Edit SSN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => activateUser(item._id)}>
        <View style={{backgroundColor: 'blue', padding: 10}}>
          <Text style={{color: '#fff', fontSize: 20}}>Activate user</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header navigation={props.navigation} />
      {sucMessage !== '' && (
        <Text
          style={{
            fontSize: 30,
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 1,
            marginTop: 60,
            color: 'red',
          }}>
          Success
        </Text>
      )}
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 40,
          color: 'green',
        }}>
        ACTIVATION
      </Text>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={1}>
        <FlatList
          keyboardShouldPersistTaps="always"
          data={partners}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          style={{marginTop: 2, marginBottom: 50}}
        />
      </KeyboardAvoidingView>

      <ImageView
        images={previewData}
        imageIndex={0}
        isVisible={previewModal}
        onClose={() => setPreviewModal(false)}
        glideAlways
        animationType="fade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {padding: 20},
  image: {height: 300, width: '100%'},
});

export default ActivationScreen;
