import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import ProfileScreen from '../screens/ProfileScreen';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const route = useRoute()
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {
        height: Platform.OS === 'ios' ? 87 : 55,
        borderTopWidth: 0,
        position: 'absolute',
        shadowOpacity: 0,
        elevation: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }}} initialRouteName="HomeStack">
        <Tab.Screen name="HomeStack" component={HomeStack} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <AntDesign name="home" size={size} color={focused ? '#1f1f1f' : 'gray'} />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: '#1f1f1f',
            tabBarInactiveTintColor: 'gray',
            title: 'Home',
            
        }}/>
        <Tab.Screen name="SearchStack" component={SearchStack} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <AntDesign name="search1" size={size} color={focused ? '#1f1f1f' : 'gray'} />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: '#1f1f1f',
            tabBarInactiveTintColor: 'gray',
            title: 'Search',
        }}/>
        <Tab.Screen name="OrdersStack" component={OrdersStack} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <Ionicons name="receipt-outline" size={size} color={focused ? '#1f1f1f' : 'gray'}  />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: '#1f1f1f',
            tabBarInactiveTintColor: 'gray',
            title: 'Orders',
        }}/>
        <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <Ionicons name="person-outline" size={size} color={focused ? '#1f1f1f' : 'gray'}  />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: '#1f1f1f',
            tabBarInactiveTintColor: 'gray',
            title: 'Profile',
        }}/>
    </Tab.Navigator>
  )
}

export default TabNavigation