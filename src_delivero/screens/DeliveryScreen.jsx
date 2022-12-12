import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon } from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress';
import { COLORS_PRIMARY } from '../utils/constant'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XCircleIcon color='white' size={30} />
          </TouchableOpacity>
          <Text className='text-white font-light text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arival</Text>
              <Text className='text-3xl font-bold'>45 - 55 minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls"
              }}
              className='h-20 w-20'
            />
          </View>
          <Progress.Bar size={30} color={COLORS_PRIMARY} indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at <Text className='font-bold'>{restaurant.title}</Text> is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className='flex-1 -mt-10 z-10'
        mapType='mutedStandard'
      >
        <Marker
          // key={index}
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier='origin'
          pinColor='#00CCBB'
        />
      </MapView>
      <View className='bg-white flex-row items-center space-x-5 h-28'>
        <Image
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
        />
      <View className='flex-1'>
        <Text className='text-lg'>Tazakka</Text>
        <Text className='text-gray-400'>Your Rider</Text>
      </View>
      <Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Call</Text>
      </View>
    </View>
  )
}

export default DeliveryScreen