import { Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileBotBtn = ({title}) => {
    const { width } = Dimensions.get('screen')

    return (
        <TouchableOpacity className='flex-row items-center justify-start rounded-lg py-5' style={{width: width * 0.9, borderBottomWidth: 1, borderColor: '#dedede'}}>
            {title === 'Payment' ? <MaterialIcons name="payment" size={28} color="black" /> : null}
            {title === 'Promo Codes' ? <MaterialCommunityIcons name="label-percent-outline" size={28} color="black" /> : null}
            {title === 'Privacy' ? <MaterialIcons name="security" size={28} color="black" /> : null}
            {title === 'About' ? <Feather name="info" size={28} color="black" /> : null}
            {title === 'Help' ? <Feather name="help-circle" size={28} color="black" /> : null}
            <Text className='text-base ml-3' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileBotBtn