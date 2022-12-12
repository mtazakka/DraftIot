import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  PermissionsAndroid,
  StyleSheet,
  Text,
  Linking,
  ScrollView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useTheme} from 'react-native-paper';

import HeaderContent from './components/HeaderContent';
import InputWifi from './components/InputWifi';
import {NetworkInfo} from 'react-native-network-info';
import WifiManager from 'react-native-wifi-reborn';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl, TouchableOpacity} from 'react-native-gesture-handler';
import ButtonTurnWifi from '../../../components/Buttons/ButtonTurnWifi';

function FormAddDevice(props) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [wifiActive, setWifiActive] = useState(false);
  const [isWifi, setIsWifi] = useState({status: false, name: ''});
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({status: false, message: ''});
  const [refresh, setRefresh] = useState(false);
  const [payload, setPayload] = useState({
    ssid: '',
    gateway: '',
    password: '',
  });

  const handleCheckWifiOn = async () => {
    await NetInfo.fetch().then(state => {
      if (state.details.type === 'cellular') {
        setVisible(true);
        setIsWifi({...isWifi, status: true});
      } else {
        setVisible(false);
        setIsWifi({...isWifi, status: false, name: state.details.ssid});
      }
    });

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      // WifiManager.getCurrentWifiSSID().then(
      //   ssid => {
      //     console.log('Your current connected wifi SSID is ' + ssid);
      //     setIsWifi({...isWifi, name: ssid});
      //     setPayload({...payload, ssid: ssid});
      //   },
      //   () => {
      //     console.log('Cannot get current SSID!');
      //   },
      // );
    } else {
      // Permission denied
    }

    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      setPayload({...payload, gateway: defaultGateway});
    });
  };

  const handleTurnOnWifi = async () => {
    const turnOn = await startActivityAsync(
      (ActivityAction.WIFI_SETTINGS = 'android.settings.WIFI_SETTINGS'),
    );
    if (turnOn.resultCode === 0) {
      setIsWifi({...isWifi, status: false});
      handleCheckWifiOn();
    }
  };

  const handleCheckWifi = async () => {
    const isWifi = await WifiManager.isEnabled();
    console.log('is wifi status', isWifi);
    if (isWifi === false) {
      setWifiActive(true);
    } else {
      setWifiActive(false);
    }
    return;
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      handleCheckWifi();
      setRefresh(false);
    }, 3000);
  }, []);

  useEffect(() => {
    handleCheckWifiOn();
    handleCheckWifi();
  }, []);

  const handleChangePasswordWifi = param =>
    setPayload({...payload, password: param, ssid: isWifi.name});

  const handleSubmitWifi = async () => {
    navigation.navigate('pairing', {
      payload: {ssid: isWifi.name, pass: payload.password},
    });
  };

  console.log('is wifi', isWifi);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <View style={[styles.root, {backgroundColor: theme.colors.white}]}>
        {wifiActive && (
          <View style={styles.containerButtonWifi}>
            <ButtonTurnWifi />
          </View>
        )}

        <View style={styles.containerHeader}>
          <HeaderContent />
        </View>

        <View style={styles.containerForm}>
          <InputWifi
            onValueWifi={isWifi.name}
            onChangePassword={handleChangePasswordWifi}
            onSubmitWifi={handleSubmitWifi}
            onActiveWifi={wifiActive}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  containerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
  },
  containerForm: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flex: 2,
  },
  containerButtonWifi: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});

export default FormAddDevice;
