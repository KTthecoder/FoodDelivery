import { View, Text, SafeAreaView, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeBlockBig from '../components/HomeBlockBig';
import { useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';
import { AuthContext } from '../contexts/AuthProvider';

const CategoriesResteurants = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()
  const route = useRoute()

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { accessToken } = useContext(AuthContext)

  const [data1, setData1] = useState('')

  const { data } = useFetchGet(`http://192.168.1.34:8000/api/category/${route.params.category}`)

  // if(isLoading){
  //   return(
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size='large' />
  //     </View>
  //   )
  // }

  return (
    <SafeAreaView className='bg-white flex-1'>
      {data && 
      <View className='w-screen justify-center items-center'>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <View className={`${Platform.OS === 'ios' ? 'pt-3' : 'pt-9'} items-center rounded-b-xl flex-row`} style={{width: width * 0.9}}>
            <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-full justify-center items-center mr-3'>
              <AntDesign name="left" size={26} color="black" />
            </TouchableOpacity>
            <View className='bg-[#f1f1f1] rounded-xl flex-row px-2 items-center flex-1'>
              <AntDesign name="search1" size={22} color="gray" />
              <TextInput 
                onChangeText={(value) => {
                  if(value != ''){
                      fetch(`http://192.168.1.34:8000/api/search/resteurant/${value}/${route.params.category}`, {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : 'Bearer ' + accessToken
                          }
                        })
                        .then(res => res.json())
                        .then((data) => {
                          setData1(data)
                          console.log(data)
                        })
                        .catch(err => {
                          console.log(err.message)
                        })
                  }   
                  if(value  === ''){
                    setData1('')
                  }                           
              }}
              placeholder='Search in Italian' className='flex-1 ml-2 text-sm py-2' style={{fontFamily: 'Montserrat-Regular', color: 'gray'}}/>
            </View>
          </View>
          <ScrollView ref={ref} className='mt-8 w-screen' showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 120}}>
            <View style={{width: width * 0.9}}>
              <View className='flex-row items-center'>
                <Text className='text-2xl mr-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['title']}</Text>
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data && data['icon']}`}} style={{width: 30, height: 30}} />
              </View>
            </View>
            <View className='mt-3 pb-6 w-screen items-center rounded-xl'>
              {data1 && data1 != '' ? (
                data1.map((item) => (
                  <HomeBlockBig id={item.id} title={item.title} image={item.image} waitingTime={item.waitingTime} rating={item.rating} deliveryFeePrice={item.deliveryFeePrice} discountDeliveryFeePrice={item.discountDeliveryFeePrice} slug={item.slug} key={item.id} />
                ))
              ) : (
                data['resteurants'].map((item) => (
                  <HomeBlockBig id={item.id} title={item.title} image={item.image} waitingTime={item.waitingTime} rating={item.rating} deliveryFeePrice={item.deliveryFeePrice} discountDeliveryFeePrice={item.discountDeliveryFeePrice} slug={item.slug} key={item.id} />
                ))
              )}
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </View>
      }
      
    </SafeAreaView>
  )
}

export default CategoriesResteurants