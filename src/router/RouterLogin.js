import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
// import LoginScreen from '../screens/Login';
import WelcomeScreen from '../screens/Login/components/WelcomeScreen';
import FormLogin from '../screens/Login/components/FormLogin/FormLogin';
import SignupScreen from '../screens/Signup';

const Stack = createStackNavigator();

function RouterLogin() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={WelcomeScreen}
        name="welcome screen"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={FormLogin}
        name="form login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="sign up"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RouterLogin;
