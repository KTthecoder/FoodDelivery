import React, { useContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import DeliveryInfoScreen from '../screens/DeliveryInfoScreen'
import DetailsResteurantScreen from '../screens/DetailsResteurantScreen'
import ProductDetails from '../screens/ProductDetails'
import DeliveryFormScreen from '../screens/DeliveryFormScreen'
import DeliveryFormEditScreen from '../screens/DeliveryFormEditScreen'
import { AuthContext } from '../contexts/AuthProvider'
import { ActivityIndicator, View } from 'react-native'

const Stack = createNativeStackNavigator()

const HomeStack = () => {

  // const {refreshToken} = useContext(AuthContext)

  // if(!refreshToken){
  //   return (
  //     <View className='h-screen justify-center items-center w-screen mt-5'>
  //       <ActivityIndicator size='large' color='black' />
  //     </View>
  //   )
  // }

  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} initialParams={{loading: true}} options={{headerShown: false}}/>
      {/* <Stack.Screen name='DetailsResteurantScreen' component={DetailsResteurantScreen} options={{headerShown: false}}/> */}
      {/* <Stack.Screen name='DeliveryInfo' component={DeliveryInfoScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} /> */}
      {/* <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} /> */}
      {/* <Stack.Screen name='DeliveryForm' component={DeliveryFormScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} /> */}
      <Stack.Screen name='DeliveryFormEdit' component={DeliveryFormEditScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} />
    </Stack.Navigator>
  )
}

export default HomeStack