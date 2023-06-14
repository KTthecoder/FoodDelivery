import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeSmCategory = ({title, slug}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CategoriesResteurants', {category: slug})} 
    className='flex-row items-center bg-[#fff] py-2 px-4 rounded-lg mt-5 mr-5'>
      <Ionicons name="ios-fast-food-outline" size={25} color="#222" />
      <Text className='ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default HomeSmCategory