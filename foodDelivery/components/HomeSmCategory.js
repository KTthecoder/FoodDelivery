import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeSmCategory = ({title, icon, slug}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CategoriesResteurants', {category: slug})} 
    className='flex-row items-center bg-[#fff] py-2 px-4 rounded-lg mt-5 mr-5'>
      <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${icon}`}} style={{width: 25, height: 25}} />
      <Text className='ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default HomeSmCategory