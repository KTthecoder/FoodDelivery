import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const DeliveryInfoBlock = ({street, city, id}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <View className='flex-row items-center justify-between pb-4 mb-4' style={{width: width * 0.9, borderBottomWidth: 1, borderColor: '#dedede'}}>
            <View className='flex-row items-center'>
                <EvilIcons name="location" size={30} color="black" />
                <View className='ml-2'>
                    <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>{street}</Text>
                    <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular'}}>{city}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryFormEdit', {id : id})}>
                <Feather name="edit" size={26} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default DeliveryInfoBlock