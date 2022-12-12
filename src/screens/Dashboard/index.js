import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar, Text, useTheme} from 'react-native-paper';
import StoreContext from '../../store/context';
import Devices from './Devices';
import HeaderDashboard from './HeaderDashboard';
import Gate from '../../assets/gate.png';
import {useNavigation} from '@react-navigation/native';

// const menus = [
//   {id: 1, title: 'Gerbang', link: 'Gerbang', icon: Gate},
//   {id: 2, title: 'Kulkas', link: 'Kulkas', icon: Gate},
//   {id: 3, title: 'Lampu', link: 'Lampu', icon: Gate},
//   {id: 4, title: 'CCTV', link: 'CCTV', icon: Gate}
// ];
const menus = [];

function DashboardScreen(props) {
  const usedContext = useContext(StoreContext);
  const {mqtt, client} = usedContext;
  const navigation = useNavigation();
  const theme = useTheme();

  const [status, setStatus] = useState({
    status: false,
    message: '',
  });
  const [statusDevice, setStatusDevice] = useState({
    status: false,
    message: '',
  });

  function checkStatus() {
    if (mqtt) {
      client.subscribe(`dt/device_1/status`, {qos: 0});
      client.onMessageArrived = onMessage;
    }
  }

  useEffect(() => {
    checkStatus();
  }, [mqtt]);

  function onMessage(message) {
    const statusDevice = message.payloadString;
    const topic = message.destinationName;

    if (statusDevice === 'ONLINE' && topic === 'dt/device_1/status') {
      setStatusDevice({status: true, message: 'ONLINE'});
    } else if (statusDevice === 'OFFLINE' && topic === 'dt/device_1/status') {
      setStatusDevice({status: false, message: 'OFFLINE'});
      setStatus({status: true, message: `${menus[0].title} sedang OFFLINE`});
    }
  }

  function handleClickDevice(link) {
    if (!statusDevice.status) {
      setStatus({status: true, message: `${menus[0].title} sedang OFFLINE`});
    } else {
      navigation.navigate(link);
    }
  }

  const onDismissSnackBar = () => setStatus({status: false, message: ''});

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <HeaderDashboard />
      <Devices
        menus={menus}
        statusDevice={statusDevice}
        handleClickDevice={handleClickDevice}
      />

      {status.status && (
        <View style={styles.snackbar}>
          <Snackbar
            visible={status.status}
            onDismiss={onDismissSnackBar}
            duration={1500}>
            <Text style={{textAlign: 'right', color: 'white'}}>
              {status.message}
            </Text>
          </Snackbar>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  snackbar: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 24,
    marginBottom: 110,
  },
});

export default DashboardScreen;
