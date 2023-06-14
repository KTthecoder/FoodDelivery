import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useContext, useRef } from 'react'
import { Formik } from 'formik'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper'
import { AuthContext } from '../contexts/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Entypo } from '@expo/vector-icons'; 

const DeliveryFormScreen = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    })

    if (!fontsLoaded){
        return <ActivityIndicator size='large' />
    }

    const { width } = Dimensions.get('screen')

    return (
        <KeyboardAvoidWrapper>
            <>
                <View className='flex-row items-center justify-between mt-3' style={{width: width * 0.9}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='items-center justify-center flex-2 mb-1' style={{width: 35, height: 35}}>
                        <Entypo name="cross" size={40} color="black" />
                    </TouchableOpacity>
                    <Text className='text-xl flex-1 text-center' style={{fontFamily: 'Montserrat-Medium'}}>Delivery Info</Text>
                    <TouchableOpacity className='opacity-0' style={{width: 35, height: 35}}>
                        <Entypo name="cross" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <SafeAreaView className='flex-1 justify-start items-center bg-[#fff] mt-10'>
                    <Formik
                        initialValues={{street: '', postCode: '', city: '', instructions: '', user: '', current: ''}}
                        onSubmit={(values) => {
                            fetch('http://192.168.1.34:8000/api/address/add', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    'street' : values.street,
                                    'postCode' : values.postCode,
                                    'city' : values.city,
                                    'instructions' : values.instructions,
                                    'user' : user['user_id'],
                                    'current' : true,
                                })
                            })
                            .then(res => res.json())
                            .then((data) => {
                                console.log(data)
                                navigation.navigate('Home', {reload: true})
                            })
                            .catch(err => {
                                console.log(err.message)
                            })
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View className='justify-start w-screen pl-5 pr-5'>
                                <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                        <TextInput  
                                            placeholder='Street'
                                            onChangeText={handleChange('street')}
                                            onBlur={handleBlur('street')}
                                            value={values.street}
                                            blurOnSubmit={false}
                                            returnKeyType='next'
                                            onSubmitEditing={() => {
                                            ref1.current.focus()
                                            }}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-5'>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                                        <TextInput  
                                            placeholder='Post Code'
                                            onChangeText={handleChange('postCode')}
                                            onBlur={handleBlur('postCode')}
                                            value={values.postCode}
                                            blurOnSubmit={false}
                                            returnKeyType='Done'
                                            ref={ref1}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black flex-1'
                                            onSubmitEditing={() => {
                                                ref2.current.focus()
                                            }}
                                            style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-5'>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                                        <TextInput  
                                            placeholder='City'
                                            onChangeText={handleChange('city')}
                                            onBlur={handleBlur('city')}
                                            value={values.city}
                                            blurOnSubmit={false}
                                            returnKeyType='Done'
                                            ref={ref2}
                                            onSubmitEditing={() => {
                                                ref3.current.focus()
                                            }}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black flex-1'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-5'>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                                        <TextInput  
                                            placeholder='Instructions'
                                            onChangeText={handleChange('instructions')}
                                            onBlur={handleBlur('instructions')}
                                            value={values.instructions}
                                            blurOnSubmit={false}
                                            returnKeyType='Done'
                                            ref={ref3}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black flex-1'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={handleSubmit} className='justify-center items-center bg-[#0082F6] pt-4 pb-4 rounded-md mt-8'>
                                    <Text className='text-white font-bold text-base' style={{fontFamily: 'Montserrat-Medium'}}>Add Delivery Info</Text>
                                </TouchableOpacity>
                            </View>  
                        )}
                    </Formik>
                </SafeAreaView>
            </>
        </KeyboardAvoidWrapper>
    )
}

export default DeliveryFormScreen