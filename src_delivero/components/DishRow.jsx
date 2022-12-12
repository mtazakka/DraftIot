import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Currency from 'react-currency-formatter';
import { urlFor } from '../../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { COLORS_PRIMARY } from '../utils/constant';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false)
  const dispatch = useDispatch()
  const items = useSelector((state) => selectBasketItemsWithId(state, id))

  const addItemtoBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
      <TouchableOpacity
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"
          }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className='flex-row '>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <Text className='text-gray-400'>
              <Currency
                quantity={price}
                currency="EUR"
              />
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri: urlFor(image).url()
              }}
              className='h-20 w-20 bg-gray-300 p-4'
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F$'
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}>
              <MinusCircleIcon size={40} color={items.length > 0 ? COLORS_PRIMARY : 'grey'} />
            </TouchableOpacity>
            <Text>
              {items.length}
            </Text>
            <TouchableOpacity onPress={addItemtoBasket}>
              <PlusCircleIcon size={40} color={COLORS_PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow