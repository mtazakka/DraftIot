import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import GateSetting from '../screens/Device/Gate/Settings';
import SettingSpeed from '../screens/Device/Gate/SettingSpeed';
import ButtonBack from '../components/Buttons/ButtonBack';
import ButtonSave from '../components/Buttons/ButtonSave';
import {useTheme} from 'react-native-paper';

const Stack = createStackNavigator();

function RouterSettingGate(props) {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={GateSetting}
        name="settings"
        options={{
          headerShown: true,
          title: 'Pengaturan Gerbang',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => <ButtonBack />,
        }}
      />

      <Stack.Screen
        name="setting speed"
        component={SettingSpeed}
        options={{
          headerShown: true,
          title: 'kecepatan',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => <ButtonBack />,
          headerRight: () => <ButtonSave />,
        }}
      />
    </Stack.Navigator>
  );
}

export default RouterSettingGate;
