import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrdersScreen from '../screens/OrdersScreen'
import AllPastOrders from '../screens/AllPastOrders'
import CartScreen from '../screens/CartScreen'
import PastOrderDetailsScreen from '../screens/PastOrderDetailsScreen'

const Stack = createNativeStackNavigator()

const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Orders' component={OrdersScreen} options={{headerShown: false}}/>
      <Stack.Screen name='AllPastOrders' component={AllPastOrders} options={{headerShown: false}}/>
      <Stack.Screen name='PastOrderDetails' component={PastOrderDetailsScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default OrdersStack