import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthProvider';
import useFetchGet from '../hooks/useFetchGet'

const HomeRowBlock = ({title, image, deliveryFeePrice, discountDeliveryFeePrice, waitingTime, rating, slug, id}) => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()
  const { user, accessToken } = useContext(AuthContext)

  // const { data, refresh, setRefresh } = useFetchGet(`http://192.168.1.34:8000/api/resteurant/favorite/${id}`)

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsResteurantScreen', { slug: slug })} className='mt-6 mr-5' style={{width: width * 0.65}}>
      {/* {data && data['Error'] != 'No Favorite' ? (
        <TouchableOpacity 
        onPress={() => {
          fetch(`http://192.168.1.34:8000/api/resteurant/favorite/remove`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                  'user': user['user_id'],
                  'resteurant': id,
                  'favorite' : true
                })
            })
            .then(res => res.json())
            .then((data) => {
              // console.log(data)
              // navigation.dispatch()
              // navigation.push('Cart')
              setRefresh(!refresh)
              setResponse(data)
            })
            .catch(err => {
              console.log(err.message)
            })
          }}
        className='absolute top-4 right-4' style={{zIndex: 1}}>
          <AntDesign name="heart" size={25} color="red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          onPress={() => {
            fetch(`http://192.168.1.34:8000/api/resteurant/favorite/add`, {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                  },
                  body: JSON.stringify({
                    'user': user['user_id'],
                    'resteurant': id,
                    'favorite' : true
                  })
              })
              .then(res => res.json())
              .then((data) => {
                // console.log(data)
                // navigation.dispatch()
                // navigation.push('Cart')
                setRefresh(!refresh)
                setResponse(data)
              })
              .catch(err => {
                console.log(err.message)
              })
            }}
        className='absolute top-4 right-4' style={{zIndex: 1}}>
          <AntDesign name="hearto" size={25} color="white" />
        </TouchableOpacity>
      )} */}
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