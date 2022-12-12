import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StoreContext from '../../../../store/context';
import {Card, useTheme} from 'react-native-paper';

import RNSpeedometer from 'react-native-speedometer';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wsbroker = 'broker.emqx.io';
const wsport = 8083; // port for device

const client = new Paho.Client(
  wsbroker,
  wsport,
  '/mqtt',
  'myclientid_' + parseInt(Math.random() * 100, 10),
);

function SettingSpeed() {
  const usedContext = useContext(StoreContext);
  const {handleChangeSpeed, currentSpeed, speed} = usedContext;
  const theme = useTheme();

  const [tempSpeed, setTempSpeed] = useState(Number(currentSpeed));
  const data = [
    {id: 1, title: 'Slow', value: 50},
    {id: 2, title: 'Medium', value: 70},
    {id: 3, title: 'Fast', value: 90},
  ];
  useEffect(() => {
    // client.connect({
      //   userName: '',
      //   password: '',
      //   onSuccess: () => {
        //     console.log('Connected!');
        //     client.subscribe(`dt/device_1/status`, {qos: 1});
        //   },
        //   onFailure: err => {
          //     console.log('error', err.errorMessage);
          //   },
          // });
          
          // return () => client.disconnect();
        }, [currentSpeed]);
        
        const handlerChangeSpeed = async speed => {
          setTempSpeed(speed);
          await AsyncStorage.setItem('current_speed', JSON.stringify(speed));
        };
        
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Card style={[styles.card]}>
        <RNSpeedometer value={tempSpeed} size={200} />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
            marginTop: 6,
            letterSpacing: 0.5,
            color: '#4d7c0f',
          }}>
          Kecepatan Saat Ini {tempSpeed}%
        </Text>
      </Card>

      <View style={styles.boxSettingSpeed}>
        <Text style={styles.titleMenu}>Atur kecepatan</Text>
        <View style={{marginTop: 16}}>
          {data.map(item => (
            <TouchableOpacity
              style={[styles.buttonSpeeds]}
              key={item.title} //item.id?
              onPress={() => handlerChangeSpeed(item.value)}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: tempSpeed === item.value ? 'green' : 'black',
                    fontWeight: tempSpeed === item.value ? '900' : '',
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flex: 1,
  },
  currentSpeed: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    paddingBottom: 16,
    backgroundColor: '#ecfccb',
    shadowColor: '#65a30d',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  speed: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  boxSpeed: {
    padding: 24,
    marginTop: 16,
  },
  boxSettingSpeed: {
    flex: 4,
    marginTop: 24,
  },
  titleMenu: {
    fontSize: 18,
    fontWeight: '700',
  },
  buttonSpeeds: {
    padding: 16,
  },
  buttonSave: {
    marginTop: 8,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default SettingSpeed;
