import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import DeliveryFormEditScreen from '../screens/DeliveryFormEditScreen'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} initialParams={{loading: true}} options={{headerShown: false}}/>
      <Stack.Screen name='DeliveryFormEdit' component={DeliveryFormEditScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} />
    </Stack.Navigator>
  )
}

export default HomeStack