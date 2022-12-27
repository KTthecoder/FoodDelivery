import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress'
import MapView, { Callout, Marker } from 'react-native-maps'
import useFetchGet from '../hooks/useFetchGet'
import { Entypo } from '@expo/vector-icons'; 

const MapScreen = () => {
    const navigation = useNavigation()

    const { data, refresh, setRefresh } = useFetchGet('http://192.168.1.34:8000/api/order/current')
    const { data:user } = useFetchGet('http://192.168.1.34:8000/api/profile')

    const { width } = Dimensions.get('screen')

    const [ resteurantPin, setResteurantPin ] = useState({
		latitude: 52.223357,
		longitude: 20.983412, 
	})

    const [ userPin, setUserPin ] = useState({
		latitude: 52.2310705689468,
		longitude: 21.005230266164727
	})

	const [ region, setRegion ] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})


    return (
        <View className='flex-1 bg-[#00CCBB]'>
            <SafeAreaView className='items-center'>
                <View className='z-50' style={{width: width * 0.9}}>
                    <View className='flex-row justify-between items-center' >
                        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-white rounded-full items-center justify-self-center' style={{width: 40, height: 40}}>
                            <Entypo name="cross" size={35} color="black" />
                        </TouchableOpacity>
                        <Text className='font-light text-white text-lg'>Order Help</Text>
                    </View>
                    <View className='bg-white rounded-md z-50 shadow-md justify-center items-center py-5 my-8' style={{width: width * 0.9}}>
                        <View className='flex-row justify-center'>
                            <View className='justify-center items-center'>
                                <Text className='text-gray-400 text-lg'>Estimated Arrival</Text>
                                <Text className='text-2xl font-bold my-1'>{data && data['Current Order']['resteurant']['waitingTime']}</Text>
                            </View>
                            {/* <Image source={{
                                uri: 'https://links.papareact.com/fls'
                            }} className='h-20 w-20' /> */}
                        </View>
                        <Progress.Bar size={20} color='#00CCBB' indeterminate={true}/>

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

                {/* <SafeAreaView className='bg-white flex-row items-center space-x-5 h-15 pb-5'>
                    <Image source={{
                        uri: 'https://links.papareact.com/wru',
                    }} className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'/>
                    <View className='flex-1'>
                        <Text className='text-lg'>Sonny Sangha</Text>
                        <Text className='text-gray-400'>Your Rider</Text>
                    </View>
                    <Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Call</Text>
                </SafeAreaView> */}
            </View>
    )
}

export default MapScreen