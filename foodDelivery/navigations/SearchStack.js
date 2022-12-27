import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../screens/SearchScreen'
import CategoriesResteurants from '../screens/CategoriesResteurants'
import SearchModuleScreen from '../screens/SearchModuleScreen'

const Stack = createNativeStackNavigator()

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
      {/* <Stack.Screen name='CategoriesResteurants' component={CategoriesResteurants} options={{headerShown: false}}/> */}
      <Stack.Screen name='SearchModuleScreen' component={SearchModuleScreen} options={{headerShown: false, presentation: 'card', animation: 'slide_from_bottom'}}/>
    </Stack.Navigator>
  )
}

export default SearchStack