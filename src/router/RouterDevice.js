import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import AddDevice from '../screens/Device/AddDevice';
import ProfileScreen from '../screens/User/components/ProfileScreen';
import GateAction from '../screens/Device/Gate/GateActionScreen';
import ButtonBack from '../components/Buttons/ButtonBack'

import ButtonSetting from '../components/Buttons/ButtonSetting';
import RouterSettingGate from './RouterSettingGate';
import FormAddDevice from '../screens/Device/FormAddDevice';
import PairingScreen from '../screens/Device/Pairing';
import ScanDevice from '../screens/Device/Pairing/components/ScanDevice';
import DeviceConnected from '../screens/Device/Pairing/components/DeviceConnected';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator();

function RouterDevice(props) {
const theme =  useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={DashboardScreen}
        name="Home"
        options={{
          headerShown: false,
          title: 'Home',
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="add device"
        component={AddDevice}
        options={{
          headerShown: true,
          title: 'Tambah Alat',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0},
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="form add device"
        component={FormAddDevice}
        options={{
          headerShown: true,
          title: 'Tambah Alat',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0},
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0,backgroundColor:theme.colors.background},
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="Gerbang"
        component={GateAction}
        options={{
          headerShown: true,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor:theme.colors.background
          },
          headerTitleAlign: 'center',
          headerRight: () => <ButtonSetting />,
          headerLeft: () => <ButtonBack />,
        }}
        
      />

      <Stack.Screen
        name="setting gate"
        component={RouterSettingGate}
        options={{
          headerShown: false,
          title: 'pengaturan',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0},
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="pairing"
        component={PairingScreen}
        options={{
          headerShown: true,
          title: 'Pairing',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0},
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="scan device"
        component={ScanDevice}
        options={{
          headerShown: true,
          title: ' ',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0}, 
        }}
      />

      <Stack.Screen
        name="connected device"
        component={DeviceConnected}
        options={{
          headerShown: true,
          title: ' ',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0}, 
        }}
      />
    </Stack.Navigator>
  );
}

export default RouterDevice;
