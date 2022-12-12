import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import Gate from '../../../../assets/gate.png';

function InitialDevice(props) {
  const handleAddDevice = async () => {
    return await AsyncStorage.setItem(
      'device',
      JSON.stringify({
        id: Date.now(),
        title: 'Gerbang',
        link: 'Gerbang',
        icon: Gate,
      }),
    );
  };

  useEffect(() => {
    setTimeout(() => {
      handleAddDevice();
    }, 9000);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Initialize Device</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
});

export default InitialDevice;
