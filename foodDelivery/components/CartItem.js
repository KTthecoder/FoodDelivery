import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({quantity, title, price, description, id, note, orderItemId, past, refresh, setRefresh, resteurantId}) => {
    const { width } = Dimensions.get('screen')

    const { accessToken } = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const navigation = useNavigation()

    const [response, setResponse] = useState(false)

    useEffect(() => {
        fetch('http://192.168.1.34:8000/api/order/current', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + accessToken
            }
          })
          .then(res => res.json())
          .then((data) => {
            setData(data)
            setIsLoading(false)
            // console.log(data)
            console.log(response)
          })
          .catch(err => {
            console.log(err.message)
          })
    }, [response])
    
    return (
        <View className='items-start justify-center mt-4'>
            <View style={{width: width * 0.9}}>
                <View className='flex-row justify-between'>
                    <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>{quantity} x {title}</Text>
                    <Text className='text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>${price}</Text>
                </View>
                {description ? (
                    <View className='mt-2 ml-6' style={{width: width * 0.9}}>
                        <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular'}}>{description}</Text>
                    </View>
                ) : null}
            </View>
            {past ? null : (
                <View className='flex-row mt-3' style={{width: width * 0.9}}>
                <TouchableOpacity className='mr-4'
                    onPress={() => {
                        fetch(`http://192.168.1.34:8000/api/product/remove/${orderItemId}`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer ' + accessToken
                            },
                        })
                        .then(res => res.json())
                        .then((data) => {
                            // console.log(data)
                            // navigation.dispatch()
                            // navigation.push('Cart')
                            setRefresh(!refresh)
                            setResponse(data)
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                    }}
                >
                    <AntDesign name="minuscircleo" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='mr-4' 
                    onPress={() => {
                        fetch(`http://192.168.1.34:8000/api/product/add/${id}/${resteurantId}`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer ' + accessToken
                            },
                        })
                        .then(res => res.json())
                        .then((data) => {
                            // console.log(data)
                            // navigation.dispatch()
                            // navigation.push('Cart')
                            setRefresh(!refresh)
                            setResponse(data)
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                    }}
                >
                    <AntDesign name="pluscircleo" size={27} color="black" />
                </TouchableOpacity>       
                </View>
            )}
           
        </View>
    )
}

export default CartItem