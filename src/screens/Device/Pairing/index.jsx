import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {NetworkInfo} from 'react-native-network-info';
// import  from 'react-native-wifi-reborn';
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StepsAction from './components/StepsAction';
import ScanDevice from './components/ScanDevice';
import DeviceConnected from './components/DeviceConnected';
import InitialDevice from './components/InitialDevice';
import ModalPassword from './components/ModalPassword';
import ModalSendWifi from './components/ModalSendWifi';

const wsbroker = 'broker.emqx.io'; //mqtt websocket enabled broker
const wsport = 8083;

const client = new Paho.Client(
  wsbroker,
  wsport,
  '/mqtt',
  'myclientid_' + parseInt(Math.random() * 100, 10),
);

function PairingScreen(props) {
  const theme = useTheme();
  const router = useRoute();
  const payloads = router.params.payload;

  const [currentPage, setCurrentPage] = useState(0);
  const [openModalPasswordWifi, setOpenModalPasswordWifi] = useState(false);
  const [isWifi, setIsWifi] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [ipGateway, setIpGateway] = useState('');
  const [openModalPairing, setOpenModalPairing] = useState(false);
  const [deviceId, setDeviceId] = useState('0');
  const [loading, setLoading] = useState(false);
  const [statusPairing, setStatusPairing] = useState('');

  const handleChangePage = page => setCurrentPage(page);
  const handleOpenModalWifiPassword = () => setOpenModalPasswordWifi(true);
  const handleCloseModalWifiPassword = () => setOpenModalPasswordWifi(false);
  // const handleChangeIsWifi = wifi => setIsWifi(wifi);
  const handleChangePassword = pass => setIsPassword(pass);
  const handleChangeIpGateway = ip => setIpGateway(ip);
  const handleChangeOpenModalPairing = () => setOpenModalPairing(true);
  const handleChangeCloseModalPairing = () => setOpenModalPairing(false);

  // console.log('password >>>', isPassword);

  // 1. mendapatkan ip gateway => done handleClickWifi()
  // 2. setelah mendapatkan gateway hubungkan ke wifi sebelumnya
  // 3. setelah konek kirim request ke device dengan payload {"pass": "", "ssid": ""}
  // 4. mendaptkan response device_id
  // 5. mengirim ke mqtt dengan device_id

  const handleClickWifi = (wifi, pass) => {
    if (pass.includes('PSK')) {
      handleOpenModalWifiPassword();
      setIsWifi(wifi);
    } else {
      // .connectToProtectedSSID(wifi, '', false).then(
      //   response => {
      //     if (response === 'connected') {
      //       handleChangeOpenModalPairing();
      //       NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      //         setIpGateway(defaultGateway);
      //       });
      //     }
      //   },
      //   () => {
      //     console.log('Connection failed!');
      //   },
      // );
    }
  };

  const connectToDevice = async () => {
    try {
      const request = await fetch(`http://${ipGateway}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloads),
      });
      const result = await request.json();
      console.log('is result >>>', result);
      return result;
    } catch (error) {
      console.log('error request', error);
    }
  };

  const handleSubmitPairing = () => {
    // 1. konek ke wifi sebelumnya
    // WifiManager.connectToProtectedSSID(payloads.ssid, payloads.pass, false)
    // .then((response)=>{
    //   console.log('response reconnect', response)
    // })
    // .catch(error => console.log('failure connected', error))
  };


  // const handleSubmitPairing = async () => {
  //   console.log('payloads', payloads);
  //   try {
  //     WifiManager.connectToProtectedSSID(
  //       payloads.ssid,
  //       payloads.pass,
  //       false,
  //     ).then(response => {
  //       console.log('response connect', response);
  //       if (response === 'connected') {
  //         connectToDevice()
  //         handleChangeCloseModalPairing();
  //         // setDeviceId(result.device_id);
  //         handleChangePage(1);
  //         client.onConnectionLost = onConnectionLost;
  //         client.onMessageArrived = onMessageArrived;

  //         // connect the client
  //         client.connect({
  //           onSuccess: () => {
  //             console.log('MQTT Connected!');
  //             getInfo();
  //             onConnect();
  //           },
  //           onFailure: error => console.log('failure connection', error),
  //         });

  //         // called when the client connects
  //         function onConnect() {
  //           console.log(`jalannnnnnnn`);
  //           // client.subscribe(`dt/${result.device_id}/status`, {qos: 1});
  //         }

  //         function getInfo() {
  //           // client.subscribe(`dt/${result.device_id}/status`, {qos: 1});
  //         }

  //         // called when the client loses its connection
  //         function onConnectionLost(responseObject) {
  //           if (responseObject.errorCode !== 0) {
  //             console.log('onConnectionLost:' + responseObject);
  //           }
  //         }

  //         // called when a message arrives
  //         function onMessageArrived(message) {
  //           console.log('status >>>', message.payloadString);
  //           setStatusPairing(message.payloadString);
  //         }
  //       }
  //     });
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const Components = [
    <ScanDevice onClickWifi={handleClickWifi} />,
    <DeviceConnected
      onChangePage={handleChangePage}
      deviceId={deviceId}
      loading={loading}
      statusPairing={statusPairing}
    />,
    <InitialDevice />,
  ];

  // const handlePairingMqtt = () => {
  //   client.onConnectionLost = onConnectionLost;
  //   client.onMessageArrived = onMessageArrived;

  //   // connect the client
  //   client.connect({
  //     onSuccess: () => {
  //       console.log('MQTT Connected!');
  //       getInfo();
  //       onConnect();
  //     },
  //     onFailure: error => console.log('failure connection', error),
  //   });

  //   // called when the client connects
  //   function onConnect() {
  //     console.log(`jalannnnnnnn`);
  //     client.subscribe(`dt/${deviceId}/status`, {qos: 1});
  //   }

  //   function getInfo() {
  //     client.subscribe(`dt/${deviceId}/status`, {qos: 1});
  //   }

  //   // called when the client loses its connection
  //   function onConnectionLost(responseObject) {
  //     if (responseObject.errorCode !== 0) {
  //       console.log('onConnectionLost:' + responseObject);
  //     }
  //   }

  //   // called when a message arrives
  //   function onMessageArrived(message) {
  //     console.log('status >>>', message);
  //   }
  // };

  // const handleSaveSsiAndPassword = async()=>{
  //   await AsyncStorage.setItem('payload_wifi', JSON.stringify(payloads))
  // }

  // useEffect(() => {
  //   handleSaveSsiAndPassword()
  // }, [loading]);

  return (
    <View style={[styles.root, {backgroundColor: theme.colors.white}]}>
      <View style={styles.content}>
        <StepsAction
          Components={Components}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
        {openModalPasswordWifi && (
          <ModalPassword
            onOpen={openModalPasswordWifi}
            onClose={handleCloseModalWifiPassword}
            onWifi={isWifi}
            onChangePassword={handleChangePassword}
            onChangeGateway={handleChangeIpGateway}
            onModalPairing={handleChangeOpenModalPairing}
            payloads={payloads}
          />
        )}

        {openModalPairing && (
          <ModalSendWifi
            onOpenModal={openModalPairing}
            onClose={handleChangeCloseModalPairing}
            payloads={payloads}
            onSubmited={handleSubmitPairing}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PairingScreen;
