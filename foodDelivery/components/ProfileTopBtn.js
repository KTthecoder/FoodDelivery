import { Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ProfileTopBtn = ({title}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            if(title === 'Favorite'){
                navigation.navigate('Favorite')
            }

            if(title === 'Settings'){
                navigation.navigate('')
            }

            if(title === 'Orders'){
                navigation.navigate('Cart')
            }
        }} className='items-center justify-center rounded-lg bg-[#e9e9e9]' style={{width: width * 0.24, height: width * 0.25}}>
            {title === 'Favorite' ? <AntDesign name="hearto" size={26} color="black" /> : null}
            {title === 'Settings' ? <Feather name="settings" size={26} color="black" /> : null}
            {title === 'Orders' ? <Ionicons name="receipt-outline" size={26} color='black'  /> : null}
            <Text className='text-sm mt-2' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileTopBtn