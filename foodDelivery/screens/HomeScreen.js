import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, ScrollView, Platform, Touchable, FlatList, RefreshControl } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useScrollToTop } from '@react-navigation/native';

import HomeSmCategory from '../components/HomeSmCategory';
import HomeRow from '../components/HomeRow';;
import HomeBlockBig from '../components/HomeBlockBig';
import { AuthContext } from '../contexts/AuthProvider';
import useFetchGet from '../hooks/useFetchGet';

const HomeScreen = () => {
    const { width } = Dimensions.get('screen')

    // const [data, setData] = useState()
    // const [loading, setLoading] = useState(true)
    // const { accessToken, isLoading } = useContext(AuthContext)

    const navigation = useNavigation()
    const route = useRoute()

    const ref = React.useRef(null);
    useScrollToTop(ref);
    const [rControl, setRControl] = useState(false)

    const { data, refresh, setRefresh, isLoading } = useFetchGet('http://192.168.1.34:8000/api/home')

    // const GetData = () => {
    //     if(accessToken !== null){
    //         fetch('http://192.168.1.34:8000/api/home', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization' : 'Bearer ' + accessToken
    //             }
    //         })
    //         .then(res => res.json())
    //         .then((data) => {
    //             setData(data)
    //             setLoading(false)
    //             console.log('Essa: ', data['Order Items Count'])
    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         })
    //     }
    // }

    // useEffect(() => {
    //     // navigation.addListener('focus', () => {
    //         // if(accessToken !== null){
    //         //     fetch('http://192.168.1.34:8000/api/home', {
    //         //         method: 'GET',
    //         //         headers: {
    //         //             'Content-Type': 'application/json',
    //         //             'Authorization' : 'Bearer ' + accessToken
    //         //         }
    //         //     })
    //         //     .then(res => res.json())
    //         //     .then((data) => {
    //         //         setData(data)
    //         //         setLoading(false)
    //         //         console.log('Data: ', data)
    //         //     })
    //         //     .catch(err => {
    //         //         console.log(err.message)
    //         //     })
    //         // }
    //     // });
    //     // navigation.addListener('state', () => {
    //         // GetData()
    //     // })
    // }, [accessToken])

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-ExtraBold' : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    })

    if (!fontsLoaded){
        return (
            <View className='h-screen justify-center items-center w-screen'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <>
        {data && 
            <>
        <View className={`${Platform.OS == 'ios' ? 'pt-8' : 'pt-4'} bg-[#fff] justify-start items-center rounded-b-3xl w-screen`}>
            <View className='flex-row py-5 justify-between items-center' style={{width: width * 0.9}}>
                {data && data['Delivery Address']['street'] ? (
                    <TouchableOpacity className='flex-row' onPress={() => navigation.navigate('DeliveryFormEdit', {id: data['Delivery Address']['id']})}>
                        <Ionicons name="location-outline" size={24} color="black" />
                        <View className='ml-2 justify-center'>
                            <Text className='text-black text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{data['Delivery Address']['street']}</Text>  
                        </View>
                    </TouchableOpacity>
                         
                ) : (
                    <TouchableOpacity className='flex-row' onPress={() => navigation.navigate('DeliveryForm')}>
                        <Ionicons name="location-outline" size={24} color="black" />
                        <View className='ml-2 justify-center'>
                            <Text className='text-black text-sm' style={{fontFamily: 'Montserrat-Medium'}}>Add Address</Text>
                        </View>
                    </TouchableOpacity>
                    
                )}
                
                <TouchableOpacity onPress={() => navigation.navigate('Cart')} className='bg-blue-500 flex-row items-center rounded-lg' style={{paddingVertical: 6, paddingHorizontal: 10}}>
                    <Ionicons name="cart-outline" size={22} color="white" />
                    {data && data['Order Items Count']['Error'] != 'No Orders' ? (
                        <Text className='text-white text-base ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{data['Order Items Count']}</Text>
                    ) : (
                        <Text className='text-white text-base ml-2' style={{fontFamily: 'Montserrat-Medium'}}>0</Text>
                    )}   
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView ref={ref}  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 120}} showsVerticalScrollIndicator={false}>
            
            <View className='mt-5 mb-2' style={{width: width * 0.9}}>
                <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Top Categories</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data && data != 'Categories is empty' ? (
                        data['Categories'].map((item) => (
                            <HomeSmCategory title={item.title} icon={item.icon} slug={item.slug} key={item.id} />
                        ))
                    ) : (
                        <Text className='text-white text-base ml-2' style={{fontFamily: 'Montserrat-Medium'}}>No Categories</Text>
                    ) }
                </ScrollView>
            </View>

            
            {data && data['Italian'] != 'Italian Category is empty' ? (
                <HomeRow data={data} title='Italian' image={data['Italian'][0]['image']} />
            )  : null}

            {data && data['Fast Food'] != 'Fast Food Category is empty' ? (
                <HomeRow data={data} title='Fast Food' image={data['Fast Food'][0]['image']} />
            )  : null}

            {data && data['Asian'] != 'Asian Category is empty' ? (
                <HomeRow data={data} title='Asian' image={data['Asian'][0]['image']} />
            )  : null}
            
            
            <View className='mt-5 pt-5 pb-6 bg-white w-screen items-center rounded-xl'>
                <View className='justify-start flex-row items-center' style={{width: width * 0.9}}>
                    <Text className='text-xl mr-3' style={{fontFamily: 'Montserrat-SemiBold'}}>All Resteurants</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {data && data['All Resteurants'] != 'No Resteurants' ? (
                        data['All Resteurants'].map((item) => (
                            <HomeBlockBig id={item.id} key={item.id} title={item.title} image={item.image} waitingTime={item.waitingTime} rating={item.rating} deliveryFeePrice={item.deliveryFeePrice} discountDeliveryFeePrice={item.discountDeliveryFeePrice} slug={item.slug} />
                        ))
                    ) : null}
                </ScrollView>
            </View>
        </ScrollView>
        </>
        } 
            
            
        </>
    )
}

export default HomeScreen