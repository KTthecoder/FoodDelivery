import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderPastBlock = ({title, price, image, count, id, slug}) => {
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PastOrderDetails', {id: id})} className='items-center pb-5 mb-5' style={{width: '100%', borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
        <View className='flex-row items-center'>
            <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: 80, height: 60}}  />
            <View className='flex-1 ml-3'>
                <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
                <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular', marginTop: 2}}>{count} items · ${price}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DetailsResteurantScreen', {slug: slug})} className='bg-[#dedede] py-2 px-3 rounded-lg'>
                <Text className='text-black text-sm' style={{fontFamily: 'Montserrat-Regular'}}>View Shop</Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}

export default OrderPastBlock