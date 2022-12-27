import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SearchCategoryBlock = ({title, image, slug}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('CategoriesResteurants', {category: slug})} className='mb-5 rounded-lg items-center' style={{width: width * 0.42, borderColor: '#c9c9c9', borderWidth: 1}}>
            <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: '100%', height: 95}} className='rounded-t-lg'  />
            <View className='justify-center items-center'>
                <Text className='py-3 px-3' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SearchCategoryBlock