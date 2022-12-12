import React, {useCallback} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
// import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';
import Icon from 'react-native-vector-icons/MaterialIcons';
const pkg = DeviceInfo.getBundleId();

function ButtonTurnWifi(props) {
 const theme =  useTheme()
//   const _openSettings = useCallback(async () => {
//     //    await Linking.openSettings();
//     console.log('pkg', pkg);
//     // if (Platform.OS === 'ios') {
//     //   Linking.openURL('app-settings:');
//     // } else {
//     //   IntentLauncher.startActivity({
//     //     action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
//     //     data: 'package:' + pkg,
//     //   });
//     // }

//     IntentLauncher.startActivity({
//       action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
//       data: 'package:' + pkg,
//     });
//   }, []);

const _openSettings = ()=>{
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')
      } 
      // else {
      //   IntentLauncher.startActivity({
      //     action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
      //     data: 'package:' + pkg
      //   })
      // }
}

  return (
    <View>
      <TouchableOpacity onPress={_openSettings}>
        <View style={[styles.root,{backgroundColor:theme.colors.primary}]}>
          <Text style={{color:'#FFFFFF'}}>Nyalakan Wifi</Text>
          <Icon name="wifi-off" size={16} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 6,
  },
});

export default ButtonTurnWifi;
