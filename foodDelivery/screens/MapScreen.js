import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'
import useFetchGet from '../hooks/useFetchGet'
import { AntDesign } from '@expo/vector-icons'; 

const MapScreen = () => {
    const navigation = useNavigation()

    const { data } = useFetchGet('http://192.168.1.34:8000/api/order/current')
    const { data:user } = useFetchGet('http://192.168.1.34:8000/api/profile')

    const { width } = Dimensions.get('screen')

    const [ resteurantPin, setResteurantPin ] = useState({
		latitude: 52.223357,
		longitude: 20.983412, 
	})

    return (
        <View className='flex-1' >
            <SafeAreaView className='items-center absolute top-0 w-screen' style={{zIndex: 1}}>
                <View className='' style={{width: width * 0.9}}>
                    <View className='flex-row justify-between items-center' >
                        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-[#0082F6] rounded-full items-center justify-center' style={{width: 40, height: 40}}>
                            <AntDesign name="left" size={23} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity  className='bg-[#0082F6] rounded-full items-center justify-center' style={{width: 65, height: 40}}>
                            <Text className='font-light text-white text-base' style={{fontFamily: 'Montserrat-Regular'}}>Help</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='bg-white rounded-md  shadow-md justify-center items-center py-5 my-8' style={{width: width * 0.9}}>
                        <View className='flex-row justify-center'>
                            <View className='justify-center items-center'>
                                <Text className='text-gray-400 text-lg'>Estimated Arrival</Text>
                                <Text className='text-2xl font-bold my-1'>{data && data['Current Order']['resteurant']['waitingTime']}</Text>
                            </View>
                        </View>
                        <Progress.Bar size={20} color='#0082F6' indeterminate={true}/>
                        <Text className='mt-3 text-gray-500'>Your order at {data && data['Current Order']['resteurant']['title']} is being prepared</Text>
                    </View>
                </View>
            </SafeAreaView>
                {data && <MapView
                    initialRegion={{
                        latitude: data['Current Order']['resteurant']['latitude'],
                        longitude: data['Current Order']['resteurant']['longitude'],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    className='flex-1 -mt-10 z-0'
                    mapType='mutedStandard'
                    provider='google'
                >
                    <Marker coordinate={{
                        latitude: resteurantPin.latitude,
                        longitude: resteurantPin.longitude,
                    }} 
                        title={user && user.name + " " + user.lastName}
                        identifier='origin'
                        pinColor='black'
                    />

                    <Marker coordinate={{
                        latitude: data['Current Order']['resteurant']['latitude'],
                        longitude: data['Current Order']['resteurant']['longitude'],
                    }} 
                        title={data && data['Current Order']['resteurant']['title']}
                        identifier='origin'
                        pinColor='red'
                    />
                </MapView>}
            </View>
    )
}

export default MapScreen