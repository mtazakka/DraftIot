import {
  View, Text, Image, TextInput, ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { COLORS_PRIMARY } from '../utils/constant';
import Catagories from '../components/Catagories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../../sanity';

// eslint-disable-next-line react/function-component-definition
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == "featured"]{
        ...,
        restaurants[] ->{
          ...,
          dishes[]->
        }
      }`
    ).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])


  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Heaeder */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 tet-xs">
            Deliver Now!
          </Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color={COLORS_PRIMARY} />
          </Text>
        </View>
        <UserIcon size={35} color={COLORS_PRIMARY} />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Reastaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={COLORS_PRIMARY} />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        {/* Catagories */}
        <Catagories />

        {/* Featured row */}
        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
