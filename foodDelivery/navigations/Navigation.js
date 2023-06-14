import { View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthProvider'
import MapScreen from '../screens/MapScreen'
import DetailsResteurantScreen from '../screens/DetailsResteurantScreen'
import ProductDetails from '../screens/ProductDetails'
import CategoriesResteurants from '../screens/CategoriesResteurants'
import CartScreen from '../screens/CartScreen'
import FavoriteScreen from '../screens/FavoriteScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { isLoading, refreshToken } = useContext(AuthContext)

  if(isLoading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <>
    <Stack.Navigator>
      {refreshToken === null ? (
          <>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} /> 
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} /> 
          </>
      ) : (
        <>
          <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}}/>
          <Stack.Screen name='MapView' component={MapScreen} options={{headerShown: false}}/>
          <Stack.Screen name='DetailsResteurantScreen' component={DetailsResteurantScreen} options={{headerShown: false}}/>
          <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} />
          <Stack.Screen name='CategoriesResteurants' component={CategoriesResteurants} options={{headerShown: false}}/>
          <Stack.Screen name='Cart' component={CartScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Favorite' component={FavoriteScreen} options={{headerShown: false}}/>
        </>
          
      )}
       </Stack.Navigator>
    </>
  )
}

export default Navigation