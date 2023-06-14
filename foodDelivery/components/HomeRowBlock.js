import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeRowBlock = ({title, image, deliveryFeePrice, discountDeliveryFeePrice, waitingTime, rating, slug}) => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsResteurantScreen', { slug: slug })} className='mt-6 mr-5' style={{width: width * 0.65}}>
      <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: '100%', height: 130}} />
      <View className='flex-row justify-between mt-2'>
        <View className=''>
          <Text className='text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
          {discountDeliveryFeePrice ? (
            <>
              <Text className='text-[#8c8c8c] text-xs' style={{marginTop: 2, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${deliveryFeePrice} Fee</Text>
              <Text className='text-[#434343]' style={{marginTop: 2}}>${discountDeliveryFeePrice} Fee · {waitingTime}</Text> 
            </>
          ) : (
            <Text className='text-[#434343]' style={{marginTop: 2}}>${deliveryFeePrice} Fee · {waitingTime}</Text> 
          )}
        </View>
        <View className='rounded-full items-center justify-center bg-[#f4f4f4]' style={{width: 33, height: 33}}>
          <Text className='text-black text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HomeRowBlock