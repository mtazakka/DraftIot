import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import BasketScreen from '../screens/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';


const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Basket" component={BasketScreen}
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PreparingOrderScreen" 
        component={PreparingOrderScreen} 
        options={{ 
          headerShown: false,
          presentation: "fullScreenModal"
          }} />
      <Stack.Screen
        name="Delivery"
        component={DeliveryScreen}
        options={{
          headerShown: false,
          presentation: "fullScreenModal"
        }} />
    </Stack.Navigator>
  )
}

export default Navigator