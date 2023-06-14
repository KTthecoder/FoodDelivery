import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderCurrentBlock = ({title, image, orderTotal, slug, count}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <View className='items-center pb-4' style={{width: '100%', borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
            <View className='flex-row items-center'>
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: 80, height: 60}}  />
                <View className='flex-1 ml-3'>
                    <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
                    <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular', marginTop: 2}}>{count} items · ${orderTotal}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsResteurantScreen', {slug: slug})} className='bg-[#dedede] py-2 px-3 rounded-lg'>
                    <Text className='text-black text-sm' style={{fontFamily: 'Montserrat-Regular'}}>View Shop</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MapView')} className='bg-blue-500 items-center justify-center py-3 rounded-lg mt-5' style={{width: width * 0.9}}>
                <Text className='text-white text-base' style={{fontFamily: 'Montserrat-Medium'}}>See Order</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderCurrentBlock