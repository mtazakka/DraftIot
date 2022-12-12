import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RouterLogin from './RouterLogin';
import RouterDevice from './RouterDevice';
import SplashScreen from '../screens/Splash';
import StoreContext from '../store/context';

const Stack = createStackNavigator();

function Routers(props) {
  const usedContext = useContext(StoreContext);
  const {logout} = usedContext;
  const [foundToken, setFoundToken] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  const checkToken = async () => {
    try {
      setIsLoad(true); //Bisa dihilangkan
      let findingToken = await AsyncStorage.getItem('token');
      const token = JSON.parse(findingToken);
      setTimeout(() => {
        setFoundToken(findingToken);
        setIsLoad(false);
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    checkToken();
  }, [logout]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {foundToken ? (
          <Stack.Screen
            component={RouterDevice}
            name="Dashboard"
            options={{headerShown: false}}
          />
        ) : isLoad ? (
          <Stack.Screen
            component={SplashScreen}
            name="Splash"
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={RouterLogin}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routers;
