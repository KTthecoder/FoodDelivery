import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, useScrollToTop } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import CartItem from '../components/CartItem';
import useFetchGet from '../hooks/useFetchGet'

const PastOrderDetailsScreen = () => {
    const { width } = Dimensions.get('screen')
    const ref = React.useRef(null);
    useScrollToTop(ref);
    const navigation = useNavigation()
    const route = useRoute()

    const { data } = useFetchGet(`http://192.168.1.34:8000/api/order/past/${route.params.id}`)

    return (
        <View className='flex-1 items-center'>
            <View className='bg-white w-screen items-center pt-14 pb-3 rounded-b-xl' style={{zIndex: 1}}>
                <View className='items-center justify-between flex-row' style={{width: width * 0.9}}> 
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-white first-line rounded-full items-center justify-center' style={{width: 38, height: 38, zIndex: 1}}>
                        <AntDesign name="left" size={27} color="black" />
                    </TouchableOpacity>
                    <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Current Order']['resteurant']['title']}</Text>
                    <TouchableOpacity style={{width: 38, height: 38, zIndex: 1, opacity: 0}}>
                        <AntDesign name="left" size={27} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 100}}>
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                    <View className='items-start justify-center mb-2' style={{width: width * 0.9}}>
                        <Text className='text-sm mb-1' style={{fontFamily: 'Montserrat-Medium'}}>Date: {data && data['Current Order']['dataOrdered'].slice(0, 10)}</Text>
                        <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Order #{data && data['Current Order']['id']}</Text>
                    </View>
                    {data && data['Current Order Items'].map((item) => (
                        <CartItem key={item.id} quantity={item['quantity']} title={item['product']['title']} price={item['item_total']} description={item['note']} past={true} />
                    ))}
                </View>
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                    <View className='items-start justify-between flex-row' style={{width: width * 0.9}}>
                        <Text className='text-lg' style={{fontFamily: 'Montserrat-SemiBold'}}>Total</Text>
                        <Text className='text-lg' style={{fontFamily: 'Montserrat-SemiBold'}}>${data && data['Current Order']['order_total']}</Text>
                    </View>
                </View>
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl pt-4 pb-5'>
                    <View className='items-start justify-center mb-1' style={{width: width * 0.9}}>
                        <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Delivery Address</Text>
                    </View>
                    <View className='items-start justify-between flex-row' style={{width: width * 0.9}}>
                        <Text className='text-base mt-2' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Delivery Info']['street']}</Text>
                    </View>
                    <View className='items-start justify-between flex-row' style={{width: width * 0.9}}>
                        <Text className='text-base mt-2' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Delivery Info']['postCode']} {data && data['Delivery Info']['city']}</Text>
                    </View>
                </View>
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                    <View className='items-start justify-center mb-1' style={{width: width * 0.9}}>
                        <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Delivery Note</Text>
                    </View>
                    <View className='items-start justify-between mt-2 flex-row' style={{width: width * 0.9}}>
                        {data && data['Delivery Info']['instructions'] ? (
                            <Text className='text-base' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Delivery Info']['instructions']}</Text>
                        ) : (
                            <Text className='text-base' style={{fontFamily: 'Montserrat-Regular'}}>None</Text>
                        )}
                        
                    </View>
                </View>
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                    <TouchableOpacity className='justify-center items-center bg-green-500 py-4 rounded-xl' style={{width: width * 0.9}}>
                        <Text className='text-base text-white' style={{fontFamily: 'Montserrat-Medium'}}>Order Again</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

export default PastOrderDetailsScreen