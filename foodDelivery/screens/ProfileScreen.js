import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileTopBtn from '../components/ProfileTopBtn';
import ProfileBotBtn from '../components/ProfileBotBtn';
import { useNavigation, useRoute, useScrollToTop } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';
import useFetchGet from '../hooks/useFetchGet';

const ProfileScreen = () => {
  const { width } = Dimensions.get('screen')
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const { logoutUser } = useContext(AuthContext)

  // const [data, setData] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const { accessToken } = useContext(AuthContext)
  const route = useRoute()
  const navigation = useNavigation()

  const { data } = useFetchGet('http://192.168.1.34:8000/api/profile')

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     fetch('http://192.168.1.34:8000/api/profile', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization' : 'Bearer ' + accessToken
  //       }
  //     })
  //     .then(res => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setIsLoading(false)
  //       // console.log(data)
  //     })
  //     .catch(err => {
  //       console.log(err.message)
  //     })
  //   })
   
  // }, [])

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView ref={ref} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        <View className='items-start mt-5' style={{width: width * 0.9}}> 
          <Text className='text-2xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['name']} {data && data['lastName']}</Text>
          <Text className='text-sm mt-2' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['phoneNr']}</Text>
        </View>
        <View className='items-start justify-between flex-row mt-7' style={{width: width * 0.9}}>
          <ProfileTopBtn title='Favorite' />
          <ProfileTopBtn title='Settings' />
          <ProfileTopBtn title='Orders' />
        </View>
        <View className='items-start justify-start mt-5' style={{width: width * 0.9}}>
          <ProfileBotBtn title='Payment' />
          <ProfileBotBtn title='Promo Codes' />
          <ProfileBotBtn title='Privacy' />
          <ProfileBotBtn title='About' />
          <ProfileBotBtn title='Help' />
          <TouchableOpacity onPress={() => logoutUser()} className='items-center justify-center rounded-lg bg-red-500 py-3 mt-8' style={{width: width * 0.9, borderBottomWidth: 1, borderColor: '#dedede'}}>
            <Text className='text-base text-white' style={{fontFamily: 'Montserrat-Medium'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen