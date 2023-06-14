import { View, Text, Dimensions, FlatList } from 'react-native'
import React from 'react'
import HomeRowBlock from './HomeRowBlock'
import { Ionicons } from '@expo/vector-icons';

const HomeRow = ({title, refresh, setRefresh, data}) => {
    const { width } = Dimensions.get('screen')

    return (
        <View className='mt-5 pt-5 pb-7 bg-[#fff] w-screen items-center rounded-xl'>
            <View style={{width: width * 0.9}}>
                <View className='flex-row justify-start items-center'>
                    <Text className='text-xl mr-3' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
                    <Ionicons name="ios-fast-food-outline" size={30} color="#222" />
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