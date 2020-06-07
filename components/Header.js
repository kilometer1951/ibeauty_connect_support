import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const Header = props => {
  return (
    <SafeAreaView style={{borderBottomWidth: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate('Home')}>
          <View>
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate('Activation')}>
          <View>
            <Text>Activate Partner</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate('CheckIn')}>
          <View>
            <Text>Check-In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate('NoShow')}>
          <View>
            <Text>Confirm No-show</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate('Support')}>
          <View>
            <Text>Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menu: {padding: 20},
});

export default Header;
