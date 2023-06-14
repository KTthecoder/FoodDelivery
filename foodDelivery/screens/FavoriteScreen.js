import { View, Text, SafeAreaView, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeBlockBig from '../components/HomeBlockBig';
import { useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet'

const FavoriteScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    const ref = React.useRef(null);
    useScrollToTop(ref);

    const { data, refresh, setRefresh } = useFetchGet('http://192.168.1.34:8000/api/resteurants/favorite')

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className='w-screen justify-center items-center'>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <>
                        <View className={`${Platform.OS === 'ios' ? 'pt-3' : 'pt-9'} items-center rounded-b-xl flex-row`} style={{width: width * 0.9}}>
                            <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-full justify-center items-center mr-3'>
                                <AntDesign name="left" size={26} color="black" />
                            </TouchableOpacity>
                            <View className='bg-[#f1f1f1] rounded-xl flex-row px-2 items-center flex-1'>
                                <AntDesign name="search1" size={22} color="gray" />
                                <TextInput placeholder='Search in Favorite' className='flex-1 ml-2 text-sm py-2' style={{fontFamily: 'Montserrat-Regular', color: 'gray'}}/>
                            </View>
                        </View>
                        
                        <ScrollView ref={ref} className='mt-8 w-screen' showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 120}}>
                            <View style={{width: width * 0.9}}>
                                <View className='flex-row items-center'>
                                    <Text className='text-2xl mr-2' style={{fontFamily: 'Montserrat-SemiBold'}}>Favorite</Text>
                                    <AntDesign name="heart" size={24} color="red" />
                                </View>
                            </View>
                            <View className='mt-3 pb-6 w-screen items-center rounded-xl'>
                                {data && data.map((item) => (
                                    <HomeBlockBig refresh1={refresh} setRefresh1={setRefresh} id={item.resteurantId} key={item.resteurantId} title={item.resteurantTitle} image={item.resteurantImage} waitingTime={item.resteurantWaitingTime} rating={item.resteurantRating} deliveryFeePrice={item.resteurantDeliveryFeePrice} discountDeliveryFeePrice={item.resteurantDiscountDeliveryFeePrice} slug={item.resteurantSlug} />
                                ))}
                            </View>
                        </ScrollView>
                    </>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default FavoriteScreen