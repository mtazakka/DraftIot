import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

function HeaderDashboard(props) {
  const image = false;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerUsername}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          {image ? (
            <Avatar.Icon size={36} icon="folder" />
          ) : (
            <Avatar.Text size={36} label="a" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.containerImg}>
        {/* <Image source={require('../../assets/gate.png')} style={styles.image} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerUsername: {
    display: 'flex',
    flexGrow: 3,
    paddingTop: 16,
    paddingBottom: 16,
  },
  containerImg: {
    display: 'flex',
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text12: {
    color: 'grey',
  },
  text14: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default HeaderDashboard;
