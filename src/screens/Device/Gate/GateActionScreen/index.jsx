import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Paho from 'paho-mqtt';

import StoreContext from '../../../../store/context';
import Information from './components/Information';
import Buttons from './components/Buttons';
import ButtonStop from '../../../../components/Buttons/ButtonStop';

const menus = [
  {
    id: 1,
    title: 'Buka Kendaraan',
    icon: 'garage-open-variant',
    bgcolor: '#558b2f',
  },
  {
    id: 2,
    title: 'Buka Pedestrian',
    icon: 'walk',
    bgcolor: '#9ccc65',
  },
  {
    id: 3,
    title: 'Tutup',
    icon: 'garage-variant-lock',
    bgcolor: '#ef5350',
  },
];

function GateAction(props) {
  const navigation = useNavigation();
  const usedContext = useContext(StoreContext);
  const {mqtt, client} = usedContext;
  const theme = useTheme();
  const [checkStatus, setCheckStatus] = useState(false);
  const [dataActive, setDataActive] = useState([]);

  const [payload, setPayload] = useState({
    currentPositionGate: null,
    title: '',
    icon: '',
  });

  useEffect(() => {
    if (mqtt) {
      //-------------di mqttx qos 0 itu status, qos 1 itu gate
      client.subscribe(`dt/device_1/gate`, {qos: 0}); 
      client.subscribe(`dt/device_1/status`, {qos: 1});
      client.onMessageArrived = onMessage;
    }
  }, [mqtt]);

  function onMessage(message) {
    const payload = message.payloadString;
    const topic = message.destinationName;
    console.log('test--------', message)

    if (payload === 'ONLINE' && topic === 'dt/device_1/status') {
      //maksud codingan ini
    } else if (payload === 'OFFLINE' && topic === 'dt/device_1/status') {
      navigation.reset({
        routes: [{name: 'Home'}],
      });
    } else if (topic === `dt/device_1/gate`) {
      const data = menus.filter(item => item.id === Number(payload));
      console.log('ini data dari message-----',data);
      setDataActive(data); //dikirim buat informasi
    }
  }

  function openTheDoor(gerbangId, title, icon) {
    setPayload({
      ...payload, //-----spread operator buat apa
      currentPositionGate: gerbangId,
      title: title,
      icon,
    });

    const message = new Paho.Message(gerbangId.toString());
    message.destinationName = `dt/device_1/gate`;
    message.retained = true;
    console.log(message,'ini pesaaaan button gerbang')
    client.send(message);
  }

  return (
    <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
      <Information
        payload={payload}
        currentIcon={payload.icon}
        isData={dataActive}
      />
      <Buttons
        payload={payload}
        onChangeGate={openTheDoor}
        isData={dataActive}
      />
      <ButtonStop />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default GateAction;
