import { View, Text, ScrollView, Dimensions, FlatList, Image } from 'react-native'
import React from 'react'
import HomeRowBlock from './HomeRowBlock'
import { FontAwesome } from '@expo/vector-icons'; 
import useFetchGet from '../hooks/useFetchGet';

const HomeRow = ({title, image, refresh, setRefresh, data}) => {
    const { width } = Dimensions.get('screen')

    // const { data } = useFetchGet('http://192.168.1.34:8000/api/home')

    return (
        <View className='mt-5 pt-5 pb-7 bg-[#fff] w-screen items-center rounded-xl'>
            <View style={{width: width * 0.9}}>
                <View className='flex-row justify-start items-center'>
                    <Text className='text-xl mr-3' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
                    {/* <FontAwesome name="leaf" size={24} color="green" /> */}
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: 30, height: 30}} />
                </View>
                <FlatList
                    data={data && data[`${title}`]}
                    horizontal={true}
                    key={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem = {({item}) => (
                        <HomeRowBlock refresh={refresh} setRefresh={setRefresh} id={item.id} title={item.title} image={item.image} waitingTime={item.waitingTime} rating={item.rating} deliveryFeePrice={item.deliveryFeePrice} discountDeliveryFeePrice={item.discountDeliveryFeePrice} slug={item.slug}/>
                    )} 
                />
            </View>
        </View>
    )
}

export default HomeRow