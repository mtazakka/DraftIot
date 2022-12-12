import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';
import LoadingScreen from '../../assets/loading.gif'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation()
  useEffect( () =>{
    setTimeout(() => {
      navigation.navigate("Delivery")    
    }, 4000);
  },[])

  return (
    <SafeAreaView
      className='bg-[#30A6B6] flex-1 items-center justify-center'>
      <Animatable.Image
        source={LoadingScreen}
        animation="slideInUp"
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        direction="alternate"
        className='text-lg my-10 text-white font-bold text-center'
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='white'/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen