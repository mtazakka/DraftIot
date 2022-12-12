
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import sanityClient from '../../sanity';
import { urlFor } from '../../sanity'
import CatagoryCard from './CatagoryCard';

const Catagories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == "category"]
      `
    ).then((data) => {
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {categories?.map((category)=>(
        <CatagoryCard
          key={category._id}
          imgUrl= {urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
}

export default Catagories;
