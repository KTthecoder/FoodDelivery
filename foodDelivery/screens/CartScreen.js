import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import CartItem from '../components/CartItem';
import { AuthContext } from '../contexts/AuthProvider';
import * as SecureStore from "expo-secure-store"

const CartScreen = () => {
    const { width } = Dimensions.get('screen')
    const ref = React.useRef(null);
    useScrollToTop(ref);
    const navigation = useNavigation()
    const { accessToken } = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [token, setToken] = useState()

    async function getData() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
        setToken(token)
        let response = await fetch('http://192.168.1.34:8000/api/order/current', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
            },
        })
        let data = await response.json()
            setData(data)
            setLoading(false)
        })
      }

      useEffect(() => {
        getData()
      }, [refresh])

    return (
        <View className='flex-1 items-center'>
            <View className='bg-white w-screen items-center pt-14 pb-3 rounded-b-xl' style={{zIndex: 1}}>
                <View className='items-center justify-between flex-row' style={{width: width * 0.9}}> 
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-white first-line rounded-full items-center justify-center' style={{width: 38, height: 38, zIndex: 1}}>
                        <AntDesign name="left" size={27} color="black" />
                    </TouchableOpacity>
                    {data && !data['Error'] ? (
                        <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Current Order']['resteurant']['title']}</Text>
                    ) : (
                        <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>No current order</Text>
                    )}
                    <TouchableOpacity style={{width: 38, height: 38, zIndex: 1, opacity: 0}}>
                        <AntDesign name="left" size={27} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 100}}>
            {data && !data['Error'] ? (
                <>
                    <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                        <View className='items-start justify-center mb-2' style={{width: width * 0.9}}>
                            <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Order #{data && data['Current Order']['id']}</Text>
                        </View>
                        {data && data['Current Order Items'].map((item) => (
                            <CartItem data={data} resteurantId={item['product']['resteurant']} refresh={refresh} setRefresh={setRefresh} key={item.id} quantity={item['quantity']} note={item['product']['note']} title={item['product']['title']} price={item['item_total']} description={item['note']} id={item['product']['id']} orderItemId={item['id']} />
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
                        <TouchableOpacity onPress={() => navigation.navigate('MapView')} className='justify-center items-center bg-green-500 py-4 rounded-xl' style={{width: width * 0.9}}>
                            <Text className='text-base text-white' style={{fontFamily: 'Montserrat-Medium'}}>Confirm Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            fetch(`http://192.168.1.34:8000/api/order/remove/${data['Current Order']['id']}`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization' : 'Bearer ' + accessToken
                                },
                            })
                            .then(res => res.json())
                            .then((data) => {
                                navigation.goBack()
                            })
                            .catch(err => {
                                console.log(err.message)
                            })
                        }} className='justify-center mt-5 items-center bg-red-500 py-4 rounded-xl' style={{width: width * 0.9}}>
                            <Text className='text-base text-white' style={{fontFamily: 'Montserrat-Medium'}}>Delete Order</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View className='items-center justify-center mt-3 bg-white w-screen rounded-xl py-4'>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className='justify-center items-center bg-green-500 py-4 rounded-xl' style={{width: width * 0.9}}>
                        <Text className='text-base text-white' style={{fontFamily: 'Montserrat-Medium'}}>Create New Order</Text>
                    </TouchableOpacity>
                </View>
            )}
            </ScrollView>
        </View>
    )
}

export default CartScreen