import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ProfileScreen from '../screens/User/components/ProfileScreen';
import ButtonBack from '../screens/Buttons/ButtonBack/ButtonBack';

const Stack = createStackNavigator();

function RouterProfile(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Profil',
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, shadowOpacity: 0},
          headerLeft: () => <ButtonBack />,
        }}
      />
    </Stack.Navigator>
  );
}

export default RouterProfile;
