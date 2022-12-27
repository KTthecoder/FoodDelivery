import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Formik } from 'formik'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper'
import { AuthContext } from '../contexts/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const navigation = useNavigation()

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    })

    if (!fontsLoaded){
        return <ActivityIndicator size='large' />
    }

    const { width, height } = Dimensions.get('screen')

    const register = (values) => {
        fetch('http://192.168.1.34:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            }),
        })
        .then((data) => data.json())
        .then((data) => {
            alert("User Created Succesfully")
            navigation.navigate('LoginScreen')
        })
        .catch((err) => alert(err))
    }


    return (
        <KeyboardAvoidWrapper>
            <SafeAreaView className='flex-1 justify-center items-center bg-[#fff]'>
                <View className='mb-8'>
                    <Image source={require('../assets/images/register.png')} style={{width: width*0.7, height: 180}} />
                </View>
                <View className='justify-start items-start w-screen pl-5 pr-5 mb-3'>
                    <Text className='text-2xl font-semibold text-black' style={{fontFamily: 'Montserrat-SemiBold'}}>Register</Text>
                </View>
                <Formik
                    initialValues={{username: '', password: '', email: ''}}
                    onSubmit={(values) => register(values)}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View className='justify-start w-screen pl-5 pr-5'>
                            <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                <View className='justify-center items-center w-10 mr-1'>
                                  <Ionicons name="person" size={24} color="gray" />
                                </View>
                                <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                    <TextInput  
                                        placeholder='Username'
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
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
                            <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                <View className='justify-center items-center w-10 mr-1'>
                                  <MaterialIcons name="email" size={24} color="gray" />
                                </View>
                                <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                    <TextInput  
                                        placeholder='Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        blurOnSubmit={false}
                                        returnKeyType='next'
                                        ref={ref1}
                                        onSubmitEditing={() => {
                                          ref2.current.focus()
                                        }}
                                        placeholderTextColor={'gray'}
                                        className='text-base pr-4 text-black'
                                        style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                    />
                                </View>
                            </View>
                            <View className='justify-start w-sceeen flex-row items-center mt-5'>
                                <View className='justify-center items-center w-10 mr-1'>
                                  <FontAwesome name="lock" size={24} color="gray" />
                                </View>
                                <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                                    <TextInput  
                                        placeholder='Password'
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        blurOnSubmit={false}
                                        returnKeyType='Done'
                                        secureTextEntry={hiddenPassword}
                                        ref={ref2}
                                        placeholderTextColor={'gray'}
                                        className='text-base pr-4 text-black flex-1'
                                        style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                    />
                                    {hiddenPassword ? 
                                    (
                                      <View className='pl-3 py-2'>
                                        <Feather name="eye" size={21} color='gray' onPress={() => setHiddenPassword(!hiddenPassword)}/>
                                      </View>
                                    )
                                    :  <View className='pl-3 py-2'>
                                          <Feather name="eye-off" size={21} color='gray' onPress={() => setHiddenPassword(!hiddenPassword)}/>
                                        </View>
                                    }
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleSubmit} className='justify-center items-center bg-[#0082F6] pt-4 pb-4 rounded-md mt-8'>
                                <Text className='text-white font-bold text-base' style={{fontFamily: 'Montserrat-Medium'}}>Register</Text>
                            </TouchableOpacity>
                        </View>  
                    )}
                </Formik>
                <View className='pl-5 pr-5 flex-row justify-between w-screen mt-5'>
                    <Text className='text-gray-400 text-sm pb-2 pt-2 font-bold'>Have already account?</Text>
                    <Text className='text-[#0082F6] text-sm font-bold pb-2 pt-2' onPress={() => navigation.navigate('LoginScreen')}>Login Now!</Text>
                </View>
            </SafeAreaView>
        </KeyboardAvoidWrapper>
    )
}

export default RegisterScreen