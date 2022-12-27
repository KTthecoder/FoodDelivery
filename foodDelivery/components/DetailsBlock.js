import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DetailsBlock = ({data, resteurantId}) => {
    const { width, height } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', 
            {
                title : data.title,
                regularPrice: data.regularPrice,
                discountPrice : data.discountPrice,
                description: data.description,
                image: data.image,
                slug: data.slug,
                id: data.id,
                resteurantId: resteurantId,
            }
        )} 
        className={`justify-between items-start flex-row mt-5 pt-5`} style={{width: width * 0.9, borderTopColor: '#dedede', borderTopWidth: 1}}> 
            <View className='flex-1 mr-4'>
                <Text className='text-base mb-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data.title}</Text>
                <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular'}}>{data && data.description}</Text>
                <View className='flex-row items-center mt-2'>
                    {data && data.discountPrice === null ? (
                        <Text className='text-base mr-3' style={{fontFamily: 'Montserrat-Medium'}}>${data && data.regularPrice}</Text>
                    ) : (
                        <>
                            <Text className='text-sm mr-3' style={{fontFamily: 'Montserrat-Medium', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${data && data.regularPrice}</Text>
                            <View className='bg-red-500 rounded-full py-1 px-2'>
                                <Text className='text-sm text-white' style={{fontFamily: 'Montserrat-Medium'}}>${data && data.discountPrice}</Text>
                            </View>
                        </>
                    )}             
                </View>
            </View>
            <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data && data.image}`}} style={{width: '35%', height: 100, resizeMode: 'cover'}} />

        </TouchableOpacity>
    )
}

export default DetailsBlock