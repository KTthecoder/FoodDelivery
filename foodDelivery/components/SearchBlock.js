import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBlock = ({title, categoryTitle, slug, image}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('DetailsResteurantScreen', { slug: slug })}} className='flex-row items-center justify-between py-4' style={{width: width * 0.9, borderBottomWidth: 1, borderBottomColor: '#dedede'}}>
            <View className='flex-row items-center'>
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: 70, height: 55}} className='rounded-sm'  />
                <View className='ml-3'>
                    <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
                    <Text className='text-xs' style={{fontFamily: 'Montserrat-Regular'}}>{categoryTitle}</Text>
                </View>
            </View>
            <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default SearchBlock