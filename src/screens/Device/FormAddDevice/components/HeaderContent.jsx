import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function HeaderContent() {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeader}>Pilih Wi-Fi dan masukan password</Text>
      <Text style={{color: 'grey', fontWeight: '700'}}>
        masukan nama wifi dan password
      </Text>
      <View style={{marginTop: 16}}>
        <Icon name="ios-wifi" size={54} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  containerForm: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flex: 2,
  },
  input: {
    marginTop: 16,
  },
});

export default HeaderContent;
