import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import FavoriteScreen from '../screens/FavoriteScreen'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
      {/* <Stack.Screen name='Favorite' component={FavoriteScreen} options={{headerShown: false}}/> */}
    </Stack.Navigator>
  )
}

export default ProfileStack